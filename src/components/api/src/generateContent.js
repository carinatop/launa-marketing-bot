import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY
});

const SYSTEM_PROMPT = `You are Launa Jae's Personal Marketing Bot Assistant.

Your role: Generate marketing content across ALL platforms from one natural conversation.

BRAND IDENTITY:
- Name: Launa Jae
- Business: Health Coach - Help busy women cut body fat without giving up foods they love
- Tone: Conversational, vulnerable, direct, humorous, no-BS, action-oriented
- Voice: Personal brand (Launa's life = content), uses emoji strategically 🔥👉🏽💪
- Never: Generic advice, corporate tone, long paragraphs, false claims, preachy

CONTENT GENERATION:
When generating content, create ALL of these with clear headers:

1. INSTAGRAM REEL SCRIPT (15-30 sec with [HOOKS], [VISUALS], [TEXT OVERLAY])
2. INSTAGRAM CAROUSEL POST (5-slide deck format)
3. INSTAGRAM SINGLE POST CAPTION (hook + story + teaching + proof + CTA + hashtags)
4. INSTAGRAM STORY POST (quick version with emoji)
5. FACEBOOK POST (adapted for Facebook audience)
6. EMAIL SUBJECT LINES (5 variations: story, curiosity, urgency, question, direct)
7. EMAIL BODY (full formatted with greeting, body, closing, PS)
8. TIKTOK SCRIPT (short-form video script)
9. FACEBOOK/INSTAGRAM ADS (headlines + descriptions)
10. GOOGLE ADS (headlines + description)
11. HASHTAG SET (ready to copy-paste)

FORMATTING RULES:
- Use clear headers with emoji
- Keep sentences SHORT and punchy
- Italicize testimonials
- BOLD important statements
- Use line breaks for readability
- Make everything COPY-PASTE READY

OUTPUT FORMAT:
Return as a structured response with clear sections for each platform and content type.`;

export async function generateContent(inputs) {
  const userPrompt = \`
Generate marketing content based on these inputs:

TOPIC: \${inputs.topic}
CONTENT TYPE: \${inputs.contentType}
GOAL: \${inputs.goal}
ANGLE: \${inputs.angle || 'No specific angle - surprise me!'}
PLATFORM FOCUS: \${inputs.platformFocus}

Generate ALL content pieces listed above, maintaining Launa Jae's voice throughout.
Make it conversational, real, vulnerable, and action-oriented.
For each platform, create copy that matches the platform's format and audience expectations.
\`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
      system: SYSTEM_PROMPT
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse the response into sections
    return parseContent(responseText);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error(\`Failed to generate content: \${error.message}\`);
  }
}

function parseContent(responseText) {
  // Split content by sections and return structured data
  const sections = {
    instagram: {
      reel: extractSection(responseText, 'REEL SCRIPT', 'CAROUSEL POST') || 'Generating...',
      carousel: extractSection(responseText, 'CAROUSEL POST', 'INSTAGRAM SINGLE') || 'Generating...',
      caption: extractSection(responseText, 'INSTAGRAM SINGLE POST CAPTION', 'INSTAGRAM STORY') || 'Generating...',
      story: extractSection(responseText, 'INSTAGRAM STORY POST', 'FACEBOOK POST') || 'Generating...'
    },
    email: {
      subjectLines: extractSubjectLines(responseText),
      body: extractSection(responseText, 'EMAIL BODY', 'TIKTOK SCRIPT') || 'Generating...'
    },
    facebook: {
      post: extractSection(responseText, 'FACEBOOK POST', 'TIKTOK SCRIPT') || 'Generating...'
    },
    tiktok: {
      script: extractSection(responseText, 'TIKTOK SCRIPT', 'FACEBOOK/INSTAGRAM ADS') || 'Generating...'
    },
    ads: {
      socialAds: extractSection(responseText, 'FACEBOOK/INSTAGRAM ADS', 'GOOGLE ADS') || 'Generating...',
      googleAds: extractSection(responseText, 'GOOGLE ADS', 'HASHTAG SET') || 'Generating...'
    },
    hashtags: {
      allHashtags: extractSection(responseText, 'HASHTAG SET', '') || 'Generating...'
    }
  };

  return sections;
}

function extractSection(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return null;

  const contentStart = startIndex + startMarker.length;
  let endIndex = text.length;

  if (endMarker) {
    const endMarkerIndex = text.indexOf(endMarker, contentStart);
    if (endMarkerIndex !== -1) {
      endIndex = endMarkerIndex;
    }
  }

  return text.substring(contentStart, endIndex).trim();
}

function extractSubjectLines(text) {
  const subjectSection = extractSection(text, 'EMAIL SUBJECT LINES', 'EMAIL BODY');
  if (!subjectSection) return [];

  const lines = subjectSection.split('\n').filter(line => line.trim());
  return lines.map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(line => line.length > 0);
}
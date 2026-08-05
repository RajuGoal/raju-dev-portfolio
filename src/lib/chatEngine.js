import {
  person,
  skills,
  projects,
  contact,
  suggestedPrompts,
} from "../data/assistantKnowledge.js";

export const MODELS = {
  fast: {
    label: "Fast",
    description: "Short, direct answers",
    verbosity: "short",
  },
  detailed: {
    label: "Detailed",
    description: "Thorough, in-depth answers",
    verbosity: "long",
  },
  creative: {
    label: "Creative",
    description: "Friendlier, more conversational tone",
    verbosity: "friendly",
  },
};

function formatSkills() {
  return [
    `Frontend: ${skills.frontend.join(", ")}`,
    `Backend: ${skills.backend.join(", ")}`,
    `Tools: ${skills.tools.join(", ")}`,
  ].join("\n");
}

function formatProjectList() {
  return projects.map((p) => `• ${p.name} — ${p.tagline}`).join("\n");
}

function findProject(text) {
  return projects.find(
    (p) => text.includes(p.id) || text.includes(p.name.toLowerCase()),
  );
}

/**
 * Very small intent matcher. Good enough for a fixed FAQ-style knowledge
 * base like a portfolio. For open-ended free-form Q&A you'd swap this for
 * a real LLM call as described above.
 */
function matchIntent(rawText) {
  const text = rawText.toLowerCase().trim();

  const project = findProject(text);
  if (project) return { type: "project", project };

  if (/\b(resume|cv)\b/.test(text)) return { type: "resume" };
  if (/\b(contact|email|reach|hire)\b/.test(text)) return { type: "contact" };
  if (/\b(skill|tech stack|technolog)/.test(text)) return { type: "skills" };
  if (/\bproject/.test(text)) return { type: "projects" };
  if (/\b(who is|about|tell me about|bio)/.test(text)) return { type: "about" };
  if (/\b(hi|hello|hey)\b/.test(text)) return { type: "greeting" };

  return { type: "fallback" };
}

function buildReply(intent, verbosity) {
  switch (intent.type) {
    case "about": {
      const short = `${person.name} is a ${person.title} with ${person.yearsExperience}+ years of experience.`;
      return verbosity === "short" ? short : `${short} ${person.bio}`;
    }
    case "skills":
      return verbosity === "short"
        ? `Frontend: ${skills.frontend.slice(0, 3).join(", ")}... Backend: ${skills.backend.slice(0, 3).join(", ")}...`
        : `Here's a breakdown of ${person.name}'s skills:\n\n${formatSkills()}`;
    case "projects":
      return verbosity === "short"
        ? `Recent projects: ${projects.map((p) => p.name).join(", ")}.`
        : `${person.name} has built several projects. Here are the highlights:\n\n${formatProjectList()}\n\nAsk me to "explain HouseHunt" or "explain DriveEase" for details.`;
    case "project": {
      const p = intent.project;
      const short = `${p.name}: ${p.tagline}.`;
      return verbosity === "short"
        ? short
        : `${p.name} — ${p.tagline}\n\n${p.description}\n\nStack: ${p.stack.join(", ")}`;
    }
    case "resume":
      return `You can download ${person.name}'s resume right here — I've dropped the link below. [Download Resume](${contact.resumeUrl})`;
    case "contact":
      return `You can reach ${person.name} at ${contact.email}, or use the contact form further down the page.`;
    case "greeting":
      return `Hey! I'm ${person.name}'s portfolio assistant. Ask me about his background, skills, or projects like HouseHunt and DriveEase.`;
    default:
      return `I'm not sure about that one, but I can tell you about ${person.name}'s background, skills, or projects (HouseHunt, DriveEase) — or help you get his resume or contact info.`;
  }
}

/**
 * Streams the reply back chunk-by-chunk to simulate a real LLM stream.
 * Swap the body of this function for a real fetch()-based stream reader
 * when you connect a backend model.
 */
export async function* generateReplyStream(
  userText,
  { modelId = "fast" } = {},
) {
  const model = MODELS[modelId] ?? MODELS.fast;
  const intent = matchIntent(userText);
  const full = buildReply(intent, model.verbosity);

  const words = full.split(" ");
  for (let i = 0; i < words.length; i++) {
    await new Promise((r) => setTimeout(r, 35));
    yield (i === 0 ? "" : " ") + words[i];
  }
}

export { suggestedPrompts };

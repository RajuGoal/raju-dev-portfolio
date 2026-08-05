import {
  projectExplanations,
  generalExplanations,
} from "../data/projectExplainerData";

// Finds which project (if any) the question is about
function findProject(question) {
  const q = question.toLowerCase();
  return Object.values(projectExplanations).find((p) =>
    p.aliases.some((alias) => q.includes(alias)),
  );
}

// Detects which aspect of the project is being asked about
function detectIntent(question) {
  const q = question.toLowerCase();
  if (
    q.includes("architecture") ||
    q.includes("how is it built") ||
    q.includes("tech stack")
  ) {
    return "architecture";
  }
  if (
    q.includes("database") ||
    q.includes("mongodb") ||
    q.includes("schema") ||
    q.includes("data model")
  ) {
    return "databaseDesign";
  }
  if (
    q.includes("challenge") ||
    q.includes("hard part") ||
    q.includes("difficult")
  ) {
    return "challenges";
  }
  if (
    q.includes("decision") ||
    q.includes("why did you") ||
    q.includes("why use")
  ) {
    return "keyDecisions";
  }
  if (
    q.includes("what does") ||
    q.includes("what is") ||
    q.includes("explain")
  ) {
    return "whatItDoes";
  }
  return "summary";
}

export function answerProjectQuestion(question) {
  const project = findProject(question);
  const intent = detectIntent(question);

  if (!project) {
    // No specific project matched — check for general architecture/DB questions
    const q = question.toLowerCase();
    if (q.includes("architecture")) {
      return { answer: generalExplanations.architecture, project: null };
    }
    if (q.includes("mongodb") || q.includes("database")) {
      return { answer: generalExplanations.mongodbDesign, project: null };
    }
    return {
      answer:
        'I\'m not sure which project you\'re asking about. Try naming one directly — e.g. "Explain HouseHunt" or "What\'s the architecture of DriveEase?"',
      project: null,
    };
  }

  let answer;
  switch (intent) {
    case "architecture":
      answer = project.architecture;
      break;
    case "databaseDesign":
      answer = project.databaseDesign;
      break;
    case "challenges":
      answer = project.challenges;
      break;
    case "keyDecisions":
      answer = project.keyDecisions.join(" ");
      break;
    case "whatItDoes":
      answer = project.whatItDoes;
      break;
    default:
      answer = project.summary;
  }

  return { answer, project: project.name };
}

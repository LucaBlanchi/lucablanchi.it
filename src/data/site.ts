export const site = {
  origin: "https://lucablanchi.it",
  name: "lucablanchi.it",
  title: "Luca Blanchi - Draft concepts and notes",
  description:
    "Draft concepts, working notes, and an exploratory note on mathematical descriptions by Luca Blanchi.",
  language: "en",
  alternateLanguages: ["en", "it"],
  llmsPath: "/llms.txt",
  fullLlmsPath: "/llms-full.txt",
  updatedDate: "2026-11-06",
} as const;

export const author = {
  id: `${site.origin}/#luca-blanchi`,
  name: "Luca Blanchi",
  givenName: "Luca",
  familyName: "Blanchi",
  jobTitle: "Software Engineer",
  url: site.origin,
  professionalProfile: "https://lucablanchi.dev/",
  sameAs: [
    "https://lucablanchi.dev/",
    "https://github.com/LucaBlanchi",
    "https://www.linkedin.com/in/lucablanchi/",
  ],
  alumniOf: {
    name: "Università degli Studi di Pisa",
    url: "https://www.unipi.it/",
  },
  knowsAbout: [
    "pure mathematics",
    "software engineering",
    "full-stack development",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Node.js",
    "React",
    "Angular",
    "generative AI",
    "prompt engineering",
  ],
} as const;

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/") return `${site.origin}/`;
  return `${site.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

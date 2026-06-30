export const site = {
  origin: "https://lucablanchi.it",
  name: "lucablanchi.it",
  title: "Luca Blanchi - Draft concepts and presentation theory",
  description:
    "Draft concepts and preliminary AI-assisted mathematical research notes by Luca Blanchi, including presentation theory and related applications.",
  language: "en",
  alternateLanguages: ["en", "it"],
  llmsPath: "/llms.txt",
  fullLlmsPath: "/llms-full.txt",
  citationsPath: "/citations.json",
  updatedDate: "2026-06-30",
} as const;

export const author = {
  id: `${site.origin}/#luca-blanchi`,
  name: "Luca Blanchi",
  givenName: "Luca",
  familyName: "Blanchi",
  jobTitle: "Software Engineer and author of AI-assisted mathematical research notes",
  url: site.origin,
  professionalProfile: "https://lucablanchi.dev/",
  image: "https://lucablanchi.dev/assets/profile-photo.jpg",
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
    "presentation theory",
    "AI-assisted mathematics",
    "preliminary mathematical research notes",
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

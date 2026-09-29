import raw from "../../data/portfolio.json";
import { portfolioSchema, type Portfolio } from "./validation";

let data: Portfolio;
let validationError: string | null = null;

try {
  data = portfolioSchema.parse(raw);
} catch (e: any) {
  validationError = e?.message ?? String(e);
  const safe = portfolioSchema.safeParse(raw);
  if (safe.success) {
    data = safe.data;
    console.warn("[portfolio.json] validation warning:", validationError);
  } else {
    console.error("[portfolio.json] invalid:", e);
    data = {
      profile: { name: "Amirhossein Saberi Fard", email: "ZDRuMTNsdzR0NTBAcHJvdG9uLm1l", telegram: "YW1pcmhvM2VpbnNhYmVyaQ==" },
      focus: ["Cybersecurity", "Networking", "Security Research"],
      experience: [],
      education: [],
      certifications: [],
      skills: {
        systems: [],
        networkWireless: [],
        offensive: [],
        defensive: [],
        engineering: [],
        productivityResearch: [],
      },
      projects: [],
      achievements: [],
      languages: [],
      seo: { title: "Amir Saberi — Cybersecurity & Security Research", description: "", keywords: [] },
    } as unknown as Portfolio;
  }
}

export const portfolio: Portfolio = data!;
export const portfolioValidationError = validationError;

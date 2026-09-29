// @ts-nocheck
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).optional().default(""),
  telegram: z.string().min(1).optional().default(""),
}).passthrough();

export const skillsSchema = z.object({
  systems: z.array(z.string()).optional().default([]),
  networkWireless: z.array(z.string()).optional().default([]),
  offensive: z.array(z.string()).optional().default([]),
  defensive: z.array(z.string()).optional().default([]),
  engineering: z.array(z.string()).optional().default([]),
  productivityResearch: z.array(z.string()).optional().default([]),
  programming: z.array(z.string()).optional().default([]),
}).passthrough();

export const experienceSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  org: z.string().optional().default(""),
  period: z.string().optional().default(""),
  points: z.array(z.string()).optional().default([]),
});

export const educationSchema = z.object({
  id: z.string().min(1),
  degree: z.string().min(1),
  school: z.string().optional().default(""),
  period: z.string().optional().default(""),
});

export const certificationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  issuer: z.string().optional().default(""),
});

export const achievementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  org: z.string().optional().default(""),
  period: z.string().optional().default(""),
});

export const languageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  level: z.string().optional().default(""),
  reading: z.string().optional().default(""),
  writing: z.string().optional().default(""),
  listening: z.string().optional().default(""),
  speaking: z.string().optional().default(""),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().optional().default(""),
  description: z.string().optional().default(""),
  technologies: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  github: z.string().url().or(z.literal("")).optional(),
  demo: z.string().url().or(z.literal("")).optional(),
  link: z.string().url().or(z.literal("")).optional(),
  url: z.string().url().or(z.literal("")).optional(),
});

export const seoSchema = z.object({
  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
  keywords: z.array(z.string()).optional().default([]),
  canonical: z.string().optional().default(""),
});

export const portfolioSchema = z.object({
  _comment: z.string().optional(),
  profile: profileSchema,
  focus: z.array(z.string()).optional().default([]),
  experience: z.array(experienceSchema).optional().default([]),
  education: z.array(educationSchema).optional().default([]),
  certifications: z.array(certificationSchema).optional().default([]),
  skills: skillsSchema.optional().default({}),
  projects: z.array(projectSchema).optional().default([]),
  achievements: z.array(achievementSchema).optional().default([]),
  languages: z.array(languageSchema).optional().default([]),
  seo: seoSchema.optional().default({}),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
export type Project = z.infer<typeof projectSchema>;

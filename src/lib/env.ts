import {z} from "zod";
const envSchema = z.object({DATABASE_URL: z.url(),
     AUTH_SECRET: z.string().min(1),
     AUTH_GITHUB_ID: z.string().min(1),
      AUTH_GITHUB_SECRET: z.string().min(1) })
export const env = envSchema.parse(process.env);
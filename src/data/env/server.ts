import { createEnv } from "@t3-oss/env-nextjs";
import { z } from 'zod'

export const env = createEnv({
  emptyStringAsUndefined: true, // converts any env var with an empty string to undefined
  server: {
    DATABASE_URL: z.string().url(), // ensures the DATABASE_URL is a valid url string
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env, // allows runtime access to env variables
})

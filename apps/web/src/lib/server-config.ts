import 'server-only';

/** Base URL the Next.js server uses to reach the API over the internal network. */
export const apiInternalUrl = process.env.API_INTERNAL_URL ?? 'http://localhost:4000';

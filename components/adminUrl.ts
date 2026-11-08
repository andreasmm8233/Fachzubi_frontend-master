// The public companies/jobs listings live in the admin app.
export const ADMIN_URL = (
  process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.unibonus.app"
).replace(/\/+$/, "");

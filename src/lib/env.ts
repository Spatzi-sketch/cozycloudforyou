export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "",
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  emailFrom: process.env.EMAIL_FROM || "",
  adminEmail: process.env.ADMIN_EMAIL || "",
};

export const isConfigured = () => {
  return Boolean(
    env.supabaseUrl &&
      env.supabasePublishableKey &&
      env.supabaseSecretKey &&
      env.resendApiKey &&
      env.emailFrom &&
      env.adminEmail
  );
};

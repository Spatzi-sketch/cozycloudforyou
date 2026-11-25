export type WaitlistStatus = "pending" | "confirmed" | "notified" | "unsubscribed";

export type WaitlistSignup = {
  id: string;
  email: string;
  product_slug: string;
  restock_round: number;
  status: WaitlistStatus;
  confirmation_token_hash: string | null;
  confirmation_token_expires_at: string | null;
  unsubscribe_token_hash: string | null;
  consent_at: string | null;
  consent_version: string | null;
  created_at: string;
  confirmed_at: string | null;
  notified_at: string | null;
};

export type Database = {
  public: {
    Tables: {
      waitlist_signups: {
        Row: WaitlistSignup;
        Insert: Omit<WaitlistSignup, "id" | "created_at">;
        Update: Partial<WaitlistSignup>;
      };
    };
  };
};

export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

export type Database = {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string;
          public_id: string;
          team_size: number;
          primary_use_case: string;
          total_monthly_spend: number;
          total_monthly_savings: number;
          total_annual_savings: number;
          audit_payload_json: JsonValue;
          created_at: string;
        };
        Insert: {
          id?: string;
          public_id: string;
          team_size: number;
          primary_use_case: string;
          total_monthly_spend: number;
          total_monthly_savings: number;
          total_annual_savings: number;
          audit_payload_json: JsonValue;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audits"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          audit_id: string;
          email: string;
          company_name: string | null;
          role: string | null;
          team_size: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          audit_id: string;
          email: string;
          company_name?: string | null;
          role?: string | null;
          team_size?: number | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      events: {
        Row: {
          id: string;
          audit_id: string | null;
          event_name: string;
          event_payload_json: JsonValue | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          audit_id?: string | null;
          event_name: string;
          event_payload_json?: JsonValue | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };
    };
  };
};


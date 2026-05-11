import type { User } from "@supabase/supabase-js";

export interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  actions?: React.ReactNode;
}
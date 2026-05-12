"use client";

import { useEffect, useState } from "react";
import { signOut } from "@/utils/auth";
import type { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  const supabase = createBrowserClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setChecked(true);
    });

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await signOut();
    router.push('/')
    setUser(null);
  };

  return {
    isAuthenticated: !!user,
    currentUserId: user?.id ?? "",
    user,
    checked,
    logout,
  };
}

import { createBrowserClient } from "@/lib/supabase";

export const signIn = async (email: string, password: string) => {
  const supabase = await createBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const signOut = async () => {
  const supabase = await createBrowserClient();
  await supabase.auth.signOut();
};

export const getSession = async () => {
  const supabase = await createBrowserClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const getCurrentUser = async () => {
  const supabase = await createBrowserClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
};

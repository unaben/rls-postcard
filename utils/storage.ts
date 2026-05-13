import { Postcard } from "@/components/PostcardCard/PostcardCard.types";
import { createBrowserClient } from "@/lib/supabase";

const toPostcard = (row: Record<string, unknown>): Postcard => ({
  id: row.id as string,
  title: row.title as string,
  content: row.content as string,
  avatarSrc: row.avatar_src as string,
  avatarLabel: row.avatar_label as string,
  ownerId: row.owner_id as string,
  ownerName: row.owner_name as string,
  createdAt: row.created_at as string,
});

export const getPostcards = async (
  supabase: ReturnType<typeof createBrowserClient>
): Promise<Postcard[]> => {
  const { data, error } = await supabase
    .from("postcards")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toPostcard);
};

export const savePostcard = async (postcard: Postcard): Promise<void> => {
  const supabase = await createBrowserClient();

  const { error } = await supabase.from("postcards").insert({
    id: postcard.id,
    title: postcard.title,
    content: postcard.content,
    avatar_src: postcard.avatarSrc,
    avatar_label: postcard.avatarLabel,
    owner_id: postcard.ownerId,
    owner_name: postcard.ownerName,
  });
  if (error) throw error;
};

export const updatePostcard = async (
  id: string,
  patch: Partial<Postcard>
): Promise<void> => {
  const supabase = await createBrowserClient();

  const { error } = await supabase
    .from("postcards")
    .update({
      ...(patch.title && { title: patch.title }),
      ...(patch.content && { content: patch.content }),
      ...(patch.avatarSrc && { avatar_src: patch.avatarSrc }),
      ...(patch.avatarLabel && { avatar_label: patch.avatarLabel }),
    })
    .eq("id", id);
  if (error) throw error;
};

export const deletePostcard = async (id: string): Promise<void> => {
  const supabase = await createBrowserClient();
  const { error } = await supabase.from("postcards").delete().eq("id", id);
  if (error) throw error;
};

export const generateId = (): string =>
  `postcard-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

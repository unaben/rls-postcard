import type { Postcard } from "@/components/PostcardCard/PostcardCard.types";
import { Dispatch, SetStateAction } from "react";

export const handleSaveEdit = async (
  patch: Partial<Postcard>,
  setSaving: Dispatch<SetStateAction<boolean>>,
  onUpdate: (id: string, patch: Partial<Postcard>) => void,
  postcard: Postcard,
  setShowEdit: Dispatch<SetStateAction<boolean>>
) => {
  setSaving(true);
  await onUpdate(postcard.id, patch);
  setSaving(false);
  setShowEdit(false);
};

import { Postcard } from "@/components/PostcardCard/PostcardCard.types";
import { Dispatch, SetStateAction } from "react";

export const handleConfirmDelete = async (
  onDelete: (id: string) => void,
  setShowDelete: Dispatch<SetStateAction<boolean>>,
  setDeleting: Dispatch<SetStateAction<boolean>>,
  postcard: Postcard
) => {
  setDeleting(true);
  await onDelete(postcard.id);
  setDeleting(false);
  setShowDelete(false);
};

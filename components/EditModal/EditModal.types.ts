import { Postcard } from "@/components/PostcardCard/PostcardCard.types";

export interface EditModalProps {
  postcard: Postcard;
  onSave: (patch: Partial<Postcard>) => void;
  onClose: () => void;
  loading?: boolean;
}

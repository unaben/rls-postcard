export interface Postcard {
  id: string;
  title: string;
  content: string;
  avatarSrc: string;
  avatarLabel: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface PostcardCardProps {
  postcard: Postcard;
  index: number;
  isOwner: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Postcard>) => void;
}

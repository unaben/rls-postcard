export interface Avatar {
  id: string;
  src: string;
  label: string;
}

export interface AvatarPickerProps {
  selected: string;
  onChange: (avatarId: string) => void;
}

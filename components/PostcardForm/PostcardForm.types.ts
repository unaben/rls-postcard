export interface PostcardFormValues {
  title: string;
  content: string;
  avatarId: string;
}

export interface PostcardFormProps {
  onSubmit: (values: PostcardFormValues) => Promise<void>;
  loading: boolean;
}

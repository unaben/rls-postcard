export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSuccess: () => void;
}

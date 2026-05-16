export const AVATARS = [
  {
    id: "avatar-1",
    src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
    label: "Felix",
  },
  {
    id: "avatar-2",
    src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
    label: "Aneka",
  },
  {
    id: "avatar-3",
    src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
    label: "Milo",
  },
  {
    id: "avatar-4",
    src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna",
    label: "Luna",
  },
  {
    id: "avatar-5",
    src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper",
    label: "Jasper",
  },
  {
    id: "avatar-6",
    src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zara",
    label: "Zara",
  },
];

export interface MockUser {
  userId: string;
  email: string;
  password: string;
  displayName: string;
}

export const MOCK_USERS: Array<MockUser> = [
  {
    userId: "user-alice",
    email: "alice@postcards.com",
    password: "Alice@1234!",
    displayName: "Alice",
  },
  {
    userId: "user-bob",
    email: "bob@postcards.com",
    password: "Bob@1234!",
    displayName: "Bob",
  },
  {
    userId: "user-cara",
    email: "cara@postcards.com",
    password: "Cara@1234!",
    displayName: "Cara",
  },
];

export const CARDS_PER_PAGE = 3;

export const MAX_CREATE_CARD_PER_USER = 5

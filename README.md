# Postcard app

A simple side project I built to learn supabase with next.js. Its a digital postcard thing where you can create cards, pick an avatar and share them. Other users can see your cards but cant edit or delete them.

---

## What it does

- login with email/password (supabase auth)
- create a postcard — pick an avatar, write a title and message
- all postcards show up in a shared list, paginated (3 per page)
- you can edit or delete your own cards, everyone elses are read only
- navbar shows a greeting based on time of day eg "good morning Bob"
- realtime updates — if someone else creates a card it shows up without refreshing

---

## Stack

- next.js 15 (app router)
- typescript
- css modules + classnames
- supabase (auth + postgres)
- dicebear for avatars

---

## Getting started

you'll need node 18+ and a supabase project set up first.

```bash
npm install
npm run dev
```

create a `.env.local` in the root:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database setup

run this in the supabase sql editor:

```sql
create table public.postcards (
  id           text        primary key,
  title        text        not null,
  content      text        not null,
  avatar_src   text        not null,
  avatar_label text        not null,
  owner_id     uuid        not null references auth.users(id) on delete cascade,
  owner_name   text        not null default '',
  created_at   timestamptz not null default now()
);

alter table public.postcards enable row level security;

create policy "authenticated users can read all postcards"
  on public.postcards for select to authenticated using (true);

create policy "users can insert their own postcards"
  on public.postcards for insert to authenticated
  with check (auth.uid() = owner_id);

create policy "users can update their own postcards"
  on public.postcards for update to authenticated
  using (auth.uid() = owner_id);

create policy "users can delete their own postcards"
  on public.postcards for delete to authenticated
  using (auth.uid() = owner_id);
```

ownership is enforced at the database level through RLS so even if someone messes with the client they cant touch another users rows.

### creating users

go to authentication → users in supabase dashboard and add users manually, or use the sql editor:

```sql
update auth.users
set encrypted_password = crypt('yourpassword', gen_salt('bf'))
where email = 'user@example.com';
```

if you want the greeting to show a proper name instead of the email prefix, set display_name in user metadata:

```sql
update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"display_name": "Alice"}'
where email = 'alice@example.com';
```

---

## Project structure

```
├── app/
│   ├── page.tsx              # login page
│   ├── create/page.tsx       # create a postcard
│   └── postcards/page.tsx    # view all postcards
│
├── components/
│   ├── AvatarPicker/
│   ├── ConfirmDialog/
│   ├── EditModal/
│   │   ├── utils/            # component-level helpers
│   │   ├── EditModal.tsx
│   │   ├── EditModal.types.ts
│   │   └── EditModal.module.css
│   ├── Loader/
│   ├── LoginForm/
│   │   ├── utils/
│   │   │   ├── handleSubmit.ts
│   │   │   └── validateLoginForm.ts
│   │   ├── LoginForm.tsx
│   │   ├── LoginForm.types.ts
│   │   └── LoginForm.module.css
│   ├── Navbar/
│   ├── Pagination/
│   ├── PostcardCard/
│   └── PostcardForm/
│       ├── utils/
│       │   ├── handleConfirmDelete.ts
│       │   ├── handleSaveEdit.ts
│       │   ├── handleSubmit.ts
│       │   ├── index.ts
│       │   └── validatePostcardForm.ts
│       ├── PostcardForm.tsx
│       ├── PostcardForm.types.ts
│       └── PostcardForm.module.css
│
├── hooks/
│   ├── useAuth.ts            # session state from supabase
│   ├── usePostcards.ts       # fetch, delete, update + realtime
│   └── useGreeting.ts        # time based greeting
│
├── lib/supabase/
│   ├── client.ts             # browser client
│   ├── server.ts             # server client
│   ├── updateSession.ts      # middleware session refresh
│   └── index.ts              # re-exports
│
├── utils/
│   └── auth.ts               # signIn signOut wrappers
│
├── types/
│   └── database.types.ts     # auto generated from supabase
│
└── middleware.ts             # session refresh on every request
```

---

## Regenerating db types

if you change the schema run this to update the types:

```bash
npm run generate:types
```

that runs `supabase gen types typescript --project-id <your-id>` and writes to `types/database.types.ts`. the project id is set in package.json already, just make sure you're logged in to the supabase cli first.

---

## A few things worth knowing

**the middleware** — `updateSession.ts` refreshes the supabase session on every request so tokens don't go stale. its needed for SSR to work properly with auth.

**ownership** — each postcard stores the `owner_id` of whoever created it. the `isOwner` prop on PostcardCard controls whether the edit/delete buttons render. its not just hidden, they literally don't get rendered for cards you don't own.

**realtime** — `usePostcards` subscribes to postgres changes on the postcards table. any insert, update or delete triggers a reload. you can test this by opening two browser tabs and creating a card in one.

**the greeting** — pulls display_name from supabase user metadata, falls back to the bit before @ in the email if theres nothing set. recalculates every minute in case someone leaves the tab open across a time boundary.

**avatars** — using dicebear adventurer style via their public API. the urls are just constructed from a seed string so no api key needed. next.js image optimisation is configured to allow the dicebear domain.

---

## known issues / todo

- no email verification set up, users are created with confirmed status manually
- error handling on the postcards page is basic, if the supabase fetch fails it just shows empty state
- mobile layout could use some work on the card list
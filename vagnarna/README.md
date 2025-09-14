# Vagnarna.se

Webbaserat bokningssystem för litteraturvagnar.

## Teknisk stack
- Next.js (App Router), TypeScript
- Tailwind CSS + shadcn/ui
- Firebase Firestore (Admin SDK) via server actions

## Kom igång
1. Kopiera `.env.example` till `.env.local` och fyll i värden:

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
ADMIN_SESSION_SECRET=byt-till-en-stark-hemlighet
```

2. Installera beroenden:

```
npm install
```

3. Kör utvecklingsservern:

```
npm run dev
```

## Struktur
- `src/lib/firebase-admin.ts`: Lazy init av Firebase Admin och Firestore
- `src/lib/actions.ts`: Server actions (publik och admin)
- `src/lib/session.ts`: Admin-sessioner med JWT-kaka
- `dataconnect/schema/schema.gql`: Datamodeller för Data Connect
- `src/app`: App-sidor (offentligt och admin)

## Nästa steg
- Implementera CRUD för platser, vagnar, schema och evenemang
- Koppla bokningsflödet till Firestore med regler för tillgänglighet
- Lägg till i18n vid behov
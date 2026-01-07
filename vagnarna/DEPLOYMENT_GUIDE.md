# Deployment Guide - Vagnarna.se

## ⚠️ VIKTIGT: Läs detta innan du deployar

Detta dokument beskriver exakt hur systemet ska deployas för att fungera korrekt.

## 🎯 Fungerande Konfiguration

### 1. Firebase Hosting (`firebase.json`)

**FUNGERANDE KONFIGURATION:**
```json
{
  "hosting": {
    "source": ".",
    "frameworksBackend": {
      "region": "europe-west1"
    }
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

**VAD DETTA BETYDER:**
- `source: "."` = Firebase använder Next.js Framework Support
- `frameworksBackend` = Kör Next.js som server-side rendering (SSR)
- **INTE** `public: "out"` = Detta skulle göra det statiskt och bryta Server Actions

### 2. Next.js Config (`next.config.mjs`)

**FUNGERANDE KONFIGURATION:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
```

**VIKTIGT:**
- **INTE** `output: "export"` = Detta skulle göra det statiskt och bryta Server Actions
- Next.js körs som SSR (Server-Side Rendering) via Firebase Frameworks

### 3. Versionshantering

**FUNGERANDE VERSIONER:**
- Next.js: `^14.2.18` (INTE version 16 - har breaking changes)
- React: `^18.3.1` (INTE version 19 - har breaking changes)
- React-DOM: `^18.3.1`

**VARFÖR:**
- Next.js 16 ändrade hur `cookies().set()` fungerar
- Next.js 16 ändrade hur `middleware.ts` exporteras
- Dessa ändringar kräver kodändringar som inte är gjorda än

### 4. Middleware (`middleware.ts`)

**FUNGERANDE STRUKTUR:**
```typescript
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // ... auth logic
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**VIKTIGT:**
- Exportera `middleware` och `config` direkt från filen
- INTE re-exportera från `src/middleware`

## 📋 Deployment Checklist

Innan du deployar, kontrollera:

- [ ] `firebase.json` har `source: "."` och `frameworksBackend`
- [ ] `next.config.mjs` har INTE `output: "export"`
- [ ] `package.json` har Next.js 14.2.18 (INTE 16)
- [ ] `package.json` har React 18.3.1 (INTE 19)
- [ ] `middleware.ts` exporterar direkt (INTE re-exporter)
- [ ] Alla Server Actions finns i `src/lib/actions.ts`
- [ ] `.env.local` är korrekt konfigurerad

## 🚀 Deployment Process

### Steg 1: Verifiera konfiguration
```bash
cd /Users/imac/vagnarna-se/vagnarna
cat firebase.json
cat next.config.mjs
cat package.json | grep -A 3 '"next"'
```

### Steg 2: Installera beroenden
```bash
npm install
```

### Steg 3: Bygg projektet
```bash
npm run build
```

**FÖRVÄNTAT RESULTAT:**
- Inga fel
- Inga varningar om Server Actions
- Build lyckas

### Steg 4: Deploya
```bash
firebase deploy --only hosting
```

## 🔄 Rollback Process

Om något går fel:

### Via Firebase Console:
1. Gå till https://console.firebase.google.com/
2. Välj projekt: `cartconnect-3wduw`
3. Gå till **Hosting** → **Releasehistorik**
4. Hitta en fungerande version (före problemet)
5. Klicka på tre prickar (⋯) → **Återställ**

### Via Git:
```bash
cd /Users/imac/vagnarna-se/vagnarna
git log --oneline -10  # Hitta fungerande commit
git checkout <commit-hash>
npm install
npm run build
firebase deploy --only hosting
```

## 📦 Backup Strategy

### Fungerande Versioner:
- **`live-source-correct/`** - Den senaste fungerande versionen
- **`restore-original` branch** - Git branch med fungerande kod
- **Firebase Hosting Preview Channel** - Backup i Firebase

### Skapa ny backup:
```bash
cd /Users/imac/vagnarna-se
cp -r vagnarna live-backup-$(date +%Y%m%d)
```

## ⚠️ VANLIGA MISSTAG

### ❌ FEL 1: Statisk export
```json
// firebase.json - FEL
{
  "hosting": {
    "public": "out"
  }
}
```
**PROBLEM:** Server Actions fungerar inte med statisk export

### ❌ FEL 2: Next.js 16
```json
// package.json - FEL
"next": "^16.1.1"
```
**PROBLEM:** Breaking changes i cookies och middleware

### ❌ FEL 3: Output export
```javascript
// next.config.mjs - FEL
const nextConfig = {
  output: "export"
};
```
**PROBLEM:** Gör appen statisk, bryter Server Actions

## 🆘 När något går fel

1. **STOPPA** - Deploya inte fler gånger
2. **ROLLBACK** - Återställ till fungerande version
3. **ANALYSERA** - Jämför med fungerande konfiguration
4. **TESTA LOKALT** - `npm run dev` innan deployment
5. **DEPLOYA FÖRSIKTIGT** - En ändring i taget

## 📝 Uppdateringar

När du vill uppdatera Next.js/React:
1. Testa i separat branch
2. Uppdatera `middleware.ts` för Next.js 16
3. Uppdatera `src/lib/session.ts` för nya cookies API
4. Testa lokalt
5. Testa i preview channel
6. Deploya till live

---

**Senast uppdaterad:** 2025-01-07
**Fungerande version:** Next.js 14.2.18, React 18.3.1
**Firebase Hosting:** Frameworks Backend (SSR)


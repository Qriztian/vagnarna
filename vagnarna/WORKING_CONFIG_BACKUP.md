# Fungerande Konfiguration - Backup

Detta är en exakt kopia av den fungerande konfigurationen från när systemet fungerade korrekt.

## firebase.json (FUNGERANDE)
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

## next.config.mjs (FUNGERANDE)
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

## package.json - Dependencies (FUNGERANDE)
```json
{
  "dependencies": {
    "next": "^14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "firebase-admin": "^13.6.0"
  }
}
```

## middleware.ts (FUNGERANDE)
```typescript
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthFree = req.nextUrl.pathname === "/admin/login" || req.nextUrl.pathname === "/admin/setup";
  if (!isAdminRoute || isAuthFree) return NextResponse.next();

  const hasSession = Boolean(req.cookies.get("admin_session")?.value);
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

## Viktiga punkter:

1. **INTE** `output: "export"` i next.config.mjs
2. **INTE** `public: "out"` i firebase.json
3. **INTE** Next.js 16 eller React 19
4. **JA** `source: "."` med `frameworksBackend` i firebase.json
5. **JA** SSR (Server-Side Rendering) via Firebase Frameworks

## Deployment-kommando:
```bash
npm install
npm run build
firebase deploy --only hosting
```

## Rollback-kommando (om något går fel):
```bash
# Via Firebase Console:
# Hosting → Releasehistorik → Återställ

# Via Git:
git checkout restore-original
npm install
npm run build
firebase deploy --only hosting
```


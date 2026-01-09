# 🔐 Sätt Secrets för Firebase App Hosting

## Steg 1: Hämta värden från .env.local

Öppna din `.env.local`-fil och kopiera värdena för:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_SESSION_SECRET`

## Steg 2: Sätt secrets via Firebase CLI

Kör dessa kommandon (ersätt värdena med dina från `.env.local`):

```bash
cd /Users/imac/vagnarna-se/cartwitness

# Sätt FIREBASE_PROJECT_ID (interaktivt - klistra in värdet när du blir ombedd)
echo "cartwitness-627ad" | firebase apphosting:secrets:set FIREBASE_PROJECT_ID --data-file=-

# Sätt FIREBASE_CLIENT_EMAIL (klistra in din service account email)
echo "firebase-adminsdk-xxxxx@cartwitness-627ad.iam.gserviceaccount.com" | firebase apphosting:secrets:set FIREBASE_CLIENT_EMAIL --data-file=-

# Sätt FIREBASE_PRIVATE_KEY (klistra in hela private key med \n)
# VIKTIGT: Behåll \n som de är, kopiera hela private_key från .env.local
echo "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n" | firebase apphosting:secrets:set FIREBASE_PRIVATE_KEY --data-file=-

# Sätt ADMIN_SESSION_SECRET
echo "din-session-secret-här" | firebase apphosting:secrets:set ADMIN_SESSION_SECRET --data-file=-
```

## Alternativ: Sätt secrets interaktivt (enklare)

Om ovanstående inte fungerar, använd interaktivt läge:

```bash
# För varje secret, kör:
firebase apphosting:secrets:set FIREBASE_PROJECT_ID
# CLI kommer att be dig ange värdet - klistra in och tryck Enter

firebase apphosting:secrets:set FIREBASE_CLIENT_EMAIL
firebase apphosting:secrets:set FIREBASE_PRIVATE_KEY
firebase apphosting:secrets:set ADMIN_SESSION_SECRET
```

## Steg 3: Ge backend åtkomst till secrets

Efter att secrets är skapade, ge backend "vagnarna" åtkomst:

```bash
firebase apphosting:secrets:grantaccess \
  --backend vagnarna \
  FIREBASE_PROJECT_ID \
  FIREBASE_CLIENT_EMAIL \
  FIREBASE_PRIVATE_KEY \
  ADMIN_SESSION_SECRET
```

**ELLER** använd `--force`-flaggan när du sätter secrets (automatiskt ger åtkomst):

```bash
firebase apphosting:secrets:set FIREBASE_PROJECT_ID --force
# ... osv för alla secrets
```

## Steg 4: Verifiera

Efter att secrets är satta och `apphosting.yaml` är uppdaterad:
1. Pusha ändringar till GitHub
2. Firebase kommer automatiskt att deploya en ny version
3. Kontrollera att appen fungerar på: https://vagnarna--cartwitness-627ad.europe-west4.hosted.app

## Felsökning

### Om secrets inte hittas:
- Kontrollera att secrets är skapade: Gå till Google Cloud Console → Secret Manager
- Kontrollera att backend har åtkomst till secrets

### Om deployment misslyckas:
- Kontrollera build-loggarna i Firebase Console
- Verifiera att alla secrets är korrekt formaterade


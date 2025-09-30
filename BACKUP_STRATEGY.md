# Backup-strategi för Vagnarna-projektet

## 📋 Automatiska backups

### 1. Git-baserade backups
- **Dagliga commits** till GitHub
- **Branch-strategi**: `main` (production), `develop` (utveckling), `backup-YYYY-MM-DD` (dagliga backups)
- **Taggar** för viktiga releases

### 2. Databas-backups
- **Firebase Firestore**: Automatiska dagliga backups
- **Lokal backup**: Exportera data regelbundet

### 3. Miljövariabler
- **Säker lagring**: Använd Vercel/Netlify miljövariabler
- **Backup**: Dokumentera alla nödvändiga variabler

## 🔄 Deployment-strategi

### 1. Vercel (Rekommenderat)
- **Automatisk deployment** från GitHub
- **Preview deployments** för varje branch
- **Rollback-möjligheter**

### 2. Backup-deployment
- **Netlify** som sekundär deployment
- **SSH-server** som tredje alternativ

## 📝 Backup-checklista

### Dagligen:
- [ ] Commit och push till GitHub
- [ ] Kontrollera att Firebase-backups körs
- [ ] Verifiera att deployment fungerar

### Veckovis:
- [ ] Skapa backup-branch med datum
- [ ] Exportera Firebase-data
- [ ] Testa rollback-procedurer

### Månadsvis:
- [ ] Granska backup-strategi
- [ ] Uppdatera dokumentation
- [ ] Testa disaster recovery

## 🚨 Nödsituationer

### Om GitHub går ner:
1. Använd lokal git-repository
2. Deploya direkt från lokal kod
3. Använd backup-deployment (Netlify/SSH)

### Om Firebase går ner:
1. Använd lokal databas (SQLite/JSON)
2. Aktivera offline-läge
3. Synka när Firebase är tillbaka

## 📞 Kontaktinformation
- **GitHub**: https://github.com/Qriztian/vagnarna
- **Vercel**: [Kommer att länkas efter setup]
- **Firebase**: [Projekt-ID kommer här]

# CerviHealthCo App

**A bilingual (English and Yoruba) cervical screening education app built for a research study.**

Live: [cervicoapp.vercel.app](https://cervicoapp.vercel.app)

Cervical cancer is largely preventable through screening, but uptake stays low where women have little information about it. This app takes study participants through consent, a baseline questionnaire, short learning modules, an endline questionnaire and planning a screening appointment, and reminds them by push notification along the way. It collects the study data the research team needs to measure change in knowledge.

> **Research use.** The app supports an ethics-approved study. It gives health education, not diagnosis or medical advice.

## What it does

- **Consent first:** a translated consent screen with the researcher's contact details and the study's ethics approval number, shown before any data is collected.
- **Private sign-in:** participants use a PIN instead of a password, with private one-time recovery codes for a forgotten PIN (no SMS or email needed).
- **Questionnaires with gates:** the 36-item study instrument is split into stages. The baseline (Sections A–C) unlocks the learning modules, and an endline questionnaire follows them. Each stage is timestamped.
- **Knowledge scoring:** Section B (12 items) is scored 0–12 using the researchers' rules. Each item's point and the scoring version are stored with the answers, so earlier submissions can be rescored.
- **Learning library:** illustrated slides with read-aloud narration (speech synthesis) and videos, in English and Yoruba.
- **Screening plans and reminders:** participants plan a screening appointment and can subscribe to web push reminders, sent daily by a scheduled job.
- **Accessibility:** responsive, mobile-first layouts and accessibility fixes across the app.

## Tech stack

| Layer | Choice |
| --- | --- |
| Front end | React, TypeScript, Vite, Tailwind CSS, Radix UI and MUI components |
| Back end | Supabase Edge Function (Deno) in `supabase/functions/server`, with a key-value store |
| Notifications | Web Push (VAPID) with a daily reminder run at 09:00 Africa/Lagos |
| Hosting | Vercel (front end), Supabase (function and data) |

The interface was designed in Figma first ([design file](https://www.figma.com/design/KadeJHif4gp8hPR7YEczEk/Cervical-Screening-App)). `ATTRIBUTIONS.md` lists third-party assets.

## Running it locally

```bash
npm install
cp .env.example .env    # add VITE_VAPID_PUBLIC_KEY to test push notifications
npm run dev             # http://localhost:5175
```

Push notifications need HTTPS, even locally. To test them on your machine or phone, create local certificates with [mkcert](https://github.com/FiloSottile/mkcert) in the project folder:

```bash
mkcert localhost 127.0.0.1 ::1
```

The dev server picks up `localhost+2.pem` and `localhost+2-key.pem` automatically and switches to HTTPS. These files are ignored by git and must never be committed.

## Deployment

1. Set the server secrets listed in `docs/server-secrets.example` (VAPID keys, reminder token) in Supabase, and the matching `VITE_VAPID_PUBLIC_KEY` for the front-end build.
2. Deploy the Supabase function and the front end together. A front-end-only deployment does not update the function.
3. Schedule a daily `POST` to the function's `/reminders/run` route at 09:00 Africa/Lagos, using the secret bearer token.

See `docs/release-status.txt` for the current release notes.

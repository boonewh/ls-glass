# Lone Star Glass & Shower

Next.js16 / React19 marketing website for Odessa, Texas and Bartlesville, Oklahoma.
The contact API sends quote requests through the existing Resend sender/mailbox.

## Local development

Use Node24.22.1 (or a newer patched24.x) and npm11.17.0:

```sh
npm ci
npm run dev
```

The production key is not required for builds or tests. For real local email
delivery, copy the blank `.env.example` to `.env.local` and supply your own
`RESEND_API_KEY`. A real key/normal provider URL makes submissions real inquiries.
Never commit keys, request data or local environment files.

## Maintenance checks

```sh
npm audit
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run check:upgrade
```

The upgrade check starts its own loopback app/mock Resend servers and uses only
a synthetic key. Both-location email sends/errors and desktop/mobile quote flows
exercise the real API/SDK without delivering email. Google Maps is stubbed;
declared public Font Awesome/decorative assets may be downloaded. The helper also
runs the existing seven-page/image/metadata checks. Screenshots/results are ignored
under `test-results/`. It uses an existing production build and stops its servers.

The shared service definitions include the old homepage aliases. Keep service
page prefills, dropdown values and backend validation consistent. Contact field
limits are shared between client and server; untrusted text is escaped in emails.

GitHub main automatically deploys the existing Vercel site. Use a maintenance PR,
show tested results and obtain release authorization before merging/deploying.
See [October maintenance notes](docs/SECURITY-MAINTENANCE-2026-10.md).

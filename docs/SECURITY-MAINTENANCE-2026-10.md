# October2026 maintenance

Base main5e10108. Upgrade Next16.1.6→16.4.3, React/DOM19.2.4→19.3.1,
Resend6.9.2→6.36.0, PostCSS8.5.6→8.5.32 and affected compatible transitives.
Sharp is at least0.35.5; source-map-js1.2.2 and selector-parser6.1.5 are patched.
Retain TypeScript5.9.3/Tailwind3.4.19; remove unused Lucide rather than migrate
an unused icon API. Pin Node24.22.1/npm11.17.0 and matching Node/React types.

The original lint command/configuration were broken. ESLint10.14.0 now uses Next's
modern core-web-vitals and TypeScript flat exports. Some plugin peer annotations
lag behind10; normal npm resolution emits peer warnings, as described by Next.
No force/legacy-peer flags are used. The existing bitmap-only img exception is
scoped to the ImageResponse route in flat config, avoiding platform-specific unused
inline-suppression warnings. All other rules remain active. Mechanical JSX
entity escapes preserve displayed copy; unused dead code is removed.

## Contact correctness and input protection

- One shared service list fixes residential/custom-cut/heavy-equipment dropdown
  prefills. Old Home Windows and Oilfield & Heavy Equipment values still normalize
  correctly. Custom Cut Glass is an explicit option. Form state/proposed service
  stay synchronized without discarding name/phone/details when a proposal changes.
- Both Odessa and Bartlesville remain accepted and keep their existing success
  wording, phone/contact information and fixed Resend sender/recipient.
- The request body is limited to32KiB; name120, phone40 and details5000 characters.
  Matching client limits avoid unexpected oversized submissions. Malformed JSON,
  invalid field types/locations/services, invalid UTF-8 and excess size receive
  controlled JSON errors. Optional details and legacy missing-service callers work.
- Browser writes check the actual Host/protocol against Origin, accounting for
  NextRequest loopback URL normalization. Foreign/null origins and cross-site
  browser requests are rejected. Non-browser requests without Origin remain
  compatible: this check and the honeypot are not durable spam/rate controls.
- User text is HTML-escaped in the email; phone-link digits are restricted to
  digits. User content cannot rewrite the email markup. Require a provider ID
  before reporting success and return the existing generic phone fallback on
  provider errors. Do not log request bodies/keys or enable Resend debug logging.
- No automatic send retry or new database/CAPTCHA/idempotency infrastructure is
  introduced. A manual retry after an uncertain provider outcome may still be a
  duplicate; durable prevention is a separate feature, not claimed here.

## Verification / release

`npm test` covers validation, shared service aliases, body limits, origin handling
and escaping. After `npm run build`, `npm run check:upgrade` uses a loopback Resend
endpoint and synthetic key to exercise real API/SDK success/failure behavior,
sender/recipient/template correctness, once-per-call attempts, all service prefills,
both locations and desktop/mobile validation/pending/success/failure/retry states.
No app test routes or real email delivery are needed. Existing page/image/schema
checks stay intact; generated share image remains static Node output.

The pinned Ubuntu24.04 workflow runs the audit/lint/types/unit/build/browser checks
with Node24.22.1/npm11.17.0. Google font downloads are part of the existing build.
The browser check stubs Google Maps; declared Font Awesome/texture assets are
read-only public downloads. Screenshots/results remain ignored.

Show the tested PR/preview before production. Main merges automatically deploy
Vercel. Preserve project Node24.x, canonical/domain redirects, production key,
email provider and both locations. There is no database integration/migration;
explain any unexpected requirement before action.

Primary guidance: [Next security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026),
[Next ESLint10 support](https://nextjs.org/docs/app/api-reference/config/eslint),
[Resend integration](https://resend.com/docs/send-with-nextjs).

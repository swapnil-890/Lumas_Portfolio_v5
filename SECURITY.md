# Security

## Section 06 — Prototype Archive

Section 06 ("Something Special") ships with a **prototype client-side
authentication gate**. Its purpose is to demonstrate the interaction, not to
protect data.

### What this prototype explicitly is NOT

- Not real authentication
- Not encrypted private storage
- Not a secure vault
- Not a substitute for a server

### Why client-side auth is insufficient

Everything the browser executes is available to the user. Any passphrase,
unlock state, or "private" payload shipped to the client can be read directly
from the bundle, the DOM, or DevTools. A passphrase that unlocks a UI panel is
a demo, not a control.

### Rules followed in this codebase

- No real password is hardcoded as a secret (the demo passphrase `LUMAS` is
  deliberately public and only gates a UI panel).
- No private archive data is stored in the public JavaScript bundle.
- `ArchiveSlot.entry` is `null` for every slot. Nothing invented, nothing
  hidden behind the gate.
- No claims of production security are made anywhere in the UI.

### If real private data is ever added

Do not store it in this repo or in the client bundle. Move
authentication and storage server-side, for example:

1. A server-side endpoint that authenticates the user (session cookie or
   short-lived JWT).
2. Rate-limited login with per-IP and per-account throttling.
3. Archive data stored server-side (database or object storage) behind
   authorization checks.
4. Secrets only in server-side environment variables — never in the client.
5. HTTPS only; secure, HttpOnly, SameSite cookies.
6. Audit logging for reads of private content.

Until that exists, treat Section 06 as decorative.

## Reporting

This is a personal project. Contact the maintainer directly.

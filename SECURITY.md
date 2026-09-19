# Security Architecture & Limitations

## Section 06 — Prototype Passphrase Gate

Section 06 ("Something Special") includes a prototype client-side authentication gate with the demonstration passphrase `REDACTED`.

### Critical Security Boundaries

1. **Client-Side Gate Only**:
   - The passphrase check `REDACTED` is executed entirely in browser JavaScript.
   - The passphrase "REDACTED" is also public by design.
   - Client-side checks are cosmetic interaction demos, NOT a cryptographic control. Anyone inspecting network traffic or source bundles can view client code.

2. **Public Static Asset Serving**:
   - Anything placed within the `/public` directory (such as `/public/images/pfp/` or `/public/images/archive/`) is served as static, unauthenticated assets by any static hosting provider.
   - For this reason, `public/images/archive/*` is intentionally excluded from Git via `.gitignore`.
   - Never place unencrypted sensitive files in `/public`.

3. **Requirements for Production Private Vault**:
   A genuinely secure private archive requires backend infrastructure:
   - **Server-Side Authentication**: Credentials evaluated in a secure server-side runtime.
   - **Secure Password Hashing**: Using Argon2id or bcrypt with per-user salt.
   - **Strict Authorization**: Middleware verifying authenticated identity before serving any record.
   - **Protected Storage**: Private cloud storage buckets (e.g. AWS S3 private, GCS) accessible only via signed short-lived URLs or server proxies.
   - **Secure Session / Token Management**: HttpOnly, SameSite, Secure cookies or short-lived JWTs.
   - **Rate Limiting & Brute-Force Protection**: IP and account-level throttling.
   - **Audit Logging**: Comprehensive access tracking for private resource access.

Until such server-side infrastructure is integrated, treat Section 06 purely as a UI prototype demonstration.

## Contact & Vulnerability Reporting

This is an open-source personal digital identity portfolio maintained by Swapnil Roy (Lumas). For inquiries or security questions, contact `swapnilroymldt@gmail.com`.

## Archive Stories

Section 06 contains authored personal narratives about real
individuals, keyed to the five archive slots. These strings
ship inside the client bundle and are readable by anyone who
inspects the built JavaScript, regardless of the passphrase
gate.

The passphrase "REDACTED" only hides the UI. It does not
encrypt or protect the content.

If a name needs to be withheld, set
FEATURES.secretArchive.displayNames = 'redacted' in
src/config/features.ts. That swaps full names for initials
in the rendered UI. It does NOT remove the full names from
the source data — the redacted and full strings are both
present in the bundle.

To actually remove a name from the shipped output, delete
it from src/data/archiveStories.ts and rebuild.

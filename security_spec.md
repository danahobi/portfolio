# Security Specification: Happy Person Portfolio & Admin System

## 1. Data Invariants
1. **Public Read-Only Access**: Unauthenticated and general public visitors can only read published portfolio content (`projects`, `services`, `pricingPlans`, `testimonials`, `faqs`, `settings`).
2. **Owner Admin Gate**: Only authenticated users whose verified email matches the verified site owner (`danahobi20@gmail.com`) or registered in `/admins/{uid}` can create, update, or delete any content.
3. **Hidden Project Protection**: Public queries can only list projects where `hidden == false` (or not hidden). Admin can view all including draft/hidden projects.
4. **ID Poisoning Protection**: All document IDs must adhere to `^[a-zA-Z0-9_\-]+$` and have length <= 128 characters.
5. **No Shadow Updates**: Document updates cannot inject arbitrary keys or bypass schema types and size constraints.
6. **Strict String Boundaries**: All text fields must have bounded string lengths to protect against Denial of Wallet and storage bloat attacks.
7. **Admins Document Immutability**: Normal users cannot self-assign admin roles or write to `/admins/{uid}`.

## 2. The "Dirty Dozen" Malicious Payloads

1. **Payload 1 (Unauthenticated Project Create)**:
   - Target: `POST /projects/hacked-project`
   - Auth: `null`
   - Content: `{ "id": "hacked", "title": "Injected Title", "category": "Business Website", "description": "Hacked", "thumbnail": "...", "liveDemoUrl": "..." }`
   - Expected: `PERMISSION_DENIED`

2. **Payload 2 (Unverified Email Admin Spoofing)**:
   - Target: `POST /projects/spoofed-project`
   - Auth: `{ uid: "attacker123", token: { email: "danahobi20@gmail.com", email_verified: false } }`
   - Expected: `PERMISSION_DENIED` (Email must be verified)

3. **Payload 3 (Wrong User Admin Escalation)**:
   - Target: `POST /projects/unauthorized-project`
   - Auth: `{ uid: "random_user", token: { email: "evil@example.com", email_verified: true } }`
   - Expected: `PERMISSION_DENIED`

4. **Payload 4 (Self-Promote to Admin)**:
   - Target: `POST /admins/attacker123`
   - Auth: `{ uid: "attacker123", token: { email: "evil@example.com", email_verified: true } }`
   - Content: `{ "userId": "attacker123", "email": "evil@example.com", "role": "superadmin" }`
   - Expected: `PERMISSION_DENIED`

5. **Payload 5 (Shadow Update / Ghost Field Injection)**:
   - Target: `UPDATE /projects/brightsmile-dental`
   - Auth: `{ uid: "owner", token: { email: "danahobi20@gmail.com", email_verified: true } }`
   - Content: `{ "shadowSuperuser": true, "maliciousEval": "<script>alert(1)</script>" }`
   - Expected: `PERMISSION_DENIED` (Strict schema validator rejects unknown keys)

6. **Payload 6 (Oversized Title Denial of Wallet)**:
   - Target: `UPDATE /projects/brightsmile-dental`
   - Auth: `{ uid: "owner", token: { email: "danahobi20@gmail.com", email_verified: true } }`
   - Content: `{ "title": "A".repeat(1000) }`
   - Expected: `PERMISSION_DENIED` (Title maxLength is 150)

7. **Payload 7 (Path Traversal / Junk Document ID)**:
   - Target: `GET /projects/../../root`
   - Auth: `null`
   - Expected: `PERMISSION_DENIED` or Invalid Path

8. **Payload 8 (Delete Project as Non-Admin)**:
   - Target: `DELETE /projects/brightsmile-dental`
   - Auth: `{ uid: "guest_123", token: { email: "guest@example.com", email_verified: true } }`
   - Expected: `PERMISSION_DENIED`

9. **Payload 9 (Delete Services Catalog as Visitor)**:
   - Target: `DELETE /services/web-design`
   - Auth: `null`
   - Expected: `PERMISSION_DENIED`

10. **Payload 10 (Direct Modification of Settings Profile by Public)**:
    - Target: `UPDATE /settings/profile`
    - Auth: `null`
    - Content: `{ "brandName": "Defaced Studio" }`
    - Expected: `PERMISSION_DENIED`

11. **Payload 11 (Type Poisoning on Numeric Rating)**:
    - Target: `UPDATE /testimonials/review-1`
    - Auth: `{ uid: "owner", token: { email: "danahobi20@gmail.com", email_verified: true } }`
    - Content: `{ "rating": "FIVE_STARS_STRING_POISON" }`
    - Expected: `PERMISSION_DENIED` (rating must be number between 1 and 5)

12. **Payload 12 (Corrupt FAQ Document Injection)**:
    - Target: `POST /faqs/corrupted-item`
    - Auth: `null`
    - Content: `{ "question": "Hacked?", "answer": 12345 }`
    - Expected: `PERMISSION_DENIED`

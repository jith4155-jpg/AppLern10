# Security Specification

## Data Invariants
- Only users listed in the `admins` collection can modify `settings/app-config`.
- `settings/app-config` is publicly readable (for the landing page).
- `admins` collection is only readable by the admin themselves.

## The Dirty Dozen Payloads
1. Attempt to update `settings/app-config` as an unauthenticated user. (FAIL)
2. Attempt to update `settings/app-config` as an authenticated non-admin user. (FAIL)
3. Attempt to set `coursePrice` to a negative number. (FAIL)
4. Attempt to add a "Ghost Field" to `AppSettings`. (FAIL)
5. Attempt to delete `settings/app-config`. (FAIL)
6. Attempt to read `admins/other-user-uid` as a non-admin. (FAIL)
7. Attempt to update `admins/my-uid` to change role to `super-admin`. (FAIL)
8. Attempt to update `settings/app-config` with a 1MB string in `payeeName`. (FAIL)
9. Attempt to update `settings/app-config` without a `payeeName`. (FAIL)
10. Attempt to spoof admin status by setting a field in a user profile (not used, but guarded). (FAIL)
11. Attempt to update `settings/app-config` with a client-side timestamp instead of `request.time`. (FAIL)
12. Attempt to write to a collection not defined in the blueprint. (FAIL)

## Test Runner
(Tests will be implemented if requested, focusing on rules generation now).

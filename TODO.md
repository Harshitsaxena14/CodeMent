# TODO - Mongoose buffering timeout fix

## Plan

- [ ] Inspect remaining backend files for import/path case issues and duplicate mongoose connections.
- [ ] Update `backend/server.js` to start Express only after `await mongoose.connect()` succeeds.
- [ ] Update `backend/config/db.js` (or remove usage) so only one connection is created.
- [ ] Fix all incorrect import paths/casing (`authRoutes` vs `authroutes`, `authController` vs `authcontroller`, `progressController` vs `progresscontroller`, `user` model ref casing).
- [ ] Ensure `User` and `Progress` models reference the same mongoose instance (no new connections in model files).
- [ ] Disable buffering only if needed (optional safety).
- [ ] Remove debug logging that depends on connection readiness.
- [ ] Run backend dev server and verify no buffering timeout.

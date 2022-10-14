import { Router } from "express";

import { login } from "@controllers/auth";

const router = Router();

router.get("/login", login);

export default router;

// res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// res.send(JSON.stringify(req.oidc.user));

import { Router } from "express";
import { validateUrl } from "../middleware/validateUrl.js";
import { validateUser } from "../middleware/validateUser.js";
import { createShortUrl, redirectUrl, getUrls } from "../controllers/urlController.js";

const router = Router();

router.post("/url", validateUser, validateUrl, createShortUrl);
router.get("/urls", validateUser, getUrls);
router.get("/url/:shortCode", redirectUrl);

export default router;
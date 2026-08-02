import { Router } from "express";
import { validateUrl } from "../middleware/validateUrl.js";
import { createShortUrl, redirectUrl } from "../controllers/urlController.js";

const router = Router();

router.post("/url", validateUrl, createShortUrl);
router.get("/:shortCode",redirectUrl);

export default router;
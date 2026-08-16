import { Router } from "express";
import { userRegister, userLogin } from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin)
// router.get('/urls')

export default router;
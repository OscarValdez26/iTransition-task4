import { Router } from "express";
import {login,register,logout,admin,adminGet,verifyToken, updateLogin} from '../controllers/auth.controller.js';
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/api/register',validateSchema(registerSchema),register);
router.post('/api/login',validateSchema(loginSchema),login);
router.post('/api/logout',logout);
router.post('/api/admin', authRequired, admin);
router.post('/api/updateLog', authRequired, updateLogin);
router.get('/api/admin', authRequired, adminGet);
router.get('/api/verify', verifyToken);

export default router;
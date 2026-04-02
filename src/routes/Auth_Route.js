import express from "express";
import { login, register , logout} from "../controller/Auth_controller.js";
import {LoginSchema, RegisterSchema} from "../validator/authVlidator.js";
import { validateRequestBody } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register",validateRequestBody(RegisterSchema), register);
router.post("/login", validateRequestBody(LoginSchema), login);
router.get("/logout", logout);
export default router;
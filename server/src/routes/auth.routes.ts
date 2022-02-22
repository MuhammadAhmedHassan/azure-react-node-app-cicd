import { Router } from "express";
import { login, register, getCurrentUser, logout } from "../controllers/auth.controllers";
import { currentUser } from "../middlewares/current-user";
import { validateRequest } from "../middlewares/validate-request";
import { loginRules, registerRules } from "../request-validators/auth.request-validator";

export const router = Router();

router.post("/users/register", registerRules, validateRequest, register);
router.post("/users/login", loginRules, validateRequest, login);
router.get("/users/current-user", currentUser, getCurrentUser);
router.post("/users/logout", logout);

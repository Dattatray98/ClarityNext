import { Router } from "express";
import { UserSignUP, UserLogin, UserMe } from "../Controllers/UserAuth.Controller";


const router = Router();

router.post("/signup", UserSignUP);
router.post("/login", UserLogin);
router.get("/users/me", UserMe)

export default router
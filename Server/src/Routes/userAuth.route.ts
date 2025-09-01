import { Router } from "express";
import { UserSignUP, UserLogin, UserMe } from "../Controllers/UserAuth.Controller";


const router = Router();

router.post("/signup", UserSignUP);
router.post("/login", UserLogin);
router.get("/users/me", UserMe

)
router.get("/test", (req, res)=>{
    res.send("hello signup/login server is running")
})

export default router
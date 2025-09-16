import { Router,Request, Response } from "express";
import { createUserInfo, GetUserInfo } from "../Controllers/userInfo.Controller";

const router = Router();
router.post("/userinfo", createUserInfo);
router.get("/getuserinfo", GetUserInfo);
router.get("/test",(req:Request, res:Response)=>{
    res.send("server is running")
});




export default router;

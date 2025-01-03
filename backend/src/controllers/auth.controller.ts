import * as crypto from 'crypto';
import type { NextFunction, Request, Response } from "express";
import User from "../models/user";
import OTP from "../models/otp";

interface ReqParams {}

interface ReqBody {}

interface ResBody {
    email: string;
}

interface ReqQuery {
    email: string;
}

export const checkEmail = async (
    req: Request<ReqParams, ReqBody, ResBody, ReqQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.query;

        const userData = await User.findOne({ email: email });
        
        let otp: string = crypto.randomInt(1001, 9999).toString() ;
        let result = await OTP.findOne({ otp: otp });
        while(result) {
            otp = crypto.randomInt(1001, 9999).toString() ;
            await OTP.findOne({ otp: otp });
        }
        
        await OTP.create({ email: email, otp: otp});
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
            newUser: !Boolean(userData)
          });
    } catch (error) {
        return next(error);
    }
};

export const otpVerification = async (
    req: Request<ReqParams, ReqBody, ResBody, ReqQuery>,
    res: Response
) => {
    const { otp } = req.query;

    const userData = await User.findOne({email: email});
    if (!userData) {
        // send welcome mail with otp
        return res.json({message: "new user"});
    }
    // send otp to mail
    return res.json({message: "redirect to otp verification"})
};

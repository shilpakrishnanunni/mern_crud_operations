import * as crypto from "crypto";
import type { NextFunction, Request, Response } from "express";
import User from "../models/user";
import OTP from "../models/otp";
import { generateJWTToken } from "../utils";

interface ReqParams {}

interface ReqBody {}

interface ResBody {
    email: string;
    otp: string;
    newUser: boolean;
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

        let otp: string = crypto.randomInt(1001, 9999).toString(); // TODO change this
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = crypto.randomInt(1001, 9999).toString(); // TODO change this
            await OTP.findOne({ otp: otp });
        }

        await OTP.create({ email: email, otp: otp });
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
            newUser: !Boolean(userData),
        });
    } catch (error) {
        return next(error);
    }
};

export const login = async (
    req: Request<ReqParams, ReqBody, ResBody, ReqQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { otp, email, newUser } = req.body;

        const otpVerification = await OTP.findOne({ email: email, otp: otp });
        if (!otpVerification) {
            return res.status(422).json({ message: "Invalid OTP." });
        }
    
        // TODO auth and login user.
        const user = await User.findOneAndUpdate(
            {email},
            {email, status: 1},
            {upsert: true, new: true}
        );
        const token = await generateJWTToken(user._id)
        return res.json({token: token});
    } catch (error) {
        return next(error);
    }
};
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { mailSender } from "../utils"

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60*5
    }
}, { timestamps: true });

async function sendVerificationEmail(email: string, otp: string) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
          );
        //   console.log("mailResponse", mailResponse);
    } catch (error) {
        console.log("Error from sendVerificationEmail", error);
        throw error;
    }
}
otpSchema.pre("save", async function (next) {
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  });

const OTP = model("OTP", otpSchema)
export default OTP;
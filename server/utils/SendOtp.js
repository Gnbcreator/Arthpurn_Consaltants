import nodemailer from 'nodemailer';

export default async function SendOtp({ email, otp }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    return await transporter.sendMail({
        from: `"Arthpurn Consultants" <${process.env.APP_EMAIL}>`,
        to: email,
        subject: "Arthpurn Consultants - OTP to Reset Your Password",
        html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 20px; border: 1px solid #e0e0e0;">
                <h1 style="text-align: center; color: #333; margin-bottom: 10px;">Arthpurn Consultants</h1>
                <h2 style="text-align: center; color: #444; font-size: 20px;">Reset Your Password</h2>
                <p style="text-align: center; font-size: 16px; color: #666;">Hello <strong>${email}</strong>,</p>
                <p style="text-align: center; font-size: 16px; color: #666;">You recently requested to reset your password. Use the one-time password below to proceed:</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; background: #f3f4f6; padding: 10px 20px; border-radius: 6px; display: inline-block; letter-spacing: 2px;">${otp}</span>
                </div>

                <p style="text-align: center; font-size: 16px; color: #666;">This OTP is valid for <strong>1 minute</strong>. If you didn't request this, you can safely ignore this email.</p>
                
                <p style="text-align: center; font-size: 14px; color: #999; margin-top: 10px;">For security reasons, never share your OTP with anyone.</p>
                
                <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;" />
                
                <p style="text-align: center; font-size: 14px; color: #777;">
                    Need help? Contact our support team at 
                    <a href="mailto:support@arthpurn.com" style="color: #007BFF; font-weight: bold; text-decoration: none;">support@arthpurn.com</a>
                </p>
            </div>
        `,
    });
}

import { NextResponse } from "next/server";
import { siteConfig } from "@/data";
import nodemailer from "nodemailer";

// Create reusable transporter with the provided credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS || "jornadas.edtech@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "vdnd uywk qhlh ffns",
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Prepare email data
    const mailOptions = {
      from: `"Portfolio Contact Form" <${
        process.env.EMAIL_ADDRESS || "jornadas.edtech@gmail.com"
      }>`,
      to: process.env.EMAIL_RECIPIENT || "ryan.viana@grupoprisma.tech",
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Message from Portfolio Contact Form</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #0070f3;">
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent:", info.messageId);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}

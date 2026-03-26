import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL as string,
        replyTo: email,
        subject: `New message from ${name} — Portfolio`,
        html: `
            <div style="font-family:monospace;background:#0a0a0a;color:#e5e5e5;padding:32px;border-radius:12px;max-width:600px;">
                <h2 style="color:#00f0ff;margin-bottom:24px;border-bottom:1px solid #1f1f1f;padding-bottom:12px;">
                    📬 New Portfolio Message
                </h2>
                <table style="width:100%;border-collapse:collapse;">
                    <tr>
                        <td style="color:#6b7280;padding:8px 0;width:80px;">NAME</td>
                        <td style="color:#fff;padding:8px 0;">${name}</td>
                    </tr>
                    <tr>
                        <td style="color:#6b7280;padding:8px 0;">EMAIL</td>
                        <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00f0ff;">${email}</a></td>
                    </tr>
                </table>
                <div style="margin-top:24px;padding:16px;background:#111;border-radius:8px;border-left:3px solid #00f0ff;">
                    <p style="color:#6b7280;margin:0 0 8px;font-size:12px;">MESSAGE</p>
                    <p style="color:#e5e5e5;margin:0;white-space:pre-wrap;">${message}</p>
                </div>
                <p style="color:#374151;font-size:11px;margin-top:24px;">Sent from your portfolio at aadityakaushik.dev</p>
            </div>
        `,
    });

    if (error) {
        console.error("Resend error:", JSON.stringify(error));
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent, id:", data?.id);
    return NextResponse.json({ success: true });
}

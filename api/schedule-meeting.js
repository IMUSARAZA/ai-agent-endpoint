const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, date_time } = req.body;

  if (!name || !email || !date_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Configure Nodemailer with environment variables
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Set in Vercel environment variables
      pass: process.env.EMAIL_PASS, // Set in Vercel environment variables
    },
  });

  let mailOptions = {
    from: email,
    to: "imusaraza@gmail.com",
    subject: `New Meeting Request from ${name}`,
    text: `
      Hi Musa,

      You have a new meeting request.

      Name: ${name}
      Email: ${email}
      Date & Time: ${date_time}

      Please confirm at your earliest convenience.

      Best,
      AI Assistant
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "Meeting request sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

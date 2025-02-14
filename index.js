const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.post("/schedule-meeting", async (req, res) => {
  const { name, email, date_time } = req.body;

  // Configure Nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gymvisaaa@gmail.com",
      pass: "znca uzjw iltm dbyt",
    },
  });

  // Email Content
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

  // Send Email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Meeting request sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook running on port ${PORT}`);
});

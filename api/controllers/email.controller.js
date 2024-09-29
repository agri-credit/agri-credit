import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  console.log("reached email");
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"AgriCart" <agricredit4tvs@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.text, // plain text body
    html: req.body.html, // html body
  });
  return res.status(200).json("Sucessfuly subscribed");
};

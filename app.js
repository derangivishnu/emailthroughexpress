const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // You can change this port if needed

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve HTML form
app.get('/', (req, res,next) => {
    console.log("i got called")
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Email Registration Form</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  
  <style>
      .container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    background-color: yellow;
    border-radius: 5px;
  }
  
  h2 {
    text-align: center;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    font-style: italic;
  }
  
  
  button{
     border: 1px solid black;
     border-radius: 4px;
      background-color: rgb(235, 57, 57);
  }
  button:hover{
      background-color: rgb(57, 163, 43);
  }
  
  </style>
  <body>
    <div class="container">
      <h2>Email Registration</h2>
      <form action="/send-email" method="post">
          <label for="email">Email:</label>
          <input type="email" placeholder="enter email.." id="email" name="email" required>
          <button type="submit">Send Email</button>
        </form>
      </form>
    </div>
  </body>
  </html>
  
  `);
});

// Handle form submission
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other email services as well
    auth: {
      user: 'derangivishnuvardhan@gmail.com', // Your email
      pass: 'awvchykqrsawjtpf', // Your password (make sure to use app-specific password if enabled)
    },
  });

  // Email data
  const mailOptions = {
    from: 'derangivishnuvardhan@gmail.com',
    to: email,
    subject: 'Test Email',
    text: 'This is a test email sent from Express.js and Node.js.',
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error sending email');
    } else {
      console.log('Email sent yahooooooo!');
      res.send(`<!DOCTYPE html>
      <html>
      <head>
        <title>Email Registration Form</title>
        <link rel="stylesheet" type="text/css" href="style.css">
      </head>
      
      <style>
          .container {
        width: 300px;
        margin: 0 auto;
        padding: 20px;
        background-color: whitesmoke;
        border-radius: 5px;
      }
      h2 {
        text-align: center;
        color: green;
      }
      </style>
      <body>
        <div class="container">
          <h2>Email sent successfuly...!!!!</h2>
          
        </div>
      </body>
      </html>
      `);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});

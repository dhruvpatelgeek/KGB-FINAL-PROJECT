var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cpen442fastscan@gmail.com',
    pass: 'Cpen442FastScan#'
  }
});

var mailOptions = {
  from: 'cpen442fastscan@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'One Time Password From Fast Scan Inc.',
  text: '12345'
};


const sending = (email, newPassword) => {
    console.log(email)
    mailOptions.to = email
    mailOptions.text = newPassword
    
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
}

module.exports = sending
const express = require('express');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'sachinsuryavanshi472@gmail.com', 
        pass: 'Sachin@1234'   
    }
});

// Schedule a reminder
app.post('/schedule', (req, res) => {
    const { email, message, date } = req.body;

    const job = schedule.scheduleJob(date, function() {
        const mailOptions = {
            from: 'sachinsuryavanshi472@gmail.co',
            to: email,
            subject: 'Reminder',
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    });

    res.send(`Reminder scheduled for ${date}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

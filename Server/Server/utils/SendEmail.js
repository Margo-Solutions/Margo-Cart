// send-email.js
const nodemailer = require('nodemailer')



function sendEmail(email, number) {
    return new Promise((resolve, reject) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'trudecj00@gmail.com',
                pass: 'raeaihohqhevytgj'
            }
        })

        const mail_configs = {
            from: 'trudecj00@gmail.com',
            to: email,
            subject: 'Tilbakestilling av passord',
            text: `Skriv inn denne koden for å bytte passord: ${number}`
        }
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: 'Det oppsto en feil' })
            }
            return resolve({ message: "Email sendt" })
        })
    })
}

module.exports = sendEmail;

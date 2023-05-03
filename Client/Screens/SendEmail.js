// send-email.js

export async function sendEmail(email){

    return  new Promise((resolve, reject) =>{

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'trudedecj00@gmail.com',
                pass: 'svhgmvmvgkeauuid'
            }
        })

        const mail_configs ={
            from: 'trudecj00@gmail.com',
            to: email,
            subject: 'Tilbakestilling av passord',
            text: "Skriv inn denne koden for å bytte passord"
        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error);
                return reject({message: 'Det oppsto en feil'})
            }
            return resolve({message: "Email sendt"})
        })
    })
}

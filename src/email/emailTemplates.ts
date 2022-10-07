const emailTemplates = {
    registration: (to: string, subject: string) => {
        return  `
        <html>
        <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif;">
            <div style="width: 100%; background: #efefef; border-radius: 10px; padding: 10px;">
                <div style="margin: 0 auto; width: 90%; text-align: center;">
                    <h1 style="background-color: rgb(20, 38, 66); padding: 5px 10px; border-radius: 5px; color: white;">${subject}</h1>
                    <div style="margin: 30px auto; background: white; width: 40%; border-radius: 10px; padding: 50px; text-align: center;">
                        <h3 style="margin-bottom: 100px; font-size: 24px; color: black;">Dear ${to}, welcome aboad!!</h3>
                        <p style="margin-bottom: 30px; color: black;">Thank you for registering. CLick the link below to confirm your account</p>
                        <a style="display: block; margin: 0 auto; border: none; background-color: rgb(15, 42, 100); color: white; width: 50%; line-height: 24px; padding: 10px; font-size: 20px; border-radius: 10px; cursor: pointer; text-decoration: none;"
                            href="https://github.com/maxwellwachira/FastAPI-Mail"
                            target="_blank"
                        >
                            Let's Go
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    },
    passwordReset: (to: string, subject: string, link: string) => {
        return `
        <html>
        <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif;">
            <div style="width: 100%; background: #efefef; border-radius: 10px; padding: 10px;">
                <div style="margin: 0 auto; width: 90%; text-align: center;">
                    <h1 style="background-color: rgb(20, 38, 66); padding: 5px 10px; border-radius: 5px; color: white;">${subject}</h1>
                    <div style="margin: 30px auto; background: white; width: 40%; border-radius: 10px; padding: 50px; text-align: center;">
                        <h5 style="margin-bottom: 100px; font-size: 24px; color: black;">Dear ${to}, welcome aboad!!</h5>
                        <p style="margin-bottom: 30px; color: black;">Click the link below to recover your account</p>
                        <a style="display: block; margin: 0 auto; border: none; background-color: rgb(15, 42, 100); color: white; width: 50%; line-height: 24px; padding: 10px; font-size: 20px; border-radius: 10px; cursor: pointer; text-decoration: none;"
                            href=${link}
                            target="_blank"
                        >
                            Recover Password
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    }  
}

export default emailTemplates;
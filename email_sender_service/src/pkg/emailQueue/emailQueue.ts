import EmailSendRequest from "../emailSendRequest/emailSendRequest";
import TemplateStorage from "../templateStorage/templateStorage";
import nodemailer from "nodemailer";

class EmailQueue {
    static templateStorage = new TemplateStorage()
    private static isSetup = false
    private static queue: Array<EmailSendRequest> = []
    private static isProcessing = false
    private static interval: NodeJS.Timeout | null = null

    static setup(templatesPath:string) {
        if (this.isSetup) {
            console.warn("EmailQueue warn : EmailQueue is already setup");
            return
        }

        this.templateStorage.loadFromFile(templatesPath)
        this.isSetup = true
    
        this.interval = setInterval(this.processQueue.bind(this), 100)
    }

    static shutdown() {
        if (!this.isSetup) {
            console.warn("EmailQueue warn : EmailQueue is not setup");
            return
        }

        if (this.interval) {
            clearInterval(this.interval)
        }
        this.isSetup = false
    }

    static add(request:EmailSendRequest) {
        if (!this.isSetup) {
            throw new Error("EmailQueue error : EmailQueue is not setup")
        }

        // Check is template is valid
        this.templateStorage.getTemplate(request.template)

        this.queue.push(request)
    }

    private static async processQueue() {
        if (this.isProcessing || this.queue.length === 0) {
            return
        }
        this.isProcessing = true

        const emailRequest = this.queue.pop();
        if (!emailRequest) {
            return;
        }

        if (!process.env.SMTP_EMAIL) {
            console.error("💀 SMTP_EMAIL is not defined");
            this.isProcessing = false;
            return;
        }

        if (!process.env.SMTP_PASS) {
            console.error("💀 SMTP_PASS is not defined");
            this.isProcessing = false;
            return;
        }

        const template = this.templateStorage.getTemplate(emailRequest.template)


        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_EMAIL, // your SMTP username
                    pass: process.env.SMTP_PASS, // your SMTP password
                },
            });

            const mailOptions:nodemailer.SendMailOptions = {
                from: process.env.SMTP_EMAIL,
                to: emailRequest.distEmail,
                subject: template.subject,
            };
            
            if (emailRequest.content) {
                mailOptions["text"] = emailRequest.content;
            } else {
                mailOptions["html"] = template.prepareContent(emailRequest.data);
            }

            const response = await transporter.sendMail(mailOptions);
            if (response.accepted.length > 0) {
                console.log(`Email sent successfully to: ${response.accepted.join(", ")}`);
            } else {
                console.warn(`Email was not accepted by any recipients.`);
            }
        } catch (error) {
            console.error(`Error while sending email: ${error}`);
        } finally {
            this.isProcessing = false;
        }
    }
}

export default EmailQueue;
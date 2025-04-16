class ServiceConfig {
    port : number
    templatesPath : string
    smtpEmail : string
    smtpPass : string

    constructor() {
        const args = process.argv.splice(2)
        if (args.length != 4) {
            throw new Error("ESS error : invalid arguments <port> <templates-config> <email> <pass>")
        }
        this.port = Number(args[0]) || 3000
        this.templatesPath = args[1]
        this.smtpEmail = args[2]
        this.smtpPass = args[3]
    }
}

export default ServiceConfig;
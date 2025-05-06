import dotenv from "dotenv";

dotenv.config();

export default class Config {
    port: number;

    constructor() {
        this.port = parseInt(process.env.PORT || "3000");
    }
}
import dotenv from "dotenv";

dotenv.config();

export default class Config {
    port: number;
    mode: string;
    constructor() {
        this.mode = process.env.MODE || "development";
        this.port = parseInt(process.env.PORT || "3000");
    }
}
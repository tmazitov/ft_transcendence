export default class RecordValue{
    key: string;
    value: any;
    expire: number|undefined = undefined;
    constructor(key:string, value: any, expire: number|undefined = undefined) {
        this.key = key;
        this.value = value;
        this.expire = expire;   
    }
}
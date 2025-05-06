import RecordValue from "../pkg/Record";
import DeleteQueue from "./DeleteQueue";

export default class KeyValueStorage {
    private static data:Map<string, RecordValue> = new Map();
    private static deleteQueue = new DeleteQueue(KeyValueStorage.onRemoveHandler);   

    private static onRemoveHandler(item: RecordValue) {
        const key = item.key
        KeyValueStorage.data.delete(key);
    }

    public static set(key: string, value: any, expire:number | undefined) : void{
        const record = new RecordValue(key, value, expire)
        KeyValueStorage.data.set(key, record);
        console.log("🗄️ Adding item to storage:", key);

        if (expire) {
            KeyValueStorage.deleteQueue.add(record);
        }
    }

    public static get(key: string) : any {
        return KeyValueStorage.data.get(key)?.value;
    }

    public static delete(key: string) : RecordValue | undefined {
        const record = KeyValueStorage.data.get(key);
        console.log("🗑️ Deleting item from storage:", key);
        if (record) {
            KeyValueStorage.data.delete(key);
        }
        return record;
    }
}
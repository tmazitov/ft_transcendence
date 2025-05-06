import RecordValue from "../pkg/Record";

export default class DeleteQueue {  
    private queue: Record<number,Array<RecordValue>> = {};
    private interval: NodeJS.Timeout | null = null;
    private itemsCount: number = 0;
    private onRemoveHandler: (item:RecordValue) => void;

    constructor(onRemoveHandler:(item:RecordValue) => void) {
        this.onRemoveHandler = onRemoveHandler;
    }

    public add(value: RecordValue): void {

        if (!value.expire) {
            return ;
        }

        const expireAt = new Date();
        const expireAtSeconds = Math.round(expireAt.getTime() / 1000) + Math.round(value.expire);
        if (!this.queue[expireAtSeconds]) {
            this.queue[expireAtSeconds] = [];
        }
        console.log("🕒 Adding item to delete queue with expiration at:", expireAtSeconds);
        this.queue[expireAtSeconds].push(value);
        this.itemsCount++;

        if (!this.interval) {
            this.startInterval();
        }
    }

    public startInterval(): void {
        let iterTime = Math.round(new Date().getTime() / 1000)
        this.interval = setInterval(() => {
            if (this.itemsCount > 0) {
                const itemsToDelete = this.queue[iterTime]
                if (itemsToDelete) {
                    itemsToDelete.forEach((item) => {
                        this.onRemoveHandler(item);
                        console.log("🗑️ Deleting expired item with key:", item.key);
                        this.itemsCount--;
                    })

                    delete this.queue[iterTime];
                } else if (!itemsToDelete) {
                    console.log(`${iterTime}\t|\tNothing to delete...`);
                }
                iterTime++;
            } else {
                this.stopInterval();
            }
        }, 1000);
    }

    private stopInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
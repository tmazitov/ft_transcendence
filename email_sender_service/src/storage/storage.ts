import Database, { Database as DatabaseType } from "better-sqlite3";

export default class DatabaseStorage{
    private db: DatabaseType;

    constructor(path: string) {
        this.db = new Database(path);
    }

    close() {
        this.db.close();
    }
    
    getUserData(): string {
        try {
            const result = this.db.prepare('SELECT email FROM user LIMIT 1').get() as { email: string } | undefined;
            return result?.email ?? '';
        } catch (error) {
            console.error('Error fetching user data:', error);
            return '';
        }
    }
    
    setUserData(data: string): void {
        try {
            this.db.prepare('INSERT INTO user (email) VALUES (?)').run(data);
        } catch (error) {
            console.error('Error setting user data:', error);
        }
    }
    
    getUserRating(): number {
        try {
            const result = this.db.prepare('SELECT rating FROM user LIMIT 1').get() as { rating: number } | undefined;
            return result?.rating ?? 0;
        } catch (error) {
            console.error('Error fetching user rating:', error);
            return 0;
        }
    }
    
    changeRatingBy(value: number): void {
        try {
            this.db.prepare('UPDATE user SET rating = rating + ?').run(value);
        } catch (error) {
            console.error('Error changing user rating:', error);
        }
    }
    
    getTopRatingList(): string[] {
        try {
            const result = this.db.prepare('SELECT email FROM user ORDER BY rating DESC LIMIT 10').all() as { email: string }[];
            return result.map((row: { email: string }) => row.email);
        } catch (error) {
            console.error('Error fetching top rating list:', error);
            return [];
        }
    }
}

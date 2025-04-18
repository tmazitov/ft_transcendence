import Database from "better-sqlite3";

export default class DatabaseStorage extends Database{

    constructor(path:string) {
        super(path);
    }

    getUserData(): string {
        try {
            const result = this.prepare('SELECT email FROM user LIMIT 1').get() as { email: string } | undefined;
            return result?.email ?? '';
        } catch (error) {
            console.error('Error fetching user data:', error);
            return '';
        }
    }

    setUserData(data: string): void {
        try {
            this.prepare('INSERT INTO user (email) VALUES (?)').run(data);
        } catch (error) {
            console.error('Error setting user data:', error);
        }
    }

    getUserRating(): number {
        try {
            const result = this.prepare('SELECT rating FROM user LIMIT 1').get() as { rating: number } | undefined;
            return result?.rating ?? 0;
        } catch (error) {
            console.error('Error fetching user rating:', error);
            return 0;
        }
    }

    changeRatingBy(value: number): void {
        try {
            this.prepare('UPDATE user SET rating = rating + ?').run(value);
        } catch (error) {
            console.error('Error changing user rating:', error);
        }
    }

    getTopRatingList(): string[] {
        try {
            const result = this.prepare('SELECT email FROM user ORDER BY rating DESC LIMIT 10').all() as { email: string }[];
            return result.map((row: { email: string }) => row.email);
        } catch (error) {
            console.error('Error fetching top rating list:', error);
            return [];
        }
    }
}

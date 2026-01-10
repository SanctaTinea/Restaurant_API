import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');

const rawDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('DB connection error:', err);
    } else {
        console.log('SQLite connected:', dbPath);
    }
});

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        const isSelect = sql.trim().toUpperCase().startsWith("SELECT");

        if (isSelect) {
            rawDb.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        } else {
            rawDb.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        }
    });
}

export { rawDb, query };
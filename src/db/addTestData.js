import * as fs from "node:fs";
import path from "path";
import {fileURLToPath} from "url";
import { rawDb } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlPath = 'sql/addTestData.sql';

const addTestDataSql = fs.readFileSync(
    path.join(__dirname, sqlPath),
    'utf8'
);

rawDb.exec(addTestDataSql, (err) => {
    if (err) {
        console.error('Error initializing database:\n', err);
    }
    else {
        console.log('The database has been initialized');
    }
});


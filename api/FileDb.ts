import { promises as fs } from 'fs';
import crypto from 'crypto';
import {Entry, EntryWithoutId,} from "./types";

const fileName = './db.json';
let data: Entry[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = await JSON.parse(fileContents.toString()) as Entry[];
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: EntryWithoutId ) {
        const id = crypto.randomUUID();
        const entry = {id, ...item};
        data.push(entry);
        await this.save();
        return entry;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;


import express from "express";
import fileDb from "../FileDb";
import {EntryWithoutId,} from "../types";
import {imagesUpload} from "../multer";

const
    guestbookRouter = express.Router();


guestbookRouter.get('/', async (req, res) => {
        const entries = await fileDb.getItems();
        res.send(entries.reverse());
});


guestbookRouter.post('/',imagesUpload.single('image'), async (req, res) => {
    if(!req.body.message) {
        res.status(400).send({error:"please send message"});
        return
    } else {
        const entry: EntryWithoutId = {
            message: req.body.message,
            author: req.body.author ? req.body.author : "Anonymous",
            image: req.file ? 'images' + req.file.filename : null,
        };
        const savedEntry = await fileDb.addItem(entry);
        res.send(savedEntry);

    }
})


export default guestbookRouter;
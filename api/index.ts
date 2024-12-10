import express from 'express';
import productsRouter from "./routes/guestbook";
import fileDb from "./FileDb";
import fs = require('fs');
import cors from "cors";


const app = express();
app.use(cors());
const port = 8000;
app.use(express.json());
app.use('/entries', productsRouter);


const run = async () => {
    if(fs.existsSync('./db.json')){
        await fileDb.init();
    } else{
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port} port!`);
    });
};

run().catch(console.error);


import { Client } from "redis-om";


const url = process.env.REDIS_URL;


let client;
try {
    client = await new Client().open(url);
} catch (err) {
    console.log(`Redis error: ${err}`.red.bold);
}


export default client;

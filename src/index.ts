import express, { Express } from "express";
import cors from "cors";
import { routes } from "./router/router";
import { connectDb, disconnectDB } from '../src/database/index';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

const PORT = 4000 || process.env.DATABASE_URL;


server.listen(PORT, () => console.log(`Server Running at port: ${PORT}`))

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(server);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default server;
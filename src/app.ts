import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/evns.plugins";
import { LogModel, MongoDataBase } from "./data/mongo-data";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}

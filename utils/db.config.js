const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;


const client = new MongoClient(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const init = async () => {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

const db = client.db("uni")

module.exports.init = init;
module.exports.db = db;
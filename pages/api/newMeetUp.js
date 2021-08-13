import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    );
    const db = client.db("MeetUps");
    const meetUpCollections = db.collection("MeetUps");

    const result = await meetUpCollections.insertOne({
      data,
    });

    client.close();

    res.status(201).json({ message: "inserted" });
  }
}

export default handler;

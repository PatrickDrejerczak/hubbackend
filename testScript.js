const faker = require("faker");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/charityHub";

const statusArray = ["pending", "notStarted", "complete"];
const typeArray = ["receive", "donate"];
const itemName = [
  "rice",
  "eggs",
  "noodles",
  "veggies",
  "children clothes",
  "mask",
  "fish",
  "protective gear",
  "adult clothes",
  "meat",
];

const address = [
  "District 1",
  "District 2",
  "District 3",
  "District 4",
  "District 5",
  "District 6",
  "District 7",
  "District 8",
  "District 9",
  "District 10",
  "District 12",
  "District 11",
  "Thu Duc City",
  "Hoc Mon",
  "Binh Thanh",
  "Go Vap",
  "Nha Be",
];

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  for (let i = 0; i < 1000; i++) {
    let fakeitems = [];
    for (let x = 0; x < Math.ceil(Math.random() * 10); x++) {
      fakeitems[x] = {
        itemName: itemName[Math.floor(Math.random() * 10)],
        quantity: Math.ceil(Math.random() * 100),
      };
    }
    var fakeTicket = {
      name: faker.name.findName(),
      address: address[Math.floor(Math.random() * 17)],
      ticketType: typeArray[Math.floor(Math.random() * 2)],
      status: statusArray[Math.floor(Math.random() * 3)],
      weeksAgo: Math.floor(Math.random() * 4),
      items: fakeitems,
    };
    dbo.collection("charity").insertOne(fakeTicket, function (err, res) {
      if (err) throw err;
      db.close();
    });
  }
});

const faker = require("faker");
const statusArray = ["done", "pending", "notStarted"];
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

for (let i = 0; i < 10; i++) {
  const fakeTicket = {
    name: faker.name.findName(),
    address: address[Math.floor(Math.random() * 17)],
    ticketType: statusArray[Math.floor(Math.random() * 3)],
    itemName: itemName[Math.floor(Math.random() * 10)],
    quantity: [Math.floor(Math.random() * 99)],
  };
  console.log(fakeTicket);
}

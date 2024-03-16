const fs = require("fs");

async function test() {
  const itemsData = fs.readFileSync("data/items.json");
  console.log(JSON.parse(itemsData));
}

test();

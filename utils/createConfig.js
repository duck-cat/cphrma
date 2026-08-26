const ExcelHandler = require("./excelHandeler");

const handler = new ExcelHandler("../files/config.xlsx", "inventoryConfig");

handler.create([
  {
     key:"abc",
     value:"abc"
  }
]);

console.log("inventory.xlsx created with", handler.count(), "rows.");
console.table(handler.read());

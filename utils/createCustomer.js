const ExcelHandler = require("./excelHandeler");

const handler = new ExcelHandler("inventory.xlsx", "Customer");

handler.create([
  {
    member_id:"ITM-001",
    address:"",
    
  }
 
]);

console.log("inventory.xlsx created with", handler.count(), "rows.");
console.table(handler.read());

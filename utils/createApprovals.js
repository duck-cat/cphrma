const ExcelHandler = require("./excelHandeler");

const handler = new ExcelHandler("../files/inventory.xlsx", "Approvals");

handler.create([{
     id:"MM1001",
     requestedBy:"Mahendra kumar sahu",
     type:"Purchage Order",
     date:"2026-08-01",
     priority:"High",
     status:"High"
  }
]);

console.log("inventory.xlsx created with", handler.count(), "rows.");
console.table(handler.read());

const ExcelHandler = require("./excelHandeler");

const handler = new ExcelHandler("../files/inventory.xlsx", "supplier");

handler.create([
{
  supplierId: 'SUP-0001',
  supplierName: 'MediCare Pharmaceuticals',
  supplierType: 'Distributor',
  mobileNumber: '9876543210',
  emailAddress: 'medicare.pharma@gmail.com',
  addressLine: 'Plot No. 24, Sultan Bazar, Koti, Hyderabad, Telangana - 500095'
}
  
]);

console.log("inventory.xlsx created with", handler.count(), "rows.");
console.table(handler.read());

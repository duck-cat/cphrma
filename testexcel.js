/**
 * CRUD examples using ExcelHandler (SheetJS-based)
 * File: cphrma/utils/excelHandeler.js
 *
 * Run: node testexcel.js
 */

const ExcelHandler = require("./cphrma/utils/excelHandeler");

const handler = new ExcelHandler("employees.xlsx", "Employees");

// ─── CREATE ───────────────────────────────────────────────────────────────────

console.log("\n=== CREATE ===");

// Add multiple rows at once
handler.create([
  { id: 1, name: "Alice Johnson",  department: "Engineering", salary: 95000 },
  { id: 2, name: "Bob Smith",      department: "HR",          salary: 72000 },
  { id: 3, name: "Carol Williams", department: "Finance",     salary: 88000 },
]);
console.log("Inserted 3 employees. Total rows:", handler.count());

// Add a single row
handler.create({ id: 4, name: "Dave Brown", department: "Engineering", salary: 91000 });
console.log("Inserted 1 more. Total rows:", handler.count());

// ─── READ ─────────────────────────────────────────────────────────────────────

console.log("\n=== READ ===");

// Read all rows
const all = handler.read();
console.log("All employees:");
console.table(all);

// Read with a filter
const engineers = handler.read({ department: "Engineering" });
console.log("Engineers only:");
console.table(engineers);

// Read a single row by 0-based index
const second = handler.readByIndex(1); // Bob Smith
console.log("Row at index 1:", second);

// ─── UPDATE ───────────────────────────────────────────────────────────────────

console.log("\n=== UPDATE ===");

// Update a specific row by index (merge — only listed fields change)
handler.update(1, { salary: 80000 }); // raise Bob's salary
console.log("Updated index 1 (Bob) salary to 80000");
console.log("Bob after update:", handler.readByIndex(1));

// Update ALL rows matching a filter
const changed = handler.updateWhere(
  { department: "Engineering" },
  { department: "Software Engineering" }
);
console.log(`updateWhere — renamed department for ${changed} row(s)`);
console.log("Engineers after rename:");
console.table(handler.read({ department: "Software Engineering" }));

// ─── DELETE ───────────────────────────────────────────────────────────────────

console.log("\n=== DELETE ===");

// Delete a row by 0-based index
handler.delete(2); // removes Carol (index 2 after prior ops)
console.log("Deleted row at index 2. Total rows:", handler.count());

// Delete all rows matching a filter
const removed = handler.deleteWhere({ department: "HR" });
console.log(`deleteWhere — removed ${removed} HR row(s). Total rows:`, handler.count());

// ─── UTILITIES ────────────────────────────────────────────────────────────────

console.log("\n=== UTILITIES ===");

console.log("Sheets in workbook:", handler.listSheets());
console.log("Remaining rows:", handler.count());
console.log("Final data:");
console.table(handler.read());

// Uncomment to wipe all rows (keeps the file):
// handler.clear();
// console.log("Cleared. Row count:", handler.count());

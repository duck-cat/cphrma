const path = require("path");
const ExcelHandler = require("../utils/excelHandeler");

const handler = new ExcelHandler(
  path.join(__dirname, "../files/medi.xlsx"),
  "medicins",
);
const supplierExcel = new ExcelHandler(
  path.join(__dirname, "../files/inventory.xlsx"),
  "supplier",
);
// GET /api/v1/medicins
exports.getAllMedicine = (req, res) => {
  try {
    debugger;
    const name = req.params.index;
    const data = handler.searchByName(name);
    return res
      .status(200)
      .json({ status: "success", count: data.length, data });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getSupplierInfo = (req, res) => {
  try {
    const supplierinfo = supplierExcel.read().map((res) => {
      return { option: res["supplierId"], value: res["supplierName"] };
    });
    return res
      .status(200)
      .json({ status: "success", count: supplierinfo.length, supplierinfo });
  } catch (e) {
    console.error(e);
  }
};

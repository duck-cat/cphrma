const path = require("path");
const ExcelHandler = require("../utils/excelHandeler");

exports.createConfig = (req, res) => {
  let { key, data } = req.body;
  const handler = getHandler(key);
  //return handler.read();
  handler.create(data);
};

exports.getAllConfig = (req, res) => {
  let { key } = req.body;
  const handler = getHandler(key);
  return handler.read();
};

exports.updateConfig = (req, res) => {
  try {
    let { key, data } = req.body;
    const handler = getHandler(key);
    const index = parseInt(req.params.index, 10);
    if (isNaN(index)) {
      return res
        .status(400)
        .json({ status: "error", message: "Index must be a number." });
    }
    // let updates = req.body;
    handler.update(index, data);
    return res
      .status(200)
      .json({ status: "success", message: "Record updated.", data: updates });
  } catch (err) {
    if (err instanceof RangeError) {
      return res.status(404).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteConfig = (req, res) => {
  let { key } = req.body;
  const handler = getHandler(key);
  const index = parseInt(req.params.index, 10);
  if (isNaN(index)) {
    return res
      .status(400)
      .json({ status: "error", message: "Index must be a number." });
  }
  try {
    handler.delete(index);
    return res.status(200).json({
      status: "success",
      message: `Record at index ${index} deleted.`,
    });
  } catch (err) {
    if (err instanceof RangeError) {
      return res.status(404).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: err.message });
  }
};

function getHandler(key) {
  return new ExcelHandler(path.join(__dirname, "../files/config.xlsx"), key);
}

const fs = require("fs");
const path = require("path");
const entities = require("./entities");

const controllersDir = path.join(__dirname, "..", "controllers");

if (!fs.existsSync(controllersDir)) {
  fs.mkdirSync(controllersDir, { recursive: true });
}

entities.forEach((entity) => {
  const { name, fileName, modelPath } = entity;
  const file = `${fileName}Controller.js`;
  const fullPath = path.join(controllersDir, file);

  if (fs.existsSync(fullPath)) {
    console.log(`⚠️  ${file} exists, skipping`);
    return;
  }

  const content = `
const Model = require("${modelPath}");

// BASIC CRUD - customize as needed

exports.create${name} = async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.get${name}s = async (req, res, next) => {
  try {
    const docs = await Model.find();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.get${name}ById = async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "${name} not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.update${name} = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "${name} not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.delete${name} = async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "${name} not found" });
    res.json({ message: "${name} deleted" });
  } catch (err) {
    next(err);
  }
};
`;

  fs.writeFileSync(fullPath, content.trimStart(), "utf8");
  console.log(`✅ Controller generated: ${file}`);
});

console.log("Done generating controllers");

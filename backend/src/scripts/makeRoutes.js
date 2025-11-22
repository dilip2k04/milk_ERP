const fs = require("fs");
const path = require("path");
const entities = require("./entities");

const routesDir = path.join(__dirname, "..", "routes");

if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
}

entities.forEach((entity) => {
  const { name, fileName, allowedRoles } = entity;
  const file = `${fileName}Routes.js`;
  const fullPath = path.join(routesDir, file);

  if (fs.existsSync(fullPath)) {
    console.log(`⚠️  ${file} exists, skipping`);
    return;
  }

  const rolesJson = JSON.stringify(allowedRoles);

  const content = `
const express = require("express");
const router = express.Router();
const authFirebase = require("../middleware/authFirebase");
const { requireRoles } = require("../middleware/rbac");

const {
  create${name},
  get${name}s,
  get${name}ById,
  update${name},
  delete${name}
} = require("../controllers/${fileName}Controller");

const allowedRoles = ${rolesJson};

router.use(authFirebase, requireRoles(allowedRoles));

router.post("/", create${name});
router.get("/", get${name}s);
router.get("/:id", get${name}ById);
router.patch("/:id", update${name});
router.delete("/:id", delete${name});

module.exports = router;
`;

  fs.writeFileSync(fullPath, content.trimStart(), "utf8");
  console.log(`✅ Route generated: ${file}`);
});

console.log("Done generating routes");

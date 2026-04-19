import "./loadLocalSettings.mjs";

const { ensureSchema } = await import("../dist/data/migrations.js");
const { closePool, verifyMySqlConnection } = await import("../dist/data/mysql.js");

try {
  await verifyMySqlConnection();
  await ensureSchema();
  console.log("Booking schema is ready.");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await closePool();
}
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stop_id" TEXT,
    "name" TEXT,
    "lat" REAL,
    "lon" REAL
);
INSERT INTO "new_Stop" ("id", "lat", "lon", "name", "stop_id") SELECT "id", "lat", "lon", "name", "stop_id" FROM "Stop";
DROP TABLE "Stop";
ALTER TABLE "new_Stop" RENAME TO "Stop";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

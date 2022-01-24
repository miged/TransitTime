/*
  Warnings:

  - A unique constraint covering the columns `[stop_id]` on the table `Stop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stop_stop_id_key" ON "Stop"("stop_id");

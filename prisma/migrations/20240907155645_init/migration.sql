/*
  Warnings:

  - You are about to drop the column `coordinate` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `Pole` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Pole` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Pole` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Pole` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Pole` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Status` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcode` to the `Pole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pole" DROP CONSTRAINT "Pole_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Pole" DROP CONSTRAINT "Pole_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Pole" DROP CONSTRAINT "Pole_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Pole" DROP CONSTRAINT "Pole_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_locationId_fkey";

-- DropIndex
DROP INDEX "Pole_driverId_idx";

-- DropIndex
DROP INDEX "Pole_locationId_idx";

-- DropIndex
DROP INDEX "Pole_statusId_idx";

-- DropIndex
DROP INDEX "Pole_vendorId_idx";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "coordinate",
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pole" DROP COLUMN "driverId",
DROP COLUMN "locationId",
DROP COLUMN "photo",
DROP COLUMN "statusId",
DROP COLUMN "vendorId",
ADD COLUMN     "barcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "driverId",
DROP COLUMN "locationId";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusId" INTEGER NOT NULL,
    "poleId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_statusId_idx" ON "Task"("statusId");

-- CreateIndex
CREATE INDEX "Task_poleId_idx" ON "Task"("poleId");

-- CreateIndex
CREATE INDEX "Task_locationId_idx" ON "Task"("locationId");

-- CreateIndex
CREATE INDEX "Task_vendorId_idx" ON "Task"("vendorId");

-- CreateIndex
CREATE INDEX "Task_driverId_idx" ON "Task"("driverId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_poleId_fkey" FOREIGN KEY ("poleId") REFERENCES "Pole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

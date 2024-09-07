/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pole" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "productNumber" TEXT NOT NULL,
    "manufacturingDate" TIMESTAMP(3) NOT NULL,
    "photo" TEXT,
    "locationId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "driverId" INTEGER,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Pole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordinate" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pole_locationId_idx" ON "Pole"("locationId");

-- CreateIndex
CREATE INDEX "Pole_vendorId_idx" ON "Pole"("vendorId");

-- CreateIndex
CREATE INDEX "Pole_driverId_idx" ON "Pole"("driverId");

-- CreateIndex
CREATE INDEX "Pole_statusId_idx" ON "Pole"("statusId");

-- AddForeignKey
ALTER TABLE "Pole" ADD CONSTRAINT "Pole_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pole" ADD CONSTRAINT "Pole_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pole" ADD CONSTRAINT "Pole_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pole" ADD CONSTRAINT "Pole_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

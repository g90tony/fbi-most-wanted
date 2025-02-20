/*
  Warnings:

  - The primary key for the `UserListPerson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `UserListPerson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `UserListPerson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `UserListPerson` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserListPerson_uid_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userListId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserListPerson" DROP CONSTRAINT "UserListPerson_pkey",
DROP COLUMN "uid",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "UserListPerson_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserListPerson_id_key" ON "UserListPerson"("id");

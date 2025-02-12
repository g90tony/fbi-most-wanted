/*
  Warnings:

  - You are about to drop the column `personUID` on the `UserList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userListId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `UserList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `person_uid` to the `UserListPerson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_user_id_fkey";

-- DropIndex
DROP INDEX "UserList_personUID_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userListId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserList" DROP COLUMN "personUID";

-- AlterTable
ALTER TABLE "UserListPerson" ADD COLUMN     "person_uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userListId_key" ON "User"("userListId");

-- CreateIndex
CREATE UNIQUE INDEX "UserList_user_id_key" ON "UserList"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userListId_fkey" FOREIGN KEY ("userListId") REFERENCES "UserList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

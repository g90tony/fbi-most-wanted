/*
  Warnings:

  - A unique constraint covering the columns `[list_id]` on the table `UserListPerson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserListPerson_list_id_key" ON "UserListPerson"("list_id");

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userListId_fkey";

-- AddForeignKey
ALTER TABLE "UserList" ADD CONSTRAINT "UserList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

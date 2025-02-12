-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "expiryTime" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "UserList" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "personUID" TEXT NOT NULL,

    CONSTRAINT "UserList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserListPerson" (
    "uid" TEXT NOT NULL,
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "UserListPerson_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserList_personUID_key" ON "UserList"("personUID");

-- CreateIndex
CREATE UNIQUE INDEX "UserListPerson_uid_key" ON "UserListPerson"("uid");

-- AddForeignKey
ALTER TABLE "UserList" ADD CONSTRAINT "UserList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserListPerson" ADD CONSTRAINT "UserListPerson_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "UserList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

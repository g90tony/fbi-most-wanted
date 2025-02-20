-- DropIndex
DROP INDEX "UserListPerson_id_key";

-- AlterTable
CREATE SEQUENCE userlistperson_id_seq;
ALTER TABLE "UserListPerson" ALTER COLUMN "id" SET DEFAULT nextval('userlistperson_id_seq');
ALTER SEQUENCE userlistperson_id_seq OWNED BY "UserListPerson"."id";

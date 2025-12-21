-- CreateEnum
CREATE TYPE "iam_schema"."roles" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "iam_schema"."users" ADD COLUMN     "role" "iam_schema"."roles" NOT NULL DEFAULT 'USER';

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "iam_schema";

-- CreateTable
CREATE TABLE "iam_schema"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iam_schema"."tokens" (
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "iam_schema"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "iam_schema"."tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_user_id_user_agent_key" ON "iam_schema"."tokens"("user_id", "user_agent");

-- AddForeignKey
ALTER TABLE "iam_schema"."tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "iam_schema"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

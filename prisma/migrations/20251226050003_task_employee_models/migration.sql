-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "employee_schema";

-- CreateTable
CREATE TABLE "employee_schema"."employees" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "employment_date" TIMESTAMP(3) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "is_fired" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schema"."tasks" (
    "id" TEXT NOT NULL,
    "assigned_to_id" TEXT NOT NULL,
    "assigned_from_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "task_status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schema"."task_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employee_schema"."employees"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_statuses_name_key" ON "employee_schema"."task_statuses"("name");

-- AddForeignKey
ALTER TABLE "employee_schema"."tasks" ADD CONSTRAINT "tasks_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "employee_schema"."employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schema"."tasks" ADD CONSTRAINT "tasks_task_status_id_fkey" FOREIGN KEY ("task_status_id") REFERENCES "employee_schema"."task_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

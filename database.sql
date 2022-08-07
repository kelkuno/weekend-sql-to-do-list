CREATE TABLE "task-list"(
"id" serial primary key,
"task" VARCHAR(200) NOT NULL,
"complete" BOOLEAN
);

INSERT INTO "task-list"("task", "complete")
VALUES ('clean room', false),('make beans', false),('drink wine', true);

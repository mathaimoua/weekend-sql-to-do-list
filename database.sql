CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"nameoftask" VARCHAR (250) NOT NULL,
	"isdone" BOOLEAN NOT NULL
);

INSERT INTO "tasks" 
	("nameoftask", "isdone") 
VALUES 
	('take out garbage',FALSE),
	('wash the dog',FALSE),
	('vacuum the carpet really well',FALSE),
	('install gutter guards',FALSE),
	('complete Prime weekend project',FALSE),
	('prepare dinner',FALSE);
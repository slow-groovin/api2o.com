CREATE SCHEMA "jsonplaceholder";
--> statement-breakpoint
CREATE TABLE "jsonplaceholder"."album" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jsonplaceholder"."comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"postId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"body" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jsonplaceholder"."photo" (
	"id" serial PRIMARY KEY NOT NULL,
	"albumId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"thumbnailUrl" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jsonplaceholder"."post" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jsonplaceholder"."todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"completed" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jsonplaceholder"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" json NOT NULL,
	"phone" varchar(255) NOT NULL,
	"website" varchar(255) NOT NULL,
	"company" json NOT NULL
);

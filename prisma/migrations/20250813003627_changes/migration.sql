/*
  Warnings:

  - Made the column `balance` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "balance" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION,
    "title" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

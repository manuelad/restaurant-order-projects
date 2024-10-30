-- CreateTable
CREATE TABLE "orderOptions" (
    "id" SERIAL NOT NULL,
    "adultAgeLimit" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderOptions_pkey" PRIMARY KEY ("id")
);

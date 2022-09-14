-- CreateTable
CREATE TABLE "Client" (
    "client_id" TEXT NOT NULL,
    "client_secret" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "CPF" TEXT NOT NULL,
    "A_FILIAL" TEXT NOT NULL DEFAULT '01',
    "A_MAT" TEXT NOT NULL,
    "A_NOME" TEXT NOT NULL,
    "DADM" TEXT NOT NULL,
    "FONE" TEXT NOT NULL,
    "MAE" TEXT NOT NULL,
    "MAIL" TEXT NOT NULL,
    "NASC" TEXT NOT NULL,
    "PAI" TEXT NOT NULL,
    "RG" TEXT NOT NULL,
    "SEXO" TEXT NOT NULL,
    "SIT" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("CPF")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_A_MAT_key" ON "Employee"("A_MAT");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_MAIL_key" ON "Employee"("MAIL");

import prisma from "../db";
export async function transfer(from: number, to: number, amount: number) {
  return await prisma.$transaction(async (tx) => {
    const sender = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: { id: from },
    });
    if (sender.balance < 0) {
      throw new Error("no balance");
    }
    const recepient = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: { id: to },
    });
  });
}

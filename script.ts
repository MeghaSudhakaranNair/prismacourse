import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
async function main() {
  // const course = await prismaClient.course.create({
  //   data: {
  //     title: " LEARN GatsbyJS",
  //     desc: "Learn how to use prisma with ORM",
  //     duration: 2.5,
  //   },
  // });

  const video = await prismaClient.video.create({
    data: {
      title: " LEARN GatsbyJS",
      desc: "Learn how to use prisma with ORM",
      url: "www.aws.s3.com/12345",
      courseId: 1,
    },
  });
}
main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

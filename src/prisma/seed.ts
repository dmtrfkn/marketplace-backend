import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env['DATABASE_URL'],
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const seller = await prisma.user.create({
    data: {
      email: 'seller@example.com',
      name: 'Seller',
      password: 'password',
    },
  });

  const sneakers = await prisma.category.create({
    data: { name: 'Sneakers', slug: 'sneakers' },
  });
  const electronics = await prisma.category.create({
    data: { name: 'Electronics', slug: 'electronics' },
  });

  await prisma.product.createMany({
    data: [
      {
        title: 'Nike Air Max',
        description: 'Classic running shoes',
        price: 1299900,
        images: [],
        stock: 12,
        categoryId: sneakers.id,
        sellerId: seller.id,
      },
      {
        title: 'Adidas Samba',
        description: 'Retro football-inspired sneakers',
        price: 949900,
        images: [],
        stock: 8,
        categoryId: sneakers.id,
        sellerId: seller.id,
      },
      {
        title: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones',
        price: 2499900,
        images: [],
        stock: 20,
        categoryId: electronics.id,
        sellerId: seller.id,
      },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

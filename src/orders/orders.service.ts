import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      const productIds = dto.items.map((item) => item.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      });
      const productById = new Map(products.map((p) => [p.id, p]));

      let totalPrice = 0;
      const orderItemsData = dto.items.map((item) => {
        const product = productById.get(item.productId);
        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }
        totalPrice += product.price * item.quantity;
        return {
          productId: product.id,
          sellerId: product.sellerId,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      });

      for (const item of dto.items) {
        const product = productById.get(item.productId)!;
        const { count } = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (count === 0) {
          throw new BadRequestException(
            `Not enough stock for "${product.title}" (id ${product.id}): requested ${item.quantity}, available ${product.stock}`,
          );
        }
      }

      return tx.order.create({
        data: {
          userId,
          totalPrice,
          fullName: dto.fullName,
          phone: dto.phone,
          address: dto.address,
          deliveryMethod: dto.deliveryMethod,
          items: { create: orderItemsData },
        },
        include: { items: true },
      });
    });
  }

  findAllForUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductWhereInput } from 'generated/prisma/models';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, category, page = 1, limit = 20 } = params;
    const searchParams = {
      ...(search && { title: { contains: search, mode: 'insensitive' } }),
      ...(category && { category: { slug: category } }),
    } as ProductWhereInput;
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: searchParams,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({
        where: searchParams,
      }),
    ]);
    return {
      products,
      totalPages: Math.ceil(total / limit),
      total: total,
    };
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}

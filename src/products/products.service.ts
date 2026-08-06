import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(params: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, category, page = 1, limit = 20 } = params;
    return this.prisma.product.findMany({
      where: {
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
        ...(category && { category: { slug: category } }),
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

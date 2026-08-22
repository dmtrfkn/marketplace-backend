import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductWhereInput } from 'generated/prisma/models';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async findAllBySeller(
    sellerId: number,
    params: { page?: number; limit?: number },
  ) {
    const { page = 1, limit = 20 } = params;
    const where = { sellerId } as ProductWhereInput;
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
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

  async create(sellerId: number, dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.product.create({
      data: { ...dto, sellerId },
    });
  }

  async update(sellerId: number, id: number, dto: UpdateProductDto) {
    await this.assertOwnedBySeller(sellerId, id);

    if (dto.categoryId !== undefined) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(sellerId: number, id: number) {
    await this.assertOwnedBySeller(sellerId, id);
    return this.prisma.product.delete({ where: { id } });
  }

  private async assertOwnedBySeller(sellerId: number, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.sellerId !== sellerId) {
      throw new ForbiddenException('You do not own this product');
    }
  }
}

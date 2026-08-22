import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: {
    product: {
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      product: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('applies default pagination and an empty where when no filters are given', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      await service.findAll({});

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 20,
      });
      expect(prisma.product.count).toHaveBeenCalledWith({ where: {} });
    });

    it('filters by title when search is given', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      await service.findAll({ search: 'chair' });

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { title: { contains: 'chair', mode: 'insensitive' } },
        skip: 0,
        take: 20,
      });
    });

    it('filters by category slug when category is given', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      await service.findAll({ category: 'furniture' });

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { category: { slug: 'furniture' } },
        skip: 0,
        take: 20,
      });
    });

    it('computes skip from page and limit', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      await service.findAll({ page: 3, limit: 10 });

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 20,
        take: 10,
      });
    });

    it('returns products with total and totalPages', async () => {
      const products = [
        { id: 1, title: 'Chair', description: '', price: 100 },
        { id: 2, title: 'Table', description: '', price: 200 },
      ];
      prisma.product.findMany.mockResolvedValue(products);
      prisma.product.count.mockResolvedValue(21);

      const result = await service.findAll({ limit: 20 });

      expect(result).toEqual({ products, total: 21, totalPages: 2 });
    });

    it('returns an empty array when there are no products', async () => {
      prisma.product.findMany.mockResolvedValue([]);
      prisma.product.count.mockResolvedValue(0);

      const result = await service.findAll({});

      expect(result).toEqual({ products: [], total: 0, totalPages: 0 });
    });

    it('propagates errors from prisma', async () => {
      const error = new Error('db unreachable');
      prisma.product.findMany.mockRejectedValue(error);
      prisma.product.count.mockResolvedValue(0);

      await expect(service.findAll({})).rejects.toThrow('db unreachable');
    });
  });

  describe('findOne', () => {
    it('delegates to prisma.product.findUnique with the given id', async () => {
      const product = { id: 1, title: 'Chair', description: '', price: 100 };
      prisma.product.findUnique.mockResolvedValue(product);

      const result = await service.findOne(1);

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toBe(product);
    });

    it('returns null when the product is not found', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });
});

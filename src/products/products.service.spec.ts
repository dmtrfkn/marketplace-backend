import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: { product: { findMany: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      product: {
        findMany: jest.fn(),
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
    it('delegates to prisma.product.findMany', async () => {
      const products = [
        { id: 1, title: 'Chair', description: '', price: 100 },
        { id: 2, title: 'Table', description: '', price: 200 },
      ];
      prisma.product.findMany.mockResolvedValue(products);

      const result = await service.findAll();

      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.product.findMany).toHaveBeenCalledWith();
      expect(result).toBe(products);
    });

    it('returns an empty array when there are no products', async () => {
      prisma.product.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('propagates errors from prisma', async () => {
      const error = new Error('db unreachable');
      prisma.product.findMany.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow('db unreachable');
    });
  });
});

import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env['DATABASE_URL'],
});
const prisma = new PrismaClient({ adapter });

function img(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;
}

const categories: {
  name: string;
  slug: string;
  images: string[];
  products: [string, string, number][];
}[] = [
  {
    name: 'Sneakers',
    slug: 'sneakers',
    images: [
      img('1542291026-7eec264c27ff'),
      img('1595950653106-6c9ebd614d3a'),
      img('1600185365483-26d7a4cc7519'),
      img('1603808033192-082d6919d3e1'),
      img('1560769629-975ec94e6a86'),
    ],
    products: [
      [
        'Nike Air Max 90',
        'Iconic running shoe with visible Air cushioning',
        12990,
      ],
      ['Nike Air Force 1', 'Classic low-top basketball sneaker', 9990],
      ['Adidas Samba OG', 'Retro football-inspired leather sneaker', 8990],
      [
        'Adidas Ultraboost 22',
        'High-performance running shoe with Boost midsole',
        15990,
      ],
      [
        'New Balance 550',
        'Retro basketball sneaker with premium leather upper',
        11990,
      ],
      ['Puma Suede Classic', 'Timeless suede sneaker, streetwear staple', 6990],
      ['Reebok Classic Leather', 'Vintage-inspired leather trainer', 6490],
      [
        'Converse Chuck Taylor All Star',
        'Legendary canvas high-top sneaker',
        5990,
      ],
      ['Vans Old Skool', 'Skate shoe with iconic side stripe', 6990],
      [
        'ASICS Gel-Kayano 30',
        'Stability running shoe with Gel cushioning',
        13990,
      ],
      [
        'Jordan 1 Retro High',
        'Legendary basketball sneaker in classic colorway',
        17990,
      ],
      ['Nike Dunk Low', 'Low-top sneaker with retro basketball styling', 11490],
      ['Adidas Gazelle', 'Retro terrace sneaker in soft suede', 9490],
    ],
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    images: [
      img('1505740420928-5e560c06d30e'),
      img('1519125323398-675f0ddb6308'),
      img('1511707171634-5f897ff02aa9'),
      img('1592750475338-74b7b21085ab'),
      img('1580910051074-3eb694886505'),
      img('1526170375885-4d8ecf77b99f'),
      img('1516035069371-29a1b244cc32'),
    ],
    products: [
      [
        'iPhone 15 Pro',
        'Flagship smartphone with titanium frame and A17 Pro chip',
        99990,
      ],
      [
        'Samsung Galaxy S24',
        'Flagship Android smartphone with AI features',
        79990,
      ],
      [
        'Sony WH-1000XM5',
        'Industry-leading noise-cancelling headphones',
        34990,
      ],
      [
        'AirPods Pro 2',
        'Wireless earbuds with active noise cancellation',
        24990,
      ],
      ['MacBook Air M3', 'Thin and light laptop with Apple M3 chip', 129990],
      [
        'Dell XPS 13',
        'Compact premium ultrabook with InfinityEdge display',
        119990,
      ],
      ['iPad Air', 'Versatile tablet with M-series performance', 59990],
      [
        'Samsung Galaxy Tab S9',
        'Premium Android tablet with AMOLED display',
        64990,
      ],
      [
        'Sony PlayStation 5',
        'Next-gen gaming console with ultra-fast SSD',
        54990,
      ],
      ['Xbox Series X', 'Powerful 4K gaming console', 49990],
      [
        'Nintendo Switch OLED',
        'Hybrid gaming console with vivid OLED screen',
        32990,
      ],
      ['Canon EOS R50', 'Compact mirrorless camera for photo and video', 74990],
      [
        'GoPro Hero 12',
        'Rugged action camera with hyper-smooth stabilization',
        44990,
      ],
      ['JBL Flip 6', 'Portable waterproof Bluetooth speaker', 8990],
    ],
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    images: [
      img('1441986300917-64674bd600d8'),
      img('1489987707025-afc232f7ea0f'),
      img('1521572163474-6864f9cf17ab'),
      img('1562157873-818bc0726f68'),
      img('1552374196-c4e7ffc6e126'),
    ],
    products: [
      ["Levi's 501 Jeans", 'Original straight-fit denim jeans', 6990],
      ['Champion Hoodie', 'Classic fleece pullover hoodie', 4990],
      [
        'The North Face Puffer Jacket',
        'Insulated jacket for cold weather',
        18990,
      ],
      ['Uniqlo Fleece Jacket', 'Lightweight warm fleece zip-up', 3990],
      ['Zara Wool Coat', 'Tailored wool-blend overcoat', 9990],
      ['Nike Dri-FIT T-Shirt', 'Moisture-wicking athletic t-shirt', 2490],
      ['Adidas Track Jacket', 'Classic three-stripe zip track jacket', 5990],
      ['Carhartt WIP Jacket', 'Durable workwear-inspired jacket', 12990],
      ['Patagonia Fleece', 'Recycled-fiber fleece pullover', 10990],
      ['H&M Denim Jacket', 'Casual cotton denim jacket', 3490],
      ['Ralph Lauren Polo Shirt', 'Classic cotton pique polo shirt', 6990],
      ['Tommy Hilfiger Sweater', 'Crewneck knit sweater with logo', 7990],
      ['Calvin Klein Jeans', 'Slim-fit stretch denim jeans', 6490],
    ],
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    images: [
      img('1584622650111-993a426fbf0a'),
      img('1556909212-d5b604d0c90d'),
      img('1522708323590-d24dbb6b0267'),
      img('1584269600464-37b1b58a9fe7'),
    ],
    products: [
      ['Instant Pot Duo', '7-in-1 electric pressure cooker', 9990],
      ['KitchenAid Stand Mixer', 'Iconic stand mixer for baking', 39990],
      ['Dyson V15 Vacuum', 'Cordless vacuum with laser dust detection', 54990],
      [
        'Ninja Air Fryer',
        'Compact air fryer for crispy low-fat cooking',
        12990,
      ],
      [
        'Philips Coffee Machine',
        'Automatic espresso machine with grinder',
        24990,
      ],
      ['Tefal Non-stick Pan Set', 'Durable non-stick cookware set', 4990],
      ['Zwilling Knife Set', 'Professional German steel knife set', 14990],
      ['Le Creuset Dutch Oven', 'Enameled cast iron cooking pot', 22990],
      [
        'Breville Toaster',
        '4-slice toaster with precise browning control',
        8990,
      ],
      ['Nespresso Vertuo', 'Single-serve coffee and espresso machine', 15990],
      ['Xiaomi Robot Vacuum', 'Smart robot vacuum with mapping', 29990],
      ['Bosch Blender', 'High-power countertop blender', 5990],
      ['Cuisinart Food Processor', 'Multi-function food processor', 13990],
    ],
  },
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    images: [
      img('1522335789203-aabd1fc54bc9'),
      img('1512496015851-a90fb38ba796'),
      img('1571781926291-c477ebfd024b'),
    ],
    products: [
      ['La Roche-Posay Sunscreen', 'SPF 50 facial sun protection', 1990],
      [
        'The Ordinary Niacinamide Serum',
        'Blemish and pore-refining serum',
        990,
      ],
      ['Dyson Airwrap', 'Multi-styler for curling and drying hair', 39990],
      ['CeraVe Moisturizing Cream', 'Daily face and body moisturizer', 1490],
      ['MAC Lipstick', 'Long-lasting matte lipstick', 2290],
      [
        'Olaplex No.3 Hair Treatment',
        'At-home bond-repair hair treatment',
        2990,
      ],
      ['Neutrogena Cleanser', 'Gentle daily facial cleanser', 990],
      [
        'Philips Sonicare Toothbrush',
        'Electric toothbrush with sonic technology',
        6990,
      ],
      ['Braun Series 9 Shaver', 'Premium electric shaver for men', 19990],
      ['Maybelline Mascara', 'Volumizing waterproof mascara', 790],
      ['Nivea Body Lotion', 'Moisturizing everyday body lotion', 490],
      ['Chanel No.5 Perfume', 'Classic eau de parfum', 12990],
    ],
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    images: [
      img('1517649763962-0c623066013b'),
      img('1571019613454-1cb2f99b2d8b'),
      img('1461896836934-ffe607ba8211'),
      img('1544367567-0f2fcb009e0b'),
    ],
    products: [
      ['Wilson Basketball', 'Official size indoor/outdoor basketball', 2990],
      ['Yoga Mat Premium', 'Non-slip cushioned exercise mat', 1990],
      [
        'Bowflex Adjustable Dumbbells',
        'Space-saving adjustable dumbbell set',
        24990,
      ],
      [
        'Trek Marlin 7 Mountain Bike',
        'Hardtail mountain bike for trail riding',
        64990,
      ],
      ['Coleman Camping Tent', '4-person weatherproof dome tent', 12990],
      [
        'The North Face Backpack',
        'Durable daypack for hiking and travel',
        8990,
      ],
      ['Fitbit Charge 6', 'Fitness tracker with heart rate monitoring', 12990],
      [
        'Garmin Forerunner 265',
        'GPS running watch with training metrics',
        39990,
      ],
      [
        'Spalding Basketball Hoop',
        'Portable adjustable basketball hoop',
        14990,
      ],
      ['Decathlon Kayak', 'Inflatable touring kayak', 34990],
      ['Nike Football', 'Official match-quality soccer ball', 2990],
      ['Under Armour Gym Bag', 'Spacious duffel bag for training gear', 3990],
    ],
  },
  {
    name: 'Books',
    slug: 'books',
    images: [
      img('1512820790803-83ca734da794'),
      img('1544716278-ca5e3f4abd8c'),
      img('1481627834876-b7833e8f5570'),
    ],
    products: [
      ['Atomic Habits', 'James Clear on building good habits', 890],
      ['The Psychology of Money', 'Morgan Housel on wealth and behavior', 790],
      ['Sapiens', 'Yuval Noah Harari on the history of humankind', 890],
      ['1984', 'George Orwell dystopian classic novel', 590],
      ['Dune', 'Frank Herbert science fiction epic', 690],
      ['The Hobbit', "J.R.R. Tolkien's classic fantasy adventure", 690],
      [
        'Clean Code',
        "Robert C. Martin's guide to writing better software",
        1990,
      ],
      ['Rich Dad Poor Dad', "Robert Kiyosaki's personal finance classic", 690],
      ['The Lean Startup', "Eric Ries's guide to building startups", 890],
      ['Harry Potter Box Set', 'Complete seven-book collection', 4990],
      [
        'Thinking, Fast and Slow',
        "Daniel Kahneman's exploration of decision making",
        890,
      ],
      ['The Alchemist', "Paulo Coelho's philosophical novel", 590],
    ],
  },
  {
    name: 'Toys & Games',
    slug: 'toys-games',
    images: [
      img('1558877385-81a1c7e67d72'),
      img('1587654780291-39c9404d746b'),
      img('1516981879613-9f5da904015f'),
    ],
    products: [
      [
        'LEGO Star Wars Millennium Falcon',
        'Detailed buildable starship model',
        54990,
      ],
      [
        'LEGO City Police Station',
        'Playset with vehicles and minifigures',
        6990,
      ],
      ['Monopoly Classic', 'Classic property trading board game', 1990],
      ['UNO Card Game', 'Fast-paced family card game', 590],
      ["Rubik's Cube", 'Classic 3x3 twist puzzle', 690],
      ['Hot Wheels Track Set', 'High-speed loop track playset', 2990],
      ['Barbie Dreamhouse', 'Multi-level dollhouse with furniture', 12990],
      ['Nerf Elite Blaster', 'Foam dart blaster toy', 1990],
      ['Jenga Classic', 'Wooden block stacking game', 990],
      ['Play-Doh Set', 'Modeling compound activity set', 1490],
      ['LEGO Technic Bugatti', 'Advanced mechanical model car set', 34990],
    ],
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    images: [
      img('1555041469-a586c61ea9bc'),
      img('1567538096630-e0c55bd6374c'),
      img('1586023492125-27b2c045efd7'),
    ],
    products: [
      ['IKEA MALM Bed Frame', 'Minimalist veneer bed frame', 19990],
      ['IKEA KIVIK Sofa', 'Comfortable three-seat fabric sofa', 54990],
      ['Herman Miller Aeron Chair', 'Ergonomic mesh office chair', 129990],
      ['IKEA BILLY Bookcase', 'Classic adjustable-shelf bookcase', 6990],
      ['West Elm Coffee Table', 'Mid-century modern wood coffee table', 34990],
      ['IKEA LACK Side Table', 'Simple lightweight side table', 1990],
      ['Ashley Recliner Chair', 'Upholstered manual recliner', 44990],
      ['IKEA POANG Armchair', 'Bentwood frame armchair with cushion', 9990],
      ['Wayfair Dining Table Set', '6-seat dining table with chairs', 39990],
      ['IKEA HEMNES Dresser', '8-drawer solid wood dresser', 22990],
      [
        'Standing Desk Electric',
        'Height-adjustable electric standing desk',
        29990,
      ],
    ],
  },
  {
    name: 'Watches & Jewelry',
    slug: 'watches-jewelry',
    images: [
      img('1523275335684-37898b6baf30'),
      img('1524592094714-0f0654e20314'),
      img('1611652022419-a9419f74343d'),
    ],
    products: [
      [
        'Apple Watch Series 9',
        'Smartwatch with health and fitness tracking',
        39990,
      ],
      ['Casio G-Shock', 'Rugged shock-resistant digital watch', 8990],
      [
        'Fossil Gen 6 Smartwatch',
        'Wear OS smartwatch with heart rate sensor',
        14990,
      ],
      ['Seiko 5 Automatic', 'Classic automatic mechanical watch', 12990],
      ['Garmin Fenix 7', 'Multisport GPS watch for outdoor adventures', 59990],
      ['Pandora Charm Bracelet', 'Sterling silver bracelet with charms', 3990],
      ['Swarovski Necklace', 'Crystal pendant necklace', 9990],
      ['Citizen Eco-Drive Watch', 'Solar-powered analog watch', 19990],
      ['Tissot PRX', 'Retro-inspired stainless steel watch', 44990],
      ['Michael Kors Watch', 'Stainless steel fashion watch', 14990],
      ['Daniel Wellington Classic', 'Minimalist leather strap watch', 9990],
      ['Silver Hoop Earrings', 'Sterling silver hoop earrings', 2990],
      ['Gold Chain Necklace', '14k gold-plated chain necklace', 24990],
    ],
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    images: [
      img('1503376780353-7e6692767b70'),
      img('1552519507-da3b142c6e3d'),
      img('1486262715619-67b85e0b08d3'),
    ],
    products: [
      ['Michelin All-Season Tires', 'Set of durable all-season tires', 8990],
      ['Bosch Car Battery', 'High-performance automotive battery', 7990],
      ['Thule Roof Box', 'Aerodynamic rooftop cargo box', 34990],
      ['WeatherTech Floor Mats', 'Custom-fit all-weather floor mats', 9990],
      ['Garmin DriveSmart GPS', 'Voice-activated car GPS navigator', 12990],
      ['Chemical Guys Car Wash Kit', 'Complete exterior car care kit', 3990],
      ['Anker Car Charger', 'Fast-charging dual-port USB car charger', 1490],
      ['Dash Cam 4K', 'Ultra HD dashboard camera with night vision', 6990],
      ['Car Vacuum Cleaner', 'Portable handheld car vacuum', 2990],
      ['Tire Pressure Gauge', 'Digital tire pressure gauge', 990],
      ['Car Phone Mount', 'Magnetic dashboard phone holder', 990],
      ['Roof Rack Cargo Carrier', 'Rooftop cargo bag for extra storage', 19990],
      [
        'Portable Jump Starter',
        'Compact battery jump starter with power bank',
        5990,
      ],
    ],
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const sellers = await Promise.all(
    [
      { email: 'seller1@example.com', name: 'Urban Gear Store' },
      { email: 'seller2@example.com', name: 'TechHub Market' },
      { email: 'seller3@example.com', name: 'Home & Living Co' },
    ].map((s) => prisma.user.create({ data: { ...s, password: 'password' } })),
  );

  let productCount = 0;
  let index = 0;

  for (const cat of categories) {
    const category = await prisma.category.create({
      data: { name: cat.name, slug: cat.slug },
    });

    for (const [title, description, price] of cat.products) {
      const seller = sellers[index % sellers.length];
      const hasDiscount = index % 3 === 0;
      const images = [
        cat.images[index % cat.images.length],
        cat.images[(index + 1) % cat.images.length],
      ];

      await prisma.product.create({
        data: {
          title,
          description,
          price: price * 100,
          discountPrice: hasDiscount ? Math.round(price * 0.85 * 100) : null,
          images,
          stock: 5 + (index % 40),
          categoryId: category.id,
          sellerId: seller.id,
        },
      });

      productCount++;
      index++;
    }
  }

  console.log(
    `Seed completed: ${productCount} products across ${categories.length} categories`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

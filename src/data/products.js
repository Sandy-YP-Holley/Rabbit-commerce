const products = [
  {
    id: 1,
    name: "Timothy Hay Bundle",
    price: 14.99,
    category: "Food & Treats",
    stock: 42,
    image: "https://loremflickr.com/400/400/hay,rabbit",
    description:
      "Farm-fresh timothy hay, essential for healthy rabbit digestion and dental wear.",
  },
  {
    id: 2,
    name: "Deluxe Rabbit Hutch",
    price: 189.99,
    category: "Housing & Bedding",
    stock: 8,
    image: "https://loremflickr.com/400/400/rabbit,hutch",
    description:
      "Spacious two-story wooden hutch with a pull-out tray and secure outdoor run.",
  },
  {
    id: 3,
    name: "Ceramic Food Bowl",
    price: 12.5,
    category: "Feeding Supplies",
    stock: 25,
    image: "https://loremflickr.com/400/400/pet,bowl,ceramic",
    description:
      "Chew-proof, tip-resistant ceramic bowl for pellets and fresh veggies.",
  },
  {
    id: 4,
    name: "No-Drip Water Bottle",
    price: 9.99,
    category: "Feeding Supplies",
    stock: 30,
    image: "https://loremflickr.com/400/400/pet,waterbottle",
    description:
      "Leak-proof 500ml water bottle with easy-mount bracket for cages and hutches.",
  },
  {
    id: 5,
    name: "Natural Willow Chew Toys",
    price: 8.49,
    category: "Toys & Enrichment",
    stock: 60,
    image: "https://loremflickr.com/400/400/willow,twig",
    description:
      "Set of 5 handwoven willow chews that support dental health and reduce boredom.",
  },
  {
    id: 6,
    name: "Corner Litter Box",
    price: 16.99,
    category: "Housing & Bedding",
    stock: 15,
    image: "https://loremflickr.com/400/400/litterbox,pet",
    description:
      "Space-saving triangular litter box with high back wall to prevent spills.",
  },
  {
    id: 7,
    name: "Rabbit Pellet Feed (5kg)",
    price: 22.99,
    category: "Food & Treats",
    stock: 20,
    image: "https://loremflickr.com/400/400/rabbit,pellets",
    description:
      "Balanced nutrition pellets fortified with vitamins for adult rabbits.",
  },
  {
    id: 8,
    name: "Soft Grooming Brush",
    price: 11.25,
    category: "Grooming",
    stock: 33,
    image: "https://loremflickr.com/400/400/pet,brush",
    description:
      "Gentle slicker brush designed to remove loose fur without irritating sensitive skin.",
  },
  {
    id: 9,
    name: "Foldable Playpen",
    price: 54.99,
    category: "Housing & Bedding",
    stock: 5,
    image: "https://loremflickr.com/400/400/pet,playpen",
    description:
      "8-panel portable playpen for safe indoor or outdoor exercise time.",
  },
  {
    id: 10,
    name: "Freeze-Dried Banana Treats",
    price: 6.99,
    category: "Food & Treats",
    stock: 0,
    image: "https://loremflickr.com/400/400/dried,banana",
    description:
      "All-natural, no added sugar treats rabbits love, perfect for training rewards.",
  },
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getRelatedProducts(product, limit = 3) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

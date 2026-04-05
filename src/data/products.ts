import herbalTonic from "@/assets/product-herbal-tonic.png";
import mensHealth from "@/assets/product-mens-health.png";
import stdTreatment from "@/assets/product-std-treatment.png";
import liverKidney from "@/assets/product-liver-kidney.png";
import womensHealth from "@/assets/product-womens-health.png";

export interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  image: string;
  bestseller: boolean;
  inStock: boolean;
}

export const categories = [
  "All",
  "Immunity",
  "Digestive",
  "Men's Health",
  "Women's Health",
  "Detox",
  "STD Treatment",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Herbal Tonic Immune Booster",
    category: "Immunity",
    rating: 4.8,
    reviews: 124,
    description: "A powerful blend of ancient roots and leaves designed to strengthen your immune system naturally. This curative and preventive herbal tonic contains essential nutrients from natural fruits and herbs.",
    features: [
      "100% natural ingredients",
      "Boosts immune system",
      "Curative & preventive",
      "Rich in antioxidants",
    ],
    image: herbalTonic,
    bestseller: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Men's Health Treatment Pack",
    category: "Men's Health",
    rating: 4.9,
    reviews: 89,
    description: "Complete herbal treatment for men's reproductive health including STD treatment, infertility support, prostate health, and sexual performance enhancement.",
    features: [
      "STD treatment",
      "Infertility support",
      "Prostate health",
      "Sexual performance",
    ],
    image: mensHealth,
    bestseller: true,
    inStock: true,
  },
  {
    id: 3,
    name: "STD Complete Treatment Pack",
    category: "STD Treatment",
    rating: 4.7,
    reviews: 156,
    description: "Comprehensive herbal treatment package for STDs including gonorrhea, staphylococcus, syphilis, and more. A combination of roots and leaves for broad-spectrum treatment.",
    features: [
      "Treats gonorrhea",
      "Staphylococcus treatment",
      "Broad spectrum action",
      "No side effects",
    ],
    image: stdTreatment,
    bestseller: false,
    inStock: true,
  },
  {
    id: 4,
    name: "Goldlife Liver & Kidney Supplement",
    category: "Detox",
    rating: 4.6,
    reviews: 78,
    description: "Multi-cure dietary supplement that reduces cholesterol, reverses aging, boosts memory, strengthens bones, and supports liver and kidney health.",
    features: [
      "Reduces cholesterol",
      "Liver detoxification",
      "Kidney support",
      "Boosts energy",
    ],
    image: liverKidney,
    bestseller: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Women's Health Complete Pack",
    category: "Women's Health",
    rating: 4.8,
    reviews: 112,
    description: "Comprehensive herbal treatment for women's health including fibroid treatment, endometriosis, fertility support, vaginal infections, and menstrual regulation.",
    features: [
      "Fibroid treatment",
      "Fertility support",
      "Hormonal balance",
      "Menstrual regulation",
    ],
    image: womensHealth,
    bestseller: true,
    inStock: true,
  },
  {
    id: 6,
    name: "Digestive Harmony Tonic",
    category: "Digestive",
    rating: 4.7,
    reviews: 93,
    description: "Traditional herbal blend for digestive health. Soothes the stomach, aids digestion, and promotes gut health with natural herbs and roots.",
    features: [
      "Soothes stomach",
      "Aids digestion",
      "Gut health support",
      "Natural detox",
    ],
    image: herbalTonic,
    bestseller: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Immune Defense Daily Supplement",
    category: "Immunity",
    rating: 4.9,
    reviews: 145,
    description: "Daily immune support supplement made from carefully selected herbs to keep your body's defenses strong all year round.",
    features: [
      "Daily immune support",
      "Natural antioxidants",
      "Energy boost",
      "Preventive care",
    ],
    image: herbalTonic,
    bestseller: false,
    inStock: true,
  },
  {
    id: 8,
    name: "Prostate Health Formula",
    category: "Men's Health",
    rating: 4.6,
    reviews: 67,
    description: "Specialized herbal formula for prostate health, supporting urinary function and overall men's reproductive wellness.",
    features: [
      "Prostate support",
      "Urinary health",
      "Natural ingredients",
      "Long-term benefits",
    ],
    image: mensHealth,
    bestseller: false,
    inStock: true,
  },
];

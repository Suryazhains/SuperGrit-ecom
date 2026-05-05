// src/data/products.ts

// Product 1 Images (Moringa Soup Mix)
import moringaSoupImg1 from '../assets/MarginSoupmixProduct1.png';
import moringaSoupImg2 from '../assets/MarginSoupmixProduct1.png';
import moringaSoupImg3 from '../assets/MarginSoupmixProduct1.png';

// Product 2 Images (Moringa Powder)
import moringaPowderImg1 from '../assets/MarginaPowderProduct2.png';
import moringaPowderImg2 from '../assets/MarginaPowderProduct2.png';
import moringaPowderImg3 from '../assets/MarginaPowderProduct2.png';

// Product 3 Images (Pomegranate Infusion)
import moringaPomegranateImg1 from '../assets/MarginaPomogranateInfustionProduct3.png';
import moringaPomegranateImg2 from '../assets/MarginaPomogranateInfustionProduct3.png';
import moringaPomegranateImg3 from '../assets/MarginaPomogranateInfustionProduct3.png';

// Product 4 Images (Strawberry Infusion)
import moringaStrawberryImg1 from '../assets/MarginaStawberryInfustionProduct4.png';
import moringaStrawberryImg2 from '../assets/MarginaStawberryInfustionProduct4.png';
import moringaStrawberryImg3 from '../assets/MarginaStawberryInfustionProduct4.png';

export const products = [
  {
    id: 1,
    name: "Moringa Soup Mix",
    subtitle: "Instant Nutritious Herbal Soup",
    price: 12.99,
    originalPrice: 15.99,
    image: moringaSoupImg1,
    images: [moringaSoupImg1, moringaSoupImg2, moringaSoupImg3],
    description:
      "A wholesome and nourishing soup mix made from premium moringa leaves blended with natural spices. Rich in vitamins, minerals, and antioxidants, this easy-to-prepare soup supports digestion and daily wellness. Just add hot water for a quick healthy meal.",
    inStock: true,
    bgClass: "bg-green-50"
  },
  {
    id: 2,
    name: "Moringa Leaf Powder",
    subtitle: "100% Natural Superfood Supplement",
    price: 14.99,
    originalPrice: 18.99,
    image: moringaPowderImg1,
    images: [moringaPowderImg1, moringaPowderImg2, moringaPowderImg3],
    description:
      "Pure moringa oleifera leaf powder packed with essential nutrients, iron, and antioxidants. Ideal for mixing into smoothies, juices, or warm water. Helps boost energy, immunity, and overall health naturally.",
    inStock: true,
    bgClass: "bg-green-100"
  },
  {
    id: 3,
    name: "Moringa Pomegranate Infusion",
    subtitle: "Antioxidant-Rich Herbal Tea",
    price: 9.99,
    originalPrice: 12.99,
    image: moringaPomegranateImg1,
    images: [
      moringaPomegranateImg1,
      moringaPomegranateImg2,
      moringaPomegranateImg3
    ],
    description:
      "A refreshing herbal infusion combining nutrient-rich moringa with the tangy sweetness of pomegranate. Packed with antioxidants, this tea supports detox, hydration, and overall vitality. Enjoy it hot or chilled.",
    inStock: true,
    bgClass: "bg-green-200"
  },
  {
    id: 4,
    name: "Moringa Strawberry Infusion",
    subtitle: "Fruity Herbal Wellness Tea",
    price: 9.99,
    originalPrice: 12.99,
    image: moringaStrawberryImg1,
    images: [
      moringaStrawberryImg1,
      moringaStrawberryImg2,
      moringaStrawberryImg3
    ],
    description:
      "A delicious blend of moringa and strawberry creating a naturally sweet and refreshing herbal tea. Rich in nutrients and antioxidants, perfect for relaxation and daily wellness support.",
    inStock: true,
    bgClass: "bg-green-200"
  }
];
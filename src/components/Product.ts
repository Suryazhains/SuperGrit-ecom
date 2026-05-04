// src/data/products.ts

// Product 1 (Box) Images
import boxMain from '../assets/bottel2.png';
import boxThumb1 from '../assets/bottel4.png';
import boxThumb2 from '../assets/bottel3.png';


// Product 2 (Bottle) Images
import bottleMain from '../assets/cigarette2.png';
import bottleThumb1 from '../assets/product2.png';
import bottleThumb2 from '../assets/cigarette3.png';


export const products = [
  {
    id: 1,
    name: "Super Grit Organic Pack (Box)",
    subtitle: "Premium Boxed Herbal Alternative",
    price: 24.00,
    originalPrice: 30.00,
    image: boxMain,
    images: [boxMain, boxThumb1, boxThumb2],
    description: "Our classic box packaging. Premium organic blend with reduced additives. Designed as a transitional tool for controlled reduction and mindful consumption. Perfect for keeping in your pocket.",
    inStock: true,
    bgClass: "bg-gray-50" // Box has a light background in your design
  },
  {
    id: 2,
    name: "Super Grit Organic Pack (Bottle)",
    subtitle: "Nicotine-Free Herbal Alternative",
    price: 210.00,
    originalPrice: 315.00,
    image: bottleMain,
    images: [bottleMain, bottleThumb1, bottleThumb2],
    description: "Super Grit is a premium herbal alternative designed to help reduce smoking habits while delivering a smooth and satisfying experience without tobacco or nicotine. Comes in a durable, reusable bottle.",
    inStock: true,
    bgClass: "bg-black" // Bottle has a dark background in your design
  }
];
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Importing the Header and Footer components
import Header from './Header'; 
import Footer from './footer'; // Use your specific footer name

// 2. Importing your dynamic product data
import { products } from './Product';

// Importing your banner images
import ourbanner from '../assets/banner1.png'; 
import ourbanner2 from '../assets/banner2.png';
import ourbanner3 from '../assets/banner3.png';

// Define the CartItem interface directly here to fix the import error
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Homeone: React.FC = () => {
  const navigate = useNavigate();
  const banners = [ourbanner, ourbanner2, ourbanner3];
  
  // Carousel States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // We add a clone of the first banner to the end to create an infinite right-to-left loop
  const extendedBanners = [...banners, banners[0]];

  // Local Sync State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    const saved = localStorage.getItem('superGritCart');
    if (saved) setCartItems(JSON.parse(saved));
    else setCartItems([]);
  };

  useEffect(() => {
    loadCart(); // Initial Load
    window.addEventListener('cartUpdated', loadCart); // Listen to Header changes
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  // 1. Infinite Loop Interval (Speed increased: Stays on screen for 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); 
    
    return () => clearInterval(interval);
  }, []);

  // 2. The "Invisible Snap" to reset the loop
  useEffect(() => {
    if (currentIndex === banners.length) {
      // Once it slides to the cloned first banner, wait for the animation to finish
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Turn off the slide animation
        setCurrentIndex(0); // Instantly snap back to the REAL first banner
      }, 800); // 800ms perfectly matches the 0.8s transition duration below
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, banners.length]);

  const updateCartQuantity = (e: React.MouseEvent, itemId: number, type: 'increase' | 'decrease') => {
    e.stopPropagation(); 
    const updated = cartItems.map(item => {
      if (item.id === itemId) {
        const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    localStorage.setItem('superGritCart', JSON.stringify(updated));
    setCartItems(updated); // Instantly update local state
    window.dispatchEvent(new Event('cartUpdated')); // Triggers Header badge & local state update
  };

  const handleCartAction = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); 
    const isItemInCart = cartItems.some(item => item.id === product.id);

    if (isItemInCart) {
      window.dispatchEvent(new Event('openCartDrawer')); // Open Header Drawer
    } else {
      const updated = [...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
      localStorage.setItem('superGritCart', JSON.stringify(updated));
      setCartItems(updated); // Instantly update local state
      window.dispatchEvent(new Event('cartUpdated')); // Update Header Badge
    }
  };

  return (
    <div className="min-h-screen bg-[#e1ffb1] font-sans flex flex-col relative">
      <Header />
      
      <main className="flex-grow w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-10 md:gap-14">
        
        {/* Banner Section - Sped up for a snappier feel */}
        <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-sm bg-white aspect-[16/9] md:aspect-[1216/628]">
          <div 
            className="flex h-full w-full"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              // Slide speed changed to 0.8s for a faster right-to-left sweep
              transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none' 
            }}
          >
            {extendedBanners.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Launch Offer - Banner`} 
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-full flex-shrink-0 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full">
          {products.map((product) => {
            const cartItem = cartItems.find(item => item.id === product.id);
            const inCart = !!cartItem;

            return (
              <div 
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-2xl p-5 flex flex-col shadow-sm cursor-pointer hover:shadow-lg transition-shadow group"
              >
           
                <div className={`w-full rounded-xl mb-5 aspect-[590/580] flex items-center justify-center overflow-hidden ${product.bgClass}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="eager" 
                    fetchPriority="high"
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${product.bgClass === 'bg-black' ? 'opacity-90' : ''}`} 
                  />
                </div>
                
                <h3 className="text-[1.1rem] font-bold text-[#1A1A1A] mb-2 group-hover:text-[#1f4c31] transition-colors">{product.name}</h3>
                <p className="text-[13px] text-[#4A5565] mb-6 leading-relaxed flex-grow pr-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  
                  {inCart ? (
                    <div className="flex items-center border-2 border-[#1f4c31] rounded-lg bg-white overflow-hidden h-[42px]" onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => updateCartQuantity(e, product.id, 'decrease')} className="w-10 h-full flex items-center justify-center text-[#1f4c31] hover:bg-[#EEF2FF] font-bold text-lg">-</button>
                      <span className="w-8 text-center font-bold text-gray-900 text-sm">{cartItem.quantity}</span>
                      <button onClick={(e) => updateCartQuantity(e, product.id, 'increase')} className="w-10 h-full flex items-center justify-center text-[#1f4c31] hover:bg-[#EEF2FF] font-bold text-lg">+</button>
                    </div>
                  ) : (
                    <button onClick={(e) => handleCartAction(e, product)} className="bg-[#1f4c31] hover:bg-[#1f4c31] text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-colors h-[42px] flex items-center justify-center">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homeone;
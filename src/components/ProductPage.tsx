import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from './Header'; 
import Footer from './footer'; 
import { products } from './Product';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === Number(id));

  // States
  const [localQuantity, setLocalQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [mainImg, setMainImg] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Always scroll to top when page loads or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const loadCart = () => {
    const saved = localStorage.getItem('superGritCart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    } else {
      setCartItems([]);
    }
  };

  // Listen for cart updates
  useEffect(() => {
    loadCart(); // Initial Load
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  // Set initial main image
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImg(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <button onClick={() => navigate('/')} className="text-[#1f4c31] underline">Return Home</button>
      </div>
    );
  }

  const cartItem = cartItems.find((item: any) => Number(item.id) === Number(product.id));
  const isInCart = !!cartItem;
  
  const displayQuantity = isInCart ? cartItem.quantity : localQuantity;

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    // Read directly from localStorage to prevent any stale state bugs
    const currentCart = JSON.parse(localStorage.getItem('superGritCart') || '[]');
    const cartItemIndex = currentCart.findIndex((item: any) => Number(item.id) === Number(product.id));

    if (cartItemIndex > -1) {
      // Item IS in the cart
      const currentQty = currentCart[cartItemIndex].quantity;
      
      // Prevent decreasing below 1
      if (type === 'decrease' && currentQty <= 1) {
        return; 
      }

      // Update quantity
      const newQty = type === 'increase' ? currentQty + 1 : currentQty - 1;
      currentCart[cartItemIndex].quantity = newQty;
      
      localStorage.setItem('superGritCart', JSON.stringify(currentCart));
      setCartItems(currentCart); 
      window.dispatchEvent(new Event('cartUpdated')); 
    } else {
      // Item is NOT in the cart yet (update local quantity only)
      if (type === 'increase') {
        setLocalQuantity(prev => prev + 1);
      } else if (type === 'decrease' && localQuantity > 1) {
        setLocalQuantity(prev => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    // Read directly from localStorage to guarantee accurate check
    const currentCart = JSON.parse(localStorage.getItem('superGritCart') || '[]');
    const alreadyInCart = currentCart.find((item: any) => Number(item.id) === Number(product.id));

    if (alreadyInCart) {
      // If already in cart, just open the drawer
      window.dispatchEvent(new Event('openCartDrawer'));
    } else {
      // If not in cart, add it
      const updated = [...currentCart, {
        id: Number(product.id),
        name: product.name,
        price: Number(product.price),
        quantity: Number(localQuantity),
        image: mainImg
      }];
      
      localStorage.setItem('superGritCart', JSON.stringify(updated));
      setCartItems(updated); 
      window.dispatchEvent(new Event('cartUpdated')); 
      
      // Optionally auto-open cart immediately upon adding:
      // window.dispatchEvent(new Event('openCartDrawer'));
    }
  };

  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col w-full relative">
      
      <Header />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#1f4c31] transition-colors mb-8 font-medium text-sm w-max"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 w-full">
          
          {/* LEFT COLUMN: Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className={`w-full aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-black`}>
              <img src={mainImg} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {product.images.slice(0, 3).map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setMainImg(img)}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-black ${
                    mainImg === img ? 'border-[#1f4c31]' : 'border-transparent hover:border-gray-300'
                  } flex items-center justify-center`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details */}
          <div className="w-full md:w-1/2 flex flex-col pt-1 lg:pr-8">
            
            {product.inStock && (
              <div className="inline-flex items-center gap-1.5 border border-green-200 bg-green-50 text-green-600 px-2 py-0.5 rounded text-xs font-medium w-max mb-4">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                In Stock
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-1 tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm mb-5">
              {product.subtitle || 'Nicotine-Free Herbs Alternative'}
            </p>

            <div className="flex flex-col mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-400 line-through text-lg">₹{product.originalPrice}</span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-green-500 text-sm mt-1 font-medium">
                  Save ₹{savings} - {discountPercent}% off
                </span>
              )}
            </div>

            <div className="inline-flex items-center gap-2 bg-[#eaf2ed] text-[#1f4c31] text-xs font-medium px-2.5 py-1 rounded w-max mb-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Buy 2 Get 1 Free
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <span className="block text-sm font-medium text-[#101828] mb-2">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-md w-max overflow-hidden">
                <button onClick={() => handleQuantityChange('decrease')} className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors">-</button>
                <span className="w-10 text-center text-sm font-medium border-x border-gray-300 py-1.5">{displayQuantity}</span>
                <button onClick={() => handleQuantityChange('increase')} className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors">+</button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mb-3">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#1f4c31] hover:bg-[#163824] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isInCart ? 'Go to Cart' : 'Add to Cart'}
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors">
                Buy Now
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3H15V16H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 8H19.5L23 11.5V16H15V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 20.5C6.88071 20.5 8 19.3807 8 18C8 16.6193 6.88071 15.5 5.5 15.5C4.11929 15.5 3 16.6193 3 18C3 19.3807 4.11929 20.5 5.5 20.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 20.5C19.8807 20.5 21 19.3807 21 18C21 16.6193 19.8807 15.5 18.5 15.5C17.1193 15.5 16 16.6193 16 18C16 19.3807 17.1193 20.5 18.5 20.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Free delivery in 3-5 days
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12 w-full">
          <div className="flex flex-wrap gap-8 border-b border-gray-200 mb-4 w-full">
            {['Description', 'Ingredients', 'Benefits', 'Shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium relative transition-colors ${
                  activeTab === tab ? 'text-[#1f4c31]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#1f4c31]"></span>
                )}
              </button>
            ))}
          </div>

          <div className="text-gray-600 text-sm leading-relaxed max-w-full min-h-[160px]">
            {activeTab === 'Description' && (
              <p>
                {product.description || "Super Grit Organic Pack is a premium herbal alternative designed to help reduce smoking habits. Made with natural ingredients, it delivers a smooth and satisfying experience without tobacco or nicotine. Perfect for those looking to gradually cut down and take control of their habits."}
              </p>
            )}
            {activeTab === 'Ingredients' && (
              <p>
                100% natural herbal blend. Made with premium chamomile, peppermint, and green tea extracts. Free from tobacco, nicotine, and artificial additives.
              </p>
            )}
            {activeTab === 'Benefits' && (
              <ul className="list-disc pl-5 space-y-1">
                <li>Helps break the psychological habit of smoking with zero nicotine.</li>
                <li>Provides an oral fixation substitute.</li>
                <li>Made with calming herbal ingredients.</li>
              </ul>
            )}
            {activeTab === 'Shipping' && (
              <p>
                Free standard shipping on all orders taking 3-5 business days. Expedited shipping is available at checkout for an additional fee.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default ProductPage;
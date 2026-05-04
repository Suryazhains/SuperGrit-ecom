import React, { useState, useEffect } from 'react';
import SuperGritLogo from '../../public/assets/Super Grit.svg'; // Make sure this path matches your logo location

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to load the cart from LocalStorage
  const loadCart = () => {
    const saved = localStorage.getItem('superGritCart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    } else {
      setCartItems([]);
    }
  };

  // Listen for Custom Events from Homeone and ProductPage
  useEffect(() => {
    loadCart(); // Load on mount

    const handleCartUpdate = () => loadCart();
    const handleOpenCart = () => setIsCartOpen(true);

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('openCartDrawer', handleOpenCart);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('openCartDrawer', handleOpenCart);
    };
  }, []);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  // Handle Cart Item Quantity Updates inside the drawer
  const updateQuantity = (itemId: number, type: 'increase' | 'decrease') => {
    const updated = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove if quantity goes to 0
    
    localStorage.setItem('superGritCart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('cartUpdated')); // Tell other pages to sync
  };

  // Remove Item directly from Cart Drawer
  const removeFromCart = (itemId: number) => {
    const updated = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('superGritCart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('cartUpdated')); // Tell other pages to sync
  };

  // Calculate totals
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      <header className="w-full bg-white px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.05)] sticky top-0 z-50">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.location.href = '/'}>
           <img src={SuperGritLogo} alt="Super Grit Logo" className="h-8 md:h-10 object-contain" /> 
        </div>

        {/* Cart Button Section */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors relative group"
        >
          {/* Cart SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          
          <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
            Cart
          </span>

          {/* Dynamic Red Badge Notification */}
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </header>

      {/* --- CART SIDEBAR (DRAWER) COMPONENT --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <p className="text-sm text-gray-500 mt-1">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 opacity-50">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col flex-grow justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">₹{item.price} each</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-3">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, 'decrease')}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >-</button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 'increase')}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >+</button>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer / Subtotal */}
        <div className="border-t border-gray-100 p-6 bg-gray-50 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">Subtotal:</span>
            <span className="text-xl font-bold text-gray-900">₹{cartSubtotal}</span>
          </div>
          <button 
            disabled={cartItems.length === 0}
            className="w-full bg-[#465AE6] hover:bg-[#3F4DB8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
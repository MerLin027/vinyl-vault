/**
 * Updates the cart count and dispatches a custom event
 */
export const updateCartCount = () => {
  // Create and dispatch a custom event for components to listen for
  const event = new CustomEvent('cartUpdated');
  window.dispatchEvent(event);
};

/**
 * Adds a product to the cart
 * @param {Object} product - The product to add to the cart
 */
export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Clean up the product data
  const cleanProduct = {
    id: product.id,
    title: product.title,
    price: parseFloat(product.price),
    images: product.images,
    category: product.category,
    quantity: 1
  };
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push(cleanProduct);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Dispatch event to update cart count in Navbar
  updateCartCount();
  
  // Return the updated cart
  return cart;
};

/**
 * Removes a product from the cart
 * @param {string|number} productId - The ID of the product to remove
 */
export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const updatedCart = cart.filter(item => item.id !== productId);
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  // Dispatch event to update cart count in Navbar
  updateCartCount();
  
  // Return the updated cart
  return updatedCart;
};

/**
 * Updates the quantity of a product in the cart
 * @param {string|number} productId - The ID of the product to update
 * @param {number} quantity - The new quantity
 */
export const updateCartItemQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const updatedCart = cart.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: Math.max(1, quantity) };
    }
    return item;
  });
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  // Dispatch event to update cart count in Navbar
  updateCartCount();
  
  // Return the updated cart
  return updatedCart;
};

/**
 * Clears the cart
 */
export const clearCart = () => {
  localStorage.removeItem('cart');
  
  // Dispatch event to update cart count in Navbar
  updateCartCount();
  
  // Return an empty cart
  return [];
}; 
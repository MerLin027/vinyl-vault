/**
 * Ensures a product has all necessary fields and format for display
 * @param {Object} product - The product object to normalize
 * @returns {Object} - Normalized product object
 */
export const normalizeProduct = (product) => {
  if (!product) return null;
  
  // Ensure product has all required fields
  return {
    id: product.id || Math.random().toString(36).substr(2, 9),
    title: product.title || 'Untitled Product',
    price: typeof product.price === 'number' ? product.price : 
           typeof product.price === 'string' ? parseFloat(product.price) : 0,
    description: product.description || '',
    category: product.category || { id: 0, name: 'Uncategorized' },
    images: Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ['https://via.placeholder.com/300?text=No+Image'],
    // Add vinyl-specific properties if they don't exist
    genre: product.genre || getRandomGenre(),
    decade: product.decade || getRandomDecade(),
    condition: product.condition || getRandomCondition()
  };
};

/**
 * Normalizes an array of products
 * @param {Array} products - Array of product objects
 * @returns {Array} - Array of normalized product objects
 */
export const normalizeProducts = (products) => {
  if (!Array.isArray(products)) return [];
  return products.map(normalizeProduct).filter(Boolean);
};

/**
 * Safely parses API response
 * @param {Object} response - Fetch API response
 * @returns {Promise<Array>} - Promise that resolves to an array of products
 */
export const parseApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }
    return normalizeProducts(data);
  } catch (err) {
    console.error('Error parsing API response:', err);
    return [];
  }
};

// Helper functions to generate random vinyl data
const getRandomGenre = () => {
  const genres = ['Rock', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Soul', 'Blues', 'Pop'];
  return genres[Math.floor(Math.random() * genres.length)];
};

const getRandomDecade = () => {
  const decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
  return decades[Math.floor(Math.random() * decades.length)];
};

const getRandomCondition = () => {
  const conditions = ['Mint', 'Near Mint', 'Very Good Plus', 'Very Good', 'Good', 'Fair'];
  return conditions[Math.floor(Math.random() * conditions.length)];
}; 
export const getProductsInWishlist = () => {
  if(localStorage.getItem("products_wishlist") != null) {
    return JSON.parse(localStorage.getItem("products_wishlist"));
  } else {
    return null;
  }
}

export const addToWishlist = (productId) => {

  let products = localStorage.getItem("products_wishlist");

  if(products) {
    products = JSON.parse(products);

    if(products.find(i => i === productId) == undefined) {
      products.push(productId);

      localStorage.setItem("products_wishlist", JSON.stringify(products));
    }
  } else {
    localStorage.setItem("products_wishlist", JSON.stringify([productId]));
  }
};

export const removeFromWishlist = (productId) => {
  let products = localStorage.getItem("products_wishlist");

  products = JSON.parse(products);

  const filtered = [...products.filter(i => i !== productId)];

  localStorage.setItem("products_wishlist", JSON.stringify(filtered));
}

export const clearWishlist = () => {
  localStorage.removeItem("products_wishlist");
}

export const isProductInWishlist = (productId) => {
  let products = localStorage.getItem("products_wishlist");

  if(products) {
    products = JSON.parse(products);
    if(products.find(i => i === productId) !== undefined) {
      return true;
    }

    return false;
  }

  return false;
}

export const updateWishlistProducts = (products) => {
  products.map(item => {
    if(isProductInWishlist(item.id)) {
      item.in_wishlist = true;
    } else {
      item.in_wishlist = false;
    }
  });
}

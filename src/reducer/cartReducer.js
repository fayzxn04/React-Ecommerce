const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;

    // TACKLE THE EXISTING PRODUCT!

    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color) {
          let newAmount = curElem.amount + amount;
          // --------------------------------------------------//
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          // --------------------------------------------------//
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });

      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct;

      cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // TO REMOVE ITEM FROM THE CART!

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curElem) => curElem.id !== action.payload
    );
    // Jo match nahi hoga woh updated cart mai aa jayega . The one item we click will never gonna be add in the updatedCart.

    return {
      ...state,
      cart: updatedCart,
    };
  }

  // TO CLEAR THE CART!

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};

export default cartReducer;

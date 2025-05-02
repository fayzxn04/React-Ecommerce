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

  // TO SET THE INCREMENT AND DECREMENT !
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let IncAmount = curElem.amount + 1;

        if (IncAmount >= curElem.max) {
          IncAmount = curElem.max;
        }

        return {
          ...curElem,
          amount: IncAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
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
  // if (action.type === "CART_TOTAL_ITEM") {
  //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
  //     let { amount } = curElem;

  //     initialVal = initialVal + amount;
  //     return initialVal;
  //   }, 0);
  //   return {
  //     ...state,
  //     total_item: updatedItemVal,
  //   };
  // }

  // if (action.type === "CART_TOTAL_PRICE") {
  //   let total_price = state.cart.reduce((initialVal, curElem) => {
  //     let { price, amount } = curElem;

  //     initialVal = initialVal + price * amount;
  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_price,
  //   };
  // }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cart.reduce(
      (acc, curElem) => {
        let { price, amount } = curElem;

        acc.total_item += amount;
        acc.total_price += price * amount;

        return acc;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }
  return state;
};

export default cartReducer;

import { LazyCart } from '../LazyComponents';

const CartManager = ({ cartShouldRender, cartItems, removeFromCart, closeCart, updateQuantity, clearCart, isOpen, onExited, toggleLogin }) => (
  cartShouldRender ? (
    <LazyCart
      cart={cartItems}
      removeFromCart={removeFromCart}
      closeCart={closeCart}
      updateQuantity={updateQuantity}
      clearCart={clearCart}
      isOpen={isOpen}
      onExited={onExited}
      toggleLogin={toggleLogin}
    />
  ) : null
);

export default CartManager; 
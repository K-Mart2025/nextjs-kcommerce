
export const handleClick = (event: MouseEvent, ref: { current: HTMLElement}) => {
    const target = event.target as HTMLElement;
    const card = target.closest('[data-product-card]') as HTMLElement | null;
    if (!card || !ref.current?.contains(card)) return;

    if (target.closest('[data-action="add-to-cart"]')) {
      const productoId = card.getAttribute('data-producto-id');
      console.log('Añadir al carrito producto:', productoId);
      // logic to add to cart
    } else if (target.closest('[data-action="open-product"]')) {
      const productoId = card.getAttribute('data-producto-id');
      console.log('Abrir producto pantalla completa:', productoId);
      // logic to open product full screen
    }
};

/* const handleClick = (event: React.MouseEvent) => {
  const target = event.target as HTMLElement;

  // Check if clicked element or its ancestor has 'data-action'
  const actionElement = target.closest('[data-action]');
  if (!actionElement) return;

  const action = actionElement.getAttribute('data-action');
  const cardElement = target.closest('[data-product-card]');
  if (!cardElement) return;

  const productId = cardElement.getAttribute('data-product-id');

  switch(action) {
    case 'add-to-cart':
      // add to cart logic
      console.log('Add to cart', productId);
      break;
    case 'remove-from-cart':
      // remove from cart logic
      console.log('Remove from cart', productId);
      break;
    case 'open-product':
      // open product detail logic (e.g. manual navigation)
      console.log('Open product', productId);
      break;
    default:
      break;
  }
}; */
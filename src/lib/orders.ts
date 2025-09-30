interface CartItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface GenerateLinkParams {
  server: string;
}

interface FormatOrderResult {
  message: string;
  total: number;
}

// Función para calcular el subtotal de un producto
const calculateItemTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

// Función para formatear un solo producto en el mensaje
const formatCartItem = (item: CartItem, index: number): string => {
  const itemTotal = calculateItemTotal(item.product.price, item.quantity);
  return `➡️ *${index + 1}. ${item.product.name}*  
  - Cantidad: ${item.quantity}  
  - Precio unitario: $${item.product.price.toFixed(2)}  
  - Subtotal: $${itemTotal.toFixed(2)}\n\n`;
};

// Función para formatear el pedido completo
export const useOrderFormatter = () => {
  const formatOrder = (
    cart: CartItem[],
    address?: string,
    method?: string
  ): FormatOrderResult => {
    let total = 0;
    let message = "";

    cart.forEach((item, index) => {
      const itemTotal = calculateItemTotal(item.product.price, item.quantity);
      total += itemTotal;
      message += formatCartItem(item, index);
    });

    message += `*Total a pagar:* $${total.toFixed(2)}\n\n`;
    if (address && method) {
      message += `Dirección: ${address}\nMétodo: ${method}`;
    }
    return { message, total };
  };

  return { formatOrder };
};

// Función para generar el enlace de WhatsApp
export const useWhatsAppLinkGenerator = () => {
  const { formatOrder } = useOrderFormatter();

  const generateLink = ({
    server,
    cart,
    address,
    method,
  }: GenerateLinkParams & {
    cart: CartItem[];
    address?: string;
    method?: string;
  }) => {
    const { message } =
      address && method
        ? formatOrder(cart, address, method)
        : formatOrder(cart);
    const greeting = `¡Hola! Quiero realizar el siguiente pedido:\n\n`;
    const encodedMessage = encodeURIComponent(greeting + message);
    return `https://wa.me/${server}?text=${encodedMessage}`;
  };

  return { generateLink };
};

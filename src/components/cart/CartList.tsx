import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import PrettyText from "../common/PrettyText";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { CartItem } from "./CartItem";
import { PlaceAddressMenu } from "./PlaceAddressMenu";

export const CartList = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  return (
    <Dialog>
      <DialogTrigger className="relative">
        <ShoppingCart className="text-gray-600 w-7 h-7 sm:w-8 sm:h-8" />
        {cart.length > 0 && (
          <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full -top-1 -right-1">
            {cart.length}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-min max-h-[80vh] bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Carrito</DialogTitle>
        </DialogHeader>
        {cart.length === 0 ? (
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <PrettyText> Tu carrito está vacío </PrettyText>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onQuantityChange={(quantity) =>
                  updateQuantity({
                    productId: item.product.id,
                    quantity,
                  })
                }
                onRemove={() => removeFromCart(item.product.id)}
              />
            ))}

            <div className="flex flex-col items-center justify-between gap-4 pt-4 border-t min-w-fit md:flex-row">
              {/* Total y cantidad de productos */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold">Total: ${cartTotal}</h3>
                <h2 className="text-gray-600">Productos: {cartCount}</h2>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col items-center gap-2 md:flex-row">
                <Button
                  variant="outline"
                  onClick={() => clearCart()}
                  className="w-full md:w-auto"
                >
                  Vaciar Carrito
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 md:w-auto hover:bg-blue-700">
                      Proceder al Pago
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-min h-full max-h-[80vh] bg-white overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Dirección</DialogTitle>
                      <DialogDescription>
                        Datos de ubicación
                      </DialogDescription>
                      <PlaceAddressMenu />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

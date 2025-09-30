import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigContext from "@/contexts/ConfigContext";
import { useCart } from "@/hooks/useCart";
import { useOrderFormatter, useWhatsAppLinkGenerator } from "@/lib/orders";
import { useContext, useEffect, useMemo, useState } from "react";
import PrettyText from "../common/PrettyText";
import { Button } from "../ui/button";
import { Address } from "./Address";

export const PlaceAddressMenu = () => {
  const [method, setMethod] = useState<string>("direccion"); // Método seleccionado
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { cart } = useCart();

  const { config } = useContext(ConfigContext);

  const { formatOrder } = useOrderFormatter();
  const { generateLink } = useWhatsAppLinkGenerator();

  const handleSubmit = () => {
    if (method === "null") {
      setError("Por favor, selecciona un método para proveer tu ubicación.");
      return;
    }

    if (!address) {
      setError("Por favor, completa el campo requerido.");
      return;
    }

    setError(null);
    buyProduct();
  };

  const whatsappLink = useMemo(() => {
    if (!config || !config.orderPhone) return "";
    if (address && method) {
      formatOrder(cart, address, method);
      return generateLink({
        server: config.orderPhone,
        cart,
        address,
        method,
      });
    } else {
      return generateLink({
        server: config.orderPhone,
        cart,
      });
    }
  }, [cart, formatOrder, generateLink, config, address, method]);

  const buyProduct = () => {
    if (!config || !config.orderPhone) return;
    window.open(whatsappLink, "_blank");
  };

  useEffect(() => {
    setAddress(""); // Limpia el campo de dirección
  }, [method]);

  return (
    <>
      <Tabs defaultValue="null" className="w-full">
        <TabsList className="flex-1 w-full bg-blue-100 ">
          <TabsTrigger value="null" className="flex-1">
            Sin especificar
          </TabsTrigger>
          <TabsTrigger value="direccion" className="flex-1">
            Dirección
          </TabsTrigger>
        </TabsList>
        <TabsContent value="null" className="h-full">
          <PrettyText>No hay dirección especificada</PrettyText>
          <Button
            onClick={buyProduct}
            className="absolute w-full bg-blue-600 max-w-32 bottom-5 right-5 md:w-auto hover:bg-blue-700"
          >
            Completar
          </Button>
        </TabsContent>
        <TabsContent value="direccion" className="h-full">
          <Address
            method={method}
            address={address}
            setMethod={setMethod}
            setAddress={setAddress}
          />
          {error && <p className="text-red-500">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="absolute w-full bg-blue-600 max-w-32 bottom-5 right-5 md:w-auto hover:bg-blue-700"
          >
            Completar
          </Button>
        </TabsContent>
      </Tabs>
      {/* Mensaje de error */}
    </>
  );
};

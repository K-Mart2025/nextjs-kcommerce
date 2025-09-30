import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";

interface AddressProps {
  method: string;
  address: string;
  setMethod: (method: string) => void;
  setAddress: (address: string) => void;
}

export const Address: React.FC<AddressProps> = ({
  method,
  address,
  setMethod,
  setAddress,
}) => {
  return (
    <div className="space-y-6">
      {/* Selección del método */}
      <div>
        <Label htmlFor="addressmethod" className="text-lg font-bold">
          ¿Cómo deseas proveer tu ubicación?
        </Label>
        <Select
          value={method}
          onValueChange={(value) => setMethod(value)} // Actualiza el método seleccionado
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="direccion">Dirección</SelectItem>
            <SelectItem value="plusCode">
              Código Plus o Latitud/Longitud
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-28"></div>

      {/* Campos dinámicos según el método */}
      {method === "direccion" && (
        <div className="space-y-2">
          <Label htmlFor="direccion">Introduce tu dirección</Label>
          <Input
            id="direccion"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ejemplo: Calle 123, Ciudad"
          />
        </div>
      )}

      {method === "plusCode" && (
        <div className="space-y-2">
          <Label htmlFor="plusCode">
            Introduce tu Código Plus o Latitud/Longitud
          </Label>
          <Input
            id="plusCode"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ejemplo: 8FVC9G8F+6W o 19.4326, -99.1332"
          />
        </div>
      )}
    </div>
  );
};

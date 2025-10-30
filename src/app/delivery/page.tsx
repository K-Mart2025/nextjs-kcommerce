import { fetchConfig } from "@/services/config";
import { Calendar, Clock, MapPin, Truck } from "lucide-react";
import Link from "next/link";

export default async function Delivery() {
  
  const config = await fetchConfig()
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-6 bg-blue-600">
            <h1 className="text-3xl font-bold text-center text-white">
              Información de Envío
            </h1>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <Truck className="w-8 h-8 mr-3 text-red-600" />
              <p className="text-lg text-gray-700">
                Hacemos entregas en La Habana y algunas provincias, a través de
                una agencia externa.
              </p>
            </div>

            <div className="p-6 mb-8 border border-gray-200 rounded-lg bg-gray-50">
              <h2 className="mb-6 text-xl font-semibold text-blue-600">
                Detalles de Envío:
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">
                      Envíos normales:
                    </span>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">24 a 48 h</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">
                      Envíos premium:
                    </span>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">
                        Tú eliges día y hora (con costo adicional)
                      </span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">
                      Todos los envíos:
                    </span>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">
                        Deben solicitarse con al menos 24 h de antelación
                      </span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">
                      Horario de entrega:
                    </span>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">9 a.m. – 5 p.m.</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {config &&
              <div className="text-center">
                <a
                  href={"https://wa.me/+53" + config?.config.orderPhone}
                  className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Consultar disponibilidad de envío
                </a>
              </div>}
          </div>

          <div className="p-4 bg-red-600">
            <p className="text-sm text-center text-white">
              Para consultas sobre envíos, contáctanos directamente a través de
              nuestros canales de atención al cliente.
            </p>
          </div>
        </div>
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            ¿Listo para descubrir K-mart?
          </h2>
          <Link
            href="/"
            className="inline-block px-8 py-3 font-bold text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
          >
            Visitar Tienda
          </Link>
        </div>
      </div>
    </div>
  );
}

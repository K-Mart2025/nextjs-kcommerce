import { fetchConfig } from "@/services/config";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function Returns() {
  const config = await fetchConfig()
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-6 bg-blue-600">
            <h1 className="text-3xl font-bold text-center text-white">
              Cambios y Devoluciones
            </h1>
          </div>

          <div className="p-6 md:p-8">
            <p className="mb-6 text-lg text-gray-700">
              Si recibes un producto dañado, defectuoso o incorrecto, puedes
              solicitar un cambio o devolución dentro de las 24 horas
              posteriores a la compra.
            </p>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-blue-600">
                Requisitos:
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <span className="text-gray-700">Recibo de compra</span>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <span className="text-gray-700">
                    Producto sin abrir y en su empaque original
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-bold text-white">•</span>
                  </div>
                  <span className="text-gray-700">
                    No aplican devoluciones para alimentos perecederos ni
                    productos en oferta
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
              <p className="mb-4 text-gray-700">
                Para ayudarte, solo haz clic en el botón de WhatsApp.
              </p>
              {config && <Link
                href={"https://wa.me/+53" + config?.supportPhone}
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactar por WhatsApp
              </Link>}
            </div>
          </div>

          <div className="p-4 bg-red-600">
            <p className="text-sm text-center text-white">
              Recuerda que nuestro equipo está disponible para resolver
              cualquier duda sobre tu compra.
            </p>
          </div>
        </div>
      </div>
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
  );
}

import Link from "next/link";

export default function Disclaimer() {
  return (
    <>
      <div className="min-h-screen bg-blue-50 w-full">
        <main className="px-4 py-12 mx-auto md:px-6 opacity-95">
          <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="p-6 text-white bg-red-600">
              <h2 className="text-2xl font-bold text-center">
                Información adicional
              </h2>
            </div>

            <div className="p-6 md:p-8">
              <p className="mb-6 text-lg text-gray-700">
                Todo lo que necesitas saber antes de hacer tu pedido.
              </p>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-red-600">•</span>
                  <span>
                    Aceptamos pagos en efectivo, transferencias por EnZona y
                    Transfermóvil.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-red-600">•</span>
                  <span>
                    Los precios están sujetos a cambios sin previo aviso.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-red-600">•</span>
                  <span>
                    Los productos mostrados en redes pueden variar según
                    disponibilidad en tienda.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-red-600">•</span>
                  <span>
                    Las imágenes son referenciales y pueden no coincidir
                    exactamente con el producto real.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-red-600">•</span>
                  <span>
                    No garantizamos disponibilidad continua de artículos K-pop
                    debido a su alta demanda.
                  </span>
                </li>
              </ul>

              <div className="pt-6 mt-8 text-center border-t border-gray-200">
                <p className="font-medium text-blue-600">
                  Gracias por escoger K-Mart para tu experiencia coreana.
                </p>
              </div>
            </div>
          </div>
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-black">
              ¿Listo para descubrir K-mart?
            </h2>
            <Link
              href="/"
              className="inline-block px-8 py-3 font-bold text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
            >
              Visitar Tienda
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

import { fetchConfig } from "@/services/config";

export const BlogPromo = async () => {
  const config = await fetchConfig()
  return (
    <section className="flex items-center mx-2 my-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 ring-4 ring-blue-400 rounded-xl max-w-7xl mx-auto bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg p-8">
        {/* Texto */}
        <div className="flex-1 p-4 text-center md:text-left max-w-xl">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight text-blue-600">
            Visita nuestro <span className="text-blue-800">Blog</span>
          </h2>
          <p className="text-lg max-w-md mx-auto md:mx-0">
            Encuentra <span className="font-bold text-blue-600">eventos</span>, recetas, noticias y mucho más para estar siempre informado y entretenido.
          </p>
        </div>

        {/* Imagen y botón */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full h-96 md:w-3/5 lg:w-2/3">
          <a
            href={config?.config.blogUrl ?? "#"}
            className="absolute bottom-5 right-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-bold py-4 px-10 rounded-xl transition-transform transform hover:scale-105"
            aria-label="Añadir productos al carrito"
          >
            Entra!
          </a>
        </div>
      </div>
    </section>
  );
};

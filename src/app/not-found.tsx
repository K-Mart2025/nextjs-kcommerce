import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-[#eef5ff] w-full flex items-center justify-center min-h-screen p-5 text-center select-none font-sans">
      <div className="container flex flex-col items-center justify-center max-w-xl bg-white rounded-2xl p-10 shadow-lg relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-300 to-sky-500"
          aria-hidden="true"
        ></div>
        <div className="text-sky-300 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <h1 className="text-[72px] font-extrabold text-sky-500 leading-none mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-5">Página no encontrada</h2>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida. Por favor, verifica la URL o regresa a la página de inicio.
        </p>
        <Link
          href="/"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg px-6 py-3 transition-transform active:translate-y-0 transform hover:-translate-y-0.5 shadow-md"
        >
          Volver al Inicio
        </Link>
        <div className="mt-6 flex justify-center gap-6">
          <a href="mailto:info@kmarthabana.run.place" className="text-sky-500 hover:underline text-sm">
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound
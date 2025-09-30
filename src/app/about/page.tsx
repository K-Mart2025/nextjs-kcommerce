"use client"

import { Heart, MapPin, Music, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#CC2121,#2F6DE0,#38adce,#FFFFFF)] "></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="px-4 text-4xl font-bold text-center text-white md:text-5xl">
            Sobre Nosotros
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-700">K-mart</h2>
              <p className="text-xl leading-relaxed">
                K-mart es tu rincón coreano en el Vedado. En 27 y J tenemos
                snacks, ingredientes, cosméticos y artículos K-pop que te van a
                encantar.
              </p>
              <p className="mt-6 text-2xl font-medium text-red-600">
                Descubre Corea, sin salir de Cuba.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex flex-col items-center p-4 text-center rounded-lg shadow-md bg-blue-50">
                <ShoppingBag className="w-10 h-10 mb-2 text-blue-600" />
                <h3 className="font-medium">Snacks y Ingredientes</h3>
              </div>
              <div className="flex flex-col items-center p-4 text-center rounded-lg shadow-md bg-red-50">
                <Heart className="w-10 h-10 mb-2 text-red-600" />
                <h3 className="font-medium">Cosméticos Coreanos</h3>
              </div>
              <div className="flex flex-col items-center p-4 text-center rounded-lg shadow-md bg-blue-50">
                <Music className="w-10 h-10 mb-2 text-blue-600" />
                <h3 className="font-medium">Artículos K-pop</h3>
              </div>
              <div className="flex flex-col items-center p-4 text-center rounded-lg shadow-md bg-red-50">
                <MapPin className="w-10 h-10 mb-2 text-red-600" />
                <h3 className="font-medium">Vedado, 27 y J</h3>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              fill
              src="/assets/ubicacion.jpeg"
              alt="Ubicación del Mercado"
              className="object-cover w-full h-full "
            />
            <div
              className="absolute inset-0 flex items-end transition-transform duration-300 transform bg-gradient-to-t from-black/20 to-transparent hover:scale-105"
              style={{
                boxShadow:
                  "inset -5px -5px 20px #a3a3a3, inset 5px 5px 20px #ffffff",
              }}
            >
              {/* <div className="p-6 text-white">
                <h3 className="text-2xl font-bold">K-Mart</h3>
                <p>Vedado 27 y J</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Korean Wave Section */}
        <div className="p-8 mt-16 shadow-2xl bg-gradient-to-r from-red-50 to-blue-50 rounded-xl">
          <h2 className="mb-6 text-2xl font-bold text-center">
            La Ola Coreana en Cuba
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 font-bold text-red-600">Gastronomía</h3>
              <p>
                Descubre los sabores auténticos de Corea con nuestros
                ingredientes y snacks importados.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 font-bold text-blue-600">Belleza</h3>
              <p>
                Productos de skincare y maquillaje de las mejores marcas
                coreanas para tu rutina diaria.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 font-bold text-red-600">Cultura K-pop</h3>
              <p>
                Merchandising oficial de tus grupos y artistas favoritos del
                K-pop.
              </p>
            </div>
          </div>
        </div>

        {/* Horario Section */}
        <div className="mt-16 overflow-hidden bg-white shadow-2xl rounded-xl">
          <div className="py-4 bg-blue-600">
            <h2 className="text-2xl font-bold text-center text-white">
              Horario de Atención
            </h2>
          </div>
          <div className="p-8 text-center">
            <div className="inline-block mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="mb-2 text-xl font-medium">Lunes a Sábado</p>
              <p className="text-3xl font-bold text-blue-600">
                8:00 AM - 7:00 PM
              </p>
              <div className="grid max-w-md grid-cols-6 gap-2 mx-auto mt-6">
                {["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"].map((day) => (
                  <div
                    key={day}
                    className="px-1 py-2 font-medium text-blue-700 rounded-md bg-blue-50"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-600">Domingos: Cerrado</p>
            </div>
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

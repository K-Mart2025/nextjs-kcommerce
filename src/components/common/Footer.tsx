"use client"

import { fetchConfig } from "@/services/config";
import Link from "next/link";
import { memo } from "react";
const FooterComponent = async function Footer() {
  const config = await fetchConfig()
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Atención al cliente</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={"https://wa.me/+53" + config?.supportPhone}
                  className="hover:text-gray-300"
                >
                  Contáctanos
                </a>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-gray-300">
                  Información de Envío
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-300">
                  Cambios y Devoluciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sobre Nosotros</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-gray-300">
                  Información adicional
                </Link>
              </li>
              <li>
                <a
                  href={"mailto:" + config?.supportEmail}
                  className="hover:text-gray-300"
                >
                  Reportar un error
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Redes Sociales</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/k_marthavana"
                  className="hover:text-gray-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com/channel/0029Vb0INLb5Ejxue4p7BS1q"
                  className="hover:text-gray-300"
                >
                  WhatsApp
                </a>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-gray-300">
                  Twitter
                </a>
              </li> */}
            </ul>
          </div>
          {/* <div>
            <h3 className="mb-4 text-lg font-semibold">
              Subscribe to Newsletter
            </h3>
            <p className="mb-4">Get the latest news and special discounts</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
              <button className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-r-full hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>
        <div className="pt-8 mt-8 text-center border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} K-Mart</p>
        </div>
      </div>
    </footer>
  );
};
const Footer = memo(FooterComponent)
export default Footer

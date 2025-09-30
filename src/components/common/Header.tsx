"use client"

import ConfigContext from "@/contexts/ConfigContext";
import { options } from "@/data/suggest";
import { useToggle } from "@/hooks/useActive";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CartList } from "../cart/CartList";
import { NavBar } from "./NavBar";
import Navigation from "./Navigation";

const HeaderComponent =
  ({
    onSearchChange,
    searchValue,
  }: {
    onSearchChange: (value: string) => void;
    searchValue: string;
  }) => {
    /* HomeLink Logic */
    const [showHomeLink, setShowHomeLink] = useToggle(false);
    const [isSearchOpen, setIsSearchOpen] = useToggle(false); // Estado para controlar la visibilidad del buscador
    const [active, setActive] = useToggle(false);
    const [suggest, setSuggest] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);
    const searchModalRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Cerrar menú si está activo y el clic fue fuera del menú
        if (
          active &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setActive(false);
        }

        // Cerrar modal de búsqueda si está abierto y el clic fue fuera del modal
        if (
          isSearchOpen &&
          searchModalRef.current &&
          !searchModalRef.current.contains(event.target as Node)
        ) {
          setIsSearchOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [active, setActive, isSearchOpen, setIsSearchOpen]);

    // Consume orderNumber from ConfigContext
    const { config } = useContext(ConfigContext);

    const [scrolled, setScrolled] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value); // Pass the input value to the parent component
    };

    useEffect(() => {
      pathname === "/" ? setShowHomeLink(false) : setShowHomeLink(true);
    }, [setShowHomeLink]);

    useEffect(() => {
      const cycle = (iterator = 0) => {
        setTimeout(() => {
          setSuggest(options[iterator]);
          cycle((iterator + 1) % options.length);
        }, 3000);
      };

      cycle();
    }, []);

    // Detectar scroll y actualizar estado
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white/0 shadow-none"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {showHomeLink && <Navigation />}

            <Link href="/" className="mr-4">
              <h1 className="font-bold text-gray-900 transition-transform duration-1000 ease-in-out lg:text-2xl hover:scale-110">
                <Image
                  src="/assets/logo.svg"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="mr-8"
                />
              </h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <NavBar />
          </div>
          <div className="relative flex justify-center content-center align-middle gap-4 md:hidden">
            <div className="">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen(!isSearchOpen);
                }}
                className="md:hidden"
              >
                <div className="relative">
                  <Search className="rounded-md w-7 h-7 hover:shadow-lg" />

                  {searchValue.length > 0 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearchChange("");
                      }}
                      className="absolute -right-2 -top-2 cursor-pointer bg-white/50 rounded-full p-0.5 hover:bg-gray-200"
                      style={{ width: "20px", height: "20px" }}
                      aria-label="Clear filter"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onSearchChange("");
                      }}
                    >
                      <X size={16} />
                    </div>
                  )}
                </div>


                {/* Modal de búsqueda para móviles */}
                {isSearchOpen && (
                  <div
                    ref={searchModalRef}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-11/12 max-w-md p-4 bg-white rounded-lg shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                          Buscar producto
                        </h2>
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          ✕
                        </button>
                      </div>
                      <input
                        onChange={handleInputChange}
                        onFocus={() => setSuggest("")}
                        onBlur={() => setSuggest("Buscar...")}
                        type="text"
                        value={searchValue}
                        placeholder={suggest}
                        className="w-full py-2 pl-8 pr-4 text-black bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
            <div className="rounded-md w-7 h-7 hover:shadow-lg">
              <CartList />
            </div>
            <div className="md:hidden">
              <div
                onClick={() => setActive(!active)}
                className="rounded-md w-7 h-7 hover:shadow-lg cursor-pointer"
                aria-label="Toggle menu"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(!active);
                }}
              >
                <Menu className="w-7 h-7" />
              </div>

              {/* Menú desplegable que aparece si active es true */}
              {active && (
                <div
                  ref={menuRef}
                  className="mt-2 flex flex-col space-y-2 bg-white shadow-md rounded p-4"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    width: "200px",
                    zIndex: 1000,
                  }}
                >
                  <Link href="/about" className="hover:text-blue-600">
                    Sobre Nosotros
                  </Link>
                  <Link href="/disclaimer" className="hover:text-blue-600">
                    Información adicional
                  </Link>
                  <Link
                    href={"mailto:" + config?.supportEmail}
                    className="hover:text-blue-600"
                  >
                    Reportar un error
                  </Link>

                  <Link href="/delivery" className="hover:text-blue-600 mt-4">
                    Información de Envío
                  </Link>
                  <Link href="/returns" className="hover:text-blue-600">
                    Cambios y Devoluciones
                  </Link>
                  <Link
                    href={"https://wa.me/+53" + config?.supportPhone}
                    className="hover:text-blue-600"
                  >
                    Contáctanos
                  </Link>

                  <Link
                    href="https://www.instagram.com/k_marthavana"
                    className="hover:text-blue-600 mt-4"
                  >
                    Instagram
                  </Link>
                  <Link
                    href="https://whatsapp.com/channel/0029Vb0INLb5Ejxue4p7BS1q"
                    className="hover:text-blue-600"
                  >
                    WhatsApp
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative flex w-full">
              <div className="hidden md:block">
                <input
                  onChange={handleInputChange}
                  onFocus={() => setSuggest("")}
                  onBlur={() => setSuggest("Buscar...")}
                  type="text"
                  value={searchValue}
                  placeholder={suggest}
                  className="w-full py-2 pl-8 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 color-black text-ellipsis"
                />
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-center rounded-md w-7 h-7 hover:shadow-lg">
              <CartList />
            </div>
          </div>
        </div>
      </header>
    );
  }

export const Header = memo(HeaderComponent);
export default Header;
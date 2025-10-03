import { useConfig } from "@/hooks/useConfig";
import { DropdownMenu } from "./DropDown";

export const NavBar = () => {
  const config = useConfig()
  return (
    <>
      <DropdownMenu
        label="Sobre Nosotros"
        items={[
          { label: "Sobre Nosotros", href: "/about" },
          { label: "Información adicional", href: "/disclaimer" },
          {
            label: "Reportar un error",
            href: "mailto:" + config?.supportEmail,
          },
        ]}
      />
      <DropdownMenu
        label="Contacto"
        items={[
          { label: "Información de Envío", href: "/delivery" },
          { label: "Cambios y Devoluciones", href: "/returns" },
          {
            label: "Contáctanos",
            href: config?.supportPhone
              ? `https://wa.me/+53${config.supportPhone}`
              : "#",
          },
        ]}
      />
      <DropdownMenu
        label="Redes Sociales"
        items={[
          {
            label: "Instagram",
            href: "https://www.instagram.com/k_marthavana",
          },
          {
            label: "WhatsApp",
            href: "https://whatsapp.com/channel/0029Vb0INLb5Ejxue4p7BS1q",
          },
        ]}
      />
    </>
  );
};

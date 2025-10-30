import { Share2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

// Fallback para navegadores sin clipboard API
const copyToClipboardFallback = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  toast("Enlace copiado.")
};

const ShareButtonComponent = () => {
  const isMobileOrTablet = () => {
    // Detectar si es móvil o tablet
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry/i.test(
      navigator.userAgent
    );
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const title = document.title;
    const text = "Mira este increíble producto que encontré en K-Mart";

    try {
      // Verificar si la Web Share API está disponible
      if (navigator.share) {
        await navigator.clipboard.writeText(currentUrl);

        await navigator.share({
          title: title,
          text: text,
          url: currentUrl,
        });

      } else {
        // Alternativa para navegadores que no soportan la API
        await navigator.clipboard.writeText(currentUrl);

        // Mostrar alert solo en escritorios
        if (!isMobileOrTablet()) {
            toast("Enlace copiado al portapapeles.")
        }
      }
    } catch (error) {
      console.error("Error al compartir:", error);
      // Fallback adicional
      copyToClipboardFallback(currentUrl);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant={"outline"}
      className="flex items-center gap-2 rounded-md"
    >
      <Share2 className="w-4 h-4" />
      Compartir
    </Button>
  );
};
const ShareButton = memo(ShareButtonComponent) 
export default ShareButton;

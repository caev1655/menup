// app/edit/layout.js
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Este sub-layout se aplicará a todas las páginas dentro de /edit/,
 * mostrando una barra inferior con 3 pestañas: Portada, Contenido y Promos.
 */
export default function EditLayout({ children }) {
  const pathname = usePathname();
 

  return (
    <div className="min-h-screen flex flex-col absolute left-0 bottom-0 ">
      {/* children = contenido de la ruta (portada, contenido o promos) */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Barra inferior */}
      <BottomNav pathname={pathname} />
    </div>
  );
}
 
/** Barra inferior con 3 pestañas: Portada, Contenido, Promos */
function BottomNav({ pathname }) {
  // Obtenemos IDs guardados en localStorage
  const restaurantId = typeof window !== "undefined" ? localStorage.getItem("restaurantId") : null;
  const menuId = typeof window !== "undefined" ? localStorage.getItem("menuId") : null;

  // Construimos los href dinámicos
  const portadaHref = restaurantId && menuId ? `/edit/portada/${restaurantId}/${menuId}` : "/edit/portada";
  const designHref = restaurantId && menuId ? `/edit/design/${restaurantId}/${menuId}` : "/edit/design";
  const promosHref = restaurantId && menuId ? `/edit/promos/${restaurantId}/${menuId}` : "/edit/promos";

  return (
    <nav className="  border-gray-200 h-14 flex justify-around items-center bg-gray-900">
      <NavItem href={portadaHref} label="Portada" active={pathname.startsWith("/edit/portada")} />
      <NavItem href={designHref} label="Contenido" active={pathname.startsWith("/edit/design")} />
      <NavItem href={promosHref} label="Promos" active={pathname.startsWith("/edit/promos")} />
    </nav>
  );
}

function NavItem({ href, label, active }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center">
      <span className={active ? "text-blue-600 font-semibold" : "text-gray-500"}>
        {label}
      </span>
    </Link>
  );
}

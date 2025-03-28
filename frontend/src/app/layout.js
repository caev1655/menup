// app/layout.js
"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Ya no usamos el Inter de next/font/google porque vamos a trabajar con <link>

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideGlobalNav = ["/edit/design/", "/preview/", "/edit/portada", "/edit/promos"].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <html lang="es">
      <head>
        {/* Carga de todas las fuentes desde Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=Bungee+Spice&family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Delicious+Handrawn&family=Delius&family=Delius+Unicase:wght@400;700&family=Doto:wght@100..900&family=Griffy&family=Monoton&family=Montserrat+Underline:ital,wght@0,100..900;1,100..900&family=Moo+Lah+Lah&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Playwrite+NG+Modern:wght@100..400&family=Ribeye+Marrow&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik+Puddles&family=Tektur:wght@400..900&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 ">
        <div className="bottom-0">
          {children}
        </div>

        {!hideGlobalNav && <BottomNav pathname={pathname} />}
        
        {/* Opcional: protección contra purge de Tailwind */}
       // <div className="hidden font-griffy font-montserrat font-nunito font-roboto font-comic font-doto font-winky font-playwrite font-handrawn font-moo font-bungee font-tektur font-ribeye font-rubikpuddles font-bigshoulders font-delius font-deliusunicase font-monoton"></div>
      </body>
    </html>
  );
}

// Bottom Navigation
function BottomNav({ pathname }) {
  return (
    <nav className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-200 h-14 flex justify-around items-center">
      <NavItem href="/statistics" icon="📈" label="Estadísticas" active={pathname.startsWith("/create")} />
      <NavItem href="/dashboard" icon="🏠" label="Dashboard" active={pathname.startsWith("/dashboard")} />
      <NavItem href="/edit/design" icon="🎨" label="Design" active={pathname.startsWith("/create")} />
      <NavItem href="/usuario" icon="⚙️" label="Config" active={pathname.startsWith("/create")} />
    </nav>
  );
}

function NavItem({ href, icon, label, active }) {
  return (
    <Link href={href} className="flex flex-col items-center text-sm">
      <span className={`text-2xl ${active ? "text-blue-600" : "text-gray-500"}`}>{icon}</span>
      <span className={`${active ? "text-blue-600" : "text-gray-500"}`}>{label}</span>
    </Link>
  );
}

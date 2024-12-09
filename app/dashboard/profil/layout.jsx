'use client';

import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ProfilLayout({ children }) {
  const pathname = usePathname(); // Récupère la route actuelle

  // Fonction pour déterminer si un lien est actif
  const isActive = (link) => pathname === link;

  return (
    <div>
      {/* Navbar de navigation */}
      <Navbar isBordered className="bg-white shadow rounded-lg relative">
        <NavbarContent justify="center" className="gap-6">
          {[
            { href: '/dashboard/profil', label: 'Informations personnelles' },
            { href: '/dashboard/profil/paiements', label: 'Paiements' },
            { href: '/dashboard/profil/abonnements', label: 'Abonnements' },
            { href: '/dashboard/profil/notifications', label: 'Notifications' },
          ].map(({ href, label }) => (
            <NavbarItem key={href} className="group">
              <Link
                href={href}
                className={`relative block px-4 py-2 rounded-lg ${
                  isActive(href)
                    ? 'text-primary font-bold'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute left-0 right-0 bottom-[-12px] h-[3px] bg-primary" />
                )}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>

      {/* Contenu principal */}
      <div className="py-8">{children}</div>
    </div>
  );
}

export default ProfilLayout;
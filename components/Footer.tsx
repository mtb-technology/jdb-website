"use client"

import { getCurrentLocale, getLocalizedPath } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterDictionary {
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
}

export default function Footer({ dict }: { dict: FooterDictionary }) {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);

  const footerLinks = [
    { href: "privacy", label: dict.footer.privacy },
    { href: "terms", label: dict.footer.terms },
    { href: "contact", label: dict.footer.contact },
  ];

  return ( 
    <footer className="py-6 px-6 border-t border-gray-100 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-gray-500">
          {dict.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
        </div>
        <div className="flex gap-6 text-xs text-gray-500">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={getLocalizedPath(link.href, locale)}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}


"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentLocale, getLocalizedPath } from "@/lib/routes";
import { SupportedLocale } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NLFlag = () => (
  <svg viewBox="0 0 640 480" className="w-4 h-4">
    <path fill="#21468B" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="M0 0h640v320H0z" />
    <path fill="#AE1C28" d="M0 0h640v160H0z" />
  </svg>
);

const GBFlag = () => (
  <svg viewBox="0 0 640 480" className="w-4 h-4">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#FFF"
      d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
    />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
    />
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
  </svg>
);

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguage] = useState(getCurrentLocale(pathname));

  useEffect(() => {
    setLanguage(getCurrentLocale(pathname));
  }, [pathname]);

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 mx-4"
        >
          {language === "nl" ? <NLFlag /> : <GBFlag />}
          <span className="hidden lg:block">
            {language === "nl" ? "Nederlands" : "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("nl")}
          className="flex items-center gap-2"
        >
          <NLFlag />
          <span className={language === "nl" ? "font-bold" : ""}>
            Nederlands
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="flex items-center gap-2"
        >
          <GBFlag />
          <span className={language === "en" ? "font-bold" : ""}>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
"use client"

import { useLocale, useTranslations } from "next-intl";

const socialLinks = [
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.38.46A3.02 3.02 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.46 9.38.46 9.38.46s7.5 0 9.38-.46A3.02 3.02 0 0 0 23.5 17.8 31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V7.2c0-.9.3-1.5 1.6-1.5H17V2.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.3v8h3.2Z"/>
      </svg>
    ),
  },
];

const contactDetails = [
  {
    label: "Ludhiana, Punjab, India",
    href: "https://maps.google.com/?q=Ludhiana, Punjab, India",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"/>
      </svg>
    ),
  },
    {
    label: "+91 94177 00071",
    href: "tel:+919417700071",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M6.6 10.8a15.8 15.8 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 12.9 12.9 0 0 0 4.1.7 1.2 1.2 0 0 1 1.2 1.2v3.9a1.2 1.2 0 0 1-1.2 1.2A18.8 18.8 0 0 1 2 4.2a1.2 1.2 0 0 1 1.2-1.2h3.9a1.2 1.2 0 0 1 1.2 1.2 12.9 12.9 0 0 0 .7 4.1 1.2 1.2 0 0 1-.3 1.2L6.6 10.8Z"/>
      </svg>
    ),
  },
  {
    label: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M6.6 10.8a15.8 15.8 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 12.9 12.9 0 0 0 4.1.7 1.2 1.2 0 0 1 1.2 1.2v3.9a1.2 1.2 0 0 1-1.2 1.2A18.8 18.8 0 0 1 2 4.2a1.2 1.2 0 0 1 1.2-1.2h3.9a1.2 1.2 0 0 1 1.2 1.2 12.9 12.9 0 0 0 .7 4.1 1.2 1.2 0 0 1-.3 1.2L6.6 10.8Z"/>
      </svg>
    ),
  },
  {
    label: "info@khushaalfpo.com",
    href: "mailto:info@khushaalfpo.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.2.8 6.8 5.1 6.8-5.1H5.2Zm13.3 2.2-6.6 4.9a1 1 0 0 1-1.2 0L5.5 9.5v8h13v-8Z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Header");
  const locale = useLocale();

  return (
    <footer className="bg-green-700 text-green-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-3">{nav("brand")}</h3>
          <p className="text-sm leading-relaxed text-green-200">{t("brandDescription")}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-green-200">
            <li><a href={`/${locale}#about`} className="hover:text-white">{nav("about")}</a></li>
            <li><a href={`/${locale}#services`} className="hover:text-white">{nav("Products")}</a></li>
            <li><a href={`/${locale}/register`} className="hover:text-white">{nav("register")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t("social")}</h4>
          <div className="flex flex-col items-start gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex items-center gap-3 rounded-full bg-white/10 px-3 py-2 text-white transition hover:bg-white/20 hover:text-green-50"
              >
                <span >
                  {social.icon}
                </span>
                <span className="text-sm">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t("contact")}</h4>
          <div className="space-y-3">
            {contactDetails.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 text-sm text-green-200 transition hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-green-700 text-center text-xs py-4 text-green-300">
        © {new Date().getFullYear()} {nav("brand")}. {t("rights")}
      </div>
    </footer>
  );
}
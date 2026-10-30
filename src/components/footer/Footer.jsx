import { Instagram, Mail } from 'lucide-react';
export default function Footer() {
  return <footer className="mt-20 border-t border-black/5 bg-ink text-white"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><div><p className="text-xl font-bold">Leaf & Lore</p><p className="mt-1 text-sm text-white/60">Books for curious minds.</p></div><div className="flex gap-4 text-white/70"><a href="mailto:hello@leafandlore.com" aria-label="Email Leaf and Lore"><Mail size={20}/></a><a href="#instagram" aria-label="Leaf and Lore on Instagram"><Instagram size={20}/></a></div><p className="text-xs text-white/50">© 2026 Leaf & Lore. All rights reserved.</p></div></footer>;
}

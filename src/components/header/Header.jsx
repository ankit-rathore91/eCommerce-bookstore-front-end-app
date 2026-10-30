import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { genres } from '../../data/books';
import { useCart } from '../../context/CartContext';

export default function Header({ query, setQuery, genre, setGenre, onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  return <header className="sticky top-0 z-30 border-b border-black/5 bg-paper/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
      <a href="#catalog" className="mr-auto flex items-center gap-2 text-xl font-bold tracking-tight text-ink" aria-label="Leaf & Lore home">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper">L</span><span className="hidden sm:block">Leaf & Lore</span>
      </a>
      <label className="relative hidden w-full max-w-md md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} aria-hidden="true" />
        <span className="sr-only">Search books</span>
        <input value={query} onChange={e => setQuery(e.target.value)} className="h-11 w-full rounded-full border border-black/10 bg-white pl-10 pr-4 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="Search by title or author..." />
      </label>
      <button onClick={() => setMobileOpen(!mobileOpen)} className="grid h-11 w-11 place-items-center md:hidden" aria-expanded={mobileOpen} aria-label="Toggle navigation"><Menu /></button>
      <button onClick={onCartOpen} className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:bg-sage" aria-label={`Open cart with ${count} items`}>
        <ShoppingBag size={20} /><span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">{count}</span>
      </button>
    </div>
    {mobileOpen && <div className="border-t border-black/5 px-4 py-4 md:hidden">
      <label className="relative block mb-3"><Search className="absolute left-3 top-3.5 text-sage" size={18}/><span className="sr-only">Search books</span><input value={query} onChange={e => setQuery(e.target.value)} className="h-11 w-full rounded-full border border-black/10 bg-white pl-10 pr-4" placeholder="Search books..." /></label>
      <div className="flex gap-2 overflow-x-auto pb-1">{genres.map(item => <button key={item} onClick={() => { setGenre(item); setMobileOpen(false); }} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${genre === item ? 'bg-ink text-white' : 'bg-white'}`}>{item}</button>)}</div>
    </div>}
  </header>;
}

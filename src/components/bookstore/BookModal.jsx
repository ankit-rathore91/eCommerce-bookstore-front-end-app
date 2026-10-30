import { Minus, Plus, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function BookModal({ book, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  useEffect(() => { if (!book) return; const close = e => { if (e.key === 'Escape') onClose(); }; document.addEventListener('keydown', close); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', close); document.body.style.overflow = ''; }; }, [book, onClose]);
  if (!book) return null;
  return <div className="fixed inset-0 z-50 grid place-items-end bg-ink/60 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="book-title" className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-4xl sm:rounded-3xl">
      <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow" aria-label="Close book details"><X /></button>
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[280px_1fr] lg:p-10">
        <img src={book.cover} alt={`Cover of ${book.title}`} className="aspect-[4/5] w-full max-w-[280px] justify-self-center rounded-xl object-cover shadow-card" />
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-coral">{book.genre}</p><h2 id="book-title" className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{book.title}</h2><p className="mt-2 text-lg text-slate-500">by {book.author}</p>
          <div className="mt-4 flex items-center gap-2 text-amber-500"><Star size={18} fill="currentColor"/><b className="text-ink">{book.rating}</b><span className="text-sm text-slate-400">{book.reviews.toLocaleString()} reviews</span></div>
          <p className="mt-6 leading-relaxed text-slate-600">{book.description}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-paper p-4 text-sm"><div><dt className="text-slate-400">Published</dt><dd className="font-bold text-ink">{book.year}</dd></div><div><dt className="text-slate-400">Pages</dt><dd className="font-bold text-ink">{book.pages}</dd></div><div><dt className="text-slate-400">ISBN</dt><dd className="break-all font-bold text-ink">{book.isbn}</dd></div></dl>
          <div className="mt-7 flex flex-wrap items-center gap-3"><span className="mr-auto text-3xl font-bold text-ink">${book.price.toFixed(2)}</span><div className="flex items-center rounded-full border border-black/10"><button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center" aria-label="Decrease quantity"><Minus size={18}/></button><span className="w-8 text-center font-bold" aria-live="polite">{quantity}</span><button onClick={() => setQuantity(q => q + 1)} className="grid h-11 w-11 place-items-center" aria-label="Increase quantity"><Plus size={18}/></button></div><button onClick={() => { addItem(book, quantity); onClose(); }} className="h-11 rounded-full bg-coral px-6 font-bold text-white transition hover:bg-ink">Add to cart</button></div>
        </div>
      </div>
    </section>
  </div>;
}

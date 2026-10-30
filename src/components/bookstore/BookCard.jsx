import { Plus, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function BookCard({ book, onOpen }) {
  const { addItem } = useCart();
  return <article className="group flex min-w-0 flex-col">
    <button onClick={() => onOpen(book)} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100 text-left shadow-card" aria-label={`View details for ${book.title}`}>
      <img src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink backdrop-blur">{book.genre}</span>
    </button>
    <div className="flex flex-1 flex-col pt-4">
      <div className="flex items-center gap-1 text-sm text-amber-500"><Star size={15} fill="currentColor" /><span className="font-bold text-ink">{book.rating}</span><span className="text-slate-400">({book.reviews.toLocaleString()})</span></div>
      <button onClick={() => onOpen(book)} className="mt-1 text-left"><h3 className="text-lg font-bold leading-tight text-ink hover:text-coral">{book.title}</h3></button>
      <p className="mt-1 text-sm text-slate-500">by {book.author}</p>
      <div className="mt-auto flex items-center justify-between pt-4"><span className="text-xl font-bold text-ink">${book.price.toFixed(2)}</span><button onClick={() => addItem(book)} className="flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition hover:bg-coral" aria-label={`Add ${book.title} to cart`}><Plus size={17}/>Add</button></div>
    </div>
  </article>;
}

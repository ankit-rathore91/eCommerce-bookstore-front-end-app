import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem, total } = useCart();
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <aside role="dialog" aria-modal="true" aria-labelledby="cart-heading" className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b p-5"><h2 id="cart-heading" className="text-xl font-bold text-ink">Your cart</h2><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-stone-100" aria-label="Close cart"><X /></button></div>
      <div className="flex-1 overflow-y-auto p-5">
        {!items.length ? <div className="grid h-full place-items-center text-center"><div><ShoppingBag className="mx-auto text-slate-300" size={48}/><h3 className="mt-4 text-lg font-bold text-ink">Your cart is empty</h3><p className="mt-1 text-sm text-slate-500">A good story is waiting for you.</p><button onClick={onClose} className="mt-6 rounded-full bg-ink px-6 py-3 font-bold text-white">Browse books</button></div></div> : <ul className="space-y-5">{items.map(item => <li key={item.id} className="flex gap-4 border-b border-black/5 pb-5"><img src={item.cover} alt="" className="h-28 w-20 rounded-lg object-cover"/><div className="min-w-0 flex-1"><h3 className="font-bold leading-tight text-ink">{item.title}</h3><p className="mt-1 text-sm text-slate-500">${item.price.toFixed(2)}</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-full border border-black/10"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid h-8 w-8 place-items-center" aria-label={`Decrease ${item.title} quantity`}><Minus size={14}/></button><span className="w-7 text-center text-sm font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid h-8 w-8 place-items-center" aria-label={`Increase ${item.title} quantity`}><Plus size={14}/></button></div><button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-coral" aria-label={`Remove ${item.title}`}><Trash2 size={18}/></button></div></div></li>)}</ul>}
      </div>
      {!!items.length && <div className="border-t bg-paper p-5"><div className="flex items-center justify-between text-lg"><span className="text-slate-500">Subtotal</span><strong className="text-ink">${total.toFixed(2)}</strong></div><p className="mt-1 text-xs text-slate-400">Taxes and shipping calculated at checkout.</p><button className="mt-5 w-full rounded-full bg-coral py-4 font-bold text-white transition hover:bg-ink">Proceed to checkout</button></div>}
    </aside>
  </div>;
}

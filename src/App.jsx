import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from './components/header/Header';
import GenreBar from './components/header/GenreBar';
import Catalog from './components/bookstore/Catalog';
import BookModal from './components/bookstore/BookModal';
import CartDrawer from './components/bookstore/CartDrawer';
import Footer from './components/footer/Footer';
import { CartProvider } from './context/CartContext';
import { books } from './data/books';

function Store() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const filteredBooks = useMemo(() => books.filter(book => {
    const matchesGenre = genre === 'All' || book.genre === genre;
    const matchesQuery = `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase());
    return matchesGenre && matchesQuery;
  }), [query, genre]);

  return <div className="min-h-screen bg-paper text-ink">
    <Header query={query} setQuery={setQuery} genre={genre} setGenre={setGenre} onCartOpen={() => setCartOpen(true)} />
    <GenreBar genre={genre} setGenre={setGenre} />
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#dce6d6] px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
          <div className="relative z-10 max-w-xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-sage">New reading season</p><h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Stories worth getting lost in.</h1><p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">Thoughtfully chosen books for slow mornings, late nights, and every chapter in between.</p><a href="#catalog" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white transition hover:bg-coral">Explore the collection <ArrowRight size={18}/></a></div>
          <div className="absolute -bottom-16 right-[-4rem] h-72 w-72 rotate-12 rounded-full bg-coral/20 sm:right-[-1rem] lg:h-[420px] lg:w-[420px]" /><div className="absolute bottom-[-7rem] right-20 hidden h-72 w-52 -rotate-6 rounded-xl bg-white shadow-xl md:block"><div className="m-5 border border-ink/10 p-5"><p className="font-serif text-2xl font-bold">A little<br/>wildness.</p></div></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Our shelf</p><h2 className="mt-1 text-2xl font-bold sm:text-3xl">{genre === 'All' ? 'All books' : genre}</h2></div><span className="text-sm text-slate-500">{filteredBooks.length} titles</span></div>
        <Catalog books={filteredBooks} onOpen={setSelectedBook} />
      </section>
    </main>
    <Footer />
    <BookModal key={selectedBook?.id ?? 'closed'} book={selectedBook} onClose={() => setSelectedBook(null)} />
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </div>;
}

export default function App() { return <CartProvider><Store /></CartProvider>; }

import BookCard from './BookCard';

export default function Catalog({ books, onOpen }) {
  if (!books.length) return <div className="py-24 text-center"><p className="text-xl font-bold text-ink">No books found</p><p className="mt-2 text-slate-500">Try another title, author, or genre.</p></div>;
  return <section id="catalog" aria-label="Book catalog" className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
    {books.map(book => <BookCard key={book.id} book={book} onOpen={onOpen} />)}
  </section>;
}

import { genres } from '../../data/books';

export default function GenreBar({ genre, setGenre }) {
  return <nav aria-label="Book genres" className="hidden border-b border-black/5 bg-paper md:block">
    <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-8 py-3">
      {genres.map(item => <button key={item} onClick={() => setGenre(item)} aria-current={genre === item ? 'page' : undefined} className={`relative py-1 text-sm font-semibold transition ${genre === item ? 'text-ink' : 'text-slate-500 hover:text-ink'}`}>{item}{genre === item && <span className="absolute inset-x-0 -bottom-3 h-0.5 bg-coral" />}</button>)}
    </div>
  </nav>;
}

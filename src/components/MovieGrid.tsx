import { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  title: string;
}

const MovieGrid = ({ movies, title }: MovieGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;

import { Movie, getImageUrl } from "@/lib/tmdb";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-lg bg-card transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-hover)] animate-scale-in"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(Number(id)),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <Skeleton className="w-full h-[50vh]" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative">
          <Link to="/">
            <Button variant="secondary" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-full md:w-80 rounded-lg shadow-[var(--shadow-card)]"
            />

            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-muted-foreground italic mb-6">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-lg">{movie.runtime} min</span>
                </div>
                <span className="text-lg text-muted-foreground">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-secondary rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">{movie.overview}</p>

              {movie.credits && movie.credits.cast.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movie.credits.cast.slice(0, 8).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={getImageUrl(actor.profile_path, "w185")}
                          alt={actor.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                        />
                        <p className="font-medium text-sm">{actor.name}</p>
                        <p className="text-sm text-muted-foreground">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

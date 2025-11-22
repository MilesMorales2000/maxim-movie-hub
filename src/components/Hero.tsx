import { useQuery } from "@tanstack/react-query";
import { getTrending, getImageUrl } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const featuredMovie = movies?.[0];

  if (isLoading) {
    return <Skeleton className="w-full h-[70vh]" />;
  }

  if (!featuredMovie) return null;

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(featuredMovie.backdrop_path, "original")}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {featuredMovie.title}
          </h1>
          <p className="text-lg text-foreground/80 mb-8 line-clamp-3">
            {featuredMovie.overview}
          </p>
          <div className="flex gap-4">
            <Link to={`/movie/${featuredMovie.id}`}>
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
            </Link>
            <Link to={`/movie/${featuredMovie.id}`}>
              <Button size="lg" variant="secondary" className="gap-2">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

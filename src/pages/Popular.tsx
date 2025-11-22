import { useQuery } from "@tanstack/react-query";
import { getPopular } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";
import { Skeleton } from "@/components/ui/skeleton";

const Popular = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopular,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        {isLoading ? (
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-64 mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3]" />
              ))}
            </div>
          </div>
        ) : (
          movies && <MovieGrid movies={movies} title="Popular Movies" />
        )}
      </div>
    </div>
  );
};

export default Popular;

import { useQuery } from "@tanstack/react-query";
import { getPopular, getTopRated } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: popular, isLoading: loadingPopular } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopular,
  });

  const { data: topRated, isLoading: loadingTopRated } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRated,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Hero />
        {loadingPopular ? (
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3]" />
              ))}
            </div>
          </div>
        ) : (
          popular && <MovieGrid movies={popular.slice(0, 12)} title="Popular Movies" />
        )}
        {loadingTopRated ? (
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3]" />
              ))}
            </div>
          </div>
        ) : (
          topRated && <MovieGrid movies={topRated.slice(0, 12)} title="Top Rated" />
        )}
      </div>
    </div>
  );
};

export default Index;

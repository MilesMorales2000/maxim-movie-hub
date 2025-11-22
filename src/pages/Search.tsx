import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";
import { Skeleton } from "@/components/ui/skeleton";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: movies, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
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
        ) : movies && movies.length > 0 ? (
          <MovieGrid movies={movies} title={`Search results for "${query}"`} />
        ) : (
          <div className="container mx-auto px-4 text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No results found</h2>
            <p className="text-muted-foreground">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

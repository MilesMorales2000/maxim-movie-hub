const API_KEY = "6e64017fa04538d062a2060fb0b7ae2d";
const API_READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTY0MDE3ZmEwNDUzOGQwNjJhMjA2MGZiMGI3YWUyZCIsIm5iZiI6MTc2MzgzODQ1NC4wNjcwMDAyLCJzdWIiOiI2OTIyMDlmNmQxNjM0YTkzYTVhM2FlOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.W0bdFfMcXCBKOCnQzJp0t9YcVgxW8YfEnM9RaSSdF74";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
  };
}

const fetchFromTMDB = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
};

export const getTrending = async (): Promise<Movie[]> => {
  const data = await fetchFromTMDB("/trending/movie/day");
  return data.results;
};

export const getPopular = async (): Promise<Movie[]> => {
  const data = await fetchFromTMDB("/movie/popular");
  return data.results;
};

export const getTopRated = async (): Promise<Movie[]> => {
  const data = await fetchFromTMDB("/movie/top_rated");
  return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const data = await fetchFromTMDB(`/movie/${id}?append_to_response=credits`);
  return data;
};

export const getImageUrl = (path: string | null, size: string = "original"): string => {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

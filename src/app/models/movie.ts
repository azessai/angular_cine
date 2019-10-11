export class Movie {
  title: string;
  id: number;
  poster_path: string;
  release_date: string;
  vote_count: number;
  overview: string;
  production_countries: string;
  genres: {
    id: number,
    name: string
  }[]
  popularity: number;
  vote_average: number;

  constructor(args: Partial<Movie> = {}) {
    this.title = args.title;
    this.id = args.id;
    this.poster_path = args.poster_path;
    this.release_date = args.release_date;
    this.vote_count = args.vote_count;
    this.overview = args.overview;
    this.genres = args.genres;
    this.production_countries = args.production_countries;
    this.popularity = args.popularity;
    this.vote_average = args.vote_average;
  }
}

export class Movie {
  title: string;
  id: number;
  poster_path: string;
  release_date: string;
  vote_count: number;

  constructor(args: Partial<Movie> = {}) {
    this.title = args.title;
    this.id = args.id;
    this.poster_path = args.poster_path;
    this.release_date = args.release_date;
    this.vote_count = args.vote_count;
  }
}

import MovieClient from './MovieClient';
import Searcher from './Searcher';

const movieClient = new MovieClient();
const searcher = new Searcher(movieClient);

export default searcher;

import { combineReducers } from 'redux';
import BooksReducer from './BooksReducer';


const allReducers = combineReducers({
  books: BooksReducer
});

export default allReducers;

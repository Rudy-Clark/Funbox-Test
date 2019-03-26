import { combineReducers } from 'redux';
import routes from './routes';
import request from './requests';

const reducers = combineReducers({ routes, request });

export default reducers;

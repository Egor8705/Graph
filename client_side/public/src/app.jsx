import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

import MainBoard from './main_board.jsx';
import reducer from '../reducers';

const store = createStore(
        reducer,
        compose(applyMiddleware(thunk)));

ReactDOM.render(
        <Provider store = {store}>
           <MainBoard />
        </Provider>,
        document.getElementById('mainDiv')
);

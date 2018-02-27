import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,  } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from  './reducers';
import App from './App';

const StoreInstance = createStore(rootReducer);
ReactDOM.render(
	<Provider store={StoreInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>, document.getElementById('root'));


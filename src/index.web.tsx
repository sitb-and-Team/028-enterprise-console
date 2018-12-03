import 'whatwg-fetch'
import 'babel-polyfill';
import 'es6-promise';
import './styles/common.scss';

import * as React from 'react';
import bootstrap from 'veigar/bootstrap';

import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'

import create from '@sitb/svg-icon/create';
import { LocaleProvider } from 'antd';
import antdZhCN from 'antd/lib/locale-provider/zh_CN';

import { create as createAppStore } from './core/store';
import App from './container/Application';
require('es6-promise').polyfill();

// web common svg create 初始化
(global as any).createSvgComponent = create;

// Create a history of your choosing (we're using a browser history in this case)
const hashHistory = createHashHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(hashHistory);

const store = createAppStore({}, {}, [historyMiddleware], reducer => connectRouter(hashHistory)(reducer));

bootstrap(() => (
  <Provider store={store}>
    <ConnectedRouter history={hashHistory}>
      <Router>
        <LocaleProvider locale={antdZhCN}>
          <App/>
        </LocaleProvider>
      </Router>
    </ConnectedRouter>
  </Provider>
));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

//未登录访问权限控制
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => sessionStorage.getItem("isAuth") ? (<Component {...props}/>) :
            <Redirect to={{pathname: '/login'}}/>}
    />
);

//应用入口
ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login}/>
            <PrivateRoute path='/home' component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="*" component={ErrorPage}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();


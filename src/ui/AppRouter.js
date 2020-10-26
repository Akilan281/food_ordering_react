import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SCREENS } from '../common/Constant'
import HomeComponent from './screens/home/HomeComponent'
import NavbarComponent from './screens/navbar/NavbarComponent'
import {Provider} from 'react-redux'
import Store from '../redux/store/Store'
import CartComponent from './screens/cart/CartComponent'
import FooterComponent from './screens/footer/Footer'
import LoaderComponent from '../components/LoaderComponent'

function AppRouter() {
    return (

        <Provider store={Store}>
        <Router>
            <div>
                <NavbarComponent />
                <div className="main-wrap">
                    <LoaderComponent/>
                <Switch>
                    <Route exact path={SCREENS.HOME} component={HomeComponent}></Route>
                    <Route exact path={SCREENS.CART} component={CartComponent}></Route>
                </Switch>
                </div>
                <FooterComponent />
            </div>
        </Router>
        </Provider>
    )
}

export default AppRouter

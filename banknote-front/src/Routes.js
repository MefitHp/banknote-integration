import React from "react"
import { Route, Switch } from "react-router-dom"
import DefaultLayout from "./components/common/DefaultLayout"
import Home from './components/home/Home'
import AuthContainer from './components/auth/AuthContainer'
import DashboardLayout from "./components/common/DashboardLayout";
import MainDashboard from "./components/dashboard/MainDashboard";
import Accounts from "./components/dashboard/dashboardUtilities/Accounts";
import AccountsDetail from "./components/dashboard/dashboardUtilities/AccountsDetail";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) =>
    (<Route {...rest} render={props => (<Layout> <Component {...props} /> </Layout>)} />)

const Routes = () => (
    <Switch>
        <AppRoute exact path="/" layout={DefaultLayout} component={Home} />
        <AppRoute exact path="/login" layout={DefaultLayout} component={AuthContainer} />
        <AppRoute exact path="/signup" layout={DefaultLayout} component={AuthContainer} />
        <AppRoute path="/dashboard" layout={DashboardLayout} component={MainDashboard} />
        <AppRoute exact path="/accounts" layout={DashboardLayout} component={Accounts} />
        <AppRoute exact path="/accounts/:id" layout={DashboardLayout} component={AccountsDetail} />
    </Switch>
)

export default Routes
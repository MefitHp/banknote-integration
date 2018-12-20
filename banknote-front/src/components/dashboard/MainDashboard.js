import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Button, Spin } from 'antd'
import { getAccouts, getTransactions } from '../../API/Sync';
import AccountsWidgets from './dashboardWidgets/AccountsWidgets';
import TransactionCard from './TransactionCard';

class MainDashboard extends Component {
    state = {
        accounts: [],
        credentials: [],
        transactions: []
    }

    componentWillMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id_user, token } = user
        getAccouts(id_user, token)
            .then(account => {
                const accounts = account.data.response
                const credentials = accounts.map(acc => acc.id_credential)
                getTransactions(credentials[0], user.token)
                    .then(transactions => {
                        transactions = transactions.data.response.reverse().slice(0, 5)
                        this.setState({ transactions, accounts })
                    }).catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const { accounts, transactions } = this.state
        console.log(this.state)
        return (
            <Fragment>
                <div className="d-flex fw jcc aic">
                    <div className="left-side" style={{ overflowY: 'scroll' }}>
                        {transactions ?
                            <TransactionCard transactions={transactions.slice(0, 5)} />
                            :
                            <Spin tip="Loading..." />
                        }
                    </div>
                    <div className="right-side">
                        <div className="box d-flex aic jcc" style={{ margin: 8 }}>
                            {accounts ?
                                <AccountsWidgets accounts={accounts} />
                                :
                                <div >
                                    <h2>No hay cuentas agregadas</h2>
                                    <Button>Agregar cuenta</Button>
                                </div>
                            }
                        </div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </div>
                <Helmet
                    script={[{
                        innerHTML: `
                    !function(w,d,s,id,r){
                    w[r]={};
                    w[r]=w[r]||function(){w[r].q=w[r].q||[].push(arguments)};
                    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";
                    if(!d.getElementById(id)){
                        js=d.createElement(s);
                        js.id=id;
                        js.src=p+"://www.paybook.com/sync/widget.js";
                        fjs.parentNode.insertBefore(js,fjs);
                    }
                    }(window,document,"script","sync-widget", "syncWidget");
                    syncWidget.options = {token: "${user.token}", baseDiv: "sync_container", theme: "ligth", start: "admin"};
                    syncWidget.setDev
                    `}]}
                />

            </Fragment>
        )
    }
}

export default MainDashboard
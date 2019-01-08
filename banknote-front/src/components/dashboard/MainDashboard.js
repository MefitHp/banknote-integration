import React, { Component, Fragment } from 'react'
import { Button, Collapse } from 'antd'
import { getAccouts, getTransactions } from '../../API/Sync';
import AccountsWidgets from './dashboardWidgets/AccountsWidgets';
import TransactionCard from './TransactionCard';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
const Panel = Collapse.Panel;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

class MainDashboard extends Component {
    state = {
        accounts: [],
        allTransactions: [],
        charData: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                ]
            }]
        },
        isLoaded: false
    }

    componentWillMount = () => {
        let { accounts, allTransactions, charData } = this.state
        const user = JSON.parse(localStorage.getItem('user'));
        charData.labels = [moment().subtract(2, 'month').startOf('month').format('MMMM'), moment().subtract(1, 'month').startOf('month').format('MMMM'), moment().startOf('month').format('MMMM')]
        const { id_user, token } = user

        getAccouts(id_user, token)
            .then(account => {
                let accountsData = account.data.response
                accountsData.map(acc =>
                    getTransactions(acc.id_credential, user.token)
                        .then(transactions => {
                            transactions.data.response = transactions.data.response.map(transaction => {
                                transaction['dt_transaction'] = moment(new Date(transaction.dt_transaction * 1000)).format('DD MMMM YYYY')
                                return transaction
                            })
                            acc['transactions'] = transactions.data.response.reverse()
                            accounts.push(acc)
                            allTransactions.push(...transactions.data.response)
                            this.setState({ accounts, allTransactions, charData })
                            this.updateChartData()
                        }).catch(err => console.log(err)))
            })
            .catch(err => console.log(err))

    }


    updateChartData = () => {
        const { allTransactions } = this.state
        const charDataCopy = Object.assign({}, this.state.charData)
        charDataCopy.labels.map(month => {
            let filtered = []
            if (allTransactions.length > 0) filtered = allTransactions.filter(transaction => transaction.dt_transaction.indexOf(month) !== -1)
            if (filtered.length > 0) {
                let total = filtered.reduce((total, item) => {
                    if (item.amount < 0) return total + Math.abs(item.amount)
                    return total
                }, 0)
                charDataCopy.datasets[0].data.push(Math.round(total))
                if (charDataCopy.datasets[0].data.length === 3) this.setState({ charData: charDataCopy, isLoaded: true })
            }
            return month
        }
        )
    }

    render() {
        const { accounts, charData } = this.state
        console.log(this.state.charData.datasets[0].data)
        return (
            <Fragment>
                <div className="d-flex fw jcc aic">
                    <div className="left-side" style={{ overflowY: 'scroll' }}>
                        <Collapse bordered={false} defaultActiveKey={['1']} accordion>
                            {accounts.length > 0 ?
                                accounts.map((account, index) => {
                                    return (
                                        <Panel header={`Cuenta #${index + 1}: ${account.site.organization}`} key={index + 1} style={customPanelStyle}>
                                            <TransactionCard account={account} />
                                            <div className="d-flex aic">
                                                <Link to={`/accounts/${account.id_credential}`}><Button>Ver todas las transacciones</Button></Link>
                                            </div>
                                        </Panel>
                                    )
                                })
                                :
                                ''
                            }
                        </Collapse>
                    </div>
                    <div className="right-side">
                        <div className="box">
                            {accounts.length > 0 ?
                                <AccountsWidgets accounts={accounts} />
                                :
                                <div >
                                    <h2>No hay cuentas agregadas</h2>
                                    <Button>Agregar cuenta</Button>
                                </div>
                            }
                        </div>
                        <div className="box">
                            {this.state.isLoaded ?
                                <Bar
                                    data={charData}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Gastos de los últimos 3 meses',
                                            fontSize: 25
                                        },
                                        legend: {
                                            display: false,
                                            position: 'right'
                                        },
                                        responsive: true,
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }}
                                /> :
                                <div>Loading...</div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MainDashboard
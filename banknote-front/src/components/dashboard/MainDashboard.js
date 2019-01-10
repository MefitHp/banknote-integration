import React, { Component, Fragment } from 'react'
import { Button, Collapse, List, Popover, Avatar, Badge, Icon, Breadcrumb } from 'antd'
import { getAccouts, getTransactions } from '../../API/Sync';
import AccountsWidgets from './dashboardWidgets/AccountsWidgets';
import TransactionCard from './TransactionCard';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
import { getPayments } from '../../API/User';
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
        payments: [],
        isLoaded: false,
        dataLoaded: false,
        visible: false,
        totalBalance: 0,
        totalPayments: 0,
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
                            getPayments(user)
                                .then(user => {
                                    if (user.status === 200) {
                                        this.setState({ payments: user.data.payments, dataLoaded: true })
                                    }
                                })
                                .catch(err => console.log(err))

                        }).catch(err => console.log(err)))
            })
            .catch(err => console.log(err))

        setTimeout(() => {
            let { payments, accounts, totalBalance, totalPayments } = this.state
            totalBalance = accounts.reduce((totalBalance, item) => {
                return totalBalance += item.balance
            }, 0)

            totalPayments = payments.reduce((totalPayments, item) => {
                return totalPayments += item.monthly_pay
            }, 0)
            this.setState({ totalBalance, totalPayments })
        }, 4000)
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


    hide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }


    render() {
        const { accounts, charData, totalBalance, totalPayments } = this.state
        return (
            <Fragment>
                <div style={{ height: 60, justifyContent: 'space-between' }} className="d-flex aic">
                    <div style={{ paddingLeft: 45, width: '400px' }} className="d-flex aic">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Icon type="schedule" />
                                <span><strong>Fecha: </strong> {moment().format('DD MMMM YYYY')}</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div style={{ width: '500px', justifyContent: 'space-around' }} className="d-flex" >
                        <div>
                            <Popover
                                content={<p>
                                    Tu saldo al final de mes será de: <br /> <strong>$ {totalBalance - totalPayments} MXN</strong> <br />
                                    El total de tus pagos de este mes es de: <br /> <strong>$ {totalPayments} MXN</strong> <br />
                                </p>}
                                title="Saldos"
                            >
                                <span className="d-flex jcc aic">{
                                    <Icon style={{ fontSize: '26px', marginRight: 10 }} type="dollar" />
                                } <strong> Saldo total :  {totalBalance === 0 ? 'Calculando..' : <span style={totalBalance < 500 ? { color: 'red' } : { color: 'green' }}>${totalBalance} MXN</span>} </strong>
                                </span>
                            </Popover>
                        </div>
                        <div>
                            <Popover
                                placement="topLeft"
                                content={<Link to="/dashboard" onClick={this.hide}>Close</Link>}
                                title="Notificaciones"
                                trigger="click"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Link to="/dashboard" className="d-flex jcc aic" >
                                    Notificaciones {
                                        <Badge dot>
                                            <Icon style={{ fontSize: '26px', marginLeft: 10 }} type="notification" />
                                        </Badge>
                                    }
                                </Link>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="d-flex fw jcc aic">
                    <div className="left-side" style={{ overflowY: 'scroll' }}>
                        <div className="box">
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
                        <div className="box">
                            <div style={{ padding: 8 }}>
                                <h4>Pagos recurrentes y metas: </h4>
                                <div>
                                    {this.state.dataLoaded ?
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={this.state.payments}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar size={32} src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png" />}
                                                        title={<a href="https://ant.design">{item.paymentName}</a>}
                                                        description={item.description}
                                                    />
                                                    <div className="d-flex jcc aic">
                                                        <div style={{ textAlign: 'center' }} >
                                                            {item.month_count === 0 ? <span>Pago recurrente (Hasta cancelar)</span> : <span>Pago diferido ({item.month_count} meses)</span>}<br />
                                                            <span style={{ margin: 'auto' }}>${item.monthly_pay} por mes.</span>
                                                        </div>
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                        :
                                        <div style={{ height: '100%' }} className="d-flex jcc aic">
                                            <img style={{ maxHeight: 200 }} src="https://www.tecmam.com.mx/images/icons/loading.gif" alt="loading" />
                                        </div>
                                    }
                                </div>
                                <div className="d-flex jcc aic">
                                    <Link to="/payments"><Button size="large" type="primary">Agregar pago recurrente.</Button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="box">
                            {accounts.length > 0 ?
                                <Fragment>
                                    <h4>Cuentas disponibles: </h4>
                                    <AccountsWidgets accounts={accounts} />
                                    <div className="d-flex jcc aic">
                                        <Link href="/accounts"><Button type="primary">Agregar cuenta</Button></Link>
                                    </div>
                                </Fragment>
                                :
                                <div >
                                    <h2 style={{ textAlign: 'center' }}>No hay cuentas agregadas</h2>
                                    <a href="/accounts"><Button size="large" type="primary">Agregar cuenta</Button></a>
                                </div>
                            }
                        </div>
                        <div className="box">
                            {this.state.isLoaded ?
                                <div style={{ height: '100%' }} className="d-flex jcc aic">
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
                                    />
                                </div>
                                :
                                <div style={{ height: '100%' }} className="d-flex jcc aic">
                                    <img style={{ maxHeight: 200 }} src="https://www.tecmam.com.mx/images/icons/loading.gif" alt="loading" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default MainDashboard
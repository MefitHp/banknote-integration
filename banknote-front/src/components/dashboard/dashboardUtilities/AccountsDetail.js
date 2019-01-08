import React, { Component, Fragment } from 'react'
import { Table } from 'antd'
import { getTransactions } from '../../../API/Sync';
import moment from 'moment'

const columns = [
    {
        title: 'Referencia',
        dataIndex: 'reference',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Cantidad',
        dataIndex: 'amount',
        render: quantity => <strong style={{ color: quantity > 0 ? 'green' : 'red' }}>${quantity}</strong>
    },
    {
        title: 'Fecha',
        dataIndex: 'dt_transaction',
        render: date => <Fragment><strong>{moment(new Date(date * 1000)).format('DD-MMMM-YYYY')}</strong></Fragment>
    }
]

class AccountsDetail extends Component {
    state = {
        transactions: []
    }
    componentWillMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const id_credential = this.props.match.params.id
        const { token } = user
        getTransactions(id_credential, token)
            .then(transactions => {
                transactions = transactions.data.response.reverse()
                this.setState({ transactions })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.transactions)
        const { transactions } = this.state
        return (
            <div className="d-flex jcc aic layout-body">
                <div style={{ width: '100%', padding: 8 }}>
                    <Table bordered
                        size="small"
                        columns={columns}
                        dataSource={transactions}
                        rowKey={record => record.id_transaction} />
                </div>
            </div>
        )
    }
}

export default AccountsDetail
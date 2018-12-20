import React from 'react'
import { List, Avatar } from 'antd'
import moment from 'moment'

const TransactionCard = ({ transactions }) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={transactions}
                renderItem={transaction => (
                    <List.Item
                        style={{ margin: 8 }}>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://www.paybook.com/s/`} />}
                            title={`${transaction.description}`}
                            description={
                                <div>
                                    {transaction.extra.concept ? <h5>Concepto: {transaction.extra.concept}</h5> : ''}
                                    <p>
                                        <strong style={{ color: transaction.amount > 0 ? 'green' : 'red' }}>
                                            <i className="fas fa-money-bill-alt"></i> {transaction.amount} {transaction.currency} </strong>| <i className="fas fa-calendar-alt"></i> {moment(new Date(transaction.dt_transaction * 1000)).format('DD-MMMM-YYYY')}
                                    </p>
                                </div>} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default TransactionCard

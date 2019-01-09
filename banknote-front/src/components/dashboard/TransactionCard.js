import React from 'react'
import { List, Avatar } from 'antd'

const TransactionCard = ({ account }) => {
    return (
        <div>
            {
                account.transactions.length === 0 ?
                    <p style={{ margin: '5 20', padding: 5 }}><strong>No hay movimientos</strong></p>
                    :
                    <List
                        itemLayout="horizontal"
                        dataSource={account.transactions.splice(0, 5)}
                        renderItem={transaction => (
                            <List.Item
                                style={{ margin: 8 }}>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://www.paybook.com/s/${account.site.avatar}`} />}
                                    title={`${transaction.description}`}
                                    description={
                                        <div>
                                            {transaction.extra ? transaction.extra.concept ? <h5>Concepto: {transaction.extra.concept}</h5> : '' : ''}
                                            <p>
                                                <strong style={{ color: transaction.amount > 0 ? 'green' : 'red' }}>
                                                    <i className="fas fa-money-bill-alt"></i> {transaction.amount} {transaction.currency} </strong>| <i className="fas fa-calendar-alt"></i> {transaction.dt_transaction}
                                            </p>
                                        </div>} />
                            </List.Item>
                        )}
                    />
            }
        </div>
    )
}

export default TransactionCard

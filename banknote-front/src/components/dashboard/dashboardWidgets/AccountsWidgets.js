import React from 'react'
import { List, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'

const AccountsWidgets = ({ accounts = [] }) => (
    <div>
        <List
            itemLayout="horizontal"
            dataSource={accounts}
            renderItem={account => (
                <List.Item actions={[<Link to={`/account/${account.id_credential}`}>Ver detalle</Link>]}
                    style={{ margin: 8 }}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://www.paybook.com/s/${account.site.avatar}`} />}
                        title={`${account.site.organization} | ${account.site.name}`}
                        description={
                            <div>
                                <h5>{account.extra.owner}</h5>
                                <p><strong>Saldo disponible: </strong> <Badge status={account.balance > 1000 ? "success" : account.balance > 500 ? "warning" : "error"} />${account.balance} {account.currency}</p>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    </div>
)

export default AccountsWidgets

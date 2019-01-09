import React, { Component, Fragment } from 'react'
import { Button, Modal, Card, Icon, Avatar, Input, Form, Select, DatePicker, InputNumber, message } from 'antd'
import { getPayments } from '../../../API/User';
import moment from 'moment'
import { createPayment } from '../../../API/User';

const { Meta } = Card;
const FormItem = Form.Item;
const { Option, OptGroup } = Select;

class Payments extends Component {
    state = {
        visible: false,
        payments: {},
        dataLoaded: false,
    }

    componentWillMount = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        getPayments(user)
            .then(user => {
                console.log(user)
                if (user.status === 200) {
                    this.setState({ payments: user.data.payments, dataLoaded: true })
                }
            })
            .catch(err => console.log(err))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.end_date = values.payday.add(values.month_count, 'months').toDate()
                values.payday = values.payday.toDate()
                values.month_count = Number(values.month_count)
                const user = JSON.parse(localStorage.getItem('user'));
                values.user = user._id
                createPayment(values)
                    .then(r => {
                        if (r.status === 201) {
                            const { payments } = this.state
                            payments.push(values)
                            message.success('Agregado correctamente')
                            this.setState({ payments, visible: false })
                        }
                        else {
                            message.error('Hubo un error')
                        }
                    }).catch(err => console.log(err))
            }
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, payments, dataLoaded } = this.state
        const { handleCancel } = this
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ padding: 12 }}>
                <h2>Pagos recurrentes:</h2>
                <p>En esta sección podrás ver y agregar pagos recurrentes a tu cuenta. <strong>Por ejemplo: </strong>Pagos a meses, pago de servicios, etc.</p>
                <div className="d-flex fw" style={{ overflowY: 'scroll' }}>
                    {dataLoaded ?
                        payments.map((payment, index) => (
                            <Card
                                style={{ width: 380, margin: 8 }}
                                actions={[<Icon type="delete" />]}
                                key={index}
                            >
                                <Meta
                                    avatar={<Avatar size={64} src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png" />}
                                    title={payment.paymentName}
                                    description={payment.description}
                                />
                                <div style={{ padding: 20 }}>
                                    <p>
                                        <strong>Cantidad:</strong> ${payment.amount} MXN <br />

                                        {payment.month_count === 0 ?
                                            <strong>Pago recurrente </strong>
                                            :
                                            <Fragment>
                                                <strong>Numero de pagos: </strong> {payment.month_count} <br />
                                                <strong>Fecha de finalización: </strong> {moment(payment.end_date).format('DD MMM YYYY')}
                                            </Fragment>

                                        }
                                    </p>
                                </div>
                            </Card>
                        )
                        )
                        :
                        <div>no hay</div>
                    }
                </div>
                <div className="float-button">
                    <Button type="primary" onClick={this.showModal} icon="plus-circle" size="large">Agregar pago </Button>
                </div>
                <Modal
                    title="Agregar un nuevo pago recurrente"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancelar</Button>,
                    ]}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Nombre del pago:"
                        >
                            {getFieldDecorator('paymentName', {
                                rules: [{ required: true, message: 'Ingresa un nombre..' }],
                            })(
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} name="paymentName" placeholder="Nombre del pago" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Descripción del pago:"
                        >
                            {getFieldDecorator('description', {
                                rules: [{ required: false, message: 'Escribe una pequeña descripción' }],
                            })(
                                <Input prefix={<Icon type="align-left" style={{ color: 'rgba(0,0,0,.25)' }} />} name="paymentName" placeholder="Descripción" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Fecha de compra o día de cobro: "
                        >
                            {getFieldDecorator('payday', {
                                rules: [{ required: true, message: 'La fecha de compra o día de cobro no pueden estar vacía' }],
                            })(
                                <DatePicker placeholder="Seleciona una fecha.." style={{ width: '100%' }} format="DD MMM YYYY" />
                            )}
                        </Form.Item>
                        <FormItem
                            label="Tipo de cobro: "
                        >{getFieldDecorator('month_count', {
                            rules: [{
                                required: true
                            }],
                            initialValue: '0'
                        })(
                            <Select
                                style={{ width: '100%' }}
                            >
                                <OptGroup label="Hasta su cancelación">
                                    <Option value="0">Pago recurrente</Option>
                                </OptGroup>
                                <OptGroup label="Pago por plazo">
                                    <Option value="3">3 meses</Option>
                                    <Option value="6">6 meses</Option>
                                    <Option value="9">9 meses</Option>
                                    <Option value="12">12 meses</Option>
                                </OptGroup>
                            </Select>
                        )}
                        </FormItem>
                        <FormItem
                            label="Cantidad: "
                            style={{ width: '100%' }}
                        >{getFieldDecorator('amount', {
                            rules: [{
                                required: true
                            }],
                        })(
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `$ ${value}`}
                                min={1}
                                name="amount"
                                placeholder="Cantidad" />
                        )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Agregar
                    </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedPayment = Form.create({ name: 'add_payment' })(Payments);

export default WrappedPayment
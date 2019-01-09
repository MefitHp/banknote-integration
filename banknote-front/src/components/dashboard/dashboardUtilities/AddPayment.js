import React, { Component } from 'react'
import { Form, Icon, Input, InputNumber, DatePicker, Button, Select } from 'antd'
import { createPayment } from '../../../API/User';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;



class AddPayment extends Component {

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
                            console.log('exitoso')
                        }
                    }).catch(err => console.log(err))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
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
            </div>
        )
    }
}

const WrappedPayment = Form.create({ name: 'add_payment' })(AddPayment);

export default WrappedPayment
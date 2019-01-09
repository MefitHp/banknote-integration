import React, { Component } from 'react'
import { Button, Modal, } from 'antd'
import AddPayment from './AddPayment';

class Payments extends Component {
    state = {
        visible: false,
        payment: {}
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    addPayment = (e) => {
        console.log(e)
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible } = this.state
        const { handleInput, addPayment } = this
        return (
            <div style={{ padding: 12 }}>
                <h2>Pagos recurrentes:</h2>
                <p>En esta sección podrás ver y agregar pagos recurrentes a tu cuenta. <strong>Por ejemplo: </strong>Pagos a meses, pago de servicios, etc.</p>
                <div className="d-flex jcc aic fw">

                </div>
                <div className="float-button">
                    <Button type="primary" onClick={this.showModal} icon="plus-circle" size="large">Agregar pago </Button>
                </div>
                <Modal
                    title="Agregar un nuevo pago recurrente"
                    visible={visible}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancelar</Button>,
                    ]}
                >
                    <AddPayment
                        handleInput={handleInput}
                        addPayment={addPayment} />
                </Modal>
            </div>
        )
    }
}

export default Payments
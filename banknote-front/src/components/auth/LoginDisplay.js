import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
const FormItem = Form.Item;

const LoginDisplay = ({ squareLogo, handleInput, email, password, onLogin }) => {
    return (
        <div className="d-flex jcc aic">
            <Form style={{ width: '500px', padding: 8 }} onSubmit={onLogin}>
                <div style={{ width: '100%', height: '150px', backgroundImage: `url(${squareLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <FormItem>
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} name="email" value={email} placeholder="E-mail" onChange={handleInput} />
                </FormItem>
                <FormItem>
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password" value={password} placeholder="Contraseña" onChange={handleInput} />
                </FormItem>
                <section className="d-flex fw aic jcc">
                    <Button htmlType="submit" style={{ width: '100%', margin: '8px 0' }} type="primary">Iniciar sesión</Button>
                    <p>¿No tienes cuenta? <Link to='/signup'>Regístrate</Link></p>
                </section>
            </Form>
        </div >
    )
}

export default LoginDisplay

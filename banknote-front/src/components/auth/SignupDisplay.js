import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
const FormItem = Form.Item;

const SignupDisplay = ({ squareLogo, handleInput, username, email, password, onRegister }) => {
    return (
        <div className="d-flex jcc aic">
            <Form style={{ width: '500px', padding: 8 }} onSubmit={onRegister}>
                <div style={{ width: '100%', height: '150px', backgroundImage: `url(${squareLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <FormItem>
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="username" value={username} placeholder="Nombre de usuario" onChange={handleInput} />
                </FormItem>
                <FormItem>
                    <Input type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} name="email" value={email} placeholder="E-mail" onChange={handleInput} />
                </FormItem>
                <FormItem>
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password" value={password} placeholder="Contraseña" onChange={handleInput} />
                </FormItem>
                <section className="d-flex fw aic jcc">
                    <Button style={{ width: '100%', margin: '8px 0' }} type="primary" htmlType="submit">Registrarse</Button>
                    <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión</Link></p>
                </section>
            </Form>
        </div>
    )
}

export default SignupDisplay

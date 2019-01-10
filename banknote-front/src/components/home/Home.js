import React, { Component } from 'react'
import moneyImg from '../../assets/money.png'
import { Link } from 'react-router-dom'
import { Icon } from "antd";

class Home extends Component {
	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) return this.setState({ user: {}, isAuth: false });
		this.props.history.push('/dashboard')
	}
	render() {
		return (
			<div className="d-flex jcc aic main-back" >


				<div className="slide" style={{ fontSize: '3em' }}>
					<div className="slogan">
						<h1>Banknote</h1>
						<p>Todos tus gastos en el mismo lugar.</p>
						<img src={moneyImg} alt="money" />
					</div>
					<div className="c-form">
						<h3>¡Tu cuenta en 5 minutos!</h3>
						<p><Icon type="check" style={{ color: "#8d2434" }} /> Administra tus cuentas</p>
						<p><Icon type="check" style={{ color: "#8d2434" }} /> No olvides más tus pagos</p>
						<p><Icon type="check" style={{ color: "#8d2434" }} /> Administra tus cuentas</p>
						<p><Icon type="check" style={{ color: "#8d2434" }} /> Administra tus cuentas</p>
						<Link to='/signup'><button className="btn-r">¡Registrate ya!</button></Link>
					</div>
				</div>
			</div>
		)
	}
}
export default Home

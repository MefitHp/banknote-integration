import React, { Component } from 'react'
import moneyImg from '../../assets/money.png'

class Home extends Component {
	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) return this.setState({ user: {}, isAuth: false });
		this.props.history.push('/dashboard')
	}
	render() {
		return (
			<div className="d-flex jcc aic" style={{ height: '90vh' }}>
				<div style={{ fontSize: '3em' }}>
					<h1>Banknote</h1>
					<p>Todos tus gastos en el mismo lugar.</p>
					<img src={moneyImg} alt="money" />
				</div>
			</div>
		)
	}
}
export default Home

import React, { Component } from 'react'

class Home extends Component {
	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) return this.setState({ user: {}, isAuth: false });
		this.props.history.push('/dashboard')
	}
	render() {
		return (
			<div className="d-flex jcc aic" style={{ height: '90vh' }}>
				<h1>Home page</h1>
			</div>
		)
	}
}
export default Home

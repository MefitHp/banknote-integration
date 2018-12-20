import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, message, Card, Avatar } from 'antd'
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../API/Auth';
const { Meta } = Card;
const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const dflImage = 'https://www.uic.mx/posgrados/files/2018/05/default-user.png'


class DashboardLayout extends Component {
	state = {
		user: {},
		collapsed: false,
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}
	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) {
			message.warning('¡Ooops! Tienes que iniciar sesión primero.')
			return this.props.history.push('/')
		}
		this.setState({ user })
	}

	onLogout = () => {
		logoutUser()
			.then(r => {
				if (r.status === 200) {
					message.info(r.data.message)
					localStorage.removeItem('user');
					this.props.history.push('/')
				}
			})
	}
	render() {
		const { collapsed, user } = this.state
		const { onCollapse, onLogout } = this

		return (
			<div>
				<Layout style={{ minHeight: '100vh' }}>
					<Sider
						collapsible
						collapsed={collapsed}
						onCollapse={onCollapse}
					>
						<div className="logo">
							<Card>
								<Meta
									className="d-flex aic"
									avatar={<Avatar src={user.photoURL ? user.photoURL : dflImage} />}
									title={user.username}
								/>
							</Card>
						</div>
						<Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">
							<Menu.Item key="dashboard">
								<Icon type="layout" />
								<span>Dashboard</span>
							</Menu.Item>
							<Menu.Item key="2">
								<Icon type="desktop" />
								<span>Option 2</span>
							</Menu.Item>
							<SubMenu
								key="sub1"
								title={<span><Icon type="user" /><span>User</span></span>}
							>
								<Menu.Item key="3">Tom</Menu.Item>
								<Menu.Item key="4">Bill</Menu.Item>
								<Menu.Item key="5">Alex</Menu.Item>
							</SubMenu>
							<SubMenu
								key="sub2"
								title={<span><Icon type="team" /><span>Team</span></span>}
							>
								<Menu.Item key="6">Team 1</Menu.Item>
								<Menu.Item key="8">Team 2</Menu.Item>
							</SubMenu>
							<Menu.Item key="logout" onClick={onLogout}>
								<Icon type="logout" />
								<span>Cerrar sesión</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Content style={{ margin: '0 16px' }}>
							<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>{user.username}</Breadcrumb.Item>
								<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
							</Breadcrumb>
							<div className="layout-body" style={{ background: '#fff', overflowY: 'scroll' }}>
								{this.props.children}
							</div>
						</Content>
					</Layout>
				</Layout>

			</div>
		)
	}
}

export default withRouter(DashboardLayout)
import React from 'react';
import ReactDOM from 'react-dom';
import SocketIOClient from 'socket.io-client';
import { Well, Image, Row, Col, Grid } from 'react-bootstrap';
import styles from './styles.css';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: {
				h_l1: 0,
				h_l2: 0,
				h_f1: 0,
				s_l1: 0,
				s_l2: 0,
				s_f1: 0,
				k_l1: 0
			}
		};
	}

	componentWillMount() {
		this.socket = SocketIOClient('http://192.168.31.9:5000');
		this.socket.on('initial_status', (data, callback) => {
			this.setState({ status: data });
			console.log('initial status recieved', this.state.status);
			callback('initial status recieved', this.state.status);
		});
		console.log(this.socket);

	}

	componentDidMount() {
		this.socket.on('change_status', data => {
			this.setState({ status: data });
			console.log(' status changed', this.state.status);
		});
	}

	stateChange(item) {
		console.log(item);
		var status = this.state.status;
		switch (item) {
			case 'h_l1':
				if (status.h_l1 === 1) {
					status.h_l1 = 0;
				} else {
					status.h_l1 = 1;
				}
				break;
			case 'h_l2':
				if (status.h_l2 === 1) {
					status.h_l2 = 0;
				} else {
					status.h_l2 = 1;
				}
				break;
			case 'h_f1':
				if (status.h_f1 === 1) {
					status.h_f1 = 0;
				} else {
					status.h_f1 = 1;
				}
				break;
			case 's_l1':
				if (status.s_l1 === 1) {
					status.s_l1 = 0;
				} else {
					status.s_l1 = 1;
				}
				break;
			case 's_l2':
				if (status.s_l2 === 1) {
					status.s_l2 = 0;
				} else {
					status.s_l2 = 1;
				}
				break;
			case 's_f1':
				if (status.s_f1 === 1) {
					status.s_f1 = 0;
				} else {
					status.s_f1 = 1;
				}
				break;
			case 'k_l1':
				if (status.k_l1 === 1) {
					status.k_l1 = 0;
				} else {
					status.k_l1 = 1;
				}
				break;
		}
		this.setState({ status: status });
		this.socket.emit('change_status_req', this.state.status);
	}

	render() {
		var h_l1 = './idea' + this.state.status.h_l1 + '.png';
		var h_l2 = './idea' + this.state.status.h_l2 + '.png';
		var h_f1 = 'fan' + this.state.status.h_f1;
		var s_l1 = './idea' + this.state.status.s_l1 + '.png';
		var s_l2 = './idea' + this.state.status.s_l2 + '.png';
		var s_f1 = 'fan' + this.state.status.s_f1;
		var k_l1 = './idea' + this.state.status.k_l1 + '.png';

		this.socket.on('change_status', data => {
			this.setState({ status: data });
			console.log(' status changed', this.state.status);
		});

		return (
			<div className="container">
				<Well style={{ backgroundColor: 'white' }}>
					<Row>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image src={h_l1} onClick={this.stateChange.bind(this, 'h_l1')} />
						</Col>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image src={h_l2} onClick={this.stateChange.bind(this, 'h_l2')} />
						</Col>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image
								className={h_f1}
								src="fan.png"
								onClick={this.stateChange.bind(this, 'h_f1')}
							/>
						</Col>
					</Row>
					<Row>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image src={s_l1} onClick={this.stateChange.bind(this, 's_l1')} />
						</Col>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image src={s_l2} onClick={this.stateChange.bind(this, 's_l2')} />
						</Col>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image
								className={s_f1}
								src="fan.png"
								onClick={this.stateChange.bind(this, 's_f1')}
							/>
						</Col>
					</Row>
					<Row>
						<Col style={{ marginBottom: '50px' }} align="center" md={4} xs={6}>
							<Image src={k_l1} onClick={this.stateChange.bind(this, 'k_l1')} />
						</Col>
					</Row>
				</Well>
			</div>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('root'));

import React, {component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUsername, updateId } from './../../ducks/reducer';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            message: '',
        }
    }

    async login() {
        let {username, password } = this.state;
        let res = await axios.post('/auth/login', { username, password });
        this.setState({
            username: '', password: '', message: res.data.message
        })
        this.props.updateUsername(res.data.username)
        this.props.updateId(res.data.id)
        if (res.data.loggedIn) {
            this.props.history.push('/homepage')
        }
    }

    async register() {
        let { username, password } = this.state
        let res = await axios.post('/auth/register', { username, password })
        this.setState({
            username: '', password: '', message: res.data.message
        })
        this.props.updateUsername(res.data.username)
        this.props.updateId(res.data.id)
        if (res.data.loggedIn) {
            this.props.history.push('/homepage')
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login'>
                    <h3>Happy Gardening!</h3>
                    <div className='username'>
                        <p>Username:
                        <input
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='password'>
                        <p>Password:
                        <input
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                                type="password"
                            />
                        </p>
                    </div>
                    <button onClick={() => this.login()}>Login</button>
                    <button onClick={() => this.register()}>Register</button>
                    <p className='login-error'>{this.state.message}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {...state}
}

export default connect(mapStateToProps, {})(Login);
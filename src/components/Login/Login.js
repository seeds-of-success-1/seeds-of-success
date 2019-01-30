import React, { Component } from 'react';
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
            toggleLogin: true
        }
    }

    async login() {
        let { username, password } = this.state;
        let res = await axios.post('/auth/login', { username, password });
        this.setState({
            username: '', password: '', message: res.data.message
        })
        this.props.updateUsername(res.data.username)
        this.props.updateId(res.data.id)
        if (res.data.loggedIn) {
            this.props.history.push('/dashboard')
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
            this.props.history.push('/dashboard')
        }
    }

    toggleLogin = () => {
        this.setState({ toggleLogin: !this.state.toggleLogin })
    }

    render() {
        return (
            <div className='login-background'>
                {this.state.toggleLogin ?
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
                        <p className='login-error'>{this.state.message}</p>
                        <p>Dont have an account? Register <a onClick={this.toggleLogin}>Here</a></p>
                    </div> :
                    <div className='register'>
                        <div className='username'>
                        <h3>Register Account</h3>
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
                        <button onClick={() => this.register()}>Register</button>
                        <p className='login-error'>{this.state.message}</p>
                        <a onClick={this.toggleLogin}>Login?</a>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps, { updateUsername, updateId })(Login);
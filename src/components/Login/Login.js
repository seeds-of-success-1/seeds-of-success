import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUsername, updateId } from './../../ducks/reducer';
import styled from 'styled-components';
import Bg from './Bg1.png'

const LoginMain = styled.div`
background-image:url(${Bg});
height:87vh;
display:flex;
justify-content:center;
padding-top:13%;
`
const LoginContainer = styled.div`
padding-top: 12px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
width:30vw;
height:40vh;
background-color:whitesmoke;
opacity:0.80;
text-align:center;
border-radius:6px;
`
const RLogin = styled.div`
height:100%;
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const LoginInput = styled.input`
font: inherit;
color: currentColor;
width: 50%;
border: 0;
margin: 0;
padding: 6px 0 7px;
display: block;
min-width: 0;
box-sizing: content-box;
background: none;
-webkit-tap-highlight-color: white;
margin-left:8%
outline: none !important;
caret-color: green;
`

const LoginButton = styled.button`
border-radius:4px;
border:none;
font-weight:650;
margin-top:10px
margin-bottom:1px;
min-height:35px;
min-width:55px;
cursor:pointer;
`

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
            <LoginMain>
                <LoginContainer className='login-background'>
                    {this.state.toggleLogin ?
                        <RLogin className='login'>
                            <h4>Happy Gardening!</h4>
                               
                                    <LoginInput
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                        autoComplete="off" placeholder='username'
                                    />
                               
                            
                            
                                
                                    <LoginInput
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password" autoComplete='off' placeholder='password'
                                    />
                                
                            
                            <LoginButton onClick={() => this.login()}>Login</LoginButton>
                            <p>Register<a onClick={this.toggleLogin}></a></p>
                            <p className='login-error'>{this.state.message}</p>
                        </RLogin> :
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
                </LoginContainer>
            </LoginMain>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps, { updateUsername, updateId })(Login);
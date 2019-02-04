import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUsername, updateId, updateProjects } from './../../ducks/reducer';
import styled from 'styled-components';
import Bg from './Bg1.png'
import FadeIn from './FadeInAnimation';

const LoginMain = styled.div`
background-image:url(${Bg});
background-repeat:no-repeat;
background-size:cover;
height:100vh;
display:flex;
justify-content:center;

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
text-align:center;
border-radius:6px;
margin-top:25%;

@media (max-width: 1700px) {
    width:70vh;
    height:70vh;
    margin-top:12%;
    font-size:1.5rem;
  }
  @media(max-width:1025px){
      height:40vh;
      width:60vw;
      margin-top:20%;
  }
  @media(max-width:815px){
      height:70vh;
      width:60vw
  }
  @media(max-width:600px){
    margin-top:25%;
    height:60vh;
    width:75vw;
  }
`
const RLogin = styled.div`
height:100%;
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
@media (max-width: 1700px) {
    font-size:1.5rem;
  }
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
margin-left:8%;
outline: none !important;
caret-color: green;
@media (max-width: 1700px) {
    height:50px;
    text-size:1.5rem
  }
`

const LoginButton = styled.button`
border-radius:4px;
border:none;
font-weight:650;
margin-top:10px;
margin-bottom:1px;
min-height:35px;
min-width:55px;
cursor:pointer;
font-weight:650;
@media (max-width: 1700px) {
    height:50px;
    min-width:100px;
    font-size:1.5rem;
    margin-bottom:10px
  }
`
const LError = styled.p`
color:red;
font-weight:600;
`
const SReg=styled.a`
font-weight:600;
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
            this.fetchProjects()
            this.props.history.push('/dashboard')
        }
    }

    fetchProjects = async () => {
        let res = await axios.get('/api/project/projects');
        this.props.updateProjects(res.data.projects)
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
            <FadeIn duration='1.4s' delay='.3s'>
                <LoginContainer className='login-background'>
                    {this.state.toggleLogin ?
                        <RLogin className='login'>
                            <h4>Happy Gardening!</h4>

                                    <LoginInput
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                        autoComplete="off" placeholder='Username'
                                    />


                                    <LoginInput
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password" autoComplete='off' placeholder='Password'
                                    />


                            <LoginButton onClick={() => this.login()}>Login</LoginButton>
                            <p>Register <SReg onClick={this.toggleLogin}>Here</SReg></p>
                            <LError className='login-error'>{this.state.message}</LError>
                        </RLogin> :
                        <RLogin className='register'>

                                <h4>Register Account</h4>

                                <LoginInput
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                        placeholder='Username'
                                    />




                                <LoginInput
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password" placeholder='Password'
                                    />


                            <LoginButton onClick={() => this.register()}>Register</LoginButton>
                            <SReg onClick={this.toggleLogin}>Login?</SReg>
                        </RLogin>}
                </LoginContainer>
                </FadeIn>
            </LoginMain>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps, { updateUsername, updateId, updateProjects })(Login);
import React, { Component } from 'react';
import styled from 'styled-components';
import close from '../Toolbar/close-btn.svg'

const ModalOverlay = styled.div`
   z-index: 20;
   display:${props => props.show ? 'inline-block' : 'none'};
    background-color: rgba(220,220,220,0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow:auto;
`
const Modal = styled.div`
    height:auto;
    width: 60%;
    max-width:600px;
    max-height:900px;
    min-width:300px;
    padding:10px;
    display:${props => props.show ? 'flex' : 'none'};
    flex-direction:column;
    align-items: center;
    justify-content:center;
    position: fixed;
    top:10%;
    left:28%;
    background-color: #DCEDC8;
    z-index: 30;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    @media (max-width: 900px) {
    left:20%;
  }
  @media(max-width:600px){
      left:7%;
      margin-top:25%;
  }
  @media (max-height: 740px) {
    position:absolute;

  }
`
const Title = styled.h4`

`
const Input = styled.input`
font: inherit;
width: 40%;
border: 0;
border-radius:5px;
margin-bottom: 3px;
padding: 6px 0 7px;
display: block;
min-width: 0;
box-sizing: content-box;
background:transparent;
margin-left:8%;
outline: none !important;
caret-color: green;
@media (max-width: 1700px) {
    height:50px;
    text-size:1.5rem;
  }
  :focus{
    transition: all 0.4s ease 0s;
    -webkit-box-shadow: 0px 5px 30px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 30px -10px rgba(0,0,0,0.57);
    transform:scale(1.1);
    ::placeholder{
        color:#424242;
        font-weight:450;
    }
  }
  @media (max-width:500px){
      width:80%;
      height:35px;
  }
`
const CloseBtn = styled.img`
height:15px;
width:15px;
cursor:pointer;
position:absolute;
right:1px;
top:1px;
:hover{
    transition: all 0.2s ease 0s;
    transform:scale(1.5);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
}
`
const OptionsBtn = styled.button`
border-radius:50px;
border:none;
font-weight:650;
margin-top:15px;
margin-left:8px;
margin-bottom:1px;
min-height:35px;
min-width:55px;
cursor:pointer;
font-weight:650;
background: #8BC34A;
color: #fff !important;
outline: none;
@media (max-width: 1700px) {
    height:50px;
    min-width:100px;
    font-size:1.5rem;
    margin-bottom:10px
  }
  :hover{
     text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
    transform:scale(1.1);
}
@media (max-width:500px){
    height:25px;
    width:60px;
    min-height:25px;
    min-width:60px;
    font-size:.75rem;
}
`
const ButtonBar = styled.div`

`
class CreateModal extends Component {
    state = {
        projectName: ''
    }
    cancel = () => {
        this.setState({ projectName: '' });
        this.props.toggleModal()
    }
    render() {
        return (
            <ModalOverlay show={this.props.show}>
                <Modal show={this.props.show}>
                    <CloseBtn
                        onClick={this.props.toggleModal}
                        src={close} />
                    <Title>Project Name</Title>
                    <Input placeholder='Project Name' onChange={(e) => this.setState({ projectName: e.target.value })} />
                    <ButtonBar>
                        <OptionsBtn
                            onClick={() => this.props.create(this.state.projectName)}
                        >CREATE</OptionsBtn>
                        <OptionsBtn
                            onClick={this.cancel}
                        >CANCEL</OptionsBtn>
                    </ButtonBar>
                </Modal>
            </ModalOverlay>
        );
    }
}

export default CreateModal;
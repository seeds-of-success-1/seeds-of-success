import React, { Component } from 'react';
import styled from 'styled-components';
import close from '../Toolbar/close-btn.svg'

const ModalOverlay = styled.div`
   z-index: 20;
   display:${props => props.show ? 'inline-block': 'none'};
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
    display:${props => props.show ? 'flex': 'none'};
    flex-direction:column;
    align-items: flex-start;
    justify-content:flex-start;
    position: fixed;
    top:10%;
    left:28%;
    background-color: #fff;
    z-index: 30;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    @media (max-width: 900px) {
    left:20%;
  }
  @media(max-width:600px){
      left:7%;
  }
  @media (max-height: 740px) {
    position:absolute;

  }
`
const Title = styled.h2`

`
const Input = styled.input`

`
const CloseBtn = styled.img`

`
const OptionsBtn = styled.button`

`
const ButtonBar = styled.div`

`
class CreateModal extends Component {
    state = {
        projectName:''
    }
    cancel = () => {
        this.setState({projectName:''});
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
                    <Input onChange={(e) => this.setState({projectName:e.target.value})}/>
                    <ButtonBar>
                        <OptionsBtn
                        onClick={()=> this.props.create(this.state.projectName)}
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
import React, { Component } from 'react';
import styled from 'styled-components';
import close from '../Toolbar/close-btn.svg';
import more from './more.svg'
import asparagus from '../Toolbar/asparagus.png'
// import less from './less.svg'

const ModalOverlay = styled.div`
   z-index: 20;
   display:${props => props.show ? 'inline-block': 'none'};
    background-color: rgba(241,248,233,0.8);
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
    left:30%;
    background-color: #fff;
    z-index: 30;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    @media (max-width: 900px) {
    left:20%;
  }
  @media(max-width:600px){
      left:15%;
  }
  @media (max-height: 740px) {
    position:absolute;
  }
  @media(max-width:440px){
      left:7%;
  }
  @media(min-width:1400px){
      left:33%;
  }
`
const CloseBtn = styled.img`
height:30px;
width: 30px;
position:absolute;
right:5px;
top:5px;
cursor:pointer;
:hover{
    transition: all 0.4s ease 0s;
    transform:scale(1.3)
}
`
const Image = styled.img`
height:40%;
max-height:300px;
width:80%;
align-self: center;
margin-top: 30px;
box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
margin-bottom:10px;
`
const Title = styled.h1`
margin:0;
font-size:1.7rem;
align-self: center;
`
const TextTitleWrap = styled.div`
display:flex;
flex-direction:column;
justify-content:flex-start;
height: auto;
transition: max-height .3s ease-in-out;
max-height: ${props => props.view ? "600px" : 0};
overflow:hidden;
`

const SubTitle = styled.h4`
font-size:1.2em;
padding:0;
margin:0;
width:100%;
position:relative;
cursor:pointer;
border-bottom: solid 1px grey;
:hover {
    cursor: pointer;
    background-color: #DCEDC8;
    transition:0.3s;
    border-radius:5px;
    box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
}
`
const MoreIcon = styled.img`
height:20px;
width:20px;
position:absolute;
top:5px;
right:5px;
transform:${props => props.view ? 'rotate(180deg)':'none'};
transition:all .6s;
justify-self:flex-end;
`
const SubText = styled.p`
padding:0;
margin:5px 10px;
font-size:1em;
overflow-y: auto;
`

class PlantModal extends Component {

    state ={
        selected:''
    }
    componentDidUpdate(prevProps, prevstate){
        if(Object.keys(prevProps.plant).length && !this.props.show && this.state.selected){
            this.setState({selected:''})
        }
    }

    toggleSubText = (e) => {
        let el = e.currentTarget;
        let id = el.className.split(' ')[0];
        if(id === this.state.selected){
            this.setState({selected:''})
        }else{
            this.setState({selected:id})
        }
    }


   render() {
        const {plant} = this.props;
        return (
            <ModalOverlay
            show={this.props.show}
            >
                <Modal
                show={this.props.show}
                >
                <CloseBtn
                onClick={this.props.toggleModal}
                src={close} alt=""/>

                {plant.id === 5 ? <Image src={asparagus}  /> : <Image src={`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${plant.image_url}`}  />}

                <Title>{plant.name}</Title>

                <SubTitle onClick={(e) => this.toggleSubText(e)}  className="one" >Description
                <MoreIcon className="one" view={this.state.selected === 'one'?true:false} src={more} />
                </SubTitle>

                <TextTitleWrap view={this.state.selected === 'one'?true:false } >
                <SubText view={this.state.selected === 'one'?true:false }  >{plant.description}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="two" >Watering
                <MoreIcon className="two" view={this.state.selected === 'two'?true:false} src={more} />
                </SubTitle>

                <TextTitleWrap view={this.state.selected === 'two' ?true:false } >
                <SubText view={this.state.selected === 'two'?true:false} >{plant.watering}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="three" >Spacing
                <MoreIcon className="three" view={this.state.selected === 'three'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'three' } >
                <SubText >{plant.spacing}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="four" >Sun
                <MoreIcon className="four" view={this.state.selected === 'four'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'four' } >
                <SubText >{plant.optimal_sun}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="five" >Soil
                <MoreIcon className="five" view={this.state.selected === 'five'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'five' } >
                <SubText >{plant.optimal_soil}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="six" >Planting Considerations
                <MoreIcon className="six" view={this.state.selected === 'six'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'six' } >
                <SubText >{plant.planting_considerations}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="seven" >Diseases
                <MoreIcon className="seven" view={this.state.selected === 'seven'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'seven' } >
                <SubText >{plant.diseases}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="eight" >Growing From A Seed
                <MoreIcon className="eight" view={this.state.selected === 'eight'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'eight' } >
                <SubText>{plant.growing_from_seed}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="nine" >When To Plant
                <MoreIcon className="nine" view={this.state.selected === 'nine'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'nine' } >
                <SubText>{plant.when_to_plant}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)}className="ten" >Harvesting
                <MoreIcon className="ten" view={this.state.selected === 'ten'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'ten' }  >
                <SubText>{plant.harvesting}</SubText>
                </TextTitleWrap>

                <SubTitle onClick={(e) => this.toggleSubText(e)} className="eleven" >Transplanting
                <MoreIcon className="eleven" view={this.state.selected === 'eleven'?true:false} src={more} />
                </SubTitle>
                <TextTitleWrap view={this.state.selected === 'eleven' }  >
                <SubText >{plant.transplanting}</SubText>
                </TextTitleWrap>

                </Modal>
            </ModalOverlay>
        );
    }
}


export default PlantModal;
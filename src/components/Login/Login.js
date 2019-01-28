import React, {component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            message: '',
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {...state}
}

export default connect(mapStateToProps, {})(Login);
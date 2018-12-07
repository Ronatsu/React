import React from 'react';
import Background from '../components/Background';

class Handler extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch() {
        console.log('componentDidCatch ==>');

        this.setState({
            hasError: true
        })
    }

    render() {
        return (
            <div>
                {this.state.hasError
                    ? (<span style={{ backgroundColor: 'red' }}>error</span>)
                    : this.props.children
                }
            </div>
        )
    }
}
export default Handler;
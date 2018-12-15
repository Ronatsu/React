import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ErrorStyle.css';
import ChartIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Footer from '../components/Footer';

export default class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        render: PropTypes.func.isRequired
    };
    state = {
        hasError: false,
        error: '',
        errorInfo: ''

    };

    componentDidCatch(error, errorInfo) {


        this.setState({
            hasError: true,
            error: error.toString(),
            errorInfo: errorInfo.componentStack
        });
    }

    render() {

        if (this.state.hasError) {
            axios.post(`https://localhost:44357/api/JSONError`, {
                Error: this.state.error,
                ErrorInfo: this.state.errorInfo,

            });
            return (
                <div>
                    <div className="container" id="midle">
                        <div className="row">
                            <div className=" col-md-2 mb-3">
                            </div>
                            <div className="form-inline col-md-10 mb-3" >
                                <div >
                                    <h1 id="title"><strong >UPSSS...</strong></h1>
                                    <h3 >Lo sentimos ha ocurrido un error,<br /> estamos trabajando en eso.</h3>
                                </div>
                                <div>
                                    <ChartIcon id="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="page-footer" id="footererror">
                        <Footer />
                    </footer>
                </div>
            );
        }
        return this.props.children;
    }
}
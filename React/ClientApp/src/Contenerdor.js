import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Header from './components/Navigation';

class Content extends Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  };
  render() {
    const { body } = this.props;

    return (
      <body>
        <div>
          {body}
        </div>
      </body>

    );
  }
}

export default Content;
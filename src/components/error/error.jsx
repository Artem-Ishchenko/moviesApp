import { Component } from 'react';
import './error.css';
import { Alert } from 'antd';

export default class AlertMessage extends Component {
  render() {
    const { messageError } = this.props;
    return <Alert message="Error" description={messageError.message} type="error" showIcon />;
  }
}

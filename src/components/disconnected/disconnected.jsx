import { Alert } from 'antd';
import './disconnected.css';
import { Component } from 'react';

export default class AlertDisconnectedMessage extends Component {
  render() {
    return (
      <Alert
        message="Warning! Internet problems!"
        description="Looks like there are some difficulties with the network... ={ "
        type="warning"
      />
    );
  }
}

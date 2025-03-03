import { Component } from 'react';
import { Rate, ConfigProvider } from 'antd';
import './stars.css';

export default class Stars extends Component {
  render() {
    return (
      <ConfigProvider
        theme={{
          components: {
            Rate: {
              starSize: 15,
            },
          },
        }}
      >
        <Rate allowHalf count={10} />
      </ConfigProvider>
    );
  }
}

import { Component } from 'react';
import './pagination.css';
import { Pagination, ConfigProvider } from 'antd';

export default class MyPagination extends Component {
  render() {
    const { total, current, onChange } = this.props;
    return (
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: '',
              colorPrimary: '#cdd0d4',
              colorBgTextActive: '#168CFC',
              itemSize: 36,
              itemActiveBg: '#168CFC',
              colorPrimaryHover: 'white',
              colorTextDisabled: '#555',
            },
          },
        }}
      >
        {' '}
        <Pagination
          className="mypagination-design"
          defaultCurrent={current}
          total={total}
          showSizeChanger={false}
          pageSize={20}
          onChange={onChange}
        />
      </ConfigProvider>
    );
  }
}

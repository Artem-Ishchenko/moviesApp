import { Component } from 'react';
import { Alert } from 'antd';
import './empty.css';

export default class AlertEmpty extends Component {
  render() {
    return (
      <Alert
        className="alert-empty"
        message="Фильмы не найдены!"
        description="По вашему запросу ни одного фильма не найдено."
        type="info"
        showIcon
      />
    );
  }
}

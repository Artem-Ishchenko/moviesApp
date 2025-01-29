import { Component } from 'react';

import './image.css';
import icon from '../../assets/defaultImage.png';

export default class Image extends Component {
  render() {
    const { url, alt } = this.props;
    if (url === undefined) {
      return <img className="card-main__image-default" src={icon} alt={alt} />;
    } else {
      return <img className="card-main__image-fullfiled" src={url} alt={alt} />;
    }
  }
}

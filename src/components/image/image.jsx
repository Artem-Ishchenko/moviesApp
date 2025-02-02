import { Component } from 'react';

import './image.css';
import icon from '../../assets/defaultImage.svg';

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: this.fullUrl(props.urlPath),
      fallbackImage: icon,
      error: false,
    };
  }

  fullUrl = (path) => {
    const basicurl = `https://image.tmdb.org/t/p/`;
    const size = `w500`;
    return `${basicurl}${size}${path}`;
  };

  handleImageError = () => {
    this.setState({
      imageSrc: this.state.fallbackImage,
      error: true,
    });
  };

  render() {
    const { imageSrc, error } = this.state;
    let clazz = 'card-main__image-default';
    !error && (clazz = 'card-main__image-fullfiled');
    return (
      <div className="card-main__image">
        <img className={clazz} src={imageSrc} alt="Sample" onError={this.handleImageError} style={{ width: '100%' }} />
      </div>
    );
  }
}

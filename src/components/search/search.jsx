import { Component } from 'react';
import './search.css';
import { debounce } from 'lodash';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query || '',
    };
    this.debounceChange = debounce(this.props.onChangeQuery, 500);
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
    this.debounceChange(value);
  };

  render() {
    return (
      <div className="search-panel">
        <input
          type="text"
          className="search-input"
          placeholder="Type to search..."
          value={this.state.query}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

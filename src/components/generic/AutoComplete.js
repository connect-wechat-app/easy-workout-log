import React, {Component} from 'react';

import './AutoComplete.css';

import autoCompleteSuggestions from '../../modules/generic/autoCompleteSuggestions';

class AutoComplete extends Component {

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(props) {
    const {items, input} = props;
    const suggestions = autoCompleteSuggestions(items, input);
    return {suggestions: suggestions, currentIndex: -1};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  handleCloseClick = () => {
    const state = this.state;
    const newState = {
      ...state,
      suggestions: [],
      currentIndex: -1
    };
    this.setState(newState);
  }

  incrementCurrentHighlight() {
    const state = this.state;
    const incrementedIndex = state.currentIndex + 1;
    const updatedIndex = (incrementedIndex > state.suggestions.length - 1)
      ? state.currentIndex
      : incrementedIndex;

    const newState = {
      ...state,
      currentIndex: state.suggestions.length
        ? updatedIndex
        : -1
    };
    this.setState(newState);
  }

  decrementCurrentHighlight() {
    const state = this.state;
    const decrementedIndex = state.currentIndex - 1;
    const updatedIndex = (decrementedIndex < 0)
      ? -1
      : decrementedIndex;

    const newState = {
      ...state,
      currentIndex: updatedIndex
    };
    this.setState(newState);
  }

  handleKeyDown(event) {
    const s = this.state;

    if (s.suggestions.length) {

      if (event.keyCode === 27) { // escape
        this.handleCloseClick();
      } else if (event.keyCode === 40) { // down arrow
        this.incrementCurrentHighlight();
      } else if (event.keyCode === 38) { // up arrow
        this.decrementCurrentHighlight();
      } else if (event.keyCode === 13) { // enter
        event.preventDefault();

        if (s.currentIndex >= 0) {
          const value = s.suggestions[s.currentIndex];
          this
            .props
            .handleChange(value);
        }
      }
    }
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  renderMenu() {
    const self = this;

    if (self.state.suggestions.length === 0) {
      return null;
    }

    return (
      <ul className="menu">
        <li className="menu-item">
          <button
            type="button"
            className="btn btn-clear float-right"
            onClick={self.handleCloseClick}></button>
        </li>
        {self
          .state
          .suggestions
          .map((suggestion, index) => {
            return (
              <li
                className={"menu-item " + (self.state.currentIndex === index
                ? 'autocomplete-is-focused'
                : '')}
                key={index}>
                <a
                  href="#"
                  onClick={(event) => {
                  event.preventDefault();
                  self
                    .props
                    .handleChange(suggestion);
                }}>
                  {suggestion}
                </a>
              </li>
            );
          })}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-autocomplete">
        <div className="form-autocomplete-input form-input">
          <input
            className="form-input input-lg"
            type="text"
            placeholder={this.props.placeholder}
            value={this.props.input}
            name={this.props.name}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}/>
        </div>

        {this.renderMenu()}

      </div>
    );
  }
}

export default AutoComplete;
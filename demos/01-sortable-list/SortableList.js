var React = require('react');

var SortableList = module.exports = React.createClass({
  // Set the initial sort direction
  getInitialState: function () {
    return {
      sortAscending: true
    };
  },

  render: function () {
    // do the actual sort, basic js
    // `this.props.children` represents
    // all "html" children of our
    // SortableList class
    var sortedChildren = this.props.children.sort(this._sort);

    // render the children
    // and a button with
    // an `onClick` handler
    return (
      <div className="sortable-list">
        <button onClick={this._toggleAscending}>Toggle alphabetical sort</button>
        <ul>
          { this.props.children }
        </ul>
      </div>
    );
  },

  _toggleAscending: function () {
    // toggle state
    this.setState({
      sortAscending: !this.state.sortAscending
    });
  },

  _sort: function (a, b) {
    // sort helper, dependent on state.sortAscending
    // (a.props.children is the TEXT inside a <li>)
    return this.state.sortAscending ?
       (a.props.children > b.props.children) :
       (a.props.children < b.props.children);
  },
});
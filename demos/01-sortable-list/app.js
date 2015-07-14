var React = require('react');

// Create a React.Component
var App = React.createClass({
  render: function () {
    // Return the list of items
    return (
      <ul>
        <li>A</li>
        <li>D</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>I</li>
      </ul>
    );
  }
});

// Render the <App /> Komponent
// into the body
React.render(
  <App />
, document.body);
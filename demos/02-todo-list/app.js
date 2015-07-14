var React = require('react');

var TodoApp = React.createClass({
  // create an initial state with
  // an array for our todos
  getInitialState: function () {
    return {
      todos: ['initial todo']
    };
  },
  render: function () {
    // create an array of <li>s
    // [<li>..</li>, <li>..</li>, ..]
    var todos = this.state.todos.map(function (task, index) {
      return <li key={task}>{ task }</li>;
    });

    // add an onKeyUpHandler to
    // add new todos on ENTER
    return (
      <div>
        Enter your ToDo here: <input onKeyUp={this._onKeyUp} />
        <ul>
          { todos }
        </ul>
      </div>
    );
  },

  _onKeyUp: function (e) {
    // Is it the ENTER key?
    if (e.keyCode === 13) {
      this._addNewTodo(e.target.value);
      // reset the inputs.value
      e.target.value =  '';
    }
  },

  _addNewTodo: function (newTodo) {
    // prepend the new task to the current state
    // by calling `setState`
    this.setState({
      todos: [newTodo].concat(this.state.todos)
    });
  }
});

React.render(<TodoApp />, document.body);
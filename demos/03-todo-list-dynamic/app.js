var React = require('react');
var SortableList = require('../01-sortable-list/SortableList');
// the database information is in a
// separate file, to exclude it from git
var { DB_CONNECTION_KEY } = require('./conf');

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      todos: []
    };
  },
  render: function () {

    var todos = this.state.todos.map(function (task, index) {
      return <li key={task}>{ task }</li>;
    });

    return (
      <div>
        Enter your ToDo here: <input onKeyUp={this._onKeyUp} />
        <SortableList>
          { todos }
        </SortableList>
      </div>
    );
  },

  // do some initial stuff, when
  // the component gets added
  // into the DOM
  componentDidMount: function () {
    // connect to database
    this.db = new Firebase(DB_CONNECTION_KEY);

    // get already added todos
    // from database once
    this.db.once('value', function (todosFromDatabase) {
      // turn them back into an array
      // ..dirty, sorry!
      var todos = turnIntoArray(todosFromDatabase);

      this.setState({
        todos: todos
      });
    }.bind(this));

    // listen to "newly added todos"
    this.db.on('child_added', function (snapshot) {
      this.setState({
        todos: [snapshot.val()].concat(this.state.todos)
      });
    }.bind(this));
  },

  _onKeyUp: function (e) {
    if (e.keyCode === 13) {
      this._addNewTodo(e.target.value);
      e.target.value =  '';
    }
  },

  _addNewTodo: function (newTodo) {
    // simply push the new todo
    // into the database
    this.db.push(newTodo);
  }
});

React.render(<TodoApp />, document.body);


function turnIntoArray (v) {
  var r = [];
  v.forEach(function (i) {
    r.push(i.val());
  });
  return r;
}
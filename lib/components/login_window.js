var LoginWindow = React.createClass({
  displayName: 'LoginWindow',

  getInitialState: function () {
    return {
      username: '',
      password: '',
      loggedIn: this.props.loggedIn
    };
  },
  componentWillReceiveProps: function (nextProps) {
    console.log('nextprops', nextProps);
    this.setState({
      loggedIn: nextProps.loggedIn
    });
  },
  componentDidMount: function () {
    console.log('props', this.props);
  },
  handleChange: function (e) {
    var details = {};
    details[e.target.id] = e.target.value;
    this.setState(details);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var self = this;
    console.log(e);
    this.props.handleCommand('sendLogin', {
      username: self.state.username,
      password: self.state.password
    });
  },
  loginForm: function () {
    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'label',
        { htmlFor: 'username' },
        'Username:',
        React.createElement('input', { id: 'username', onChange: this.handleChange })
      ),
      React.createElement(
        'label',
        { htmlFor: 'password' },
        'Password:',
        React.createElement('input', { id: 'password', type: 'password', onChange: this.handleChange })
      ),
      React.createElement(
        'button',
        { type: 'submit', onClick: this.handleSubmit },
        'Submit'
      )
    );
  },
  render: function () {
    if (this.state.loggedIn === null) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          null,
          'Checking login status...'
        )
      );
    } else if (this.state.loggedIn) {
      return React.createElement('div', null);
    } else {
      return this.loginForm();
    }
  }
});

module.exports = LoginWindow;
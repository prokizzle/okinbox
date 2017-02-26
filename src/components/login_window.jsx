var LoginWindow = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      password: '',
      loggedIn: this.props.loggedIn
    }
  },
  componentWillReceiveProps: function (nextProps) {
    console.log('nextprops', nextProps)
    this.setState({
      loggedIn: nextProps.loggedIn
    })
  },
  componentDidMount: function () {
    console.log('props', this.props)
  },
  handleChange: function (e) {
    var details = {}
    details[e.target.id] = e.target.value
    this.setState(details)
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var self = this;
    console.log(e)
    this.props.handleCommand('sendLogin', {
      username: self.state.username,
      password: self.state.password
    })
  },
  loginForm: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='username'>
          Username:
          <input id='username' onChange={this.handleChange}/>
        </label>
        <label htmlFor='password'>
          Password:
          <input id='password' type='password' onChange={this.handleChange}/>
        </label>
        <button type='submit' onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  },
  render: function () {
    if (this.state.loggedIn === null) {
      return (
        <div>
          <span>Checking login status...</span>
        </div>
      )
    } else if (this.state.loggedIn) {
      return (<div/>)
    } else {
      return this.loginForm()
    }

  }
})

module.exports = LoginWindow

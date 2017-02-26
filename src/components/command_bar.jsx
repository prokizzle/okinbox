var CommandBar = React.createClass({
  getDefaultProps: function () {
    return {
      commands: []
    }
  },
  commands: function () {
    return this.props.commands.map(function(cmd, idx) {
      return (
        <button
          onClick={this.props.handleCommand}
          key={idx}
          data-command={cmd.slug}>
          {cmd.label}
        </button>
      )
    }, this)
  },
  render: function () {
    if (this.props.loggedIn) {
      return (
        <div>
          { this.commands() }
        </div>
      )
    } else {
      return (<div />)
    }
  }
})
module.exports = CommandBar

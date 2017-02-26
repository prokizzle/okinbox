var CommandBar = React.createClass({
  displayName: "CommandBar",

  getDefaultProps: function () {
    return {
      commands: []
    };
  },
  commands: function () {
    return this.props.commands.map(function (cmd, idx) {
      return React.createElement(
        "button",
        {
          onClick: this.props.handleCommand,
          key: idx,
          "data-command": cmd.slug },
        cmd.label
      );
    }, this);
  },
  render: function () {
    if (this.props.loggedIn) {
      return React.createElement(
        "div",
        null,
        this.commands()
      );
    } else {
      return React.createElement("div", null);
    }
  }
});
module.exports = CommandBar;
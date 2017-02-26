React = require('react');
ReactDOM = require('react-dom');
_ = require('lodash');
FilterElement = require('./components/filter_element');
CommandBar = require('./components/command_bar');
OkcupidWebview = require('./components/okcupid_webview');
LoginWindow = require('./components/login_window');
MessageStats = require('./components/message_stats');
MessageAssistant = require('./components/message_assistant');
Tabs = require('./components/tabs');
OkInbox = require('./components/okinbox');

ReactDOM.render(React.createElement(OkInbox, null), document.querySelector("#windowContainer"));
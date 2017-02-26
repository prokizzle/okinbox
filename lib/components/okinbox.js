var OkInbox = React.createClass({
  displayName: 'OkInbox',

  getInitialState: function () {
    return {
      key: '1',
      loggedIn: null,
      currentTab: 'inbox',
      autodelete: {}
    };
  },
  componentDidMount: function () {
    var webview = this.refs.webview;
    var loginChecker = this.refs.loginChecker;
    var self = this;
    webview.addEventListener("dom-ready", function () {
      webview.openDevTools();
      loginChecker.addEventListener("ipc-message", function (message) {
        console.log(message);
        self.handleMessage(message);
      });
      webview.addEventListener("ipc-message", function (message) {
        console.log(message);
        self.handleMessage(message);
      });
    });
  },
  windowId: function () {
    return 'web-page-webview-sm';
    if (this.state.loggedIn) {
      return 'web-page-webview';
    } else {
      return 'web-page-webview-sm';
    }
  },
  handleChangeTab: function (e) {
    e.preventDefault();
    this.setState({
      currentTab: e.target.dataset.tabName
    });
    this.sendCommand('currentTab', e.target.dataset.tabName);
  },
  handleMessage: function (message) {
    var details = {};
    console.log(message);
    if (message.channel === 'requestState') {
      this.sendCommand('setState', this.state);
    } else {
      details[message.channel] = message.args[0];
      console.log(details);
      this.setState(details);
    }
  },
  handleCommand: function (e) {
    var cmd = e.target.dataset['command'];
    this.sendCommand(cmd);
  },
  sendCommand: function (cmd, args) {
    console.log(cmd, args);
    this.refs.webview.send(cmd, args);
  },
  handleInboxCommand: function (e) {
    var cmd = e.target.dataset['command'];
    this.sendInboxCommand(cmd);
  },
  sendInboxCommand: function (cmd, args) {
    console.log(cmd, args);
    this.refs.inboxHelper.send(cmd, args);
  },
  webviewStyles: function () {
    if (this.state.loggedIn) {
      return {
        display: 'block'
      };
    } else {
      return {
        display: 'none'
      };
    }
  },
  setMasterState: function (state) {
    this.setState(state, function () {
      this.sendCommand('setState', this.state);
    }, this);
  },
  webview: function () {
    if (this.state.currentTab === 'inbox') {
      console.log('inbox');
      return React.createElement('webview', {
        ref: 'webview',
        id: this.windowId(),
        src: 'https://okcupid.com/messages',
        preload: './lib/scripts/inject.js'
      });
    } else if (this.state.currentTab === 'matches') {
      return {
        ref: "matchesView",
        id: this.windowId(),
        src: 'https://www.okcupid.com/mutual-likes',
        preload: './lib/scripts/matches.js'
      };
    } else if (this.state.currentTab === 'assistant') {
      return React.createElement('webview', {
        ref: 'webview',
        id: 'inboxHelper',
        src: 'https://okcupid.com/messages',
        preload: './lib/scripts/message_assistant.js'
      });
    }
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(Tabs, { currentTab: this.state.currentTab, handleChange: this.handleChangeTab }),
      React.createElement(MessageStats, {
        noPhotosCount: this.state.noPhotoMessages,
        visibleMessages: this.state.visibleMessages,
        matchMessages: this.state.matchPhraseCount,
        weakMessages: this.state.weakMessages,
        repliedTo: this.state.repliedToMessages,
        handleCommand: this.handleCommand,
        sendCommand: this.sendCommand,
        setMasterState: this.setMasterState,
        show: this.state.currentTab === 'inbox'
      }),
      React.createElement(LoginWindow, { loggedIn: this.state.loggedIn, handleCommand: this.sendCommand }),
      React.createElement(
        'div',
        { className: 'webPageView', key: this.state.key },
        this.webview(),
        React.createElement('webview', {
          ref: 'loginChecker',
          id: 'web-page-webview-sm',
          src: 'https://www.okcupud.com',
          preload: './lib/scripts/login_check.js'
        })
      ),
      React.createElement(CommandBar, {
        handleCommand: this.handleCommand,
        handleInboxCommand: this.handleInboxCommand,
        loggedIn: this.state.loggedIn,
        commands: [{ slug: 'loadMore', label: 'Load More' }, { slug: 'refresh', label: 'Refresh' }, { slug: 'nextMatch', label: 'Next Message' }, { slug: 'notInterested', label: 'Not Interested' }]
      })
    );
  }
});
module.exports = OkInbox;
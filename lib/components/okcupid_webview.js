var OkcupidWebview = React.createClass({
  displayName: "OkcupidWebview",

  componentDidMount: function () {
    var webview = this.refs.webview;
    webview.addEventListener("dom-ready", function () {
      webview.openDevTools();
      webview.addEventListener("ipc-message", function (message) {
        console.log(message.channel, message.args);
      });
      webview.send('testThis');
    });
    this.props.updateRef(webview);
  },
  getInitialState: function () {
    return {
      key: '1'
    };
  },
  getDefaultProps: function () {
    return {
      webPageUrl: 'https://okcupid.com/messages'
    };
  },
  windowId: function () {
    return 'web-page-webview';
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "webPageView", key: this.state.key },
      React.createElement("webview", {
        ref: "webview",
        id: this.windowId(),
        src: this.props.webPageUrl,
        preload: './lib/inject.js'
      })
    );
  }
});
module.exports = OkcupidWebview;
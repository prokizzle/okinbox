Tabs = React.createClass({
  displayName: 'Tabs',

  getDefaultProps: function () {
    return {
      tabs: [{ name: 'inbox' }, { name: 'assistant' }, { name: 'matches' }]
    };
  },
  tabs: function () {
    return this.props.tabs.map(function (tab, idx) {
      if (tab.name === this.props.currentTab) {
        tabClass = 'active';
      } else {
        tabClass = '';
      }
      return React.createElement(
        'li',
        { role: 'presentation', className: tabClass, key: idx },
        React.createElement(
          'a',
          { href: '', onClick: this.props.handleChange, 'data-tab-name': tab.name },
          tab.name
        )
      );
    }, this);
  },
  render: function () {
    return React.createElement(
      'ul',
      { className: 'nav nav-pills' },
      this.tabs()
    );
  }
});

module.exports = Tabs;
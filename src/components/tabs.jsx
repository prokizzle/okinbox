Tabs = React.createClass({
  getDefaultProps: function () {
    return {
      tabs: [
        {name: 'inbox'},
        {name: 'assistant'},
        {name: 'matches'}
      ]
    }
  },
  tabs: function () {
    return this.props.tabs.map(function(tab, idx) {
      if (tab.name === this.props.currentTab) {
        tabClass = 'active'
      } else {
        tabClass = ''
      }
      return (
        <li role='presentation' className={tabClass} key={idx}>
          <a href='' onClick={this.props.handleChange} data-tab-name={tab.name}>
            {tab.name}
          </a>
        </li>
      )
    }, this)
  },
  render: function () {
    return (
      <ul className="nav nav-pills">
        { this.tabs() }
      </ul>
    )
  }
})

module.exports = Tabs

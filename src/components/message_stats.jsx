var MessageStats = React.createClass({
  getDefaultProps: function () {
    var self = this
    return {
      noPhotosCount: 0,
      matchMessages: 0,
      weakMessages: 0,
      repliedTo: 0,
      filters: [
        {
          title: 'No Photos',
          countsName: 'noPhotosCount',
          cmdSlug: 'deleteNoPhotos'
        },
        {
          title: 'Match Messages',
          countsName: 'matchMessages',
          cmdSlug: 'deleteMatchMessages'
        },
        {
          title: 'Weak Message',
          countsName: 'weakMessages',
          cmdSlug: 'deleteWeakMessages'
        },
        {
          title: 'Replied To Messages',
          countsName: 'repliedTo',
          cmdSlug: 'deleteOldRepliedToMessages'
        }
      ]
    }
  },
  getInitialState: function () {
    return {}
  },
  counts: function (prop) {
    count = this.props[prop]
    if (count == null || count == undefined) {
      return 0
    } else {
      return count
    }
  },
  setAutodeleteState: function (state) {
    this.setState(state, function(){
      this.props.setMasterState({autodelete: this.state})
    }, this)
  },
  filters: function () {
    return this.props.filters.map(function(filter, idx) {
      return (
        <div className='col-sm-6' key={idx}>
          <FilterElement
            title={filter.title}
            counts={this.props[filter.countsName]}
            handleCommand={this.props.handleCommand}
            sendCommand={this.props.sendCommand}
            cmdSlug={filter.cmdSlug}
            setAutodeleteState={this.setAutodeleteState}
          />
        </div>
      )
    }, this)
  },
  render: function () {
    if (this.props.show) {
      return (
        <div className='container'>
          <span>Total Messages: {this.props.visibleMessages}</span><br />
          <hr />
          <div className='row'>
            {this.filters()}
          </div>
        </div>
      )
    } else {
      return (<div />)
    }
  }
})
module.exports = MessageStats

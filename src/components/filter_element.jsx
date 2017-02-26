var style = {
  container: {
    border: 'solid',
    borderWidth: 0.5,
    borderColor: '#000',
  }
}

var FilterElement = React.createClass({
  getInitialState: function () {
    return {
      autodelete: false,
      counts: 0
    }
  },
  getDefaultProps: function () {
    return {
      counts: 0
    }
  },
  componentDidMount: function () {
    this.setState({counts: this.props.counts})

  },
  componentWillReceiveProps: function (nextProps) {
    var self = this
    self.setState({counts: nextProps.counts}, function () {
      self.runAutoDelete()
    })
  },
  runAutoDelete: function () {
    if (this.state.autodelete) {
      console.log('running autodelete')
      if (this.state.counts > 0) {
        this.refs.deleteAllButton.click()
      }
    }
  },

  deleteAllButton: function () {
      return (
        <button
          onClick={this.props.handleCommand}
          data-command={this.props.cmdSlug}
          className='btn btn-default'
          ref='deleteAllButton'
          >
          Delete All
        </button>
      )
  },
  handleCheckboxChange: function (e) {
    console.log(e.target.dataset)
    var self = this
    state = {}
    state[self.refs.deleteAllButton.dataset.command] = e.target.checked
    self.props.setAutodeleteState(state)
    // setTimeout(function(){
      self.props.sendCommand(
        'toggleAutodelete', {
          command: self.refs.deleteAllButton.dataset.command,
          enabled: e.target.checked
        }
      )
      // self.handleCheckboxChange(e)
    // }, 2000)
  },
  deleteButtonStyles: function () {
    if (this.refs.autodelete == undefined) {
      return {};
    }
    if (this.refs.autodelete.checked) {
      console.log(this.refs.autodelete);
      return {display: 'none'};
    } else {
      return {};
    }
  },
  render: function () {
    return (
      <div style={style.container}>
        <div className='row'>
          <div className='text-center'>
            <h4>{this.props.title}</h4>
          </div>
        </div>
        <div className='row'>
          <div className='text-center'>
            <h3>{this.props.counts}</h3>
          </div>
        </div>
        <div className='row'>
          <div className='text-center'>
            <label>Autodelete
              <input ref='autodelete' type='checkbox' onChange={this.handleCheckboxChange}/>
            </label>
          </div>
        </div>
        <div className='text-center' style={this.deleteButtonStyles()}>
          { this.deleteAllButton() }
        </div>
      </div>
    )
  }
})

module.exports = FilterElement

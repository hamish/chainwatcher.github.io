var Name = React.createClass({
  render: function() {
    return (
      <div className="name">
        {this.props.children}
      </div>
    );
  }
});

var NameList = React.createClass({
  render: function() {
    //var nameNodes = this.props.data.map(function (name) {
    //  return (
    //    <Name>
    //      {name.text}
    //    </Name>
    //  );
    //});
    if (this.props.data['payload']) {
      nameNodes = this.props.data['payload']['transaction']['hash'];
    } else {
      nameNodes = "";
    }
    //$('#thashlist').append('<li>' + thash + '</li>');
    return (
      <div className="nameList">
        {nameNodes}
      </div>
    );
  }
});

var NameBox = React.createClass({
  getInitialState: function() {
    return {data: JSON.parse("{}")};
  },
  componentDidMount: function() {
    var conn = new WebSocket("wss://ws.chain.com/v2/notifications");
    conn.onopen = function (ev) {
      var req = {type: "new-transaction", block_chain: "bitcoin"};
      conn.send(JSON.stringify(req));
    };
    var outer = this;
    conn.onmessage = function (ev) {
      var data = JSON.parse(ev.data);
      outer.setState({data: data});
    };
    conn.onclose = function (ev) {
      var conn = new WebSocket("wss://ws.chain.com/v2/notifications");
    };
  },
  render: function() {
    return (
      <div className="nameBox">
        <h1>Names</h1>
        <NameList data={this.state.data} />
      </div>
    );
  }
});

React.render(
  <NameBox />,
  document.getElementById('content')
);

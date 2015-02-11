var Transaction = React.createClass({
  render: function() {
    return (
      <div className="transaction">
        {this.props.children}
      </div>
    );
  }
});

var TransactionList = React.createClass({
  render: function() {
    //var transactionNodes = this.props.data.map(function (transaction) {
    //  return (
    //    <Transaction>
    //      {transaction.text}
    //    </Transaction>
    //  );
    //});
    if (this.props.data['payload']) {
      transactionNodes = this.props.data['payload']['transaction']['hash'];
    } else {
      transactionNodes = "";
    }
    //$('#thashlist').append('<li>' + thash + '</li>');
    return (
      <div className="transactionList">
        {transactionNodes}
      </div>
    );
  }
});

var TransactionBox = React.createClass({
  getInitialState: function() {
    return {data: JSON.parse("{}")};
  },
  componentDidMount: function() {
    if (window.MozWebSocket) {
      window.WebSocket = window.MozWebSocket;
    }
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
      <div className="transactionBox">
        <h1>Transactions</h1>
        <TransactionList data={this.state.data} />
      </div>
    );
  }
});

React.render(
  <TransactionBox />,
  document.getElementById('content')
);

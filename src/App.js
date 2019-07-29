import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "React is cool...",
      date: null,
      input: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/message");
    const messageObj = await response.json();
    console.log("The message is: ", messageObj);
    this.setState({
      message: messageObj.message,
      date: messageObj.date
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const response = await fetch("/message", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: this.state.input})
    });
    const result = await response.text();
    console.log("Result is: ", result);
    if (result === "Success") {
      const nextResponse = await fetch("/message");
      const json = nextResponse.json();
      this.setState({
        message: json.message,
        date: json.date
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <h3>{this.state.date}</h3>
        <form onSubmit={this.handleSubmit} method="POST" action="/message">
          <label htmlFor="message">New Message here:</label>
          <br />
          <input
            onChange={this.handleInputChange}
            name="message"
            placeholder="write a message..."
          />
          <input type="submit" value="New Message" />
        </form>
      </div>
    );
  }
}

export default App;

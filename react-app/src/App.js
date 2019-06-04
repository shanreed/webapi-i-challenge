import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  

  componentDidMount() {
    axios.get('http://localhost:4000/data/seeds/users/')
    .then(res => {
      this.setState({users: res.data});
      console.log(this.state.users);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      
    );
  }
}

export default App;

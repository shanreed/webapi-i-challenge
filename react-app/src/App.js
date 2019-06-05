import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  };

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
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
      <div>
         <h1>WE GOT USERS!</h1>
          {this.state.users.map(user => {
            return (
              <div>
                <p>{user.name}</p>
                <p>{user.bio}</p>
                <button>Remove</button>
                </div>
            );
          })}
              
      </div>
    );
  }
}

export default App;

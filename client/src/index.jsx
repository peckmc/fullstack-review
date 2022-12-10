import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.render = this.render.bind(this);
  }

  search (term) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({"username":term}),
      success: function(data) {
        this.setState({
          repos: data
        });
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <br></br>
      <table border='1' width='600'>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th># Forks</th>
          </tr>
        {this.state.repos.map((repo) => (
          <tr>
            <td>{repo.name}</td>
            <td><a href={repo.html_url}>Link on GitHub</a></td>
            <td>{repo.forks}</td>
          </tr>
      ))}
    </table>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
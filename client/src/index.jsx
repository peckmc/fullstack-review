import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      // searchLoading: true,
      repoCount: 0,
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
    this.search = this.search.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      success: function(data) {
        this.setState({
          repoCount: data.repoCount,
          repos: data.top25,
          isLoading: false,
        });
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  }

  search (term) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({"username":term}),
      success: function(data) {
        this.getRepos();
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      {!this.state.isLoading && !this.state.searchLoading && <RepoList repoCount={this.state.repoCount} top25={this.state.repos}/>}
      <br></br>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
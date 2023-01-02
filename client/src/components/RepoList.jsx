import React from 'react';

const RepoList = (props) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repoCount} repos.
      <table border='1' width='600'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th># Forks</th>
          </tr>
          {props.top25.map((repo) => (
            <tr>
              <td>{repo.name}</td>
              <td><a href={repo.html_url}>Link on GitHub</a></td>
              <td>{repo.forks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RepoList;
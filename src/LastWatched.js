import React, { Component } from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from './lastwatched.reducer';

const NoData = styled.p`
  opacity: 0.5;
  margin-top: 5px;
  margin-left: 14px;
`;
const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-start;
  padding: 0;
  margin: 14px;
  overflow-x: auto;
  li {
    background: white;
    max-width: 200px;
    border: 1px solid #ccc;
    margin-right: 20px;
    .title {
      padding: 10px;
      display: flex;
      a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        flex: 1;
      }
    }
    img {
      max-width: 100%;
    }
  }
`;

class LastWatched extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetch())
  }
  render() {
    if (this.props.shows.length === 0) {
      return this.props.loading ? (
        <Spinner />
      ) : (
        <NoData>
          Todavia no has visto ningun episodio
        </NoData>
      );
    }
    return (
      <List>
        {this.props.shows.map((show, i) => (
          <li key={i}>
            <img src={show.image} alt="Portada del show" />
            <div className="title">
              <Link to={`/shows/${show.showid}`}>{show.title}</Link>
              <span>{show.subtitle}</span>
            </div>
          </li>
        ))}
      </List>
    );
  }
}

export default connect(state => state.lastwatched)(LastWatched);

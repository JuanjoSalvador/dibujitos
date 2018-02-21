import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import qs from 'qs';

const Container = styled.main`
  overflow-y: auto;
  max-height: calc(100vh - 70px);
  .wrapper {
    max-width: 768px;
    margin: 0 auto;
  }
  .show-info {
    display: flex;
    align-items: flex-start;
    .description {
      flex: 1;
      margin: 16px;
    }
  }
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
`;

class Details extends Component {
  state = {
    loading: false,
    show: {
      episodes: []
    },
    selectedEpisode: null
  }
  componentDidMount() {
    this.fetchShow();
  }
  componentWillReceiveProps(nextProps) {
    const query = this.getQueryString(nextProps);
    if(query.ep !== this.state.selectedEpisode) {
      this.setState({selectedEpisode: query.ep})
    }
  }
  getQueryString(props) {
    return qs.parse(props.location.search);
  }
  fetchShow() {
    this.setState({loading: true});
    const slug = this.props.match.params.slug;
    const url = `https://hs.fuken.xyz/show/${slug}`;
    window.fetch(url).then(res => res.json())
    .then(json => {
      this.setState({loading: false, show: json})
    })
  }
  render() {
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <Container>
        <div className="wrapper">
          <h2>{this.state.show.title}</h2>
          <div className="show-info">
            <img src={this.state.show.image_url} alt="portada del show"/>
            <p className="description">{this.state.show.description}</p>
          </div>
          <List>
            {this.state.show.episodes.map(episode => (
              <li key={episode.key}>
                <p>{episode.full_title}</p>
              </li>
            ))}
          </List>
        </div>
      </Container>
    )
  }
}

export default Details;

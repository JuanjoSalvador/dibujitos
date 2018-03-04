import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import Stars from './Stars';
import qs from 'qs';
import Button from './Button';
import MagnetPlayer from './MagnetLoader';

const Container = styled.main`
  overflow-y: auto;
  max-height: calc(100vh - 56px);
  .wrapper {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 10px;
  }
  h2 {
    margin: 16px 0;
  }
  .show-info {
    display: flex;
    align-items: flex-start;
    .description {
      flex: 1;
      margin: 16px;
    }
  }
  .ep-list-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
`;
const EpisodeSearch = styled.form`
  position: relative;
  .material-icons {
    position: absolute;
    left: 5px;
    top: 8px;
    font-size: 18px;
    color: #666;
  }
  input {
    border: 1px solid #eee;
    padding: 8px 10px;
    padding-left: 24px;
    background: white;
    border-radius: 5px;
    font-size: 14px;
    line-height: 16px;
  }
`;
const List = styled.ul`
  background: white;
  list-style: none;
  margin-top: 0px;
  margin-bottom: 15px;
  padding: 0 10px;
  max-height: 250px;
  overflow-y: auto;
  li {
    border-bottom: 1px solid #e4e4e4;
  }
`;

class Details extends Component {
  state = {
    loadingShow: true,
    loadingEpisodes: false,
    show: {
      episodes: []
    },
    selectedEpisode: null,
    selectedMagnet: null,
    page: 0,
    pageHasNext: true
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
  fetchShow(page = 0) {
    this.setState({loadingEpisodes: true});
    const slug = this.props.match.params.slug;
    const url = `https://hs.fuken.xyz/show/${slug}?page=${page}`;
    window.fetch(url).then(res => res.json())
    .then(json => {
      const pageHasNext = json.episodes.length > 0;
      json.episodes = this.state.show.episodes.concat(json.episodes);
      this.setState({
        page, 
        pageHasNext,
        loadingShow: false, 
        loadingEpisodes: false,
        show: json
      })
    })
  }
  render() {
    if (this.state.loadingShow) {
      return <Spinner />
    }
    return (
      <Container>
        <div className="wrapper">
          <h2>{this.state.show.title}</h2>
          <section className="show-info">
            <img src={this.state.show.image_url} alt="portada del show"/>
            <p className="description">{this.state.show.description}</p>
          </section>
          <section className="ep-list-top-bar">
            <Stars></Stars>
            <EpisodeSearch>
              <i className="material-icons">search</i>              
              <input type="search" placeholder="Buscar ep. por número" 
                     name="search_ep_number" />
              <input type="submit" style={{display: 'none'}}/>
            </EpisodeSearch>
          </section>
          <List>
            {this.state.show.episodes.map(episode => (
              <li key={episode.episode_slug}>
                <p>{episode.full_title}</p>
              </li>
            ))}
          </List>
          {this.state.pageHasNext && (
            <Button disabled={this.state.loadingEpisodes} 
                    onClick={() => this.fetchShow(this.state.page + 1)}>
              {this.state.loadingEpisodes ? 'Cargando...' : 'Cargar más'}
            </Button>
          )}
          <MagnetPlayer magent={this.state.selectedMagnet} />
        </div>
      </Container>
    )
  }
}

export default Details;

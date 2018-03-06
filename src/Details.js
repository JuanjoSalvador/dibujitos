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
    font-weight: 400;
    @media (max-width: 600px) {
      text-align: center;
    }
  }
  .show-info {
    display: flex;
    align-items: flex-start;
    @media (max-width: 600px) {
      display: block;
      img {
        display: block;
        margin: 0 auto;
      }
    }
    .description {
      flex: 1;
      margin: 16px;
      @media (max-width: 600px) {
        margin: 16px 0;
      }
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
  padding: 0;
  max-height: 250px;
  overflow-y: auto;
  li {
    cursor: pointer;
    position: relative;
    padding: 8px 10px;
    line-height: 28px;
    display: flex;
    align-items: center;
    .material-icons {
      display: none;
      vertical-align: middle;
      font-size: 18px;
      margin-right: 8px;
      padding: 4px;
      border-radius: 15px;
      border: 1px solid currentColor;
    }
    p {
      margin: 0;
    }
    &:hover, &:focus, &.selected {
      background: var(--colorSecondaryDim);
      .material-icons {
        display: inline-block;
      }
    }
  }
`;
const BtnGroup = styled.div`
  button {
    border-radius: 0;
    color: var(--colorPrimaryDark);
    background: white;
    &:first-child {
      border-radius: 6px 0 0 6px;
    }
    &:last-child {
      border-radius: 0 6px 6px 0;
    }
    &:disabled {
      background: var(--colorPrimaryDark);
      color: white;
    }
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
    this.fetchShow().then(() => {
      this.checkUrlForEpisode(this.props);
    });
  }
  componentWillReceiveProps(nextProps) {
    this.checkUrlForEpisode(nextProps);
  }

  checkUrlForEpisode(props) {
    const query = this.getQueryString(props);
    const current_ep = this.state.selectedEpisode;
    const current_ep_number = current_ep && parseInt(current_ep.ep_number);
    if(parseInt(query.ep) !== current_ep_number) {
      const foundEpisode = this.state.show.episodes.find(ep => parseInt(ep.ep_number) === parseInt(query.ep));
      if (foundEpisode) {
        this.selectEpisode(foundEpisode);
      }
    }
  }

  getQueryString(props) {
    return qs.parse(props.location.search.replace('?', ''));
  }
  fetchShow(page = 0) {
    this.setState({loadingEpisodes: true});
    const slug = this.props.match.params.slug;
    const url = `https://hs.fuken.xyz/show/${slug}?page=${page}`;
    return window.fetch(url).then(res => res.json())
    .then(json => {
      const pageHasNext = json.episodes.length > 0;
      json.episodes = this.state.show.episodes.concat(json.episodes);
      return new Promise(resolve => {
        this.setState({
          page, 
          pageHasNext,
          loadingShow: false, 
          loadingEpisodes: false,
          show: json
        }, resolve)
      })
    })
  }
  getQualityArray(episode) {
    return Object.keys(episode.qualities)
      .map(key => ({key, value: episode.qualities[key]}))
      .filter(q => q.value)
  }
  selectEpisode(episode, quality = '720p') {
    let magnet = episode.qualities[quality];
    if(!magnet) {
      const selected = this.getQualityArray(episode)[0];
      magnet = selected.value;
    }
    
    this.setState({
      selectedMagnet: magnet,
      selectedEpisode: episode
    })
  }
  episodeIsSelected(episode) {
    return this.state.selectedEpisode 
      && this.state.selectedEpisode.ep_number === episode.ep_number;
  }
  render() {
    if (this.state.loadingShow) {
      return <Spinner />
    }
    const qualities = this.state.selectedEpisode ? 
      this.getQualityArray(this.state.selectedEpisode) : [];
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
              <li tabIndex={0} key={episode.ep_number}
                  className={this.episodeIsSelected(episode) ? 'selected' : ''}
                  onClick={() => this.selectEpisode(episode)}>
                <i className="material-icons">play_arrow</i>
                <p>{episode.full_title}</p>
              </li>
            ))}
          </List>
          {this.state.pageHasNext && (
            <Button disabled={this.state.loadingEpisodes} 
                    onClick={() => this.fetchShow(this.state.page + 1)}>
              {this.state.loadingEpisodes ? 'Cargando...' : 'Cargar más episodios'}
            </Button>
          )}
          <BtnGroup>
            {qualities.map(quality => (
              <Button disabled={quality.value === this.state.selectedMagnet} 
                      key={quality.key}>
                {quality.key}
              </Button>
            ))}
          </BtnGroup>
          <MagnetPlayer magnet={this.state.selectedMagnet} />
        </div>
      </Container>
    )
  }
}

export default Details;

import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';
import Button from './Button';
import qs from 'qs';

const endpoint = "https://hs.fuken.xyz";
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    max-width: 240px;    
    margin: 3px 5px;
    background: white;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    transition: all .2s ease-in-out;
    a {
      .material-icons {
        color: var(--colorSecondary);
      }
    }
    .material-icons {
      margin-right: 6px;
      vertical-align: middle;
    }
    &:hover {
      box-shadow: inset 0px 0px 4px 0px var(--colorSecondaryLight);      
      border-color: var(--colorSecondary);
      border-width: 2px;
    }
    img {
      max-width: 100%;
      height: 340px;
      border-radius: 4px 4px 0 0;
    }
    p {
      margin: 5px 0;
    }
    .title {
      display: flex;
      a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        flex: 1;
      }
    }
  }
`;
const Title = styled.div`
  margin-left: 14px;
  h2 {
    font-weight: normal;
    margin-top: 25px;
    margin-bottom: 5px;
  }
  p {
    margin-top: 5px;
    margin-bottom: 25px;
  }
`;
const GoTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;

  background: var(--colorSecondary);
  color: white;
  border: none;
  display: block;
  cursor: pointer;
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.2);
  transition: all .3s;

  .material-icons {
    color: inherit;
    vertical-align: middle;    
  }
  &:hover {
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.2);
  }
`;
const Row = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .center-column {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 56px);
  }
`;


class Latest extends Component {
  state = {
    page: 0,
    episodes: [],
    loading: false,
    search: null
  }
  scrollNode = null;
  componentDidMount() {
    const query = this.getQueryString(this.props);
    this.fetchEpisodes(this.state.page, query.search);
  }
  componentWillReceiveProps(nextProps) {
    const query = this.getQueryString(nextProps);
    if(query.search !== this.state.search) {
      this.fetchEpisodes(this.state.page, query.search);
    }
  }
  getQueryString(props) {
    return qs.parse(props.location.search.replace('?', ''));
  }
  fetchEpisodes(page = 0, search) {
    this.setState({loading: true, search});
    const url = search ? 
        `${endpoint}/episode/search?page=${page}&q=${search}` 
      : `${endpoint}/episode/latest?page=${page}`;
    const prevEpisodes = search ? [] : this.state.episodes;
    window.fetch(url).then(res => res.json())
    .then(json => {
      this.setState({
        page,
        loading: false,
        episodes: prevEpisodes.concat(json)
      })
    })
  }
  scrollTop() {
    this.scrollNode.scrollTop = 0;
  }
  render() { 
    return (
      <Row>
        <div className="center-column" ref={node => { this.scrollNode = node; }}>
          <div className="container">
            <p style={{textAlign: 'center'}}>Capitulos de anime en streaming desde torrents de HorribleSubs</p>
            <Title>
              <h2>{this.state.search ? 'Resultados de la búsqueda' : 'Ultimos Capitulos'}</h2>
              <p>Mostrando {this.state.episodes.length} resultados</p>
            </Title>
            <List>
              {this.state.episodes.map((ep, i) => (
                <li key={i}>
                  <Link to={`/shows/${ep.slug}`}>
                    <img src={ep.image} alt="portada del show" />
                  </Link>
                  <div style={{padding: '10px'}}>
                    <p className="title">
                      <Link to={`/shows/${ep.slug}`}>{ep.title}</Link>
                      <span>Ep. {ep.ep_number}</span>
                    </p>
                    <p>
                      <i className="material-icons">event</i>
                      <span>{ep.date}</span>
                    </p>
                    <Link to={`/shows/${ep.slug}?ep=${ep.ep_number}`}>
                      <i className="material-icons">play_arrow</i>
                      Ver capitulo
                    </Link>
                  </div> 
                </li>
              ))}
            </List>
            {this.state.loading && (<Spinner />)}
            <Button center onClick={() => this.fetchEpisodes(this.state.page + 1)}>
              Cargar m&aacute;s
            </Button>
            <GoTopButton title="Volver arriba" onClick={() => this.scrollTop()}>
              <i className="material-icons">keyboard_arrow_up</i>
            </GoTopButton>
          </div>
        </div>
        <Calendar />
      </Row>
    );
  }
}
 
export default Latest;
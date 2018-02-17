import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

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
const Button = styled.button`
  display: block;
  text-align: center;
  background: var(--colorSecondary);
  margin: 10px;
  padding: 8px 12px;
  color: #333;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 6px;
  font-size: 16px;
  border: 1px solid white;
  cursor: pointer;
`;
const Loader = styled.div`
  animation: rotate 1s linear infinite;
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

class Latest extends Component {
  state = {
    page: 0,
    episodes: [],
    loading: false
  }
  componentDidMount() {
    this.fetchEpisodes();
  }
  fetchEpisodes(page = 0) {
    this.setState({loading: true})
    const url = `${endpoint}/episode/latest?page=${page}`;
    window.fetch(url).then(res => res.json())
    .then(json => {
      this.setState(state => ({
        page,
        loading: false,
        episodes: state.episodes.concat(json)
      }))
    })
  }
  scrollTop() {
    window.scroll(0, 0);
  }
  render() { 
    return (
      <div className="container">
        <p style={{textAlign: 'center'}}>Capitulos de anime en streaming desde torrents de HorribleSubs</p>
        <Title>
          <h2>Ultimos Capitulos</h2>
          <p>Mostrando {this.state.episodes.length} resultados</p>
        </Title>
        <List>
          {this.state.episodes.map((ep, i) => (
            <li key={i}>
              <img src={ep.image} />
              <div style={{padding: '10px'}}>
                <p className="title">
                  <a href="#">{ep.title}</a>
                  <span>Ep. {ep.ep_number}</span>
                </p>
                <p>
                  <i className="material-icons">event</i>
                  <span>{ep.date}</span>
                </p>
                <a href="#">
                  <i className="material-icons">play_arrow</i>
                  Ver capitulo
                </a>
              </div> 
            </li>
          ))}
        </List>
        {this.state.loading && (<Spinner />)}
        <Button onClick={() => this.fetchEpisodes(this.state.page + 1)}>
          Cargar m&aacute;s
        </Button>
        <GoTopButton title="Volver arriba" onClick={this.scrollTop}>
          <i className="material-icons">keyboard_arrow_up</i>
        </GoTopButton>
      </div>
    );
  }
}
 
export default Latest;
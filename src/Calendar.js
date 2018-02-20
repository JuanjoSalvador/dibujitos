import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const endpoint = "https://hs.fuken.xyz";
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      flex: 1;
      margin-right: 10px;
    }
  }
`;
const Title = styled.header`
  padding: 0 20px;
  h2 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  p {
    margin-top: 5px;
    opacity: .8;
  }
`;
const Container = styled.div`
  min-width: 320px;
  @media(max-width: 1090px) {
    display: none;
  }
`;

class Calendar extends Component {
  state = {
    calendar: []
  }
  componentDidMount() {
    const url = `${endpoint}/calendar_today`;
    window.fetch(url).then(res => res.json())
    .then(json => {
      this.setState({calendar: json});
    });
  }
  formatTime(timeStr) {
    const time = moment.utc(timeStr, 'HH:mm');
    time.add(9, 'hours');
    return time.format('HH:mm');
  }

  render() { 
    return ( 
      <Container>
        <Title>
          <h2>Calendario</h2>
          <p>Horario de emision de capitulos de hoy</p>
        </Title>
        <List>
          {this.state.calendar.map(item => (
            <li key={item.link}>
              <a href={item.link}>{item.title}</a>
              <p>{this.formatTime(item.time)}</p>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
 
export default Calendar;
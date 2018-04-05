import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const endpoint = "https://nyapi.fuken.xyz";
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  h3 {
    margin-left: 20px;
    margin-bottom: 0;
    margin-top: 30px;
    font-weight: normal;
    font-size: 20px;
  }
  li {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    a {
      flex: 1;
      margin-right: 10px;
    }
    p {
      margin: 0;
    }
  }
  .nodata {
    margin-left: 20px;
    margin-top: 5px;
    opacity: 0.8;
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
  overflow-y: auto;
  max-height: calc(100vh - 60px);
  @media(max-width: 1090px) {
    display: none;
  }
`;

const dayMap = {
  'Monday': 'Lunes',
  'Tuesday': 'Martes',
  'Wednesday': 'Miércoles',
  'Thursday': 'Jueves',
  'Friday': 'Viernes',
  'Saturday': 'Sábado',
  'Sunday': 'Domingo',
  'Today': 'Hoy'
}

class Calendar extends Component {
  state = {
    calendar: []
  }
  componentDidMount() {
    const url = `${endpoint}/calendar`;
    window.fetch(url).then(res => res.json())
    .then(json => {
      this.setState({
        calendar: this.filterCalendar(json)
      });
    });
  }
  formatTime(timeStr) {
    return moment(timeStr).format('HH:mm');
  }
  filterCalendar(calendar) {
    return calendar.filter(group => {
      const startOfDay = moment(group.day, 'dddd');
      if(group.day === 'Sunday') {
        startOfDay.add(1, 'week')
      }
      return startOfDay.isSameOrAfter(moment(), 'day')
    }).map(group => {
      if (moment(group.day, 'dddd').isSame(moment(), 'day')) {
        group.day = 'Today';
      }
      return group;
    })
  }

  render() { 
    return ( 
      <Container>
        <Title>
          <h2>Calendario</h2>
          <p>Horario de emision de capitulos de HorribleSubs</p>
        </Title>
        {this.state.calendar.map(group => (
          <List key={group.day}>
            <h3>{dayMap[group.day]}</h3>
            <p className="nodata">
              {group.animes.length ? '' : 'Sin capítulos este día'}
            </p>
            {group.animes.map(item => (
              <li key={item.slug + group.day + item.time}>
                <a href={item.slug}>{item.title}</a>
                <p>{this.formatTime(item.time)}</p>
              </li>
            ))}
          </List>
        ))}
      </Container>
    );
  }
}
 
export default Calendar;
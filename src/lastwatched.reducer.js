import axios from './axios'

// action creators
export const actions = {
  fetch: () => async (dispatch) => {
    dispatch({type: 'LOADING_LASTWATCHED'})
    const json = await axios.get('/lastwatched').then(res => res.data)
    dispatch({type: 'FETCH_LASTWATCHED', payload: json})
  },
  post: (show) => async (dispatch, getState) => {
    dispatch({type: 'LOADING_LASTWATCHED'})
    const shows = getState().lastwatched.shows;
    const json = await axios.post('/lastwatched').then(res => res.data)
    const showFound = shows.some(s => s.showid === show.showid)
    dispatch({
      type: showFound ? 'UPDATE_LASTWATCHED' : 'ADD_LASTWATCHED',
      payload: json
    })
  },
  delete: (id) => async (dispatch) => {
    dispatch({type: 'LOADING_LASTWATCHED'})
    await axios.delete(`/lastwatched/${id}`).then(res => res.data)
    dispatch({type: 'DELETE_LASTWATCHED', payload: id})
  }
}

const initialState = {
  loading: false,
  shows: []
}

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING_LASTWATCHED':
      return {
        shows: state.shows,
        loading: true
      }
    case 'FETCH_LASTWATCHED':
      return {
        loading: false,
        shows: action.payload
      }
    case 'ADD_LASTWATCHED':
      return {
        loading: false,
        shows: [...state.shows, action.payload]
      }
    case 'UPDATE_LASTWATCHED':
      return {
        loading: false,
        shows: state.shows.map(s => (
          s.showid === action.payload.showid ? action.payload : s
        ))
      }
    case 'DELETE_LASTWATCHED':
      return {
        loading: false,
        shows: state.shows.filter(show => show.showid !== action.payload)
      }
    default:
      return state;
  }
}

export default reducer;
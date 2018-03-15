const AuthWrapper = ({renderLoggedIn, renderLoggedOut}) => {
  const token = localStorage.getItem('palomitas_token')
  if(!token) {
    return renderLoggedOut()
  }
  const tokendata = JSON.parse(localStorage.getItem('palomitas_tokendata'))
  const isExpired = new Date(tokendata.exp * 1000) < new Date()
  if (isExpired) {
    return renderLoggedOut()
  }
  tokendata.mailhash = localStorage.getItem('palomitas_mailhash')
  
  return renderLoggedIn(tokendata)
}

export default AuthWrapper
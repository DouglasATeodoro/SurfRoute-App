import { 
  USER_LOGGED_IN, 
  USER_LOGGED_OUT, 
  LOADING_USER,
  USER_LOADED 
} from './actionsTypes'
import axios from 'axios'
import { setMessage } from './message'

const authUrlBase = 'https://identitytoolkit.googleapis.com/v1'
const API_KEY = 'AIzaSyCzDhWFIkcgMBX8w0hsauoNjcW9UtrjUJI'

export const userLogged = user => {
  return {
      type: USER_LOGGED_IN,
      payload: user
  }
}

export const logout = () => {
    return{
        type: USER_LOGGED_OUT
    }
}

export const createUser = user => {
 
    //const url = `${authUrlBase}/signupNewUser?key=${API_KEY}`
    const url = `${authUrlBase}/accounts:signUp?key=${API_KEY}`
   
    const dados = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
   
    const config = {
      headers: {
          'Content-Type': 'application/json',
      }
    }
    
    return dispatch => {
      dispatch(loadingUser())
      axios.post(url, dados, config)    
      .then( res => { 
        console.log(res)
        if (res.data.localId){
          axios.put(`/users/${res.data.localId}.json`, {
            name: user.name
          })        
          *.then( res =>{
            console.log('Usuário cadastrado com sucesso')
            delete user.password
            user.name = res.data.name
            dispatch(userLogged(user))
            dispatch(userLoaded())
          })
          .catch(err => console.log(err))
        }
   
      }).catch( err => console.log(err))   
    }
  }

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
  const url = `${authUrlBase}/accounts:signInWithPassword?key=${API_KEY}`
   
    const dados = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
   
    const config = {
      headers: {
          'Content-Type': 'application/json',
      }
    }
      
  return dispatch => {
      dispatch(loadingUser())
      axios.post(url, dados, config)
          .catch(err => {
              dispatch(setMessage({
                  title: 'Erro',
                  text: 'E-mail ou senha inválidos'
              }))
          })
          .then(res => {
              if (res.data.localId) {
                  user.token = res.data.idToken
                  axios.get(`/users/${res.data.localId}.json`)
                      .catch(err => {
                          dispatch(setMessage({
                              title: 'Erro',
                              text: 'Ocorreu um erro inesperado..!'
                          }))
                      })
                      .then(res => {
                          delete user.password
                          user.name = res.data.name
                          dispatch(userLogged(user))
                          dispatch(userLoaded())
                      })
              }
          })
  }
}


export const resetPassword = user => {
  const url = `${authUrlBase}/accounts:sendOobCode?key=${API_KEY}`
   
    const dados = {
      requestType:"PASSWORD_RESET",
      email: user.email          
    }
   
    const config = {
      headers: {
          'Content-Type': 'application/json',
      }
    }
      
    return dispatch => {
      dispatch(loadingUser())
      axios.post(url, dados, config)    
      .then( res => { 
        console.log(res)
        dispatch(setMessage({
          title: 'Mensagem',
          text: 'Verifique o seu e-mail!'
        })) 
        dispatch(userLoaded()) 
   
      }).catch(err => {
        dispatch(setMessage({
            title: 'Erro',
            text: 'E-mail inválido'
        }))
      })   
    }
}
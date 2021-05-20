import { 
  USER_LOGGED_IN, 
  USER_LOGGED_OUT, 
  LOADING_USER,
  USER_LOADED 
} from './actionsTypes'
import axios from 'axios'
import { setMessage } from './message'

import { server } from '../api'


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
     
    const url = `${server}/signup`
    console.log(url)
    const dados = {
      name: user.name,
      email: user.email,
      password: user.password      
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
        console.log('Usuário cadastrado com sucesso')
        delete user.password
        user.name = res.data.name
        dispatch(userLogged(user))
        dispatch(userLoaded())
   
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
  const url = `${server}/signin`
   
    const dados = {
      email: user.email,
      password: user.password
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
              dispatch(userLoaded())
              dispatch(setMessage({
                  title: 'Erro',
                  text: err.response.data
              }))
          })
          .then(res => {
              if (res.data.token) {
                  user.token = res.data.token
                  user.email = res.data.email                  
                  user.name = res.data.name
                  axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
                  dispatch(userLogged(user))
                  dispatch(userLoaded())
                      
              }
          }).catch(err => {
            dispatch(userLoaded())  
            dispatch(setMessage({
                title: 'Erro',
                text: err.response.data
            }))
        })
  }
}


export const resetPassword = user => {
    const url = `${server}/send`
   
    const dados = {    
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
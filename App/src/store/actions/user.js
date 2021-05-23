import { 
  USER_LOGGED_IN, 
  USER_LOGGED_OUT, 
  LOADING_USER,
  USER_LOADED,
  USER_CHECK_PASSWORD 
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

export const checkCodPassword = user => {
  return {
      type: USER_CHECK_PASSWORD,
      payload: user
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


export const sendCodPassword = user => {
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
        user.email = res.data.email
        user.id = res.data.id
        dispatch(checkCodPassword(user))         
   
      }).catch(err => {
        dispatch(setMessage({
            title: 'Erro',
            text: err.response.data
        }))
      })   
    }
}


export const verifyCodPassword = user => {
  const url = `${server}/checkCod`
 
  const dados = {    
    email: user.email,
    id: user.id,
    codPassword: user.codPassword          
  }
 
  const config = {
    headers: {
        'Content-Type': 'application/json',
    }
  }
    
  return dispatch => {
    dispatch(loadingUser())
    console.log(dados)
    axios.post(url, dados, config)    
    .then( res => { 
      console.log(res)
      user.email = res.data.email
      dispatch(setMessage({
        title: 'Mensagem',
        text: 'Adicione uma nova senha!'
      })) 
      user.email = res.data.email
      user.id = res.data.id
      console.log(user)
      dispatch(checkCodPassword(user)) 
            
 
    }).catch(err => {
      console.log(err.response.data)
      dispatch(setMessage({
          title: 'Erro',
          text:  err.response.data
      }))
    })   
  }
}

export const updatePasswordUser = user => {
  const url = `${server}/updatePassword`
 
  const dados = {    
    email: user.email,
    id: user.id,
    codPassword: user.codPassword,
    password: user.password          
  }
 
  const config = {
    headers: {
        'Content-Type': 'application/json',
    }
  }
    
  return dispatch => {
    dispatch(loadingUser())
    console.log(dados)
    axios.post(url, dados, config)    
    .then( res => { 
      console.log(res)     
      dispatch(setMessage({
        title: 'Mensagem',
        text: 'Alterada a senha com sucesso!'
      })) 
      dispatch(userLoaded()) 
 
    }).catch(err => {
      dispatch(setMessage({
          title: 'Erro',
          text:  err.response.data
      }))
    })   
  }
  
}
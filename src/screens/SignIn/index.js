import { connect } from 'react-redux'
import { login } from '../../store/actions/user'

import React, {  Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import AccountIcon from '../../assets/account.svg';


class index extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        spinner: false
    }    
    
    componentDidUpdate = prevProps => {       
        if (prevProps.isLoading && !this.props.isLoading && this.props.token) {
            this.props.navigation.reset({
                routes:[{name:'MainTab'}]
                     });
        }
    }

    login = async () => {     
         
        await this.props.onLogin({ ...this.state })
       
        // this.props.navigation.reset({
        //     routes:[{name:'MainTab'}]
        //          });
       
    }

    register = () => {                
        this.props.navigation.reset({
            routes:[{name:'SignUp'}]
                 });                   
    }

    resetPassword= () => {                
        this.props.navigation.reset({
            routes:[{name:'ResetPassword'}]
                 });                   
    }


    render(){
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)
       

        const validForm = validations.reduce((t, a) => t && a)

        return (
        <Container>
            {/* <BarberLogo width="100%" height="160" /> */}
            <AccountIcon style={{ opacity: 0.5 }}  width="100%" height="160"></AccountIcon>
            <InputArea>
                <Spinner
                    visible={this.props.isLoading}
                                     
                />
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    password={true}
                />
                
                <CustomButton onPress={this.login} disabled={!validForm}  style={[validForm ? {} : { backgroundColor: '#AAA' }]}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
                
            </InputArea>

            <SignMessageButton onPress={this.resetPassword}>
                <SignMessageButtonText>Esqueceu sua senha?</SignMessageButtonText>                
            </SignMessageButton>

            <SignMessageButton onPress={this.register}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    )
}
}

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading,
        token: user.token
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

//export default index
export default connect(mapStateToProps, mapDispatchToProps)(index)

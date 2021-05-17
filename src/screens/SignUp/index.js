import { connect } from 'react-redux'
import { createUser } from '../../store/actions/user'

import React, { Component } from 'react';

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


import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import AccountIcon from '../../assets/account.svg';
import PersonIcon from '../../assets/person.svg';

class index extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }    
    

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.reset({
                routes:[{name:'MainTab'}]
                     });
        }
    }

    createUserAndLogin = async () => {        
        await this.props.onCreateUser({ ...this.state })                                  
    }

    toBack = () => {        
        
        this.props.navigation.reset({
            routes:[{name:'SignIn'}]
                 });                   
    }

    render(){
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)
        
        validations.push(this.state.name && this.state.name.trim().length >= 3)
        validations.push(this.state.password === this.state.confirmPassword)
        
        const validForm = validations.reduce((t, a) => t && a)
        
        return (
        <Container>
            {/* <BarberLogo width="100%" height="160" /> */}
            <AccountIcon style={{ opacity: 0.5 }}  width="100%" height="160"></AccountIcon>
            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
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

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Confirme sua senha"
                    value={this.state.confirmPassword}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    password={true}
                />

                <CustomButton 
                        onPress={ this.createUserAndLogin } 
                        disabled={!validForm}  style={[validForm ? {} : { backgroundColor: '#AAA' }]}>
                    <CustomButtonText>SALVAR</CustomButtonText>
                </CustomButton>

                <SignMessageButton onPress={this.toBack}>
                    <SignMessageButtonTextBold>Voltar</SignMessageButtonTextBold>
                </SignMessageButton>

            </InputArea>


        </Container>
    )
}
}

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)

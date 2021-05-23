import { connect } from 'react-redux'
import { updatePasswordUser } from '../../store/actions/user'

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
        id: this.props.id,
        name: this.props.name,
        email: this.props.email,
        codPassword: this.props.codPassword,
        password: '',
        confirmPassword: ''
    }    
    

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.reset({
                routes:[{name:'SignIn'}]
                     });
        }
    }

    updatePassword = async () => {        
        await this.props.onUpdatePasswordUser({ ...this.state })                                  
    }

    toBack = () => {        
        
        this.props.navigation.reset({
            routes:[{name:'SignIn'}]
                 });                   
    }

    render(){
        const validations = []
       
        validations.push(this.state.password && this.state.password.length >= 6)              
        validations.push(this.state.password === this.state.confirmPassword)
        
        const validForm = validations.reduce((t, a) => t && a)
        
        return (
        <Container>
            {/* <BarberLogo width="100%" height="160" /> */}
            <LockIcon style={{ opacity: 0.5 }}  width="100%" height="160"></LockIcon>
            <InputArea>
                               

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
                        onPress={ this.updatePassword } 
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
        isLoading: user.isLoading,
        email : user.email,
        id: user.id,
        codPassword: user.codPassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePasswordUser: user => dispatch(updatePasswordUser(user))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)

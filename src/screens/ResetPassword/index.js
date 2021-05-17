import { connect } from 'react-redux'
import React,{ Component } from 'react'
import { resetPassword } from '../../store/actions/user'


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


class index extends Component{

    state = {        
        email: ''        
    }    

    toBack = () => {                
        this.props.navigation.reset({
            routes:[{name:'SignIn'}]
                 });                   
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.reset({
                routes:[{name:'SignIn'}]
                     });
        }
    }

    reset = () => {        
        this.props.onResetePassword({ ...this.state })  
                                
    }

    render(){
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        
        const validForm = validations.reduce((t, a) => t && a)
       
        return(
            <Container>
            {/* <BarberLogo width="100%" height="160" /> */}
            {/* <AccountIcon style={{ opacity: 0.5 }}  width="100%" height="160"></AccountIcon> */}
            <InputArea>
                <SignMessageButton >
                    <SignMessageButtonTextBold>Será enviado um código no seu e-mail!</SignMessageButtonTextBold>
                </SignMessageButton>
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                
                <CustomButton 
                        onPress={ this.reset } 
                        disabled={!validForm}  style={[validForm ? {} : { backgroundColor: '#AAA' }]}>
                    <CustomButtonText>ENVIAR</CustomButtonText>
                    
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
        onResetePassword: user => dispatch(resetPassword(user))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
//export default ResetPassword
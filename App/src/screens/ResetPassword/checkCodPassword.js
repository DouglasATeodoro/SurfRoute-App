import { connect } from 'react-redux'
import React,{ Component } from 'react'
import { verifyCodPassword } from '../../store/actions/user'


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


import CodigoIcon from '../../assets/codigo.svg';


class index extends Component{

    state = {  
        id: this.props.id,      
        email: this.props.email,
        codPassword: ''        
    }    

    toBack = () => {                
        this.props.navigation.reset({
            routes:[{name:'SignIn'}]
                 });                   
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.reset({
                routes:[{name:'ChangePassword'}]
                     });
        }
    }

    checkCod = async () => {        
        await this.props.onCheckCodPassword({ ...this.state })                                  
    }

    render(){
        const validations = []
        validations.push(this.state.codPassword && this.state.codPassword.length >= 4)
        
        const validForm = validations.reduce((t, a) => t && a)
        
        const msm = `Digite o código!`

        return(
            <Container>
            {/* <BarberLogo width="100%" height="160" /> */}
            {/* <AccountIcon style={{ opacity: 0.5 }}  width="100%" height="160"></AccountIcon> */}
                <InputArea>
                    <SignMessageButton >
                        <SignMessageButtonTextBold>{msm}</SignMessageButtonTextBold>
                       
                    </SignMessageButton>
                    <SignInput
                        IconSvg={CodigoIcon}
                        placeholder="Digite o código"
                        value={this.state.codPassword}
                        onChangeText={codPassword => this.setState({ codPassword })}
                    />
                    
                    <CustomButton 
                            onPress={ this.checkCod } 
                            disabled={!validForm}  style={[validForm ? {} : { backgroundColor: '#AAA' }]}>
                        <CustomButtonText>Verificar</CustomButtonText>
                        
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
        id: user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckCodPassword: user => dispatch(verifyCodPassword(user))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
//export default ResetPassword
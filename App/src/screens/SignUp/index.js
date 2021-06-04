import { connect } from 'react-redux'
import { createUser } from '../../store/actions/user'

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ImageBackground, View, TouchableOpacity, Image } from 'react-native'


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

import ImagePicker from 'react-native-image-crop-picker';
Icon.loadFont();

class index extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
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

    choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(data => {
          console.log(data);
        //   setImage(image.path);
            this.setState({image: data.path}) 
        });
      }
      
      takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(data => {
          console.log(data);
          this.setState({image: data.path})
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
            
            <SignMessageButton onPress={this.choosePhotoFromLibrary}>
            <Image
                source={{
                  uri: this.state.image
                    ? this.state.image
                    : 'https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png' }}
                style={{height: 160, width: 160, borderRadius: 80}}
                >
            </Image>
            <Icon name="camera" size={35} color="#fff" />
            </SignMessageButton>
          
            {/* <AccountIcon style={{ opacity: 0.5 }}  width="100%" height="160"/> */}
           
            
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

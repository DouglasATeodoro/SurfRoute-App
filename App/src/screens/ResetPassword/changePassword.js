import React from 'react';
import { Text } from 'react-native';
import { Container } from './styles';
import { useSelector, useDispatch } from 'react-redux'

export default () => {
    
    const codigo = useSelector(state => state.data)
    
    
    return (
        <Container>
            <Text>Search</Text>
        </Container>
    );
}
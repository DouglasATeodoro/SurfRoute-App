import React,{ Component } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

import Author from './Author'
import Comments from './Comments'
import AddComments from './AddComments'

class Post extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Author email={this.props.email} nickName={this.props.nickName} />
                <Image source={this.props.image} style={styles.image} />               
                <Comments comments={this.props.comments} ></Comments>
                <AddComments></AddComments>
            </View>
        )        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }  
})

export default Post
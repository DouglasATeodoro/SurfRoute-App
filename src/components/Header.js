import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
}   from "react-native";
import icon from "../assets/imgs/surf.jpg";


class Header extends Component{
    render(){
        return(
            <View style={styles.container} >            
                {/* <Image source={icon} style={styles.image}/>                 */}
                <Text style={styles.title}>SurfRoute</Text>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{      
        backgroundColor: "#4EADBE",
        borderColor: "#BBB",     
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: 'space-between',
       // paddingLeft: 10,
        padding: 10
    },
    image:{
        height: 40,
        width: 40,
        resizeMode: "contain",
        
    },
    title:{
        //color:"#FFE4E1",
        fontFamily:"kiss",
        //height: 30,
        fontSize: 40
        
    }
    
})

export default Header
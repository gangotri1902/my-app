import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const index = () => {

  const [name, setname]=useState()
  return (
    <View style={styles.container}>
      <Text style={styles.header}>To Do List</Text>
      <TextInput
      style={styles.input}
      placeholder='Enter your task'
      value={name}
      onChangeText={(text)=>setname(text)}
      />
      <TouchableOpacity
      style={styles.addbutton}
      onPress={()=>{console.log("saved")}}
      >
        <Text style={styles.addtext}>Add</Text>


      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
 container:{
  flex:1,
  backgroundColor:'white',
  padding:10
 },
 header:{
fontSize:25,
fontWeight:'bold',
textAlign:'center',
marginBottom:20
 },
 input:{
paddingLeft:10,
backgroundColor:"white",
borderWidth:1,
borderColor:'grey',
borderRadius:10,
marginBottom:10

 },
 addbutton:{
backgroundColor:'green',
padding:10,
borderRadius:10,
alignItems:'center'

 },
 addtext:{
fontSize:15,
fontWeight:'bold'
 }
})
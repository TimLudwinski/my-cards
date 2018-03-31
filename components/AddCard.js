import React from 'react';
import { Text, TouchableOpacity, TextInput, KeyboardAvoidingView  } from 'react-native';

export default class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  }
  
  onAddCard(e) {
    if (this.state.question === "") {
      alert("Please Enter a Question");
      return;
    }
    if (this.state.answer === "") {
      alert("Please Enter a Answer");
      return;
    }
    
    this.props.navigation.state.params.handleAddCard(this.state.question, this.state.answer);
    this.props.navigation.goBack();
  }
  
  render() {
    return (
      <KeyboardAvoidingView  behavior='padding'>
        <Text style={{fontSize: 36, textAlign: 'center'}}>Question: </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 3}} onChangeText={(question) => this.setState({question})} value={this.state.question}/>
        
        <Text style={{fontSize: 36, textAlign: 'center'}}>Answer: </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 3}} onChangeText={(answer) => this.setState({answer})} value={this.state.answer}/>
        
        <TouchableOpacity onPress={(e) => this.onAddCard(e)} style={{height: 40, backgroundColor: 'green', justifyContent: 'space-between'}}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

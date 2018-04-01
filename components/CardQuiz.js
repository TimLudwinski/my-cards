import React from 'react';
import { Text, TouchableOpacity, TextInput, View, AsyncStorage  } from 'react-native';

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default class CardQuiz extends React.Component {
  state = {
    deck: shuffleArray([{question: "What is your favorite color?", answer: "Blue... no green..."}, {question: "What is the color of infinity?", answer: "Sky blue pink with a purple hue"}, {question: "why?", answer: "because"}]),
    cardIndex: 0,
    cardSide: 'question',
    questionsCorrect: 0
  }
  
  componentDidMount() {
    this.loadCardQuiz();
  }
  componentWillReceiveProps() {
    this.loadCardQuiz();
  }
  
  loadCardQuiz() {
    if (!this.props.navigation.state.params.deckName)
      return; // We're not ready to load
    AsyncStorage.getItem(this.props.navigation.state.params.deckName).then(JSON.parse).then((deck) => {
      this.setState({deck: shuffleArray(deck)});
    })
  }
  
  flipCard () {
    this.setState((prevState, props) => ({cardSide: prevState.cardSide === 'question' ? 'answer' :  prevState.cardSide === 'answer' ? 'question': 'finished_quiz'}));
  }
  
  submitAnswer(correct) {
    this.setState((prevState, props) => 
      {
        const final_card = prevState.cardIndex >= prevState.deck.length - 1;
        
        return {
          cardSide: final_card && prevState.cardSide === 'answer' ? 'finished_quiz': 'question', 
          cardIndex: prevState.cardIndex + 1,
          questionsCorrect: correct ? prevState.questionsCorrect + 1 : prevState.questionsCorrect
        }
      });
  }
  
  restartQuiz() {
    this.setState({
      deck: shuffleArray(this.state.deck),
      cardIndex: 0,
      cardSide: 'question',
      questionsCorrect: 0
    });
  }
  
  backToDecks() {
    this.props.navigation.goBack();
  }
  
  render() {
    return (
      <View>
      { this.state.cardSide !== 'finished_quiz' ? 
        <Text style={{fontSize: 16, textAlign: 'left', color: 'gray'}}>{this.state.cardIndex + 1} of {this.state.deck.length}</Text>
      : <Text/> }
        <Text style={{fontSize: 16, textAlign: 'right', color: 'gray'}}>{this.state.questionsCorrect} of {this.state.cardIndex} correct</Text>
        
      { this.state.cardSide !== 'finished_quiz' ? 
        <View>
          <Text style={{fontSize: 36, textAlign: 'center'}}>{this.state.cardSide !== 'answer' ? this.state.deck[this.state.cardIndex].question : this.state.deck[this.state.cardIndex].answer}</Text>
          
          <TouchableOpacity onPress={() => this.flipCard()} style={{height: 40, backgroundColor: 'white', borderWidth: 1, borderRadius: 1, justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 24}}>Flip Card</Text>
          </TouchableOpacity>
          
        {this.state.cardSide !== 'answer' ? (<View/>) : (
          <View>
            <TouchableOpacity onPress={() => this.submitAnswer(true)} style={{height: 40, backgroundColor: 'green', justifyContent: 'space-between'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>I got it right!  :)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.submitAnswer(false)} style={{height: 40, backgroundColor: 'red', justifyContent: 'space-between'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>I got it wrong!  :(</Text>
            </TouchableOpacity>
          </View>
        )}
        
        </View>
      :
        <View> 
          <Text style={{fontSize: 36, textAlign: 'center'}}>Good Job, </Text>
          <Text style={{fontSize: 36, textAlign: 'center'}}>You Finished the Quiz!!</Text>
          <TouchableOpacity onPress={() => this.restartQuiz()} style={{height: 40, backgroundColor: 'yellow', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 24}}>Do quiz again?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.backToDecks()} style={{height: 40, backgroundColor: 'white', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 24}}>Go Back to Deck?</Text>
          </TouchableOpacity>
        </View> 
      }
      </View>
    );
  }
}

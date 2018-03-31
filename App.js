import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'

import DecksList from './components/DecksList';
import DeckView from './components/DeckView';
import NewDeck from './components/NewDeck';
import AddCard from './components/AddCard';
import CardQuiz from './components/CardQuiz';

import { setLocalNotification } from './utils/helpers';

function MyStatusBar ({backgroundColor='white', ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      title: "Decks List",
      tabBarLabel: "Decks List",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: "New Deck",
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card"
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck"
    }
  },
  CardQuiz: {
    screen: CardQuiz,
    navigationOptions: {
      title: "Quiz"
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore((state) => (state))}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

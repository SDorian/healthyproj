import React, { Component } from 'react';
import logo from './logoHW.png';
import './App.css';

import Cell from './components/Cell';
import Modal from './components/Modal';
import AddMealForm from './components/AddMealForm';
import List from './components/List';

class App extends Component {
  
  state = {
    isOpen: false,
    inputText: '',
    selectedDay: 'lundi',
    selectedTime: 'midi',
    week: {
      'lundi': {
        "midi": '',
        "soir": ''
      },
      "mardi": {
        "midi": '',
        "soir": ''
      },
      "mercredi": {
        "midi": '',
        "soir": '' 
      },
      "jeudi": {
        "midi": '',
        "soir": ''
      },
      "vendredi": {
        "midi": '',
        "soir": ''
      },
      "samedi": {
        "midi": '',
        "soir": ''
      },
      "dimanche": {
        "midi": '',
        "soir": ''
      }
    },

    plats: [
      {
        nom: 'omelette au fromage',
        ingredients: ['oeufs', 'lait', 'fromage']
      },
      {
        nom: 'Steack haricots vers',
        ingredients: ['steack haché', 'haricots vers', 'ail']
      },
      {
        nom: 'Soupe de tomate',
        ingredients: ['soupe de tomate Knor bio']
      },
      {
        nom: 'Poëlée de légumes Cordon Bleu',
        ingredients: ['haricots', 'poivrons', 'tomates', 'oignons', 'maïs', 'champignon', 'cordon bleu'] 
      }
    ],

    ingredientList: []
  }

  toggleModal = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  handleCellClick = (day, time) => {
    this.setState({
      selectedDay: day,
      selectedTime: time
    });
  }

  handleTextChange = (e) => {
      this.setState({inputText: e.target.value});
  }

  
  handleSubmitClick = (repas, ingredients) => {
    this.setState(prevState => ({
      week:  Object.assign({}, this.state.week, { [this.state.selectedDay]: Object.assign({}, this.state.week[this.state.selectedDay], { [this.state.selectedTime]: repas }) }),
      ingredientList: [...prevState.ingredientList, ...ingredients],
      isOpen: false
    }));
  }

  handleSubmitAddMeal = (ingredient) => {
    this.setState(prevState => ({
      plats: [...prevState.plats, ingredient]
    }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to HealthyWeek</h1>
        </header>
        <div className="App-intro">
          <table>
            <tbody>
            <tr>
              <td></td>
              <td>Lundi</td>
              <td>Mardi</td>
              <td>Mercredi</td>
              <td>Jeudi</td>
              <td>Vendredi</td>
              <td>Samedi</td>
              <td>Dimanche</td>
            </tr>
            <tr>
              <td>Midi</td>
              <td><Cell value={this.state.week.lundi.midi} day={'lundi'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.mardi.midi} day={'mardi'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.mercredi.midi}day={'mercredi'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.jeudi.midi}day={'jeudi'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal}  /></td>
              <td><Cell value={this.state.week.vendredi.midi} day={'vendredi'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.samedi.midi} day={'samedi'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.dimanche.midi} day={'dimanche'} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
            </tr>
            <tr>
              <td>Soir</td>
              <td><Cell value={this.state.week.lundi.soir} day={'lundi'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.mardi.soir} day={'mardi'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.mercredi.soir} day={'mercredi'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.jeudi.soir} day={'jeudi'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.vendredi.soir} day={'vendredi'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
              <td><Cell value={this.state.week.samedi.soir} day={'samedi'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal}  /></td>
              <td><Cell value={this.state.week.dimanche.soir} day={'dimanche'} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
            </tr>
            </tbody>
          </table>
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} onSubmit={this.handleSubmitClick} meals={this.state.plats} />
        <AddMealForm onSubmit={this.handleSubmitAddMeal} />
        <List listIngredients={this.state.ingredientList} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import logo from './logoHW.png';
import './App.css';

import Cell from './components/Cell';
import Modal from './components/Modal';
import AddMealForm from './components/AddMealForm';
import List from './components/List';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      current_id: '',
      selectedTime: '',
      menus: [],
      plats: [],
      shoppingList: []
    }
  }
  

  loadMenusFromServer = () => {
    axios.get(this.props.url)
      .then(res => {
        this.setState({menus : res.data});
      })
  }

  loadPlatsFromServer = () => {
    
    axios.get('http://localhost:3001/api/plat')
      .then(res => {
        this.setState({plats : res.data});
      })
  }

  generateShoppingList = () => {
    let list= [];
    this.state.menus.forEach(function(menu)  {
      if(menu.midi)
        list = [...list, ...menu.midi.ingredients];
    })

    list = [...(new Set(list))];
    this.setState({
      shoppingList: list
    });
  }

  toggleModal = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  handleCellClick = (id, time) => {
    this.setState({
      current_id: id,
      selectedTime: time
    });
  }

  handleTextChange = (e) => {
      this.setState({inputText: e.target.value});
  }

  
  handleMenuSubmit = (plat) => {
    let menu = {};

    if(this.state.selectedTime === 'midi')
      menu = {midi: plat}
    else 
      menu = {soir: plat}

    axios.put(`${this.props.url}/${this.state.current_id}`, menu)
      .then(res => {
        this.loadMenusFromServer();
       
      })
      .catch(err => {
        console.log(err);
      })
    
    this.setState({
      isOpen: false
    });
  }

  handlePlatSubmit = (plat) => {
    axios.post('http://localhost:3001/api/plat', plat)
      .then(res =>
        this.loadPlatsFromServer()
      )
      .catch(err => {
        console.error(err);
      });
  }

  handleMenuDelete = (id, time) => {
    let menu = {};
    if(time === 'midi')
      menu = {midi: ' '}
    else 
      menu = {soir: ' '}

    axios.put(`${this.props.url}/${id}`, menu)
      .then(res => {
        this.loadMenusFromServer();
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount = () => {
    this.loadMenusFromServer();
    this.loadPlatsFromServer(); 
  }

  render() {
  
    let repas = new Map();
    const days= ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    let repas_midi = '';
    let repas_soir = '';
    
    
   
   // console.log(this.state.shoppingList);

    this.state.menus.forEach(function(value) {
      repas.set(value.jour, value);
    });

    repas_midi = days.map((day, i) =>
      {
        let current_day = repas.get(day)
        if(current_day) {
          return current_day['midi'] ? (
            <td key={current_day['_id']}><Cell value={current_day['midi'].nom} id={current_day['_id']} time={'midi'} onCellClick={this.handleCellClick} onMenuDelete={this.handleMenuDelete} buttonClick={this.toggleModal} /></td>
          ) : (
            <td key={current_day['_id']}><Cell value={''} id={current_day['_id']} time={'midi'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
          )
        }
      }
    )

    repas_soir = days.map((day, i) =>
      {
        let current_day = repas.get(day)
        if(current_day) {
          return current_day['soir'] ? (
            <td key={current_day['_id']}><Cell value={current_day['soir'].nom} id={current_day['_id']} time={'soir'} onCellClick={this.handleCellClick} onMenuDelete={this.handleMenuDelete} buttonClick={this.toggleModal} /></td>
          ) : (
            <td key={current_day['_id']}><Cell value={''} id={current_day['_id']} time={'soir'} onCellClick={this.handleCellClick} buttonClick={this.toggleModal} /></td>
          )
        }
      }
    )

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
              {repas_midi}
            </tr>
            <tr>
              <td>Soir</td>
              {repas_soir}
            </tr>
            </tbody>
          </table>
        </div>

        <Modal show={this.state.isOpen} onClose={this.toggleModal} onMenuSubmit={this.handleMenuSubmit} meals={this.state.plats} />
        <AddMealForm onPlatSubmit={this.handlePlatSubmit} />
        <List shoppingList={this.state.shoppingList} />
        <button onClick={this.generateShoppingList}> { (this.state.shoppingList.length > 0) ? 'Reload shopping list' : 'Generate shopping list' }</button>
      </div>
    );
  }
}

export default App;

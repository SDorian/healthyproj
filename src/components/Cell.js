import React from 'react';

class Cell extends React.Component {
   
    setDayAndTime = () => {
        let id = this.props.id;
        let time = this.props.time;
        this.props.onCellClick(id, time);
    }

    deleteMenu = () =>{
      let id = this.props.id;
      let time = this.props.time;
      this.props.onMenuDelete(id, time);
    }

    render() {
      return (
        <div className="square">
          {(this.props.value && (this.props.value !== ' ')) ? (
            <div>
              <span onClick={this.deleteMenu} className='close'>&times;</span>
              <p  onClick={(event) => {this.props.buttonClick(); this.setDayAndTime();}}>{this.props.value}</p>
            </div>
          ) : (
            <button onClick={(event) => {this.props.buttonClick(); this.setDayAndTime();}}>Button</button>
          )} 
        </div>
      );
    }
  }

export default Cell;
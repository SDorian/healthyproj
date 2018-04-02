import React from 'react';

class Cell extends React.Component {
   
    setDayAndTime = () => {
        let day = this.props.day;
        let time = this.props.time;
        this.props.onCellClick(day, time);
    }

    render() {
      return (
        <div className="square">
          {this.props.value ?  (
            this.props.value
          ) : (
            <button onClick={(event) => {this.props.buttonClick(); this.setDayAndTime();}}>Button</button>
          )} 
        </div>
      );
    }
  }

export default Cell;
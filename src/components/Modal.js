import React from 'react';

import './styles/Modal.css'

class Modal extends React.Component {


    constructor(props) {
        super(props);
        

        this.state = {selectedMeal: ''};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let plat = this.props.meals.find(meal => meal.nom === this.state.selectedMeal);

        if(!plat) {
            return;
        }
        this.props.onMenuSubmit(plat);
        this.setState({selectedMeal: ''});
    }

    handleSelectChange = (e) => {
        this.setState({selectedMeal: e.target.value})
    }

    render() {
        if(!this.props.show) {
            return null;
        }
        
        const selectMeals = this.props.meals.map((meal, index) =>
            <option key={index} value={meal.id}>{meal.nom}</option>
        );

        return (
            
            <div className='modal'>
                <div className='modal-content'>
                    <span onClick={this.props.onClose} className='close'>&times;</span>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <select onChange={this.handleSelectChange}>
                                <option >Choisir un plat</option>
                                {selectMeals}
                            </select>
                            <input type={'submit'} value={"Submit"}/>
                        </div>
                    </form>
                </div>
          </div>
        )
    };
}

export default Modal;
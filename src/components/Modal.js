import React from 'react';

import './styles/Modal.css'

class Modal extends React.Component {


    constructor(props) {
        super(props);
        

        this.state = {selectedMeal: {
            nom: '',
            ingredients: []
        }};
    }

    submitMenu = () => {
        this.props.onSubmit(this.state.selectedMeal.nom, this.state.selectedMeal.ingredients);
        this.setState({
            selectedMeal: {
                nom: '',
                ingredients: []
            }
        });
    }

    handleSelectChange = (e) => {
        this.setState({selectedMeal: this.props.meals[e.target.value]})
    }

    render() {
        if(!this.props.show) {
            return null;
        }
        
        const selectMeals = this.props.meals.map((meal, index) =>
            <option key={index} value={index}>{meal.nom}</option>
        );

        return (
            
            <div className='modal'>
                <div className='modal-content'>
                    <span onClick={this.props.onClose} className='close'>&times;</span>
                    <div>
                        <select onChange={this.handleSelectChange}>
                            <option >Choisir un plat</option>
                            {selectMeals}
                        </select>
                        <input type={'submit'} value={"Submit"} onClick={this.submitMenu}/>
                    </div>
                </div>
          </div>
        )
    };
}

export default Modal;
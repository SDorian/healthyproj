import React from 'react';

class AddMealForm extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            mealName: '',
            ingredients: ''
        }
    }

    handleMealNameChange = (e) => {
        this.setState({mealName: e.target.value});
    }

    handleIngredientsChange= (e) => {
        this.setState({ingredients: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let ingredientsArray = this.state.ingredients.split('-');
        let nom = this.state.mealName;
        
        if(!ingredientsArray || !nom) {
            return;
        }

        let plat = {
            nom: nom,
            ingredients: ingredientsArray
        }

        this.props.onPlatSubmit(plat);

        this.setState({
            mealName: '',
            ingredients: ''
        })
    }

    render() {
        return (
            <div style={{padding: '5%'}}> 
                <form onSubmit={this.handleSubmit} >
                    <input type={'text'} value={this.state.mealName} placeholder={'nom du plat'} onChange={this.handleMealNameChange} />
                    <input type={'text'} value={this.state.ingredients} placeholder={'liste des ingrédients séparés par -'} style={{width: '70%'}} onChange={this.handleIngredientsChange} />
                    <input type={'submit'} value={'Submit'} />
                </form>
            </div>
        );
    }
}

export default AddMealForm;
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

    handleSubmit = () => {
        const ingredientsArray = this.state.ingredients.split('-');
        const plat = {
            nom: this.state.mealName,
            ingredients: ingredientsArray
        }

        this.props.onSubmit(plat);

        this.setState({
            mealName: '',
            ingredients: ''
        })
    }

    render() {
        return (
            <div style={{padding: '5%'}}> 
                <input type={'text'} value={this.state.mealName} placeholder={'nom du plat'} onChange={this.handleMealNameChange} />
                <input type={'text'} value={this.state.ingredients} placeholder={'liste des ingrédients séparés par -'} style={{width: '70%'}} onChange={this.handleIngredientsChange} />
                <input type={'submit'} value={'Submit'} onClick={this.handleSubmit} />
                {this.state.ingredients}
                
            </div>
        );
    }
}

export default AddMealForm;
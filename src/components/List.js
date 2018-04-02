import React from 'react';

class List extends React.Component {

    render() {
        const ingredientsListDisplay = this.props.listIngredients.map((ingredient, index) =>
            <li key={index}>{ingredient}</li>
        );
        return(
            <div>

            {this.props.listIngredients.length != 0 && (
                <h2>Liste d'ingrédients</h2>
            )}

                <ul style={{width: '20%', margin: '0 auto'}}>
                    {ingredientsListDisplay}
                </ul>
            </div>
        )
    }
}


export default List;

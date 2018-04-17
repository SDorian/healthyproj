import React from 'react';

class List extends React.Component {

    render() {
        const shoppingListDisplay = this.props.shoppingList.map((ingredient, index) =>
            <li key={index}>{ingredient}</li>
        );
        return(
            <div>

            {this.props.shoppingList.length !== 0 && (
                <h2>Liste d'ingrédients</h2>
            )}

                <ul style={{width: '20%', margin: '0 auto'}}>
                    {shoppingListDisplay}
                </ul>
            </div>
        )
    }
}


export default List;

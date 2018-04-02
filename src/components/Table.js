import React from 'react';

import Cell from './Cell';

class Table extends React.Component {

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Midi</th>
                        <th>Soir</th>
                    </tr>

                    <tr>
                        <td>Lundi</td>
                        <td><Cell value="Yo bro" buttonClick={this.props.buttonClick} /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Mardi</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;

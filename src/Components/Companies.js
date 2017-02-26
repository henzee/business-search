import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Companies extends React.Component {
    //Luodaan taulukko käyttäen react-bootstrap-tablea, jolle data-parametrinä annetaan App.js:ssä haettu data.
    render() {
        return (
            <div>
                <BootstrapTable ref='table' data={ this.props.companies }>
                    <TableHeaderColumn dataField='registrationDate'>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={ true }>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='businessId' isKey={ true } dataSort={ true }>Business ID</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
                
export default Companies;
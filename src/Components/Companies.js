import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Companies extends React.Component {


  render() {
    return (
      <div>
        <BootstrapTable ref='table' data={ this.props.companies }>
            <TableHeaderColumn dataField='businessId' isKey={ true } dataSort={ true }>Business ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort={ true }>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='registrationDate'>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
                
export default Companies;
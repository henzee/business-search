import React, { Component } from 'react';

class Search extends Component {
    //Käsitellään haku
    handleSubmit(e){
        //Jos 'date' on tyhjä
        if(this.refs.searchInput.value === '') {
            alert('Date not given.');
        } else {
            //Jos 'date' ei ole tyhjä, kutsutaan App.js:ssä määriteltyä propertyä 'searchDate'
            this.props.searchDate(this.refs.searchInput.value);
        }
        e.preventDefault();
    }
    
    render() {
        return (<div><h3>Search</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Search by date (dd.mm.yyyy):</label><br />
                        <input className="datefield" type="text" ref="searchInput" />
                        <input type="submit" value="Search" />
                    </div>
                </form>
                </div>
        );
    }
}
                
export default Search;
import React, { Component } from 'react';

class Search extends Component {

    handleSubmit(e){
        if(this.refs.title.value === '') {
            alert('Title is required');
        } else {
            console.log(this.props);
            this.props.searchDate(this.refs.title.value);
        }
        e.preventDefault();
    }
    
    render() {
        return (<div><h3>Search</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Search by date (dd.mm.yyyy):</label><br />
                        <input type="text" ref="title" />
                        <input type="submit" value="Search" />
                    </div>
                </form>
                </div>
        );
    }
}
                
export default Search;
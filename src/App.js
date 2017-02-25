import React, { Component } from 'react';
import Companies from './Components/Companies';
import Search from './Components/Search';

class App extends Component {
    constructor() {
        super();
        this.state = {
            companies: [ ]
        }
    }
    searchCompanies(date) {
        //Validate kesken
        if(date.length !== 10) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            date = dd+'.'+mm+'.'+yyyy;
        }
        var parts = date.split('.');
        var day = parseInt(parts[0], 10)-1;
        if(day.toString().length === 1) { day = "0"+day.toString(); }
        var startDate = parts[2]+"-"+parts[1]+"-"+day;
        var endDate = parts[2]+"-"+parts[1]+"-"+parts[0]; 
        console.log(startDate + " " + endDate);
        fetch('http://avoindata.prh.fi/bis/v1?maxResults=1000&resultsFrom=0&companyRegistrationFrom='+startDate+'&companyRegistrationTo='+endDate) 
        .then(result=> {
            return result.json();
        })
        .then((parsedData) => {
              this.setState({companies:  parsedData.results });
        });
    }
    componentWillMount() {
        this.searchCompanies('');
        //fetch('http://avoindata.prh.fi/bis/v1?maxResults=1000&resultsFrom=0&companyRegistrationFrom=2016-02-22&companyRegistrationTo=2016-02-23') 
        //    .then(result=> {
        //        return result.json();
        //    })
        //    .then((parsedData) => {
        //          this.setState({companies:  parsedData.results });
        //    });
    }
    
    handleSearch(date){
        this.searchCompanies(date);
    }
    
    render() {
        return (
            <div className="App">

            <Search searchDate={this.handleSearch.bind(this)}/>
            <Companies companies={this.state.companies}/>
            </div>
        );
    }
}

export default App;

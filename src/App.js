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
    //Annetun päiväformaatin tarkastus
    validateDate(date) {
        var re = /^[0-3]?[0-9]\.[01]?[0-9]\.[12][90][0-9][0-9]$/
        if(date !== '' && !date.match(re)) {
            alert("Invalid date format: " + date);
            return false;
        }
        return true;
    }
    //Haetaan annetun päivän data
    searchCompanies(date) {
        if(this.validateDate(date)) {
            //Muunnetaan 'date'-muuttuja urlin mukaiseen formaattiin
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
                //Sijoitetaan haettu data muuttujaan
                this.setState({companies:  parsedData.results });
            });
        }
        else {
            
        }
    }
    //Haetaan data sivun latauksen jälkeen
    componentDidMount() {
        this.searchCompanies('');
    }
    //Hakukentän käsittely
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

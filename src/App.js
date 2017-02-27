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
        if(!date.match(re)) {
            if(date !== '-'){
                alert("Invalid date format: " + date);
            }
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
            //Viimeisin
            var dateStart = new Date(),
                month = '' + (dateStart.getMonth() + 1),
                days = '' + (dateStart.getDate()-1),
                year = dateStart.getFullYear();
            var dateEnd = new Date(),
                monthEnd = '' + (dateEnd.getMonth() + 1),
                dayEnd = '' + dateEnd.getDate(),
                yearEnd = dateEnd.getFullYear();
            
            if (month.length < 2) month = '0' + month;
            if (days.length < 2) days = '0' + days;
            if (monthEnd.length < 2) monthEnd = '0' + monthEnd;
            if (dayEnd.length < 2) dayEnd = '0' + dayEnd;
            var startDateNew = [year, month, days].join('-');
            var endDateNew = [yearEnd, monthEnd, dayEnd].join('-');
            console.log(startDateNew + " " + endDateNew);
            fetch('https://avoindata.prh.fi/bis/v1?maxResults=1000&resultsFrom=0&companyRegistrationFrom='+startDateNew+'&companyRegistrationTo='+endDateNew) 
            .then(result=> {
                return result.json();
            })
            .then((parsedData) => {
                //Sijoitetaan haettu data muuttujaan
                this.setState({companies:  parsedData.results });
            });
        }
    }
    //Haetaan data sivun latauksen jälkeen
    componentDidMount() {
        this.searchCompanies('-');
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

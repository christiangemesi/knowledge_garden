import './App.css';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Overview from './pages/Overview';
import {
    Web_Programming,
    ReportsOne,
    ReportsTwo,
    ReportsThree,
    ReportFour,
    ReportAllTheRest
} from './pages/Web_Programming/Web_Programming';
import Team from './pages/Team';

function App() {
    return (
        <Router>
            <Sidebar/>
            <Switch>
                <Route path='/overview' exact component={Overview}/>
                <Route path='/web_programming' exact component={Web_Programming}/>
                <Route path='/web_programming/general' exact component={ReportsOne}/>
                <Route path='/web_programming/canvas' exact component={ReportsTwo}/>
                <Route path='/web_programming/console_logs' exact component={ReportsThree}/>
                <Route path='/web_programming/lambda_calculuss' exact component={ReportFour}/>
                <Route path='/web_programming/rest' exact component={ReportAllTheRest}/>
                <Route path='/team' exact component={Team}/>
            </Switch>
        </Router>
    );
}

export default App;

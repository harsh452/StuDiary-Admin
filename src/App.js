import './App.css';
import Mainsection from './Components/Mainsection';
import Blog from './Components/Blog';

import Panel from './Components/Panel';
import Login from './Components/Login';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'

function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/" component={Login} />
       <Route exact path="/home" component={Mainsection}/>
       <Route exact path="/blog" component={Blog}/>

     </Switch>
   </Router>
  );
}

export default App;

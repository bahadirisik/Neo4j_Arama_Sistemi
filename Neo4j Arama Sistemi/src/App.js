import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Create from './Create';
import Admin from './Admin';
import Kullanici from './Kullanici';
import ArastirmaciSayfasi from './ArastirmaciSayfasi';
import YayinSayfasi from './YayinSayfasi';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/create">
              <Create></Create>
            </Route>
            <Route path="/admin">
              <Admin></Admin>
            </Route>
            <Route path="/kullanici">
              <Kullanici></Kullanici>
            </Route>
            <Route path="/author/:id">
              <ArastirmaciSayfasi></ArastirmaciSayfasi>
            </Route>
            <Route path="/yayinlar/:id">
              <YayinSayfasi></YayinSayfasi>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

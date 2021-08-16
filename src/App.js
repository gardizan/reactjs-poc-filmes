import React from 'react'
import Header from './components/Header';
import Home from './components/Home';
import Generos from './components/Genero';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NovoGenero from './components/NovoGenero';
import EditarGenero from './components/EditarGenero'
import Series from './components/Series'
import NovaSerie from './components/NovaSerie';
import InfoSerie from './components/InfoSerie';
import './styles.css'


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/genero' component={Generos} />
          <Route exact path='/genero/novo' component={NovoGenero} />
          <Route exact path='/genero/:id' component={EditarGenero} />
          <Route exact path='/serie' component={Series} />
          <Route exact path='/serie/novo' component={NovaSerie} />
          <Route exact path='/serie/:id' component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

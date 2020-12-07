import React from 'react';
import { Redirect, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './Components/header';
import { Signup } from './Routes/user/signup';
import { Login } from './Routes/user/login';
import { Profile } from './Routes/user/profile';
import { Home } from './Routes/home';
import { UserQuestions } from './Routes/user/userQuestions';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/user/signup' render={() => <Signup />} />
          <Route exact path='/user/login' render={() => <Login />} />
          <Route exact path='/user/profile' render={() => <Profile />} />
          <Route exact path='/user/questions' render={() => <UserQuestions />} />
          <Redirect to='/' render={() => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

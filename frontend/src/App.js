import React from 'react';
import { Redirect, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './Components/header';
import { Signup } from './Routes/user/signup';
import { Login } from './Routes/user/login';
import { Profile } from './Routes/user/profile';
import { MyQuestions } from './Routes/user/myQuestions';
import { Home } from './Routes/home';
import { PostQuestion } from './Routes/postQuestion';
import { Answer } from './Routes/answer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/signup' render={() => <Signup />} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/profile' render={() => <Profile />} />
          <Redirect to='/' render={() => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

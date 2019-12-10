import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './Users';
import Todos from './Todos';
import Posts from './Posts';
import TododosSave from './Todos/Save'

const App = () =>(
<BrowserRouter>
    <Menu />
    <div className='margin'>
        <Route exact path ='/' component={Users} />
        <Route exact path ='/todos' component={Todos} />
        <Route exact path = '/posts/:key' component={Posts} />
        <Route exact path = '/todos/save' component={TododosSave} />
        <Route exact path = '/todos/save:user_id/:todo_id' component={TododosSave} />
    </div>
</BrowserRouter>
);

export default App;
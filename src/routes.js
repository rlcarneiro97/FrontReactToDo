import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Main from "./pages/main"
import TodoCreate from "./pages/todo-create"
import TodoUpdate from "./pages/todo-update"

import Todo from "./pages/todo"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/todo" component={TodoCreate}/>
            <Route path="/details/todo:id" component={Todo}/>
            <Route path="/update/todo:id" component={TodoUpdate}/>
        </Switch>
    </BrowserRouter>
)

export default Routes
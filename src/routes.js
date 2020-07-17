import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Main from "./pages/main"
import TodoCreate from "./pages/todo-create"
import Todo from "./pages/todo"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/todo" component={TodoCreate}/>
            <Route path="/details/todo:id" component={Todo}/>
        </Switch>
    </BrowserRouter>
)

export default Routes
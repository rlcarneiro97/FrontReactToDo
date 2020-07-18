import React, {Component} from "react"
import Api from "../../services/api"
import {Link} from "react-router-dom"
import "./style.css"

export default class Todo extends Component{
    
    constructor(){
        super()

        this.state = {
            todo: {},
            todoInfo: {},
            nTitle: "",
            nDescription: "",
        }
    }
    
    // metodo pra preencher o objeto todo
    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await Api.get(`/todo/${id}`)
        this.setState({todo: response.data})
    }

    // metodo para "deletar" o objeto
    delete = async() => {
        const {id} = this.props.match.params

        try {
            await Api.delete(`/todo/${id}`)
            
        } catch (err) {
            console.log("Erro na requisição!")
        }
        Link.toString("/")
    }

    // metodo para renderizar a pagina
    render(){
        const {todo} = this.state
        return ( 
            <div className="todo-info">
                <article>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <div className="atualizar-dado">
                        <Link to={`/update/todo${todo._id}`}>Alterar Informações</Link>
                    </div>
                    <div className="apagar-dado">
                        <Link onClick={this.delete} to={"/"}>Apagar Registro</Link>
                    </div>
                    <Link to={"/"}>Voltar</Link>
                </article>
            </div>
        )
    }
}
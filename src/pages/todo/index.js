import React, {Component} from "react"
import Api from "../../services/api"
import {Link} from "react-router-dom"
import "./style.css"

export default class Todo extends Component{
    
    constructor(){
        super()

        this.state = {
            todo: {},
            title: "",
            description: "",
        }

        this.titleChange = this.titleChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    titleChange(event) {
        this.setState({
            title: event.target.value,
        });
      }

    descriptionChange(event) {
        this.setState({
            description: event.target.value,
        });
    }
    
    handleSubmit(event) {
        const object = {}

        if(this.state.title != ""){
            object.title = this.state.title
        }
        if(this.state.description != ""){
            object.description = this.state.description
        }

        this.update(object)
        // event.preventDefault();
    }
    
    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await Api.get(`/todo/${id}`)
        this.setState({todo: response.data})
    }

    update = async(object) => {
        const {id} = this.props.match.params

        try {
            await Api.put(`/todo/${id}`, object)
            console.log("Registro alterado com sucesso!")
        } catch (err) {
            console.log("Erro na requisição!")
        }
        await Api.get("/")
    }

    delete = async() => {
        const {id} = this.props.match.params

        try {
            await Api.delete(`/todo/${id}`)
            
        } catch (err) {
            console.log("Erro na requisição!")
        }
        await Api.get("/")
    }

    render(){
        const {todo} = this.state
        return ( 
            <div className="todo-info">
                <article>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Titulo" value={this.state.value} onChange={this.titleChange} />
                        <input type="text" placeholder="Descrição" value={this.state.value} onChange={this.descriptionChange} />
                        <input type="submit" value="Alterar Informações"/>
                    </form>
                    <div className="apagar-dado">
                        <Link onClick={this.delete} to={"/"}>Apagar Registro</Link>
                    </div>
                    <Link to={"/"}>Voltar</Link>
                </article>
            </div>
        )
    }
}
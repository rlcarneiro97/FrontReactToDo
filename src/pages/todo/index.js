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
        // console.log(this.state.description)
    }
    
    handleSubmit(event) {
        // const {title, description} = this.state.todo
        // const {todoInfo} = this.state
        // const {nTitle, nDescription} = this.state
        // var newTitle = ""
        // var newDescription = ""

        // if(title !== null){
        //     newTitle = title
        //     this.setState({todoInfo: {nTitle: newTitle}})
        // }

        // if(description !== null){
        //     newDescription = description
        //     this.setState({todoInfo: {nDescription: newDescription}})
        // }

        // console.log(todoInfo)
        // this.setState({todoInfo: undefined})
        event.preventDefault()
        // this.update(todoInfo)
    }
    
    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await Api.get(`/todo/${id}`)
        this.setState({todo: response.data})
    }

    //precisa arrumar
    update = async(object) => {
        const {id} = this.props.match.params

        try {
            await Api.put(`/todo/${id}`, object)
            // console.log("Registro alterado com sucesso!")
        } catch (err) {
            // console.log("Erro na requisição!")
        }
        // event.preventDefault(event)
        Link.toString("/")
    }

    delete = async() => {
        const {id} = this.props.match.params

        try {
            await Api.delete(`/todo/${id}`)
            
        } catch (err) {
            console.log("Erro na requisição!")
        }
        Link.toString("/")
    }

    render(){
        const {todo} = this.state
        // console.log(todo)
        return ( 
            <div className="todo-info">
                <article>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    {/* <form onSubmit={this.handleSubmit}>
                        <input name="title" type="text" placeholder="Titulo" value={this.state.value} onInput={this.titleChange} />
                        <input name="description" type="text" placeholder="Descrição" value={this.state.value} onInput={this.descriptionChange} />
                        <input type="submit" value="Alterar Informações"/>
                    </form> */}
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
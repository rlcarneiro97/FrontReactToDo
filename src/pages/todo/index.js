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
            // todoInfo: {}
        }

        this.titleChange = this.titleChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    titleChange(event) {
        this.setState({
            title: event.target.value,
        });
        // console.log(event.target.value)
      }

    descriptionChange(event) {
        this.setState({
            description: event.target.value,
        });
        // console.log(this.state.description)
    }
    
    handleSubmit(event) {
        const object = {}

        //em vez de setar object.title ou algo assim, porque nao usar o setState pra alterar?
        //ai dps eu pego as variaveis e jogo no objeto... ou entao olhar o q tem dentro do objeto todo{}

        if(this.state.title !== null){
            object.title = this.state.title
            // this.state.todoInfo.title = event
        }
        if(this.state.description !== null){
            object.description = this.state.description
        }

        if(title !== null){
            object.title = title
        }
        if(description !== null){
            object.description = description
        }

        this.update(object)
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
            console.log("Registro alterado com sucesso!")
        } catch (err) {
            console.log("Erro na requisição!")
        }
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
        return ( 
            <div className="todo-info">
                <article>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <form onSubmit={this.handleSubmit}>
                        <input name="title" type="text" placeholder="Titulo" /*onChange={this.titleChange}/* /*value={this.state.value}*//>
                        <input name="description" type="text" placeholder="Descrição" /*onChange={this.descriptionChange}*/ /*value={this.state.value}*/ />
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
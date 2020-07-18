import React, { Component} from "react"
import Api from "../../services/api"
import "./style.css"
import {Link} from "react-router-dom"

export default class TodoUpdate extends Component{

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

    // metodo pra preencher o objeto todo
    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await Api.get(`/todo/${id}`)
        this.setState({todo: response.data})
    }

    // metodo pra observar mudancas no titulo
    titleChange(event) {
        this.setState({
            title: event.target.value,
        });
      }

    // metodo pra observar mudancas na descricao
    descriptionChange(event) {
        this.setState({
            description: event.target.value,
        });
    }
    
    // metodo pra observar se há um submit
    handleSubmit(event) {
        
    }

    // metodo para "atualizar" o objeto
    update = async(object) => {
        const {id} = this.props.match.params

        try {
            await Api.put(`/todo/${id}`, object)
        } catch (err) {
            console.log("Erro na requisição!")
        }
        // event.preventDefault(event)
        Link.toString("/")
    }

    // metodo para renderizar a pagina
    render(){
        const {todo} = this.state

        return(
            <div className="todo-update">
                <article>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={todo.title}/*value={this.state.value}*/ onChange={this.titleChange} />
                        <textarea type="text" value={todo.description}/*value={this.state.value}*/ onChange={this.descriptionChange} />
                        <input type="submit" value="Alterar TODO" />
                        <Link to={`/details/todo${todo._id}`}>Voltar</Link>
                    </form>
                </article>
            </div>
        )
    }
}
import React, { Component} from "react"
import Api from "../../services/api"
import "./style.css"
import {Link} from "react-router-dom"

export default class TodoUpdate extends Component{

    constructor(){
        super()

        this.state = {
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
        const object = {
            title: this.state.title,
            description: this.state.description,
        }
        const {title, description} = object
        
        if(title === "" || description === ""){
            alert("Preencha todos os campos para fazer a adição!")
        }
        //mudar essas condicional com a chamada do create dps..
        this.create(object)
    }

    create = async(object) => {
        try {
            await Api.post("/todo", object)
            console.log("Dados Inseridos!")
            alert("Registro criado com sucesso!")
        } catch (error) {
            console.log("Dados não Inseridos!")
            alert("Erro na requisição!")
        }
        //falta testar isso
        Link.toString("/")
    }

    render(){

        return(
            <div className="todo-update">
                <article>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Titulo" value={this.state.value} onChange={this.titleChange} />
                        <input type="text" placeholder="Descrição" value={this.state.value} onChange={this.descriptionChange} />
                        <input type="submit" value="Alterar TODO" />
                        {/* testar se funciona sem o page=1 */}
                        <Link to={"/"}>Voltar</Link>
                    </form>
                </article>
            </div>
        )

    }

}
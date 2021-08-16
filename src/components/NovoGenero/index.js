import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {

    const [form, setForm] = useState('')
    const [envioSucesso, setEnvioSucesso] = useState(false)
    const mudancaDigitacao = (evento) => {
        setForm(evento.target.value)
    }
    const [textErro, setTextErro] = useState('')

        const salvarNovaCategoria = () => {
            if(form !== '') {
                axios.post('http://localhost:3002/api/genres', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    name: form
                }).then(resposta => {
                    setEnvioSucesso(true)
                })
            } else {
                setTextErro(()=>{
                    return(
                        <div className='alert alert-warning' role='alert'>
                            Você não pode deixar o campo vazio
                        </div>
                    )
                })    
            }
        }
        
        if(envioSucesso) {
            return(
                <Redirect to='/genero' />
            )
        }

    
    return(
        <div className='container'>
            <h1>Novo Gênero</h1>
            <div>{textErro}</div>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome:</label>
                    <input type='text' value = {form} onChange={mudancaDigitacao} className='form-control' id='name' placeholder='Nome do Gênero' />
                </div> 
                <button type='button' onClick={salvarNovaCategoria} className='btn btn-primary'>Cadastrar</button>
            </form>
        </div>
    )
}

export default NovoGenero
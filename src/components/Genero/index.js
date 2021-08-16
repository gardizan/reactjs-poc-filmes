import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Generos = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:3002/api/genres').then(resposta => {
            setData(resposta.data.data)
        })
    }, [])


    const excluirGenero = (id) => {
        axios.delete(`http://localhost:3002/api/genres/${id}`).then(resposta => {
            const filtro = data.filter(item => item.id !== id)
            setData(filtro)
        })
    }

    const renderizaLinha = (record) => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <div>
                        <button className='btn btn-danger' onClick={() => excluirGenero(record.id)}>Remover</button>
                        <Link className='btn btn-info' to={`/genero/${record.id}`}>Editar</Link>
                    </div>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Gêneros</h1>
                <div className='alert alert-warning' role='alert'>
                    Você não possui Gênero cadastrado
                </div>
                <Link className='btn btn-primary' to='genero/novo'>Novo cadastro</Link>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <Link className='btn btn-primary' to='genero/novo'>Novo cadastro</Link>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
    )
}

export default Generos
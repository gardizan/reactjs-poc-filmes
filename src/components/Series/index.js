import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Generos = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/api/series').then(resposta => {
            setData(resposta.data.data)
        })

    }, [])

    const excluirSerie = (id) => {
        axios.delete(`http://localhost:3002/api/series/${id}`).then(resposta => {
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
                        <button className='btn btn-danger' onClick={() => excluirSerie(record.id)}>Remover</button>
                        <Link className='btn btn-info' to={`/serie/${record.id}`}>Informação</Link>
                    </div>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Séries</h1>
                <div className='alert alert-warning' role='alert'>
                    Você não possui Séries cadastradas
                </div>
                <Link className='btn btn-primary' to='serie/novo'>Novo cadastro</Link>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link className='btn btn-primary' to='serie/novo'>Nova Séries</Link>
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
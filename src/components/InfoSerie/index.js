import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoSerie = (props) => {

    const match = props.match
    const urlId = `http://localhost:3002/api/series/${match.params.id}`

    const [form, setForm] = useState({
        name: '',
        comments: ''
    })
    const [envioSucesso, setEnvioSucesso] = useState(false)
    const [modo, setModo] = useState('INFO')
    const [data, setData] = useState({})
    const [generos, setGenero] = useState([])

    useEffect(() => {
        axios.get(urlId).then(resposta => {
            setData(resposta.data)
            setForm(resposta.data)
        })
    }, [urlId])

    useEffect(() => {
        axios.get('http://localhost:3002/api/genres/').then(resposta => {
            setGenero(resposta.data.data)
        })
    }, [data])


    const mudancaHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
    const cardAssistido = {
        background: 'green',
        color: '#fff',
        display: 'inline',
        borderRadius: '4px',
        fontSize: '14px',
        padding: '4px',
        margin: '0 4px'
    }
    const cardAssistindo = {
        background: 'grey',
        color: '#fff',
        display: 'inline',
        borderRadius: '4px',
        fontSize: '14px',
        padding: '4px',
        margin: '0 4px'
    }
    const cardNaoAssistido = {
        background: 'red',
        color: '#fff',
        display: 'inline',
        borderRadius: '4px',
        fontSize: '14px',
        padding: '4px',
        margin: '0 4px'
    }
    const generoBanner = {
        color: '#fff',
        fontWeight: '100',
        margin: '0 4px'
    }

    const seleciona = valor => () => {
        setForm({
            ...form,
            status: valor
        })
    }

    const mudancaDigitacao = (campo) => (evento) => {
        setForm({
            ...form,
            [campo]: evento.target.value
        })
    }

    const salvarNovaCategoria = () => {
        axios.put(urlId, form).then(resposta => {
            setEnvioSucesso(true)
        })
    }

    if (envioSucesso) {
        return (
            <Redirect to='/serie' />
        )
    }


    return (
        <div>
            <header style={mudancaHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-9'>
                                <h1 style={{ color: '#fff', fontWeight: '100' }}>{data.name}</h1>
                                <div className='lead'>
                                    {data.status === 'JA_ASSISTIDO' && <div style={cardAssistido}>Já assistido</div>}
                                    {data.status === 'ASSISTINDO' && <div style={cardAssistindo}>Assistindo</div>}
                                    {data.status === 'PARA_ASSISTIR' && <div style={cardNaoAssistido}>Para assistir</div>}
                                    <div style={generoBanner}>Gênero: {data.genre_name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setModo('EDIT')}>Editar</button>
            </div>
            {
                modo === 'EDIT' &&

                <div className='container'>
                    <h1>{form.name}</h1>
                    <button className='btn btn-primary' onClick={() => setModo('INFO')}>Cancelar edição</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome:</label>
                            <input type='text' value={form.name} onChange={mudancaDigitacao('name')} className='form-control' id='name' placeholder='Nome da Série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Comentário:</label>
                            <input type='text' value={form.comments} onChange={mudancaDigitacao('comments')} className='form-control' id='comments' placeholder='Deixe seu comentário' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Gênero:</label>
                            <select className="form-select" aria-label="Default select example" value={form.genre_id} onChange={mudancaDigitacao('genre_id')}>
                                {generos.map(genero => <option key={genero.id} value={genero.id}>{genero.name}</option>)}
                            </select>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'JA_ASSISTIDO'} name="status" id="jaAssistido" value='JA_ASSISTIDO' onChange={seleciona('JA_ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="jaAssistido">
                                Já Assisti
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'ASSISTINDO'} name="status" id="assistindo" value='ASSISTINDO' onChange={seleciona('ASSISTINDO')} />
                            <label className="form-check-label" htmlFor="assistindo">
                                Assistindo
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'PARA_ASSISTIR'} name="status" id="paraAssistir" value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} />
                            <label className="form-check-label" htmlFor="paraAssistir">
                                Para assistir
                            </label>
                        </div>



                        <button type='button' onClick={salvarNovaCategoria} className='btn btn-primary'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie
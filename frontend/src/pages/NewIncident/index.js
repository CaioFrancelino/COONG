import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './style.css'
import logoImg from '../../assets/Logo.svg'
import api from '../services/api'

export default function NewIncident() {
    const [ title , setTitle ] = useState('');
    const [ description, setDescription] = useState('');
    const [ value, setValue ] = useState('');

    const history = useHistory();

    const heroId = localStorage.getItem('heroId')
    
    async function handleNewIncident (e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        try {
            await api.post ('incidents', data, {
                headers: {
                    Authorization: heroId,
                }
            })
          history.push('/profile')  
        } catch (err) {
            alert ('Erro ao cadastrar caso, tente novamente.')
        }
    }
    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt='Be The Hero'/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva sua necessidade em detalhes para o <strong><em>HERÓI</em></strong>
                    </p>
                    <Link className ="backbutton" to="/">
                        <FiArrowLeft size={16} color='#cccccc' />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
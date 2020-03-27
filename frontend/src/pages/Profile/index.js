import React, { useEffect, useState } from 'react'
import logoImg from '../../assets/Logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './style.css'
import api from '../services/api'

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory();
    
    const heroName = localStorage.getItem('heroName')
    const heroId = localStorage.getItem('heroId')

    

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: heroId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    },[heroId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: heroId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout () {
        localStorage.clear()

        history.push('/')
    }

    return ( 
        <div className="profile-container">
            <header>
               <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {heroName}</span>

               <Link className="button" to='/incidents/new'>
                   Cadastrar novo caso
               </Link>
               <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#cccccc'/>
               </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}
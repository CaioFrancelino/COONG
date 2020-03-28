import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn, FiLink } from 'react-icons/fi'
import api from '../services/api'

import './styles.css' 

import logoImg from '../../assets/Logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('heroId', id)
            localStorage.setItem('heroName', response.data.name)
            history.push('/profile')

        } catch (err) {
            alert('Falha no login, tente novamente')
        }
    }
    
    return (
        <div>
        <div className="logon-container">
            <section className="form">
                <img className="logo" src={logoImg} alt='Be The Hero'/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder='Sua ID'
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className='button' type='submit'>Entrar</button>

                    <Link className ="backbutton" to="/register">
                        <FiLogIn size={16} color='#cccccc' />
                        não tem cadastro?
                    </Link>
                </form>
            </section>
           

            <img className="people" src={heroesImg} alt='Hero'/>
            
        </div>
        <footer>
        <Link className="acessbutton" to="/about">
        <FiLink size={20} color='#cccccc' id='icon' />
        Saiba mais sobre o projeto de estudo e ajuda comunitária  <strong>"Be The Hero"</strong>
        </Link>
        </footer>
        </div>
        
    )
}
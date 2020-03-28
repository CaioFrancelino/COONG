import React from 'react'
import { FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import '../About/style.css'

export default function About() {
    return (
        <div className="about">
           <section>
               <h1>
                   Sobre o projeto "Be The Hero"
                </h1>
                   <p>
                     Inicialmente o projeto foi iniciado como forma de estudo da 
                     semana OmniStack da RocketSeat (empresa com foco em ensinar programação)

                     Em meio a atual situação em que vivemos decidi mudar um pouco a regra de negócio da aplicação 
                     tendo em vista poder conectar pessoas dispostas a ajudar pessoas que necessitam, de uma forma mais simples, rápida e moderna 

                     Espero que possamos superar "juntos" essa quarentena! 
                   </p>
                   <div className='button2'>
                   <button className="hearth">
                   <Link to="/">
                        <FiHeart size={16} color='#fff' />
                        Obrigado!
                    </Link>
                   </button>
                   </div>

                   
               
           </section> 
        </div>
    )
}
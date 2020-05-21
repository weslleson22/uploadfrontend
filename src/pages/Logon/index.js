import React, { useState } from 'react';
import { Link, useHistory} from 'react-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';


import logoImg from '../../assets/logo.svg';
import hereosImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault(); // para evitar dela ser redirecionda para outra pagina
        try {
         const response = await api.post('sessions', { id });  

         //salvando em todo o navegador 
         localStorage.setItem('ongId', id);//salvando o id
         localStorage.setItem('ongName', response.data.name);//

         history.push('/profile');

         console.log(response.data.name);
        } catch (err) {
            alert('Falha no login, tente novamente.');

        }
        
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt ="Be The Hero"/>
            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>

                <input placeholder="Sua ID"
                    value={id}
                    onChange={e=> setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#e02041"/>
                    Não tenho cadastro
                </Link>
            </form>
            </section>
            <img src={hereosImg} alt="Hereos"/>
        </div>   
    );
}

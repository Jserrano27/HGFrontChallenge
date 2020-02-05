import React from 'react';
import './styles.css';

import Plans from '../../components/Plans';

function Main() {
    return (
        <>
            <section className="banner-section">
                <div className="cent"></div>
                <h1>Hospedagem de sites</h1>
                <h3>Tenha uma hospedagem de sites estável e</h3>
                <h3>evite perder visitantes diariamente</h3>
                <ul>
                    <li>99,9% de disponibilidade: seu site sempre no ar</li>
                    <li>Suporte 24h, todos os dias</li>
                    <li>Painel de Controle cPanel</li>
                </ul>
                <div className="arrow-down">
                    <a className="arrow-link" href="#plans"></a>
                </div>
            </section>
            <Plans />
            
        </>
    )   
}

export default Main;
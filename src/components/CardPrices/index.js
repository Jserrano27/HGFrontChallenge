import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function CardPrices(plan)  {
    const [mobileSliderSide, setMobileSliderSide] = useState(1);
    const [hideCard, setHideCard] = useState(false);
    const [currentCycle, setCurrentCycle] = useState('');

    let planName = plan.name;
    planName = plan.name.replace(' ', '-').toLowerCase();
    
    useEffect(() => {
        if (plan.cycle === 0) {
            setCurrentCycle('triennially');
        } else if (plan.cycle === 1) {
            setCurrentCycle('annually');
        } else if (plan.cycle === 2) {
            setCurrentCycle('monthly')
        }
    }, [plan])

    
    useEffect(() => {
        setMobileSliderSide(plan.mobileSlider);  
    }, [plan])

    // Handle the carrossel arrows on mobile
    useEffect(() => {
        // Plan M on the middle (by default)
        if (mobileSliderSide === 1) {
            if (planName === 'plano-p' || planName === 'plano-turbo') {
                setHideCard(true);
            } else {setHideCard(false)}
        }
        
        // Plan P on the middle
        else if (mobileSliderSide === 0) {
            if (planName === 'plano-m' || planName === 'plano-turbo') {
                setHideCard(true)
            } else {setHideCard(false)}
        }

        // Plan Turbo on the middle
        else if (mobileSliderSide === 2) {
            if (planName === 'plano-p' || planName === 'plano-m') {
                setHideCard(true)
            } else {setHideCard(false)}
        }
    }, [mobileSliderSide])


    return (
    <>
        <div className={`plan-container ${planName} ${hideCard ? 'hide' : 'show'}`}>
            <div className="plan-header">
                <img src={plan.img} alt="plan icon"/>
                <p>{plan.name}</p>
            </div>
            <div className="plan-content">
                <div className="plan-prices">
                    <span>R$ <span>{plan.priceA}</span></span>
                    <strong> R$ <strong>{plan.priceB}</strong></strong>
                    <p>equivalente a</p>
                </div>
                <p>R$ <span>{plan.priceC}</span>/mês<sup>*</sup></p>
                <Link to={`/product?a=add&pid=${plan.id}&billingcycle=${currentCycle}&promocode=PROMOHG${plan.discount}`} className={plan.name === 'Plano M' ? 'button-orange' : ''}>Contrate Agora</Link>
                <strong>1 ano de Domínio Gratis</strong>
                <span>economize R$ {plan.priceD} <span className="off-disc">40% off</span></span>
            </div>
            <div className="plan-footer">
                <span className="underline-dotted">{plan.name === 'Plano P' ? 'Para 1 site' : 'Sites Ilimitados'}</span>
                <span><strong>100 GB</strong> de Armazenamento</span>
                <span className="underline-dotted">Contas de E-mail <strong>Ilimitadas</strong></span>
                <span>Criador de Sites <strong className="underline">Grátis</strong></span>
                <span>Certificado SSL <strong>Grátis</strong> (https)</span>
            </div>
        </div>
    </>
)};

export default CardPrices;
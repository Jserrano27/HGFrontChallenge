import React, { useEffect, useState } from 'react';

import './styles.css';
import api from '../../services/api';
import CardPrices from '../CardPrices';

import iconP from '../../assets/icon-planp.svg'
import iconM from '../../assets/icon-planm.svg'
import iconT from '../../assets/icon-plant.svg'

function Plans() {
    // 0 = triennially, 1 = annually, 2 = monthly
    const [currentCycle, setCurrentCycle] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [planP, setPlanP] = useState([]);
    const [planM, setPlanM] = useState([]);
    const [planT, setPlanT] = useState([]);
    const [currentPlans, setCurrentPlans] = useState([]);
    // Tablet slider: 0 = left | 1 = right \\
    const [sliderSide, setSliderSide] = useState(0);
    // Mobile slider: 0 = left | 1 = middle | 2 = right \\
    const [mobileSliderSide, setMobileSliderSide] = useState(1);

    const discount = 40;

    useEffect(() => {
        async function getData() {
            const response = await api.get('/prices');
            const data = response.data.shared.products;

            const { planoP } = data;
            const { cycle: cyclePlanoP } = planoP;

            const { planoM } = data;
            const { cycle: cyclePlanoM } = planoM;
            
            const { planoTurbo } = data;
            const { cycle: cyclePlanoTurbo } = planoTurbo;

            setPlanP([
                createPlanData(planoP.id, planoP.name, cyclePlanoP.triennially.months, cyclePlanoP.triennially.priceOrder),
                createPlanData(planoP.id, planoP.name, cyclePlanoP.annually.months, cyclePlanoP.annually.priceOrder),
                createPlanData(planoP.id, planoP.name, cyclePlanoP.monthly.months, cyclePlanoP.monthly.priceOrder),
            ]);
            
            setPlanM([
                createPlanData(planoM.id, planoM.name, planoM.cycle.triennially.months, cyclePlanoM.triennially.priceOrder),
                createPlanData(planoM.id, planoM.name, planoM.cycle.annually.months, cyclePlanoM.annually.priceOrder),
                createPlanData(planoM.id, planoM.name, planoM.cycle.monthly.months, cyclePlanoM.monthly.priceOrder)
            ]);
            
            setPlanT([
                createPlanData(planoTurbo.id, planoTurbo.name, planoTurbo.cycle.triennially.months, cyclePlanoTurbo.triennially.priceOrder),
                createPlanData(planoTurbo.id, planoTurbo.name, planoTurbo.cycle.annually.months, cyclePlanoTurbo.annually.priceOrder),
                createPlanData(planoTurbo.id, planoTurbo.name, planoTurbo.cycle.monthly.months, cyclePlanoTurbo.monthly.priceOrder)
            ]);

            setIsMounted(true);

        }

        getData();
    }, []);
    
    useEffect(() => {
        if (isMounted) {
            setCurrentPlans([
                planP[`${currentCycle}`],
                planM[`${currentCycle}`],
                planT[`${currentCycle}`]
            ]);
        }
    }, [isMounted, currentCycle]);


    function createPlanData(id, planName, months, price) {
        const obj = {};

        const originalPrice = parseFloat(price);
        const discountPrice = (originalPrice - (originalPrice * (discount / 100)));
        const perMonthPrice = discountPrice / months;
        const economyPrice = originalPrice - discountPrice;    

        // Plan Properties
        obj.id = id; 
        obj.name = planName;
        obj.a = formatPrice(originalPrice.toFixed(2));
        obj.b = formatPrice(discountPrice.toFixed(2));
        obj.c = formatPrice(perMonthPrice.toFixed(2));
        obj.d = formatPrice(economyPrice.toFixed(2));

        // Plan Icon
        if (planName === "Plano P") {
            obj.icon = iconP;
        } else if (planName === "Plano M") {
            obj.icon = iconM;
        } else if (planName === "Plano Turbo") {
            obj.icon = iconT;
        }

        return obj;
    }

    function formatPrice(price)  {
        let [int, dec] = price.split('.');
        int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        const formatedPrice = `${int}.${dec}`

        return formatedPrice;
    }


    function handleOptionChange(changeEvent) {
        const divid= parseInt(changeEvent.target.getAttribute("id"));
        const value = changeEvent.target.value;

        if (value === 'triennially'|| divid === 0) {
            setCurrentCycle(0);
        } else if (value === 'annually' || divid === 1) {
            setCurrentCycle(1);
        } else if (value === 'monthly' || divid === 2) {
            setCurrentCycle(2)
        } else return;
        
    }

    function handleLeftArrow() {
        if (sliderSide === 0) return;
        setSliderSide(0);
    }
    
    function handleRightArrow() {
        if (sliderSide === 1) return;
        setSliderSide(1);
    }

    function handleLeftMobileArrow() {
        if (mobileSliderSide === 0) return
        setMobileSliderSide(mobileSliderSide - 1);
    }
    
    function handleRightMobileArrow() {
        if (mobileSliderSide === 2) return
        setMobileSliderSide(mobileSliderSide + 1);
    }

    return(
        <>
            <section className="plans-section" id="plans">
                <form className="choose-cycle">
                        
                    <p>Quero pagar a cada:</p>

                    <div className="cycles-container">
                        
                        <div 
                          className={`cycle-container ${currentCycle === 0 ? "cycle-selected" : ""}`}
                          id="0"
                          onClick={handleOptionChange}>
                            <label htmlFor="triennially">3 anos</label>
                            <input 
                                type="radio"
                                id="triennially"
                                name="cycle"
                                value="triennially"
                                />
                        </div>

                        <div 
                          className={`cycle-container ${currentCycle === 1 ? "cycle-selected" : ""}`}
                          id="1"
                          onClick={handleOptionChange}> 
                            <label htmlFor="annually">1 ano</label>
                            <input
                                type="radio"
                                id="annually"
                                name="cycle"
                                value="annually"
                                />
                        </div>
                        

                        <div 
                           className={`cycle-container ${currentCycle === 2 ? "cycle-selected" : ""}`}
                           id="2"
                           onClick={handleOptionChange}>
                            <label htmlFor="monthly">1 mes</label>
                            <input
                                type="radio"
                                id="monthly"
                                name="cycle"
                                value="monthly" 
                                />
                        </div>                        
                    
                    </div>

                </form>

                <div className="arrows">
                    <div 
                       className={`arrow-left ${sliderSide === 0 ? 'disabled' : 'enabled'}`} 
                       onClick={handleLeftArrow}/>
                    <div 
                       className={`arrow-right ${sliderSide === 1 ? 'disabled' : 'enabled'}`} 
                       onClick={handleRightArrow}/>
                </div>

                <div className="arrows-mobile">
                    <div 
                       className={`arrow-left-mobile ${mobileSliderSide === 0 ? 'disabled' : 'enabled'}`} 
                       onClick={handleLeftMobileArrow}/>
                    <div 
                       className={`arrow-right-mobile ${mobileSliderSide === 2 ? 'disabled' : 'enabled'}`} 
                       onClick={handleRightMobileArrow}/>
                </div>
                
                <div className={`plans-container ${sliderSide === 0 ? 'left' : 'right'}`}>
                    {currentPlans.map(plan => (
                        <CardPrices
                        key={plan.id}
                        id={plan.id}
                        name={plan.name}
                        cycle={currentCycle}
                        priceA={plan.a}
                        priceB={plan.b}
                        priceC={plan.c}
                        priceD={plan.d}
                        img={plan.icon}
                        mobileSlider={mobileSliderSide}
                        discount={discount}
                        />
                        ))}
                </div>
            </section>
        </>
    )
}

export default Plans;
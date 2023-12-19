import { useState } from 'react';
import arrow from '../assets/icon_arrow.svg';
import './select.scss';

interface IText{
    Inter: 'Sans Serif';
    Lora: 'Serif';
    Mono: 'Mono';
}

const classToText:IText = {
    Inter: 'Sans Serif',
    Lora: 'Serif',
    Mono: 'Mono'
} 

const Select = ({options, setFont, currentFont}:{
    options:["Inter", "Lora", "Mono"];
    currentFont:'Inter' | 'Lora' | 'Mono';
    setFont(arg0: 'Inter' | 'Lora' | 'Mono'):void;
}) => {
    const [isVisible, setIsVisible] = useState<Boolean>(false);
    
    const handleOptionClick:typeof setFont = (option) => {
        setFont(option);
        setIsVisible(false);
    }

    const buttons = options.map(item => <button type='button' className='select__button' key={item} onClick={() => handleOptionClick(item)}>{classToText[item]}</button>)

    return(
        <>
            <div className='fonts-select'>
                <span className='fonts-select__text' onClick={() => setIsVisible(!isVisible)}>
                    {classToText[currentFont]}
                    <img className='fonts-select__icon' src={arrow} alt="arrow icon" />
                </span>

                {
                    isVisible &&
                        <div className='select'>
                            {buttons}
                        </div>
                }
            </div>

            {
                isVisible && 
                    <div 
                        className='select__click-catcher' 
                        onClick={() => setIsVisible(false)}>
                    </div>
            }
        </>
    )
}

export default Select;
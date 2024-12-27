import React from 'react';
import {useState, useEffect} from 'react';
import {BtnPress} from 'screens';

interface OptionProps{
    show : boolean;
}

export const OptionPage = ({show} : OptionProps) =>{

    const [windowShow, setWindowShow] = useState(false);

    useEffect(()=>{
        setWindowShow(!windowShow)
    }, [show])

    return(
        <div className={windowShow ? "option-page show" : "option-page"}>
            <h5 className="option-tit">설정</h5>
            <div className="option-wrap">
                <ul className="option-list">
                    <li>
                        <BtnPress btnTxt={'색상'}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
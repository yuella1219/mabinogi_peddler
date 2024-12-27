import React from 'react';
import {useState, useEffect} from 'react';

interface ChooseInterfaceColorProps {
    show : boolean;
}

export const ColorInterface = ({show} : ChooseInterfaceColorProps) =>{

    const [optionShow, setOptionShow] = useState(true);

    const choiceInterfaceColor = (event:React.MouseEvent<HTMLButtonElement>) =>{
        const _btn = String(event.currentTarget.classList);
        const _codeName = _btn.toString().replace('color-btn', "").replace(' ', '');
        const root = document.querySelector('#root');
        root!.className = _codeName;
    }

    useEffect(()=>{
        setOptionShow(show);
    }, [show])

    return(
        <div className={optionShow ? "color-interface-wrap show" : "color-interface-wrap"}>
            <button type="button" className="skyGlass color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">하늘유리</span>
            </button>
            <button type="button" className="electronic color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">전자제품</span>
            </button>
            <button type="button" className="dollPink color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">인형핑크</span>
            </button>
            <button type="button" className="transparentGray color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">투명회색</span>
            </button>
            <button type="button" className="doNotCodingPlz color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">불꽃개발</span>
            </button>
            <button type="button" className="ivory color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">아이보리</span>
            </button>
            <button type="button" className="strawberryMilk color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">딸기우유</span>
            </button>
            <button type="button" className="neonGreen color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">네온그린</span>
            </button>
            <button type="button" className="neonPink color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">네온핑크</span>
            </button>
            <button type="button" className="limeOrange color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">라임오렌지</span>
            </button>
            <button type="button" className="sandPink color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">샌드핑크</span>
            </button>
            <button type="button" className="newYorkMan color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">도시남자</span>
            </button>
            <button type="button" className="mustard color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">머스타드</span>
            </button>
            <button type="button" className="ladecaBlue color-btn" onClick={choiceInterfaceColor}>
                <span className="hover-txt">라데카블루</span>
            </button>
        </div>
    )
}
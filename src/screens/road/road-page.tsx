import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useLoading, useNpcName } from 'core';
import { NpcDataProps, NpcData } from 'datas';
import {RoadTimer} from 'screens';
import { useNavigate } from "react-router-dom";

interface RoadPageProps {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}


export const RoadPage = () =>{
    const DEFAULT_SPEED = 8; // 배경 디폴트 스피드
    const {setLoading} = useLoading(); // 로딩
    const {npcName} = useNpcName(); // 이동할 npc 이름 받아오기
    const navigate = useNavigate(); // 시간 종료 시 페이지 이동 기능
    const [arrive, setArrive]  = useState(false); // 페이지 이동 감지용
    const [backSpeed, setBackSpeed] = useState(DEFAULT_SPEED); 
    const backSpeedRef = useRef(DEFAULT_SPEED);// useRef는 리랜더링을 유발하지 않는다. 이걸 이제 알았네
    const roadArea = useRef<HTMLDivElement>(null); // 이동맵
    const isHolding = useRef(false); // 동작 감지

    useEffect(() => {
        setLoading(true);
        // 키보드 온오프
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isHolding.current) {
                isHolding.current = true;
                backSpeedRef.current /= 2;
                setBackSpeed(backSpeedRef.current)
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            isHolding.current = false;
            backSpeedRef.current *= 2;      
            setBackSpeed(backSpeedRef.current)      
        };
        // 마우스 온오프
        const handleMouseDown = (e: MouseEvent) => {
            if (!isHolding.current) {
                isHolding.current = true;
                backSpeedRef.current /= 2;
                setBackSpeed(backSpeedRef.current)
            }
        };
        const handleMouseUp = (e: MouseEvent) => {
            isHolding.current = false;                
            backSpeedRef.current *= 2;
            setBackSpeed(backSpeedRef.current)
        };
        // 이벤트
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            // useEffect 안에서 return을 사용하면 컴포넌트가 언마운트 될 때 이벤트를 종료시킨다.
            // 아니 이 중요한걸 이제서야
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [npcName]);

    // 페이지 이동 감지 전달용
    const getArrive = (arr : boolean | null) =>{
        if(arr === true && arr !== null){// 값이 변할 때만 상태 변경
            setArrive(arr);
        }
    }

    useEffect(()=>{
        if(arrive){
            navigate("/mabinogi_peddler");
        }
    }, [arrive])

    // animation-duration 받을 준비
    return(
        <div className="road-wrap" ref={roadArea}
        style={{ "--road-speed": `${backSpeed}s` } as React.CSSProperties}>
            <div className="player"></div>
            <RoadTimer speed={isHolding.current ? 1 : 0} arrive={getArrive}/>
        </div>
    )
}
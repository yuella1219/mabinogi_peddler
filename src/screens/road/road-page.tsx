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

const DEFAULT_SPEED = 8; // 배경 디폴트 스피드

export const RoadPage = () =>{
    const {setLoading} = useLoading(); // 로딩
    const {npcName} = useNpcName(); // 이동할 npc 이름 받아오기
    const [getDistance, setDistance] = useState<NpcDataProps['pos']>({x:0, y:0}); // 움직일 거리    
    const backSpeedRef = useRef(DEFAULT_SPEED);// useRef는 리랜더링을 유발하지 않는다. 이걸 이제 알았네
    const [backSpeed, setBackSpeed] = useState(DEFAULT_SPEED); 
    const roadArea = useRef<HTMLDivElement>(null); // 이동맵
    const isHolding = useRef(false); // 동작 감지
    const [calcTime,setCalcTime] = useState(0); // 전달용 시간
    const navigate = useNavigate(); // 시간 종료 시 페이지 이동 기능
    const [arrive, setArrive]  = useState(false); // 페이지 이동 감지용

    useEffect(() => {
        const _pos = NpcData.find((data) => data.name === npcName); // 이름값 맞춰 데이터 찾기
        setDistance({x : _pos?.pos.x || 0, y : _pos?.pos.y || 0}) // 위치 받아오기

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
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [npcName]);

    // 넘겨줄 거리값 계산
    useEffect(()=>{
        setCalcTime(getDistance.x + getDistance.y);
    }, [getDistance])

    // 페이지 이동 감지 전달용
    const getArrive = (arr : boolean) =>{
        if(!arrive){// 값이 변할 때만 상태 변경
            setArrive(arr);
        }
    }

    useEffect(()=>{
        // if(arrive){
        //     navigate("/mabinogi_peddler");
        // }
        console.log(arrive)
    }, [arrive])

    // animation-duration 받을 준비
    return(
        <div className="road-wrap" ref={roadArea}
        style={{ "--road-speed": `${backSpeed}s` } as React.CSSProperties}>
            <div className="player"></div>
            <RoadTimer time={calcTime} speed={isHolding ? 2 : 0} arrive={getArrive}/>
        </div>
    )
}
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useLoading, useNpcName } from 'core';
import { RoadTimer, RoadArrivePlace } from 'screens';
import { useNavigate } from "react-router-dom";

interface RoadPageProps {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const RoadPage = () =>{
    const {setLoading} = useLoading(); // 로딩
    const { npcName, prevNpcName, setPrevNpcName } = useNpcName(); // 이동할 npc 이름 받아오기
    const navigate = useNavigate(); // 시간 종료 시 페이지 이동 기능
    const [arrive, setArrive]  = useState(false); // 페이지 이동 감지용
    const roadArea = useRef<HTMLDivElement>(null); // 이동맵 useRef는 리랜더링을 유발하지 않는다. 이걸 이제 알았네
    const isHolding = useRef(false); // 동작 감지
    const [isBoosting, setIsBoosting] = useState(false); // ✅ 상태 추가

    const handleSpeedUp = () =>{
        if (!isHolding.current) {
            isHolding.current = true;
            setIsBoosting(true);
            if(roadArea.current){
                roadArea.current.classList.add('boost');
            }
        }
    }
    const handleSpeedDown = () =>{
        if (isHolding.current) {
            isHolding.current = false;
            setIsBoosting(false);
            if(roadArea.current){
                roadArea.current.classList.remove('boost');
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        if(prevNpcName.length < 1) setPrevNpcName('델'); // 현재위치 없을 때 델로 초기화

        // 키보드 스피드업
        const handleKeyDown = (e: KeyboardEvent) => {
            handleSpeedUp();
        };
        // 마우스 스피드업
        const handleMouseDown = (e: MouseEvent) => {
            handleSpeedUp();            
        };
        // 키보드 스피드다운
        const handleKeyUp = (e: KeyboardEvent) => {
            handleSpeedDown();
        };
        // 마우스 스피드다운
        const handleMouseUp = (e: MouseEvent) => {
            handleSpeedDown();
        }

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
    }, []);

    // 페이지 이동 감지 전달용
    const getArrive = (arr : boolean | null) =>{
        if(arr === true && arr !== null){// 값이 변할 때만 상태 변경
            setArrive(arr);
        }
    }

    useEffect(()=>{
        if(arrive){
            setLoading(false);
            navigate("/mabinogi_peddler");
        }
    }, [arrive])

    // animation-duration 받을 준비
    return(
        <div className="road-wrap" ref={roadArea}>
            <div className="player"></div>
            {/* isHolding이 하위 컴포넌트에 전달되지 않는 이유? */}
            <RoadTimer speed={isBoosting ? 1 : 0} arrive={getArrive}/>
            <RoadArrivePlace />
        </div>
    )
}
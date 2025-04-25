import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {useNpcName, dijkstra} from 'core';
import { NpcData } from 'datas';

interface RoadTimerProps {
    speed : number;
    arrive : (arv: boolean | null) => void;
}

export const RoadTimer = ({speed, arrive} : RoadTimerProps) =>{
    const {prevNpcName, npcName} = useNpcName();
    const [arriveTime, setArriveTime] = useState<number | null>(null); // 받아온 시간
    const speedRef = useRef(speed); // 재렌더링이 싫으면 ref를 적극 활용하자. useState가 항상 정답은 아니다.
    const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조 저장용

    // 시간 계산
    useEffect(()=>{
        
        
        
    }, [npcName]);

    // useEffect(()=>{
        
        // 이전 샵 거리 구하기 - prevNpcName 없을 시 델로 초기화
        // 초기화를 road에서 하는 쪽으로 변경...
        //const _prevShop = prevNpcName.length < 1 ? NpcData.find((data) => data.name === '델') : NpcData.find((data) => data.name === prevNpcName);
        //const _prevDistance = ((_prevShop?.pos.x || 0) + (_prevShop?.pos.y || 0)) * 2;

        // 목적지 샵 거리 구하기
        //const _arriveShop = NpcData.find((data) => data.name === npcName);
        // const _arriveDistance = ((_arriveShop?.pos.x || 0) + (_arriveShop?.pos.y || 0)) * 2;

        // 대륙이동 케이스 체크
        // 지도상 위치값이랑 실제 이동값 로직 뜯어고쳐야 할듯... 엉엉
        // 그거랑 이율계산값도

        // 북쪽으로 이동 시 목적지값이 -가 되는 경우 대비
        // if(_prevDistance < _arriveDistance){
        //     setArriveTime(Math.abs(_arriveDistance - _prevDistance))
        // }else{
        //     setArriveTime(Math.abs(_prevDistance - _arriveDistance))
        // }
    // }, [npcName]);

    // 타이머 시작 및 도착 감지
    useEffect(() => {
        if (arriveTime === null || arriveTime <= 0) {
            if (arriveTime !== null) {
                arrive(true); // 🚀 arrive가 null이 아닐 때만 true로 설정
            }
            return;
        }

        // 속도
        const _delay = 1000 / (1 + speedRef.current);

        // 타이머 설정
        timerRef.current = setTimeout(() => {
            setArriveTime((prev) => (prev !== null ? prev - 1 : 0));
        }, _delay);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current); // 기존 타이머 제거
        };

    }, [arriveTime]);

    useEffect(()=>{
        speedRef.current = speed;
    }, [speed])

    return(
        <div className="road-timer-wrap">
            <p className="road-timer">
                시간 {arriveTime !== null ? 
                `${Math.floor(arriveTime / 60).toString().padStart(2, '0')} : 
                ${(arriveTime % 60).toString().padStart(2, '0')}` 
                : `00:00`}
            </p>
            <p className="road-speed">속도 {speedRef.current === 0 ? 'x 1' : 'x 2'}</p>
        </div>
    )
}
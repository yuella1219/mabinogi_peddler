import React from 'react';
import {useState, useEffect} from 'react';

interface RoadTimerProps {
    time : number;
    speed : number;
    arrive : (arv : boolean) => void;
}

export const RoadTimer = ({time, speed, arrive} : RoadTimerProps) =>{
    const [getTime, setTime] = useState<RoadTimerProps['time'] | null>(null); // 받아온 시간
    const [getSpeed, setSpeed] = useState<RoadTimerProps['speed']>(0); // 토글 스피드

    // 시간 계산
    useEffect(()=>{
        setTime(time * 2);
    }, [time]);

    // 스피드 토글
    useEffect(()=>{
        setSpeed(speed);
    }, [speed]);

    useEffect(()=>{
        if (getTime === null){
            return;
        }else{
            console.log(getTime)
            // 시간 종료 시 페이지 이동
            const handleTimer = setTimeout(()=>{
                setTime((prev) => (prev !== null ? prev - 1 : 0));
            }, 1000)
            if(getTime <= 0){
                clearTimeout(handleTimer);
                arrive(true);
            }
        }
    }, [getTime])

    return(
        <div className="road-timer-wrap">
            <p>
                시간 {getTime !== null ? 
                `${Math.floor(getTime / 60).toString().padStart(2, '0')} : 
                ${(getTime % 60).toString().padStart(2, '0')}` 
                : `00:00`}
            </p>
            <p>속도 {getSpeed}</p>
        </div>
    )
}
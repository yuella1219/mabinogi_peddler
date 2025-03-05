import React, { useState, useEffect } from "react";
import { useNpcName } from "core";
import { NpcProps } from "type";
import { NpcData, NpcDataProps } from "datas";

export const NpcDialog = ({ buyState }: NpcProps) => {
    const { npcName } = useNpcName(); // npc 이름 전역상태
    const [nowNpcDatas, setNowData] = useState<NpcDataProps["txtScript"] | null>(null); // 스크립트 데이터 전체
    const [normalTxt, setNormal] = useState<string[] | null>(null); // 일반 출력 텍스트(특수 조건 텍스트x)
    const [text, setText] = useState(""); // 실제 출력 텍스트 (한글자씩 타이핑되는 텍스트)
    const [fullText, setFullText] = useState(""); // text의 전체 미리 담아두는 상태 hook
    const [isUpdate, setUpdate] = useState(false); // state 업데이트 감지용
    const [shopState, setShopState] = useState(buyState ?? 'normal') // state 업데이트
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // ✅ 기존 interval 저장

    // 15초마다 랜덤 스크립트로 바뀌는 함수
    const changeNormalText = () =>{
        if(normalTxt){
            const _num = Math.floor(Math.random() * normalTxt?.length);
            // 텍스트 중복을 피하기 위한 몸비틀기
            if(fullText === normalTxt[_num] && _num > 0){
                setFullText(normalTxt[_num - 1]);      
            }else if(fullText === normalTxt[_num] && _num === 0){
                setFullText(normalTxt[_num + 1]);
            }else{
                setFullText(normalTxt[_num]);
            }
        }        
    }

    // 최초 컴포넌트 로딩 시 스크립트 데이터 받아오기
    useEffect(()=>{
        const _data = NpcData.find((el) => el.name === npcName);
        setNowData(_data?.txtScript || null);
    }, [npcName])

    // 데이터값 출력 - 최초 스크립트 데이터 로딩 완료 되었으며 컴포넌트 마운트 되었을 시
    useEffect(()=>{
        if(nowNpcDatas){
            // normal값만 찾아서 배열로 따로 담기
            const _arr = Object.keys(nowNpcDatas).filter((key)=> key.startsWith("normal"))
                        .map((key) => nowNpcDatas[key as keyof typeof nowNpcDatas]) ?? null;
            setNormal(_arr);
            setText(nowNpcDatas.visit);
        }
    }, [nowNpcDatas])

    // 랜덤 텍스트 출력
    useEffect(()=>{
        if(isUpdate) return;

        setTimeout(()=>{
            changeNormalText();
        }, 10000)

        const interval = setInterval(changeNormalText, 10000); // 10초마다 변경
        setIntervalId(interval); // 기존 interval 저장

        return () => clearInterval(interval); // 클린업
    }, [normalTxt])

    // 샵 상태 업데이트
    useEffect(()=>{
        setShopState(buyState)            
    }, [buyState])

    // 샵 상태 업데이트 되면
    useEffect(()=>{
        if(shopState === 'normal') return;
        if(nowNpcDatas){
            // buyState 의존성 걸어서 업데이트 되면 키값으로 검색하기
            const _findEl = nowNpcDatas[shopState as keyof typeof nowNpcDatas];
        
            // intervalId값 유효하면 clear하고 state null로 만들기
            if(intervalId){
                clearInterval(intervalId);
                setIntervalId(null);
            }

            setFullText(_findEl);
        }
        
        // 일정 시간이 지나면 다시 normalText 순환 시작
        setTimeout(() => {
            setShopState('noraml');
            changeNormalText(); // 다시 랜덤 대사 출력 시작
        }, 20000); // ✅ 20초 동안 구매 대사 유지

    }, [shopState])

    // 타이핑 효과
    useEffect(()=>{       
        if (!fullText) return;

        let charIndex = 0;
            setText('')
            const typeEffect = () => {
                if (charIndex < fullText.length) {
                    setText((prev) => prev + fullText[charIndex - 1]);
                    charIndex++;
                    setTimeout(typeEffect, 50);
                }
            };

        typeEffect();
    }, [fullText])

    return (
        <div className="npc-dialog-wrap">
            <strong className="npc-name">{npcName}</strong>
            <div className="dialog-box">
                <p className="npc-txt">{text}</p>
            </div>
        </div>
    );
};

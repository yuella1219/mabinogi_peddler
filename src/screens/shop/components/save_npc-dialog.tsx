import React, { useState, useEffect } from "react";
import { useNpcName } from "core";
import { NpcProps } from "type";
import { NpcData, NpcDataProps } from "datas";

export const NpcDialog = ({ buyState }: NpcProps) => {
    const { npcName } = useNpcName();
    const [nowNpcDatas, setNowData] = useState<NpcDataProps["txtScript"] | null>(null); // 스크립트 데이터 전체
    const [normalTxt, setNormal] = useState<string[] | null>(null); // 일반 출력 텍스트(특수 조건 텍스트x)
    const [text, setText] = useState(""); // 실제 출력 텍스트 (한글자씩 타이핑되는 텍스트)
    const [fullText, setFullText] = useState(""); // text의 전체 미리 담아두는 상태 hook

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
        setTimeout(()=>{
            changeNormalText();
        }, 1000)

        const interval = setInterval(changeNormalText, 10000); // 10초마다 변경

        // 앗쒸 구매로직을 어디다 걸지
        // if(buyState) {
        //     setFullText(nowNpcDatas?.buy ?? "");
        //     return () => clearInterval(interval); // 클린업
        // }
        return () => clearInterval(interval); // 클린업
    }, [normalTxt])

    // 타이핑 효과
    useEffect(()=>{       
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
    
    // 다시하쇼

    // const changeText = () => {
    //     if (!normalTxt || normalTxt.length === 0) return;

    //     const randomKey = normalTxt[Math.floor(Math.random() * normalTxt.length)];
    //     setFullText(nowNpcDatas?.[randomKey as keyof typeof nowNpcDatas] ?? "...");
    //     setText("");
    // };

    // // ✅ NPC 데이터 가져오기
    // useEffect(() => {
    //     const _setData = NpcData.find((data) => data.name === npcName);
    //     setNowData(_setData?.txtScript ?? null);
    // }, [npcName]);


    // // ✅ 대사 목록 업데이트
    // useEffect(() => {
    //     if (nowNpcDatas) {
    //         setNormal(Object.keys(nowNpcDatas).filter((key) => key.startsWith("normal")) ?? null);
    //     }
    // }, [nowNpcDatas]);


    // // ✅ 랜덤 대사 변경 및 타이핑 효과
    // useEffect(() => {
    //     setTimeout(()=>{
    //         changeText(); // 처음 실행
    //     }, 10000)
    //     const interval = setInterval(changeText, 10000); // 10초마다 변경

        
    //     if(buyState){
    //         setText(nowNpcDatas?.buy ?? '');
    //         return () => clearInterval(interval); // 클린업
    //     }

    //     return () => clearInterval(interval); // 클린업
    // }, [normalTxt, buyState]);


    // // ✅ 타이핑 효과
    // useEffect(() => {
    //     let charIndex = 0;
    //     setText("");

    //     const typeEffect = () => {
    //         if (charIndex < fullText.length) {
    //             setText((prev) => prev + fullText[charIndex - 1]);
    //             charIndex++;
    //             setTimeout(typeEffect, 50);
    //         }
    //     };

    //     typeEffect();
    // }, [fullText]);

    // useEffect(()=>{
    //     setText(nowNpcDatas?.visit ?? '');
    // }, [])

    return (
        <div className="npc-dialog-wrap">
            <strong className="npc-name">{npcName}</strong>
            <div className="dialog-box">
                <p className="npc-txt">{text}</p>
            </div>
        </div>
    );
};

import React from 'react'
import {useState, useRef} from 'react';

export const Todo = () =>{
    const _todo = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    
    const handleTodo = () =>{
        setExpanded(!expanded);
        if(_todo.current){
            if(expanded) {
                _todo.current.classList.add('expanded');
            }else{
                _todo.current.classList.remove('expanded');
            }
        }
    }

    return(
        <div className="todo" ref={_todo} onClick={handleTodo}>
            <h2>To Do List</h2>
            <p className="complete">상점 전체 탭 순회할 수 있도록 코드 수정</p>
            <p className="complete">와인재료 1개 이상의 묶음 선택했을 시 동일한 가격의 아이템 장바구니에 담기</p>
            <p className="complete">아이템 이름 외 선택지 필요 - ex) 델, 델렌 꽃이름 동일하여 첫번째 배열 아이템밖에 담기지 않음<br />컬러코드 등으로 구분 필요</p>
            <p className="complete">스토리지에 데이터 저장 - 타임 데이터 체크 후 갱신 필요 시 갱신하여 스토리지에 재저장</p>
            <p>
                잔고
                <span>골드, 금박 솔방울, 두카트, 모험가의 인장</span>
            </p>
            <p>무게, 슬롯
                <span>이동수단 및 교역 규모 선택</span>
            </p>
            <p>
                판매 시스템<br />
                <span>NPC 비주얼 더미데이터 필요</span>
                <span>판매버튼 필요</span>
            </p>
            <p>짐 꾸러미 내부에 동일한 이름을 가진 아이템이 있을 경우, 어떤 아이템을 판매할건지 선택</p>
            <p>
                외부 조건에 따른 데이터 업데이트<br/>
                <span>구매수량 제한 아이템 구매갯수 체크 필요</span>
                <span>친밀도에 따른 할인률 적용</span>
                <span>NPC 필수 매입 아이템 업데이트</span>
            </p>
        </div>
    )
}
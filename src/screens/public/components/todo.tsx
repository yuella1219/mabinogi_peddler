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
        console.log(expanded)
    }

    return(
        <div className="todo" ref={_todo} onClick={handleTodo}>
            <h2>To Do List</h2>
            <p className="complete">상점 전체 탭 순회할 수 있도록 코드 수정</p>
            <p>와인재료 1개 이상의 묶음 선택했을 시 동일한 가격의 아이템 장바구니에 담기</p>
            <p>아이템 이름 외 선택지 필요 - ex) 델, 델렌 꽃이름 동일하여 첫번째 배열 아이템밖에 담기지 않음<br />컬러코드 등으로 구분 필요</p>
            <p>구매수량 제한 아이템 구매갯수 체크 필요</p>
        </div>
    )
}
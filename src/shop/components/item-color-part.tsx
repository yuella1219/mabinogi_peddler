import React from 'react';
import{styled} from 'styled-components';

interface Props{
    color:string;
}

const ColorCode = styled.div<Props>`
    width:12px;
    height:12px;
    background:${(props) => (props.color ? `rgb(${props.color})` : null)}
`

export const ItemColorPart = ({color} : Props) => {
    return(
        color ? 
        <ColorCode color={color}/>
        : null
    )
}
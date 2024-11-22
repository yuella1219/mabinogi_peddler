import React from 'react';
import{styled} from 'styled-components';

interface getProps{
    color:string;
}

interface Props{
    $color:string;
}

const ColorCode = styled.div<Props>`
    width:20px;
    height:20px;
    background:${(props) => (props.$color ? `rgb(${props.$color})` : null)};
    transform:translateY(-3px);
`

export const ItemColorPart = ({color} : getProps) => {
    return(
        <ColorCode $color={color}/>
    )
}
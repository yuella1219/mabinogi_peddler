import React from 'react';
import{styled} from 'styled-components';

interface getProps{
    color:string;
}

interface Props{
    $color:string;
}

const ColorCode = styled.span<Props>`
    display:block;
    width:20px;
    height:20px;
    background:${(props) => (props.$color ? `rgb(${props.$color})` : null)};
    transform:translateY(-2px);
`

export const ItemColorPart = ({color} : getProps) => {
    return(
        <ColorCode $color={color}/>
    )
}
import React from 'react';
import {useState, useEffect} from 'react';

interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const Sample = () =>{
    return(
        <div>
            sample
        </div>
    )
}
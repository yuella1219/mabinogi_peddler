import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {useLoading} from 'core';

interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const TestPage = () => {
    const {setLoading} = useLoading();
    // ✅ 여러 path를 관리할 ref
    const pathRefs = useRef<SVGPathElement[]>([]);
    const [lengths, setLengths] = useState<number[]>([]);
  
    const calSvgLoadDistance = () => {
        const newLengths = pathRefs.current.map((path) => 
          path ? path.getTotalLength() : 0
        );
        setLengths(newLengths);
    };

    useEffect(()=>{
        setLoading(true);
    }, [])
  
    return (
      <>
        <button type="button" className="nav-btn" onClick={calSvgLoadDistance}>일괄 계산</button>
        <div className="testBox">

          <div className="box">
            <p className="nm">델-델렌</p>
            <div>  
                {/* ✅ img 대신 svg 직접 넣기 */}
                <svg width="62" height="20" viewBox="0 0 62 20" fill="none">
                    <path d="M1.5 17L24.5 3L60.5 12.5" stroke="black" strokeWidth={5} 
                        ref={(el) => el && (pathRefs.current[0] = el)}/>
                </svg>  
            </div>
            <p className="distance">결과값 : {lengths[0] ?? '-'}</p>
          </div>


          <div className="box">
            <p className="nm">델-메루</p>
            <div>  
                {/* ✅ img 대신 svg 직접 넣기 */}
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="73" viewBox="0 0 48 73" fill="none">
                    <path d="M3 71L45 1.5" stroke="black" stroke-width="5"ref={(el) => el && (pathRefs.current[1] = el)}/>
                </svg>
            </div>
            <p className="distance">결과값 : {lengths[1] ?? '-'}</p>
          </div>

          <div className="box">
            <p className="nm">델-에루</p>
            <div>  
                {/* ✅ img 대신 svg 직접 넣기 */}
                <svg width="367" height="154" viewBox="0 0 367 154" fill="none">
                    <path d="M365.5 151.5L335.5 133.5L328 123L306.5 120.5L289.5 111L274 116L258.5 124L247.5 120.5L225 127.5L202 129L180.5 124L156 129L144.5 122L140.5 121.5L125 126L105 137L76.5 124.441M75.5 124L76.5 124.441M76.5 124.441L74.5 114L68 103L31 107L18.5 85.5V67.5L44.5 44.5L27.5 27L11 9L2 2" stroke="black" strokeWidth={5}                    
                    ref={(el) => el && (pathRefs.current[2] = el)} />
                </svg> 
            </div>
            <p className="distance">결과값 : {lengths[2] ?? '-'}</p>
          </div>

          <div className="box">
            <p className="nm">델-에루</p>
            <div>  
                {/* ✅ img 대신 svg 직접 넣기 */}
                <svg width="367" height="154" viewBox="0 0 367 154" fill="none">
                    <path d="M365.5 151.5L335.5 133.5L328 123L306.5 120.5L289.5 111L274 116L258.5 124L247.5 120.5L225 127.5L202 129L180.5 124L156 129L144.5 122L140.5 121.5L125 126L105 137L76.5 124.441M75.5 124L76.5 124.441M76.5 124.441L74.5 114L68 103L31 107L18.5 85.5V67.5L44.5 44.5L27.5 27L11 9L2 2" stroke="black" strokeWidth={5}                    
                    ref={(el) => el && (pathRefs.current[2] = el)} />
                </svg> 
            </div>
            <p className="distance">결과값 : {lengths[2] ?? '-'}</p>
          </div>

          <div className="box">
            <p className="nm">델-에루</p>
            <div>  
                {/* ✅ img 대신 svg 직접 넣기 */}
                <svg width="367" height="154" viewBox="0 0 367 154" fill="none">
                    <path d="M365.5 151.5L335.5 133.5L328 123L306.5 120.5L289.5 111L274 116L258.5 124L247.5 120.5L225 127.5L202 129L180.5 124L156 129L144.5 122L140.5 121.5L125 126L105 137L76.5 124.441M75.5 124L76.5 124.441M76.5 124.441L74.5 114L68 103L31 107L18.5 85.5V67.5L44.5 44.5L27.5 27L11 9L2 2" stroke="black" strokeWidth={5}                    
                    ref={(el) => el && (pathRefs.current[2] = el)} />
                </svg> 
            </div>
            <p className="distance">결과값 : {lengths[2] ?? '-'}</p>
          </div>

        </div>
      </>
    );
  };
  
import React,{useState} from 'react'

const Test = () => {
    const [test,setTest] = useState(0);
    // state 값이 바뀌어도 화면을 새로고침할 필요 없음. 리액트가 알아서 상태변화를 감지하고 리렌더링.
    return (
        <div>
            <button onClick={()=>setTest(test+1)}></button>
        </div>
    )
}

export default Test

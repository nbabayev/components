import React from 'react'

const nusPlayground = () => {

    function useCustomState(initialState) {
        return React.useReducer(reducer, { token: "", name: "" })
    }

    const [state, dispatch] = useCustomState();
    console.log(state);
    console.log(dispatch);

    function reducer(state, action) {
        console.log(action, "action")
        //   return typeof action === 'function' ? action("losan") : action;

        if (typeof action === "function") {
            action(state);
        }
        else {
            switch (action.type) {
                case "artist":
                    return { token: action.payload }
                case "buyer":
                    return { token: action.payload }
                case "name":
                    return { name: action.payload }
                default:
                    break;
            }
        }

    }


    function handleInput(e) {
        let value = e.target.value;
        dispatch({ type: "name", payload: value })
    }
    return (
        <div>
            <button onClick={() => dispatch({ type: "artist", payload: "123" })}>Set</button>
            <input type="text" onChange={handleInput} />
        </div>
    )
}

export default nusPlayground;


// function solution(a) {
//     let newStr = 0;
//     let result = "";
//     for (let i = 0; i < a.length; i++) {

//         newStr += new String(a[i]);
//         // console.log(newStr.slice(1))
//         newStr.slice(1);
//         console.log(result)
//     }
//     return newStr;
// }

// solution([25, 2, 3, 57, 38, 41])
import {useReducer, createContext} from "react"; 

const TaskContext = createContext(null);


const TaskReducer = (state, action) => {
    switch(action.type){
        case "add":
            if(action.payload.trim() !== ""){
                
                if(!state.includes(action.payload.trim()))
                    return [...state , action.payload.trim()];
                else{
                    alert("Cannot add a duplicate task");
                    return state;
                }
            }
            
            else{
                alert("Enter a valid task");
                return state;
            }
        case "remove":
            let newState = [...state];
            newState.splice(action.index, 1);
            console.log(newState);
            return newState;
        default:
            return state;
    }
};


export function TaskProvider({children}){
    const [tasks, taskActions] = useReducer(TaskReducer, []);

    return (
        <TaskContext.Provider value={{tasks, taskActions}}>{children}</TaskContext.Provider>
    );
}

export default TaskContext;

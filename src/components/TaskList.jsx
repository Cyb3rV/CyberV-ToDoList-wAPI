import { useContext } from "react";
import TaskContext from "./TaskContext";
import TaskListItem from "./TaskListItem";

export default function TaskList(){
    const {tasks} = useContext(TaskContext); 

    return(
        <>
            {tasks.map((task, index) => (
                <TaskListItem key={index} task={task} index={index}/>
            )
            )}
        </>
);
}
import { useContext, useEffect, useState } from "react";
import TaskContext from "./TaskContext";
import { FaPlus } from "react-icons/fa6";
import { Form, Row, Col } from "react-bootstrap";

let prevTasksLength = "";

export default function TaskInput(){
    const {tasks, taskActions} = useContext(TaskContext);
    const [currentTask, setCurrentTask] = useState("");

    

    useEffect(() => {prevTasksLength = tasks.length} , [])

    
    useEffect(() => {
      //Empty the form every time a new task is added
      if(tasks.length === prevTasksLength + 1){
        setCurrentTask("");
        prevTasksLength = tasks.length;
      }
      //If, on the other hand an action is removed, update the value of prevTasksLength
      else if(tasks.length < prevTasksLength){
        prevTasksLength = tasks.length;
      }
    }, [tasks]);
   

    function handleAddTask(){
      taskActions({type: "add", payload: currentTask});
    }

      function handleChange(e){
        setCurrentTask(e.target.value);
      }


    return(
        <Row className="m-0 p-3 justify-content-between">
          <Col xs={10} className="p-0">
            <Form.Control value={currentTask}  onChange={handleChange} className="p-0 border-0 shadow-none bg-transparent" placeholder={tasks.length > 0 ? "" : "No tasks, add a task"}/>
          </Col>
          <Col xs={1} onClick={handleAddTask} className="p-0 d-flex justify-content-center align-items-center">
            <FaPlus />
          </Col>
        </Row>  
    );


}
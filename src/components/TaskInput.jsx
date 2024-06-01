import { useContext, useEffect, useRef, useState } from "react";
import TaskContext from "./TaskContext";
import { FaPlus } from "react-icons/fa6";
import { Form, Row, Col } from "react-bootstrap";


export default function TaskInput(){
    const {tasks, taskActions, userCreated, setUserCreated} = useContext(TaskContext);

    const taskRef = useRef();

    const handleAddTask = async (event) => {
      event.preventDefault();
      if(userCreated === true){
        try{
            await taskActions({type: "add", payload:{
                actions: taskActions,
                todo: {
                    label: taskRef.current.value,
                    is_done: false
                }
              }})
              taskRef.current.value = "";
        }
        catch(error){
            console.error(error)
        }
    }
    else{
        try {
          await taskActions({ type: "createUser", payload: setUserCreated });
          await taskActions({ type: "add", payload: { 
              actions: taskActions,
              todo: { 
                  label: taskRef.current.value, 
                  is_done: false 
              } 
          } });
          taskRef.current.value = "";
      } catch (error) {
          console.error(error);
      }
      }
      
  }


    return(
        <Row className="m-0 p-3 justify-content-between">
          <Col xs={10} className="p-0">
            <Form.Control  className="p-0 border-0 shadow-none bg-transparent" placeholder={tasks.length > 0 ? "" : "No tasks, add a task"} ref={taskRef}/>
          </Col>
          <Col xs={1} onClick={handleAddTask} className="p-0 d-flex justify-content-center align-items-center">
            <FaPlus />
          </Col>
        </Row>  
    );


}
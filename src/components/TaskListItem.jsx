import { useContext } from "react";
import TaskContext from "./TaskContext";
import { ImCross } from "react-icons/im";
import { Col, Row } from "react-bootstrap";

export default function TaskListItem({task}){
    const {tasks, taskActions} = useContext(TaskContext);
    

    function handleMouseEnter (e) {
        e.target.querySelector('.icon').classList.remove('invisible');
    }

    function handleMouseLeave(e) {
        e.target.querySelector('.icon').classList.add('invisible');
    }

    const handleRemoveTask = async (event) => {
        event.preventDefault();

      try{
          await taskActions({type: "remove", payload:{
                actions: taskActions,
                index: task.id
            }})
      }
      catch(error){
          console.error(error)
      }
    }

    return(
        <Row className="m-0 p-3 border">
            <Col xs={11} className="p-0">
                {task.label} 
            </Col>
            <Col xs={1} onClick={handleRemoveTask} className="p-0 d-flex justify-content-center align-items-center " 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
                    <ImCross className="icon invisible"/>
            </Col>
        </Row>
    );
}
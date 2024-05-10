import { useContext } from "react";
import TaskContext from "./TaskContext";
import { ImCross } from "react-icons/im";
import { Col, Row } from "react-bootstrap";

export default function TaskListItem({task, index}){
    const {taskActions} = useContext(TaskContext);
    

    function handleMouseEnter (e) {
        e.target.querySelector('.icon').classList.remove('invisible');
    }

    function handleMouseLeave(e) {
        e.target.querySelector('.icon').classList.add('invisible');
    }

    return(
        <Row className="m-0 p-3 border">
            <Col xs={11} className="p-0">
                {task} 
            </Col>
            <Col xs={1} onClick={() => taskActions({type: "remove" , index})} className="p-0 d-flex justify-content-center align-items-center " 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
                    <ImCross className="icon invisible"/>
            </Col>
        </Row>
    );
}
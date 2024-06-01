import { useContext } from "react";
import TaskContext from "@/components/TaskContext"
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

export default function TodoList() {
    const {tasks, taskActions} = useContext(TaskContext);
    const {setUserCreated} = useContext(TaskContext);

    const handleOnDeleteAll = () => {
        taskActions({type: "deleteAll",
            payload:{
                actions: taskActions,
                setUserCreated
            }
         })
    }

    return (
        <>
        <Container style={{ maxWidth: "600px" }}>
            <h1 className="text-center">TODOS with Context & Flux</h1>
            <Row>
                <Col>
                    <Button onClick={handleOnDeleteAll}>Delete All</Button>
                </Col>
            </Row>
            <Card className="p-0" bg={'light'}>
                <TaskInput/>
                <TaskList/>
            </Card>
        </Container>
        </>
    );
}
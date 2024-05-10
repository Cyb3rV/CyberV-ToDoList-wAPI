import { useContext } from "react";
import TaskContext from "@/components/TaskContext"
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";

import { Container, Card } from "react-bootstrap";

export default function TodoList() {
    const {tasks} = useContext(TaskContext);

    return (
        <>
        <Container style={{ maxWidth: "600px" }}>
            <h1 className="text-center">TODOS with Context & Flux</h1>
            <Card className="p-0" bg={'light'}>
                <TaskInput/>
                <TaskList/>
            </Card>
        </Container>
        </>
    );
}
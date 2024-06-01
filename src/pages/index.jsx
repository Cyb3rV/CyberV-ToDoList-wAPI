import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { TaskProvider } from "@/components/TaskContext"
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    
    <TaskProvider>
      <TodoList/>
    </TaskProvider>
    
  );
}

import {useReducer, createContext, useEffect, useState, useRef} from "react"; 

const TaskContext = createContext(null);


const addTask = (info) => {
  fetch('https://playground.4geeks.com/todo/todos/Cyb3rV', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(info.todo)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    LoadData(info.actions);
  })
  .catch(error => {
    console.log('Error:', error);
  });
};

const deleteTask = (info) => {
  console.log("removiendo task");
  console.log(info);
  fetch(`https://playground.4geeks.com/todo/todos/${info.index}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(response => response.json().catch(() => ({})))
  .then(data => {
    console.log(data);
    LoadData(info.actions);
  })
  .catch(error => {
    console.log('Error:', error);
  });
};

const deleteAll = (actions, setUserCreated) => {
  console.log("removiendo user");
  fetch(`https://playground.4geeks.com/todo/users/Cyb3rV`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(response => response.json().catch(() => ({})))
  .then(data => {
    console.log(data);
    actions({type: "setData", payload: []});
    setUserCreated(false);
  })
  .catch(error => {
    console.log('Error:', error);
  });
};

const CreateUser = (setUserCreated) => {
  console.log("crear usuario");
  fetch ('https://playground.4geeks.com/todo/users/Cyb3rV',{
    'method': 'POST',
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setUserCreated(true);
  })
  .catch(error => console.log('Error:', error));
  };

const LoadData = (actions) => {
  fetch('https://playground.4geeks.com/todo/users/Cyb3rV', {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    if (response.ok){
      return response.json();
    } 
    else{
        throw new Error('Failed to fetch data');
      }
    })
  .then(data => {
    console.log(data.todos);
    actions({type: "setData", payload: data.todos});
    return data.todos;
  })
  .catch(error => console.log('Error:', error));
};

const FirstLoadData = (actions, setUserCreated) => {
  fetch('https://playground.4geeks.com/todo/users/Cyb3rV', {
    headers: {
      'Content-Type': 'application/json',
  }
  })
  .then(response => {
    if (response.ok){
      
      if(setUserCreated)
        setUserCreated(true);
      
      return response.json();
    } else{
      if(response.status === 404)
        CreateUser(setUserCreated);
      else{
        throw new Error('Failed to fetch data');
      }
    }
  })
  .then(data => {
    console.log(data.todos);
    actions({type: "setData", payload: data.todos});
    return data.todos;
  })
  .catch(error => console.log('Error:', error));
};




const TaskReducer = (state, action) => {
    switch(action.type){
        case "add":
          addTask(action.payload);
          return state;
        case "remove":
          deleteTask(action.payload);
          return state;
        case "deleteAll":
          deleteAll(action.payload.actions, action.payload.setUserCreated);
          return state;
        case "getData":
          LoadData(action.payload.actions);
          return state;
        case "setData":
          console.log("sending data");
          return action.payload;
        case "createUser":
          CreateUser(action.payload);
          return state;
        case "firstGetData":
          FirstLoadData(action.payload.actions, action.payload.setUserCreated);
          return state;
        default:
            return state;
    }
};


export function TaskProvider({children}){
    const [tasks, taskActions] = useReducer(TaskReducer, []);
    const [userCreated, setUserCreated] = useState(false);


    useEffect(() => {
      taskActions({type: "firstGetData", payload: {actions: taskActions , setUserCreated}});
    },[])

    useEffect(() => {
      console.log(tasks);
    },[tasks])

    return (
      <TaskContext.Provider value={{tasks, taskActions, userCreated, setUserCreated}}>{children}</TaskContext.Provider>
  );
}




















export default TaskContext;

import {useReducer, createContext, useEffect} from "react"; 

const TaskContext = createContext(null);


const addTask = (task) => {
  console.log("crear usuario");
  fetch ('https://playground.4geeks.com/todo/todos/Cyb3rV',{
    'method': 'POST',
    'Content-Type': "application/json",
    'BODY': JSON.stringify(task)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log('Error:', error);
  });
};


const updateTodos = (task) => {
  fetch ('https://playground.4geeks.com/todo/todos/1',{
  'method': 'POST',
  'Content-Type': "application/json",
  'BODY': JSON.stringify(task)
})
.then(response => response.json())
.then(data => {
//   setTasksList(data);
  console.log(data);
})
.catch(error => {
  console.log('Error:', error);
});
};


const TaskReducer = (state, action) => {
    switch(action.type){
        case "add":
            if(action.payload.label.trim() !== ""){
                  if(!state.some(element => element.label === action.payload.label.trim())){

                    updateTodos([...state , {
                      label: action.payload.label.trim(),
                      is_done: action.payload.is_done
                  }]);
                    return [...state , {
                                          label: action.payload.label.trim(),
                                          is_done: action.payload.is_done
                                      }];
                  }
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

    useEffect(() => {
      //deleteTodos();
      getTodos();
      getData();
    },[]);

    // useEffect(() => {
    //   //updateTodos();
    // },[tasks]);


    const getData = () => {
      fetch('https://playground.4geeks.com/todo/users/Cyb3rV', {
        'Content-Type': 'application/json'
      })
      .then(response => 
         response.json()
      )
      
      .then(data => {
        console.log("get data");
        console.log(data);
      })
      
      .catch(error => {
        console.log('Error', error);
      });
    };

    const getTodos = () => {
      fetch('https://playground.4geeks.com/todo/users/Cyb3rV', {
        'Content-Type': 'application/json'
      })
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            return createUser();
          } else {
            throw new Error('Failed to fetch todos');
          }
        } else {
          return response.json();
        }
      })
      // .then(data => {
      //   data.forEach(element => {
      //     taskActions({ type: "add", payload: element });
      //   });
      // })
      .then(data => {
        console.log(data);
        if (Array.isArray(data)) { // Verificar si data es un array
          data.forEach(element => {
            taskActions({ type: "add", payload: element });
          });
        } else {
          console.log('Error: data is not an array');
        }
      })
      
      .catch(error => {
        console.log('Error', error);
      });
    };
    
  
   const createUser = () => {
    console.log("crear usuario");
    fetch ('https://playground.4geeks.com/todo/users/Cyb3rV',{
      'method': 'POST',
      'Content-Type': "application/json",
      'BODY': JSON.stringify([{            
        label: "test",
        is_done: false
      }])
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  };
















  const deleteTodos = () => {
    fetch('https://playground.4geeks.com/todo/users/Cyb3rV', {
      'method': 'DELETE',
      'Content-Type': "application/json"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Limpiar la lista después de eliminar todas las tareas
      //setTasksList([]);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  };

    return (
        <TaskContext.Provider value={{tasks, taskActions}}>{children}</TaskContext.Provider>
    );
}

export default TaskContext;

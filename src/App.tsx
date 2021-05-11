import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu, MenuBook} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string] : Array<TaskType>
}

function App() {
    //хук стейт, функция, которая берет данные, которые отрисовывает обновленный массив
    //возвращает новый массив и вызвать перерисовку интерфейса
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])


    const [tasks, setTasks] =  useState<TaskStateType>({
        [todoListID_1] : [
            {id: v1(), title:"HTML", isDone:true},
            {id: v1(), title:"CSS", isDone:true},
            {id: v1(), title:"React", isDone:false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })

    const [filter, setFilter] = useState<"all" | "active" | "completed">( "all")

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})

    }
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]:  [newTask, ...tasks[todoListID]]})
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        })
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        setTasks({...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        })
    }
    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    function changeTodoListTitle(title: string, todoListsID: string) {
        setTodoLists(todoLists.map(tl=> tl.id === todoListsID ? {...tl, title: title} : tl))
    }




    function getTasksForTodolist(todoList: TodoListType){
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
    const todoListsComponents = todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={8}
                           style={{padding: "20px"}}>
                        <TodoList
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={getTasksForTodolist(tl)} //интерпретор инструктора
                            filter={tl.filter}
                            addTask={addTask}
                            removeTodoList={removeTodoList}
                            removeTask={removeTask} //когда произойдет действие
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
    }
    )
    return (
        //JSX;
        <div>

            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu />
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoLists
                    </Typography>
                    <Button
                        color={"inherit"}
                        variant={"outlined"}
                    >Log in</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

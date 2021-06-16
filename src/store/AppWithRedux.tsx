import React, {useCallback, useReducer, useState} from 'react';
import '../App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu, MenuBook} from "@material-ui/icons";
import {
    AddTodoListsAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string] : Array<TaskType>
}

function AppWithRedux() {

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

    const dispatch = useDispatch()
    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))

    }
    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }



    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID,newIsDoneValue, todoListID))
    }, [])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTitleAC(taskID, newTitle, todoListID));
    }, [])
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(value, todoListID))
    }, [])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID));
    }, [])
    const changeTodoListTitle = useCallback((title: string, todoListsID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListsID, title));
    }, [])
    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListsAC(title);
        dispatch(action)
    },[])




    // function getTasksForTodolist(todoList: TodoListType){
    //     switch (todoList.filter) {
    //         case "active":
    //             return tasks[todoList.id].filter(t => !t.isDone)
    //         case "completed":
    //             return tasks[todoList.id].filter(t => t.isDone)
    //         default:
    //             return tasks[todoList.id]
    //     }
    // }
    const todoListsComponents = todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={8}
                           style={{padding: "20px"}}>
                        <TodoList
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]} //интерпретор инструктора
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

export default AppWithRedux;

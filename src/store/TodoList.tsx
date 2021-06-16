import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void

    removeTodoList: (todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    const {filter} = props //деструктуризация

    const getTasksForTodoList = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter((t) => !t.isDone)
            case "completed":
                return props.tasks.filter((t) => t.isDone)
            default:
                return props.tasks
        }
    }

    let newTasks = getTasksForTodoList()

    const tasksJSEXElements = newTasks.map(t => {
        const taskClasses: string = t.isDone ? "is-done" : "";
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        return (
            <li key={t.id}>
                <span className={taskClasses}>
                    <Checkbox
                        color={"primary"}
                        onChange={changeTaskStatus}
                        checked={t.isDone}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton
                    onClick={removeTask}
                    color={"secondary"}
                    style={{opacity: "0.9"}}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const onClickAllFilter = useCallback(() => props.changeFilter("all", props.todoListID),[props.changeFilter, props.todoListID]);
    const onClickActiveFilter = useCallback(() => props.changeFilter("active", props.todoListID),[props.changeFilter, props.todoListID]);
    const onClickCompletedFilter = useCallback(() => props.changeFilter("completed", props.todoListID),[props.changeFilter, props.todoListID]);
    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todoListID), [props.todoListID, props.removeTodoList])
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <IconButton
                    onClick={onClickRemoveTodoList}
                    color={"secondary"}
                    style={{opacity: "0.9"}}>
                    <Delete/>
                </IconButton >
            </h3>
            <AddItemForm addItem={addTask} />

            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {tasksJSEXElements}
            </ul>
            <div>
                <Button
                    style={{margin: "1px"}}
                    size ={"small"}
                    variant ={filter === "all" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onClickAllFilter}>All</Button>
                <Button
                    style={{margin: "1px"}}
                    size ={"small"}
                    variant ={filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onClickActiveFilter}>Active</Button>
                <Button
                    style={{margin: "1px"}}
                    size ={"small"}
                    variant ={filter === "completed" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onClickCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
})
export default TodoList;

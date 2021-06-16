import React, {ChangeEvent, useCallback} from "react";
import {CheckBox, Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskType} from "./AppWithRedux";
import EditableSpan from "../EditableSpan";
import {changeTaskStatusAC} from "./tasks-reducer";


type TaskPropsType = {
    task: TaskType
    todolistID: string
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}
export const Task = React.memo(({task, todolistID, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {
    const taskClasses: string = task.isDone ? "is-done" : "";
    const removeTaskH = useCallback(() => removeTask(task.id, todolistID),[])
    const changeTaskStatusH = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistID),[])
    const changeTaskTitleH = useCallback((title: string) => changeTaskTitle(task.id, title, todolistID),[])
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     let newIsDoneValue = e.currentTarget.checked;
    //     changeTaskStatus() }


    return (
        <li key={task.id}>
                <span className={taskClasses}>
                    <Checkbox
                        color={"primary"}
                        onChange={changeTaskStatusH}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleH}/>
                </span>
            {/*<button onClick={removeTask}>x</button>*/}
            <IconButton
                onClick={removeTaskH}
                color={"secondary"}
                style={{opacity: "0.9"}}>
                <Delete/>
            </IconButton>
        </li>
    )
        // <div className={task.isDone ? "is-done" : ""}>
        //     <Checkbox
        //         color={"primary"}
        //         onChange={onChangeHandler}
        //         checked={task.isDone}
        //     />
        //     <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
        //     <IconButton onClick={onClickHandler}>
        //         <Delete/>
        //     </IconButton>
        // </div>
})
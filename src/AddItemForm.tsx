import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    };

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(!error)
        }
        setTitle("")

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            onClickAddItem()
        }
    }


    return(
        <div>
            <TextField
                variant={"outlined"}
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                helperText={error && "Title is required!"}
                size={"small"}

            />

            <IconButton onClick={onClickAddItem} color={"primary"}>
                <AddBox/>
            </IconButton>

        </div>
    )
}

export default AddItemForm;
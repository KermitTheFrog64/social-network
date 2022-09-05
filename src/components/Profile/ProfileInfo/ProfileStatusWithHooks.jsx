import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import c from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, SetEditMode] = useState(false);
    let [status, SetStatus] = useState(props.status);

    useEffect(() => {
        SetStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        SetEditMode(true);
    }

    const deactivateEditMode = () => {
        SetEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        SetStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status || "---"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange}
                        value={status}></input>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
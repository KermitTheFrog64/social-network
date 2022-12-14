import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import c from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, SetEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile (formData).then(() => {
            SetEditMode(false);
        });
    }

    return (
        <div>
            <div className={c.descriptionBlock}>

                <img src={profile.photos.large || userPhoto} className={c.mainPhoto} />

                {isOwner && <input type={"file"} onChange={onMainPhotoSelected} /> }

                { editMode 
                ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} /> 
                : <ProfileData goToEditMode={() => {SetEditMode(true)}} isOwner={isOwner} profile={profile} /> }
                
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner &&
            <div>
                <button onClick={goToEditMode} >Edit</button>
            </div>
        }
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={c.contact} ><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;
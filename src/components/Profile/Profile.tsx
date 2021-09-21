import React from "react";
import {TableDataType} from "../../dll/getTableData";

type ProfilePropsType = {
    row?: TableDataType
}

const Profile = (props: ProfilePropsType) => {

    if(props.row) {
        return (
            <div className="profile">
                <h3>Profile info:</h3>
                <div className='profile-row'>Selected profile: {props.row.firstName} {props.row.lastName}</div>
                <div>Description: {props.row.description}</div>
                <div>Adress: {props.row.adress.streetAddress}</div>
                <div>City: {props.row.adress.city}</div>
                <div>State: {props.row.adress.state}</div>
                <div>Index: {props.row.adress.zip}</div>

            </div>
        );
    }
    else return <></>


}

export default Profile;

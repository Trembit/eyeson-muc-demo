import {TextField} from "@rmwc/textfield";
import {Button} from "@rmwc/button";
import Video from "./Video";
import React, {useContext, useState} from "react";
import axios from "./API/axios";
import {useHistory} from "react-router-dom";
import {RoomContext} from "./context";

const GuestPage = ({stream}) => {
    const history = useHistory();
    const {setContext} = useContext(RoomContext);

    const [state, setState] = useState({
        guestName: '',
    })

    const createGuest = async () => {
        const guestName = state.guestName;
        const pageUrl = window.location.href;
        const guestToken = pageUrl.split('/')[4];

        const data = {
            "name": guestName,
        }

        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        const response = await axios.post(`/guests/${guestToken}`, formBody);
        setContext(response.data);
        history.push( '/rooms/' + response.data.room.name);
    }

    function handleInputChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    return (
        <div className="preloadPage-wrapper">

            <div className='preloadPage-item preloadPage-title'>BRANDED VIDEO CONFERENCING FOR YOU</div>

            <TextField
                className="preloadPage-item"
                label="Your Name"
                style={{width: '20rem'}}
                name="guestName"
                value={state.guestName}
                onChange={handleInputChange}
                required={true}
            />

            <Button
                className="preloadPage-item"
                label='Join Room'
                outlined='true'
                style={{width: '20rem'}}
                onClick={() => createGuest()}
            />

            <Video stream={stream && stream}/>
        </div>
    );
}

export default GuestPage;

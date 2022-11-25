import {
    GET_HOUSE_REQUEST,
    GET_HOUSE_SUCCESS,
  } from "actiontypes";
  
  export const houseSelect = (data, Onlyroles) => {
    return (dispatch) => {
      if (data === "loggedOut") {
        dispatch({ type: GET_HOUSE_REQUEST })
        dispatch({ type: GET_HOUSE_SUCCESS, payload: false });
      } else {
        if(Onlyroles){
          data['roles'] = data.roles
        }
        dispatch({ type: GET_HOUSE_SUCCESS, payload: data });
      }
    };
  };
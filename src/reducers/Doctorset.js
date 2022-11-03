import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_FAIL,
  GET_PATIENT_SUCCESS,
} from "../actiontypes";

const INITIAL_STATE = {
  Doctorsetget: { p_id: null, p_pin: null, byhospital: false },
};

const Doctorset = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PATIENT_REQUEST:
      return { Doctorsetget: { p_id: null, p_pin: null, byhospital: false } };
    case GET_PATIENT_SUCCESS:
      return { Doctorsetget: { ...action.payload } };
    case GET_PATIENT_FAIL:
      return { Doctorsetget: { p_id: null, p_pin: null, byhospital: false } };
    default:
      return state;
  }
};
export default Doctorset;

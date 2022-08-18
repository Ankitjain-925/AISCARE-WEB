import { getLanguage } from 'translations/index';
import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import { getProfessionalData } from "Screens/VirtualHospital/PatientFlow/data";
import { getPatientData } from "Screens/Components/CommonApi/index";

export const handleChangeForm = (current, value) => {
    if (value === 1) {
        current.setState({ allQuestionData: {}, errorChrMsg: '', dailyForm: true, everyQuarter: false, everyWeek: false, everyDay: false, selectForm: "Daily" });
    }
    else if (value === 2) {
        current.setState({ allQuestionData: {}, errorChrMsg: '', everyDay: true, everyQuarter: false, everyWeek: false, dailyForm: false, selectForm: "Every_2_Day" });
    }
    else if (value === 3) {
        current.setState({ allQuestionData: {}, errorChrMsg: '', everyWeek: true, everyDay: false, dailyForm: false, everyQuarter: false, selectForm: "Every_2_Weeks" });
    }
    else {
        current.setState({ allQuestionData: {}, errorChrMsg: '', everyQuarter: true, everyWeek: false, dailyForm: false, everyDay: false, selectForm: "Quarter" });
    }
}

export const updateAllEntrySec = (current, e) => {
    const state = current.state.allQuestionData;
    state[e.target.name] = e.target.value;
    current.setState({ allQuestionData: state });
}

export const updateAllEntrySec2 = (current, e, name) => {
    const state = current.state.allQuestionData;
    state[name] = e;
    current.setState({ allQuestionData: state });
}

export const updateAllEntrySec1 = (current, e, name) => {
    const state = current.state.allQuestionData;
    state[e.target.name] = e.target.checked == true ? true : false;
    current.setState({ allQuestionData: state });
}

export const checkValidation2 = (current, check, item, fulldata) => {
    current.setState({ errorChrMsg: '' })
    if (item === 'full_diameter_leg') {
        if (!fulldata.full_diameter_leg) {
            current.setState({
                errorChrMsg: 'please select' + ' ' + "Diameter leg" + ' ' + 'with yes and no',
            });
            MoveTop(0);
            return false;
        } else if (fulldata && fulldata.full_diameter_leg === 'yes') {

            if (!fulldata.full_anamnesis_diameter_leg) {
                current.setState({
                    errorChrMsg: 'please enter Diameter leg',
                });
                MoveTop(0);
                return false;

            }
            else if (!fulldata.full_anamnesis_condition) {
                current.setState({
                    errorChrMsg: 'Please select better and worse for condition',
                });
                MoveTop(0);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
    if (item === 'full_Sick') {
        if (!fulldata.full_Sick) {
            current.setState({
                errorChrMsg: 'Please select' + ' ' + "Sick" + ' ' + 'with yes and no',
            });
            MoveTop(0);
            return false;
        } else if (fulldata && fulldata.full_Sick === 'yes') {

            if (!fulldata.full_anamnesis_weight) {
                current.setState({
                    errorChrMsg: 'Please enter Weight',
                });
                MoveTop(0);
                return false;

            }
            else {
                return true;
            }
        } else {
            return true;
        }
    }
}

export const checkValidation = (current, value, item) => {
    current.setState({ errorChrMsg: '' })
    let translate = getLanguage(current.props.stateLanguageType);
    let {
        please_select,
        Pain_begin,
        hurt_now,
        Quality_of_pain,
        please_enter,
        Undergoing_treatment,
        with_yes_no,
        pain_point,
        continuously_or_periodically,
        take_painkillers,
        suffer_from_vomiting,
        environmental_suffer_symtoms,
        keep_liquids_with,
        valid_body_temp,
        sputum_intensity,
        back_symptoms_begin,
        rr_systolic,
        bp_should_number,
        systolic_value_between,
        RR_diastolic,
        diastolic_in_number,
        diastolic_value_between,
        pain_intensity,
        body_temp,
        Body_temp_bet,
        diabetes,
        enter_blood_sugar,
        blood_sugar_in_number,
        blood_sugar_between,
        enter_hba1c,
        Hba1c_should_between,
        fev_cough,
        atleast_condition,
        low_value,
        top_value,
        fever_low_body_temp,
        of_body_temprature,
    } = translate;

    var bpPattern = /^[0-9]+$/;
    var Valid = bpPattern.test(value);
    if ((item === "full_rr_systolic" ||
        item === "full_rr_systolic" ||
        item === "full_rr_systolic")) {
        if (!value) {
            current.setState({
                errorChrMsg: please_enter + ' ' + rr_systolic,
            });
            MoveTop(0);
            return false;
        } else if (!Valid) {
            current.setState({
                errorChrMsg: rr_systolic + ' ' + bp_should_number,
            });
            MoveTop(0);
            return false;
        } else if (value < 120) {
            current.setState({
                errorChrMsg: systolic_value_between,
            });
            MoveTop(0);
            return false;
        } else if (value > 140) {
            current.setState({
                errorChrMsg: systolic_value_between,
            });
            MoveTop(0);
            return false;
        } else {
            return true;
        }
    }

    else if (
        (item === 'full_rr_diastolic' ||
            item === "full_rr_diastolic" ||
            item === "full_rr_diastolic")

    ) {
        if (!value) {
            current.setState({
                errorChrMsg: please_enter + ' ' + RR_diastolic,
            });
            MoveTop(0);
            return false;
        } else if (!Valid) {
            current.setState({
                errorChrMsg: diastolic_in_number,
            });
            MoveTop(0);
            return false;
        } else if (value < 80) {
            current.setState({
                errorChrMsg: diastolic_value_between,
            });
            MoveTop(0);
            return false;
        } else if (value > 90) {
            current.setState({
                errorChrMsg: diastolic_value_between,
            });
            MoveTop(0);
            return false;
        } else {
            return true;
        }
    }
    else if ((item === "full_decubitus_amount_of_wounds" ||
        item === "full_decubitus_amount_of_wounds" ||
        item === "full_decubitus_amount_of_wounds")) {
        // var currentItem = item === full_decubitus_amount_of_wounds ? "" : ""
        if (!value) {
            current.setState({ errorChrMsg: "Please Enter Amount of wounds" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_decubitus_condition" ||
        item === "full_decubitus_condition" ||
        item === "full_decubitus_condition" ||
        item === "full_thrombose_diameter_leg_condition")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select situation Better/worse" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item == "full_anamnesis_diameter_leg" || item === "full_thrombose_diameter_leg" ||
        item === "full_thrombose_diameter_leg" ||
        item === "full_thrombose_diameter_leg")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please Enter Diameter Leg" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    // else if ((item === "full_thrombose_condition")) {
    //     if (!value) {
    //         current.setState({ errorChrMsg: "Please select Better / Worse condition for Thrombose Situation" })
    //         MoveTop(0);
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }
    else if ((item === "full_thrombose_food_eaten_condition" ||
        item === "full_thrombose_food_eaten_condition" ||
        item === "full_thrombose_food_eaten")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select you eaten" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_thrombose_water_trinkung" ||
        item === "full_thrombose_water_trinkung" ||
        item === "full_thrombose_water_trinkung")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select you been trinkung" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_thrombose_toilet_situation"
        || item === "full_thrombose_toilet_situation" ||
        item === "full_thrombose_toilet_situation")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select you go to the toilet" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_thrombose_pain_status"
        || item === "full_thrombose_pain_status"
        || item === "full_thrombose_pain_status")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Pain status" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_thrombose_amout_of_wounds"
        || item === "full_thrombose_amount_of_wounds"
        || item === "full_thrombose_amount_of_wounds")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please Enter Amount of wounds" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_thrombose_situation" ||
        item === "full_thrombose_condition" ||
        item === "full_thrombose_situation" ||
        item === "full_thrombose_condition" ||
        item === "full_anamnesis_condition" ||
        item === "full_thrombose_condition")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select situation Better/worse" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_depression_good_today" ||
        item === "full_depression_good_today" ||
        item === "full_depression_good_today" ||
        item === "full_depression_risk_good_today")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Depression Risk" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_disorientation_level_patient_tell" ||
        item === "full_disorientation_level_family_member" ||
        item === "full_disorientation_level_ask_for_news" ||
        item === "full_disorientation_level_family_member" ||
        item === "full_disorientation_level_ask_for_news" ||
        item === "full_disorientation_level_family_member")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Disorientation Level" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_sanitary_situation_incident"
        || item === "full_sanitary_situation_ask_for_incident"
        || item === "full_sanitary_situation_ask_for_incidents")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Sanitary Situation" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((
        item === "full_anamnesis_weight" || item === "full_anamnesis_diameter_leg")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Anamnesis" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_anamnesis_o2_saturation")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please Enter O2 saturation" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_pneunomie_o2_sound_recording"
        || item === "full_pneunomie_o2_saturation")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please Select Pneunomie Situation" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_nutrition_situation_fruits"
        || item === "full_nutrition_situation_protein")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Nutrition Situation" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_falling_risk_incident" ||
        item === "full_falling_risk_use_of_tools" ||
        item === "full_falling_risk_ask_for_incident" ||
        item === "full_falling_risk_use_of_tools" ||
        item === "full_anamnesis_falling_up_go" ||
        item === "full_falling_risk_incident_today" ||
        item === "full_falling_risk_incident_tools")) {
        if (!value) {
            current.setState({ errorChrMsg: "Please select Falling Risk" })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_decubitus_picture_with_scale" ||
        item === "full_thrombose_picture_with_scale" ||
        item === "full_decubitus_picture_with_scale" ||
        item === "full_thrombose_picture_with_scale" ||
        item === "full_decubitus_picture_with_scale" ||
        item === "full_thrombose_picture_with_scale")) {
        var currentItem = item === "full_decubitus_picture_with_scale" ||
            item === "full_decubitus_picture_with_scale" ? "Decubitus" : "Thrombose"
        if (!value) {
            current.setState({
                errorChrMsg: "Please select" + " " + currentItem + " " + "Situation files"
            })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }

    else if ((item === "full_bartel_index_full_questionaire" ||
        item === "full_feeding" ||
        item === "full_chair_bed_transfer" ||
        item === "full_ambulation" ||
        item === "full_wheelchair_management" ||
        item === "full_stairs" ||
        item === "full_on_and_off_toilet" ||
        item === "full_bowels" ||
        item === "full_bladder")) {
        var currentItem = item === "full_bartel_index_full_questionaire" ?
            "Bartel Index"
            : item === "full_feeding"
                ? "Feeding"
                : item === "full_chair_bed_transfer"
                    ? "Chair / Bed transfer"
                    : item === "full_ambulation"
                        ? "Ambulation"
                        : item === "full_wheelchair_management"
                            ? "Wheelchair management"
                            : item === "full_stairs"
                                ? "Stairs"
                                : item === "full_on_and_off_toilet"
                                    ? "On and Off the toilet"
                                    : item === "full_bowels"
                                        ? "Bowels"
                                        : "Bladder"
        if (!value) {
            current.setState({ errorChrMsg: "Please select" + " " + currentItem })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
}

// For scroll of every error message
export const MoveTop = (top) => {
    window.scroll({
        top: top,
        behavior: 'smooth',
    });
};

export const handleSubmit = (current) => {
    const { FileAttach, allQuestionData, everyWeek, openQues, selectHouse, selectPatient } = current.state;
    if (!openQues) {
        if (selectHouse && selectHouse?.value) {
            if (selectPatient && selectPatient?.value) {
                current.setState({ openQues: true });
            } else {
                current.setState({ errorChrMsg1: "Please select" + " " + "Patient first" })
            }
        } else {
            current.setState({ errorChrMsg1: "Please select" + " " + "Doctor first" })
        }
    } else {
        var data = allQuestionData;
        if (checkValidation(current, data?.full_rr_systolic, "full_rr_systolic")) {
            if (checkValidation(current, data?.full_rr_diastolic, "full_rr_diastolic")) {
                if (checkValidation2(current, data?.full_diameter_leg, "full_diameter_leg", data)) {
                    if (checkValidation2(current, data?.full_Sick, "full_Sick", data)) {
                        if (checkValidation(current, data?.full_anamnesis_o2_saturation, "full_anamnesis_o2_saturation")) {
                            if (checkValidation(current, data?.full_decubitus_picture_with_scale, "full_decubitus_picture_with_scale")) {
                                if (checkValidation(current, data?.full_decubitus_amount_of_wounds, "full_decubitus_amount_of_wounds")) {
                                    if (checkValidation(current, data?.full_decubitus_condition, "full_decubitus_condition")) {
                                        // if (checkValidation(current,  data?.full_thrombose_diameter_leg, "full_thrombose_diameter_leg")) {
                                        //     if (checkValidation(current,  data?.full_thrombose_condition, "full_thrombose_condition")) {
                                        if (checkValidation(current, data?.full_falling_risk_incident_today, "full_falling_risk_incident_today")) {
                                            if (checkValidation(current, data?.full_falling_risk_incident_tools, "full_falling_risk_incident_tools")) {
                                                if (checkValidation(current, data?.full_thrombose_food_eaten_condition, "full_thrombose_food_eaten_condition")) {
                                                    if (checkValidation(current, data?.full_thrombose_water_trinkung, "full_thrombose_water_trinkung")) {
                                                        if (checkValidation(current, data?.full_thrombose_toilet_situation, "full_thrombose_toilet_situation")) {
                                                            if (checkValidation(current, data?.full_thrombose_pain_status, "full_thrombose_pain_status")) {
                                                                if (checkValidation(current, data?.full_thrombose_picture_with_scale, "full_thrombose_picture_with_scale")) {
                                                                    if (checkValidation(current, data?.full_thrombose_amout_of_wounds, "full_thrombose_amout_of_wounds")) {
                                                                        if (checkValidation(current, data?.full_thrombose_situation, "full_thrombose_situation")) {
                                                                            if (checkValidation(current, data?.full_depression_good_today, "full_depression_good_today")) {
                                                                                if (checkValidation(current, data?.full_disorientation_level_patient_tell, "full_disorientation_level_patient_tell")) {
                                                                                    if (checkValidation(current, data?.full_disorientation_level_family_member, "full_disorientation_level_family_member")) {
                                                                                        if (checkValidation(current, data?.full_sanitary_situation_incident, "full_sanitary_situation_incident")) {
                                                                                            if (checkValidation(current, data?.full_pneunomie_o2_sound_recording, "full_pneunomie_o2_sound_recording")) {
                                                                                                if (checkValidation(current, data?.full_nutrition_situation_fruits, "full_nutrition_situation_fruits")) {
                                                                                                    if (checkValidation(current, data?.full_nutrition_situation_protein, "full_nutrition_situation_protein")) {
                                                                                                        if (checkValidation(current, data?.full_feeding, "full_feeding")) {
                                                                                                            if (checkValidation(current, data?.full_chair_bed_transfer, "full_chair_bed_transfer")) {
                                                                                                                if (checkValidation(current, data?.full_ambulation, "full_ambulation")) {
                                                                                                                    if (checkValidation(current, data?.full_wheelchair_management, "full_wheelchair_management")) {
                                                                                                                        if (checkValidation(current, data?.full_stairs, "full_stairs")) {
                                                                                                                            if (checkValidation(current, data?.full_on_and_off_toilet, "full_on_and_off_toilet")) {
                                                                                                                                if (checkValidation(current, data?.full_bowels, "full_bowels")) {
                                                                                                                                    if (checkValidation(current, data?.full_bladder, "full_bladder")) {
                                                                                                                                        CallApi(current, data);
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    //     }
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



export const CallApi = (current, data) => {
    const { allQuestionData, allPatientData, selectHouse } = current.state;
    var nurse_id = current.props.stateLoginValueAim?.user?._id;
    var data = {
        created_by: nurse_id,
        created_on: new Date(),
        datetime_on: new Date(),
        public: "always",
        publicdatetime: null,
        type: "carequestinnary",
        visible: "show",
        questionnaire_answers: allQuestionData,
        questionary_type: 'full'
    };
    current.setState({ loaderImage: true });
    axios
        .put(
            sitedata.data.path + '/User/AddTrack/' + allPatientData[0]?.user_id,
            {
                data
            },
            commonHeader(current.props.stateLoginValueAim?.token)
        )
        .then((responce) => {
            if (responce.data.hassuccessed) {
                let track_id = responce?.data?.data?.track_id;
                var data1 = {
                    submitDate: new Date(),
                    patient_id: allPatientData[0]?.user_id,
                    case_id: allPatientData[0]?.case_id,
                    patient_info: allPatientData[0],
                    questionnaire_type: 'full',
                    nurse_info: {
                        "first_name": current.props.stateLoginValueAim?.user?.first_name,
                        "last_name": current.props.stateLoginValueAim?.user?.last_name,
                        "image": current.props.stateLoginValueAim?.user?.image,
                        "alies_id": current.props.stateLoginValueAim?.user?.alies_id,
                        "user_id": current.props.stateLoginValueAim?.user?._id
                    },
                    nurse_id: current.props.stateLoginValueAim?.user?._id,
                    house_id: selectHouse?.value,
                    questionnaire_answers: allQuestionData,
                    track_id: track_id
                };
                axios
                    .post(
                        sitedata.data.path + '/cquestionnaire/AddQuestionnaire', data1,
                        commonHeader(current.props.stateLoginValueAim?.token)
                    )
                    .then((responce) => {
                        // if (responce.data.hassuccessed) {
                        current.setState({
                            isfileuploadmulti: false,
                            fileupods: false,
                            errorChrMsg: '',
                            allQuestionData: {},
                            openQues: false,
                            errorChrMsg1: '',
                            loaderImage: false
                        });
                        // }
                        // else {
                        //     current.setState({ loaderImage: false })
                        // }
                    })
                    .catch(function (error) {
                        current.setState({ loaderImage: false })
                    });
            }
        })
        .catch(function (error) {
            current.setState({ loaderImage: false })
        });
}

export const FileAttachMulti = (current, Fileadd, name) => {
    var state = current.state.allQuestionData;
    state[name] = Fileadd;
    current.setState({
        isfileuploadmulti: true,
        fileupods: true,
        allQuestionData: state
    })
    // current.setState({
    //     valueof: name === "daily_decubitus_picture_with_scale" ||
    //         name === "day_decubitus_picture_with_scale" ||
    //         name === "week_decubitus_picture_with_scale" ? 1 : 2
    // })
};

export const allHouses = (current) => {
    current.setState({ loaderImage: true });
    let user_token = current.props.stateLoginValueAim.token;
    let user_id = current.props.stateLoginValueAim.user._id;
    axios
        .get(
            sitedata.data.path + "/UserProfile/Users/" + user_id,
            commonHeader(user_token)
        )
        .then((response) => {
            current.setState({ loaderImage: false });
            current.setState({
                currentList: response.data.data.houses,
            });
        })
        .catch((error) => {
            current.setState({ loaderImage: false });
        });
};

export const updateEntryState = (current, e) => {
    current.setState({ selectHouse: e }, () => {
        // getProfessionalData1(current);
        getPatientData1(current);
    });
}

// Get the Professional data
// export const getProfessionalData1 = async (current) => {
//     current.setState({ loaderImage: true });
//     var data = await getProfessionalData(
//         current.state.selectHouse?.value,
//         current.props.stateLoginValueAim?.token
//     );
//     if (data) {
//         current.setState({
//             loaderImage: false,
//             professionalArray: data.professionalArray,
//             professional_id_list: data.professionalList,
//             professional_id_list1: data.professionalList,
//         });
//     } else {
//         current.setState({ loaderImage: false });
//     }
// };

// Get the Patient data
export const getPatientData1 = async (current) => {
    current.setState({ loaderImage: true });
    let response = await getPatientData(
        current.props.stateLoginValueAim.token,
        current.state.selectHouse?.value,
        "taskpage"
    );
    if (response?.isdata) {
        current.setState(
            { users1: response.PatientList1, users: response.patientArray, loaderImage: false })
    } else {
        current.setState({ loaderImage: false });
    }
};

export const updateEntryState1 = (current, e) => {
    current.setState({ selectPatient: e });
    var newArray = current.state.users.filter(function (el) {
        return el?.user_id === e?.value;
    });
    current.setState({ allPatientData: newArray });
}
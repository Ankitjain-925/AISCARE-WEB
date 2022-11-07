import { getLanguage } from 'translations/index';
import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import { getPatientData } from "Screens/Components/CommonApi/index";
import _ from 'lodash';


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

export const checkValidation2 = (current, item, fulldata) => {
    let translate = getLanguage(current.props.stateLanguageType);
    let {
        please_select,
        with_yes_and_no,
        Diameter_Leg,
        please_enter_Diameter_leg,
        Please_select_better_and_worse_for_condition,
        Sick,
        Please_enter_Weight,
        Your_form_data_successfully_submitted
    } = translate;
    current.setState({ errorChrMsg: '' })
    if (item === 'full_diameter_leg') {
        if (!fulldata.full_diameter_leg) {
            current.setState({
                errorChrMsg: please_select + ' ' + Diameter_Leg + ' ' + with_yes_and_no,
            });
            MoveTop(0);
            return false;
        } else if (fulldata && fulldata.full_diameter_leg === 'yes') {

            if (!fulldata.full_anamnesis_diameter_leg) {
                current.setState({
                    errorChrMsg: please_enter_Diameter_leg,
                });
                MoveTop(0);
                return false;

            }
            else if (!fulldata.full_anamnesis_condition) {
                current.setState({
                    errorChrMsg: Please_select_better_and_worse_for_condition,
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
                errorChrMsg: please_select + ' ' + Sick + ' ' + with_yes_and_no,
            });
            MoveTop(0);
            return false;
        } else if (fulldata && fulldata.full_Sick === 'yes') {

            if (!fulldata.full_anamnesis_weight) {
                current.setState({
                    errorChrMsg: Please_enter_Weight,
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
        please_enter,
        rr_systolic,
        bp_should_number,
        systolic_value_between,
        RR_diastolic,
        diastolic_in_number,
        diastolic_value_between,
        Please_Enter_Amount_of_wounds,
        Please_select_situation_Better_worse,
        please_enter_Diameter_leg,
        Please_select_you_eaten,
        Please_select_you_been_trinkung,
        Please_select_you_go_to_the_toilet,
        Please_select_Pain_status,
        Please_select_Depression_Risk,
        Please_select_Disorientation_Level,
        Please_select_Sanitary_Situation,
        Please_select_Anamnesis,
        Please_Select_Pneunomie_Situation,
        Please_select_Nutrition_Situation,
        Please_select_Falling_Risk,
        Please_select_Files,
        Bartel_Index,
        Feeding,
        Chair_Bed_transfer,
        Ambulation,
        Wheelchair_Management,
        Stairs,
        On_and_off_Toilet,
        Bowels,
        please_select,
        Please_Enter_O2_saturation,
        Situation_files,
        Bladder

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
            current.setState({ errorChrMsg: Please_Enter_Amount_of_wounds })
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
            current.setState({ errorChrMsg: Please_select_situation_Better_worse })
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
            current.setState({ errorChrMsg: please_enter_Diameter_leg })
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
            current.setState({ errorChrMsg: Please_select_you_eaten })
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
            current.setState({ errorChrMsg: Please_select_you_been_trinkung })
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
            current.setState({ errorChrMsg: Please_select_you_go_to_the_toilet })
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
            current.setState({ errorChrMsg: Please_select_Pain_status })
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
            current.setState({ errorChrMsg: Please_Enter_Amount_of_wounds })
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
            current.setState({ errorChrMsg: Please_select_situation_Better_worse })
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
            current.setState({ errorChrMsg: Please_select_Depression_Risk })
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
            current.setState({ errorChrMsg: Please_select_Disorientation_Level })
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
            current.setState({ errorChrMsg: Please_select_Sanitary_Situation })
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
            current.setState({ errorChrMsg: Please_select_Anamnesis })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "full_anamnesis_o2_saturation")) {
        if (!value) {

            current.setState({ errorChrMsg: Please_Enter_O2_saturation })

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
            current.setState({ errorChrMsg: Please_Select_Pneunomie_Situation })
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
            current.setState({ errorChrMsg: Please_select_Nutrition_Situation })
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
            current.setState({ errorChrMsg: Please_select_Falling_Risk })
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
                errorChrMsg: please_select + " " + currentItem + " " + Situation_files
            })

            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }


    else if ((
        item === "full_feeding" ||
        item === "full_chair_bed_transfer" ||
        item === "full_ambulation" ||
        item === "full_wheelchair_management" ||
        item === "full_stairs" ||
        item === "full_on_and_off_toilet" ||
        item === "full_bowels" ||
        item === "full_bladder")) {
        var currentItem = item === "quarter_bartel_index_full_questionaire" ?
            Bartel_Index
            : item === "full_feeding"
                ? Feeding
                : item === "full_chair_bed_transfer"
                    ? Chair_Bed_transfer
                    : item === "full_ambulation"
                        ? Ambulation
                        : item === "full_wheelchair_management"
                            ? Wheelchair_Management
                            : item === "full_stairs"
                                ? Stairs
                                : item === "full_on_and_off_toilet"
                                    ? On_and_off_Toilet
                                    : item === "full_bowels"
                                        ? Bowels
                                        : Bladder
        if (!value) {
            current.setState({ errorChrMsg: please_select + " " + currentItem })
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
    current.setState({ successMsg: '' });
    let translate = getLanguage(current.props.stateLanguageType);
    let {
        please_select,
        Patient_first,
        Hospital_first
    } = translate;

    const { FileAttach, allQuestionData, everyWeek, openQues, selectHouse, selectPatient } = current.state;

    if (!openQues) {
        if (selectHouse && selectHouse?.value) {
            if (selectPatient && selectPatient?.value) {
                current.setState({ openQues: true });
                prevQuestData(current);
            } else {
                current.setState({ errorChrMsg1: please_select + " " + Patient_first })
            }
        } else {
            current.setState({ errorChrMsg1: please_select + " " + Hospital_first })
        }
    } else {
        var data = allQuestionData;
        if (checkValidation(current, data?.full_rr_systolic, "full_rr_systolic")) {
            if (checkValidation(current, data?.full_rr_diastolic, "full_rr_diastolic")) {
                // if (checkValidation2(current, data?.full_diameter_leg, "full_diameter_leg", data)) {
                if (checkValidation2(current, "full_diameter_leg", data)) {

                    if (checkValidation2(current, "full_Sick", data)) {
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
                                                                                                        if (checkValidation(current, data?.full_feeding?.value, "full_feeding")) {
                                                                                                            if (checkValidation(current, data?.full_chair_bed_transfer?.value, "full_chair_bed_transfer")) {
                                                                                                                if (checkValidation(current, data?.full_ambulation?.value, "full_ambulation")) {
                                                                                                                    if (checkValidation(current, data?.full_wheelchair_management?.value, "full_wheelchair_management")) {
                                                                                                                        if (checkValidation(current, data?.full_stairs?.value, "full_stairs")) {
                                                                                                                            if (checkValidation(current, data?.full_on_and_off_toilet?.value, "full_on_and_off_toilet")) {
                                                                                                                                if (checkValidation(current, data?.full_bowels?.value, "full_bowels")) {
                                                                                                                                    if (checkValidation(current, data?.full_bladder?.value, "full_bladder")) {
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
    let translate = getLanguage(current.props.stateLanguageType);
    let {
        Your_form_data_successfully_submitted
    } = translate;
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
                            // openQues: false,
                            errorChrMsg1: '',
                            loaderImage: false,
                            successMsg: Your_form_data_successfully_submitted
                        });
                        setTimeout(() => { current.setState({ successMsg: "" }) }, 5000)
                        MoveTop(0);
                        prevQuestData(current);
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
};

export const allHouses = (current) => {
    current.setState({
        currentList: current.props.stateLoginValueAim?.user?.houses ? current.props.stateLoginValueAim?.user?.houses : []
    })
};

export const updateEntryState = (current, e) => {
    current.setState({ selectHouse: e }, () => {
        // getProfessionalData1(current);
        getPatientData1(current);
    });
}

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

export const updateAllEntrySec0 = (current, e) => {
    const state = current.state.allQuestionData;
    state[e.name] = e.z;
    current.setState({ allQuestionData: state });
}

export const prevQuestData = (current) => {
    current.setState({ loaderImage: true });
    let user_token = current.props.stateLoginValueAim.token;
    let user_id = current.state.selectPatient?.value;
    axios
        .get(
            sitedata.data.path + "/vc/GetUserQuerstionair/" + user_id,
            commonHeader(user_token)
        )
        .then((response) => {
            current.setState({ prevData: response.data.data, loaderImage: false });
        })
        .catch((error) => {
            current.setState({ loaderImage: false });
        });
};

export const showHouseValue = (current, house_id) => {
    const house_name = _.filter(current.state.currentList, (item) => item.value === house_id).map((obj) => obj.label)
    return house_name[0];
}
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

export const updateAllEntrySec0 = (current, e) => {
    current.setState({ allQuestionData: e });
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


export const checkValidation2 = (current, hello, check, item, fulldata) => {

    let translate = getLanguage(current.props.stateLanguageType);

    let {
        please_select,
        with_yes_and_no,
        Diameter_Leg,
        please_enter_Diameter_leg,
        Please_select_better_and_worse_for_condition,
        Sick,
        Please_enter_Weight,
    } = translate;
    current.setState({ errorChrMsg: '' })
    if (item === 'daily_diameter_leg' && hello) {
        if (!check) {
            current.setState({
                errorChrMsg: please_select + ' ' + Diameter_Leg + ' ' + with_yes_and_no,
            });
            MoveTop(0);
            return false;
        } else if (fulldata && fulldata.daily_diameter_leg === 'yes') {

            if (!fulldata.daily_anamnesis_diameter_leg) {
                current.setState({
                    errorChrMsg: please_enter_Diameter_leg,
                });
                MoveTop(0);
                return false;

            }
            else if (!fulldata.daily_anamnesis_condition) {
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
    if (item === 'day_Sick' && hello) {
        if (!fulldata.day_Sick) {

            current.setState({
                errorChrMsg: please_select + ' ' + Sick + ' ' + with_yes_and_no,
            });
            MoveTop(0);
            return false;
        } else if (fulldata && fulldata.day_Sick === 'yes') {

            if (!fulldata.day_anamnesis_weight) {
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

export const checkValidation = (current, check, value, item) => {
    current.setState({ errorChrMsg: '' })
    let translate = getLanguage(current.props.stateLanguageType);
    let {
        please_select,
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
        Please_Enter_O2_saturation,
        Please_Select_Pneunomie_Situation,
        Please_select_Nutrition_Situation,
        Please_select_Falling_Risk,
        Bartel_Index,
        Please_select_Files,
        Feeding,
        Chair_Bed_transfer,
        Ambulation,
        Wheelchair_Management,
        Stairs,
        On_and_off_Toilet,
        Bowels,
        Situation_files,
        Bladder
    } = translate;

    var bpPattern = /^[0-9]+$/;
    var Valid = bpPattern.test(value);
    if ((item === "daily_rr_systolic" ||
        item === "day_rr_systolic" ||
        item === "week_rr_systolic") && check) {
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
        (item === 'daily_rr_diastolic' ||
            item === "day_rr_diastolic" ||
            item === "week_rr_diastolic") &&
        check
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
    else if ((item === "daily_decubitus_amount_of_wounds" ||
        item === "day_decubitus_amount_of_wounds" ||
        item === "week_decubitus_amount_of_wounds") &&
        check) {
        // var currentItem = item === daily_decubitus_amount_of_wounds ? "" : ""
        if (!value) {
            current.setState({ errorChrMsg: Please_Enter_Amount_of_wounds })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_decubitus_condition" ||
        item === "day_decubitus_condition" ||
        item === "week_decubitus_condition" ||
        item === "week_thrombose_diameter_leg_condition") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_situation_Better_worse })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item == "daily_anamnesis_diameter_leg" || item === "day_thrombose_diameter_leg" ||
        item === "week_thrombose_diameter_leg" ||
        item === "daily_thrombose_diameter_leg") && check) {
        if (!value) {
            current.setState({ errorChrMsg: please_enter_Diameter_leg })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    // else if ((item === "daily_thrombose_condition") && check) {
    //     if (!value) {
    //         current.setState({ errorChrMsg: "Please select Better / Worse condition for Thrombose Situation" })
    //         MoveTop(0);
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }
    else if ((item === "daily_thrombose_food_eaten_condition" ||
        item === "day_thrombose_food_eaten_condition" ||
        item === "week_thrombose_food_eaten") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_you_eaten })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_thrombose_water_trinkung" ||
        item === "day_thrombose_water_trinkung" ||
        item === "week_thrombose_water_trinkung") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_you_been_trinkung })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_thrombose_toilet_situation"
        || item === "day_thrombose_toilet_situation" ||
        item === "week_thrombose_toilet_situation") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_you_go_to_the_toilet })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_thrombose_pain_status"
        || item === "day_thrombose_pain_status"
        || item === "week_thrombose_pain_status") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_Pain_status })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_thrombose_amout_of_wounds"
        || item === "day_thrombose_amount_of_wounds"
        || item === "week_thrombose_amount_of_wounds") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_Enter_Amount_of_wounds })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_thrombose_situation" ||
        item === "day_thrombose_condition" ||
        item === "day_thrombose_situation" ||
        item === "week_thrombose_condition" ||
        item === "week_anamnesis_condition" ||
        item === "daily_thrombose_condition") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_situation_Better_worse })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_depression_good_today" ||
        item === "day_depression_good_today" ||
        item === "week_depression_good_today" ||
        item === "week_depression_risk_good_today") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_Depression_Risk })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_disorientation_level_patient_tell" ||
        item === "daily_disorientation_level_family_member" ||
        item === "day_disorientation_level_ask_for_news" ||
        item === "day_disorientation_level_family_member" ||
        item === "week_disorientation_level_ask_for_news" ||
        item === "week_disorientation_level_family_member") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_Disorientation_Level })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_sanitary_situation_incident"
        || item === "day_sanitary_situation_ask_for_incident"
        || item === "week_sanitary_situation_ask_for_incidents") && check) {
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
        item === "week_anamnesis_weight" || item === "week_anamnesis_diameter_leg") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_Anamnesis })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "day_anamnesis_o2_saturation") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_Enter_O2_saturation })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "day_pneunomie_o2_sound_recording"
        || item === "day_pneunomie_o2_saturation") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_Select_Pneunomie_Situation })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "day_nutrition_situation_fruits"
        || item === "day_nutrition_situation_protein") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_Nutrition_Situation })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "day_falling_risk_incident" ||
        item === "day_falling_risk_use_of_tools" ||
        item === "week_falling_risk_ask_for_incident" ||
        item === "week_falling_risk_use_of_tools" ||
        item === "week_anamnesis_falling_up_go" ||
        item === "daily_falling_risk_incident_today" ||
        item === "daily_falling_risk_incident_tools") && check) {
        if (!value) {
            current.setState({ errorChrMsg: Please_select_Falling_Risk })
            MoveTop(0);
            return false;
        }
        else {
            return true;
        }
    }
    else if ((item === "daily_decubitus_picture_with_scale" ||
        item === "daily_thrombose_picture_with_scale" ||
        item === "day_decubitus_picture_with_scale" ||
        item === "day_thrombose_picture_with_scale" ||
        item === "week_decubitus_picture_with_scale" ||
        item === "week_thrombose_picture_with_scale") && check) {
        var currentItem = item === "daily_decubitus_picture_with_scale" ||
            item === "day_decubitus_picture_with_scale" ||
            item === "week_decubitus_picture_with_scale" ? "Decubitus" : "Thrombose"
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

    else if ((item === "quarter_bartel_index_full_questionaire" ||
        item === "quarter_feeding" ||
        item === "quarter_chair_bed_transfer" ||
        item === "quarter_ambulation" ||
        item === "quarter_wheelchair_management" ||
        item === "quarter_stairs" ||
        item === "quarter_on_and_off_toilet" ||
        item === "quarter_bowels" ||
        item === "quarter_bladder") && check) {
        var currentItem = item === "quarter_bartel_index_full_questionaire" ?
            Bartel_Index
            : item === "quarter_feeding"
                ? Feeding
                : item === "quarter_chair_bed_transfer"
                    ? Chair_Bed_transfer
                    : item === "quarter_ambulation"
                        ? Ambulation
                        : item === "quarter_wheelchair_management"
                            ? Wheelchair_Management
                            : item === "quarter_stairs"
                                ? Stairs
                                : item === "quarter_on_and_off_toilet"
                                    ? On_and_off_Toilet
                                    : item === "quarter_bowels"
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
    const { valueof, FileAttach, allQuestionData, dailyForm, everyDay, everyWeek, everyQuarter, openQues, selectHouse, selectPatient } = current.state;
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
        if (dailyForm) {
            data.type = "daily";
            if (checkValidation(current, dailyForm, data?.daily_rr_systolic, "daily_rr_systolic")) {
                if (checkValidation(current, dailyForm, data?.daily_rr_diastolic, "daily_rr_diastolic")) {
                    if (checkValidation2(current, dailyForm, data?.daily_diameter_leg, "daily_diameter_leg", data)) {
                        if (checkValidation(current, dailyForm, data?.daily_decubitus_picture_with_scale, "daily_decubitus_picture_with_scale")) {
                            if (checkValidation(current, dailyForm, data?.daily_decubitus_amount_of_wounds, "daily_decubitus_amount_of_wounds")) {
                                if (checkValidation(current, dailyForm, data?.daily_decubitus_condition, "daily_decubitus_condition")) {
                                    // if (checkValidation(current, dailyForm, data?.daily_thrombose_diameter_leg, "daily_thrombose_diameter_leg")) {
                                    // if (checkValidation(current, dailyForm, data?.daily_thrombose_condition, "daily_thrombose_condition")) {
                                    if (checkValidation(current, dailyForm, data?.daily_falling_risk_incident_today, "daily_falling_risk_incident_today")) {
                                        if (checkValidation(current, dailyForm, data?.daily_falling_risk_incident_tools, "daily_falling_risk_incident_tools")) {
                                            if (checkValidation(current, dailyForm, data?.daily_thrombose_food_eaten_condition, "daily_thrombose_food_eaten_condition")) {
                                                if (checkValidation(current, dailyForm, data?.daily_thrombose_water_trinkung, "daily_thrombose_water_trinkung")) {
                                                    if (checkValidation(current, dailyForm, data?.daily_thrombose_toilet_situation, "daily_thrombose_toilet_situation")) {
                                                        if (checkValidation(current, dailyForm, data?.daily_thrombose_pain_status, "daily_thrombose_pain_status")) {
                                                            if (checkValidation(current, dailyForm, data?.daily_thrombose_picture_with_scale, "daily_thrombose_picture_with_scale")) {
                                                                if (checkValidation(current, dailyForm, data?.daily_thrombose_amout_of_wounds, "daily_thrombose_amout_of_wounds")) {
                                                                    if (checkValidation(current, dailyForm, data?.daily_thrombose_situation, "daily_thrombose_situation")) {
                                                                        if (checkValidation(current, dailyForm, data?.daily_depression_good_today, "daily_depression_good_today")) {
                                                                            if (checkValidation(current, dailyForm, data?.daily_disorientation_level_patient_tell, "daily_disorientation_level_patient_tell")) {
                                                                                if (checkValidation(current, dailyForm, data?.daily_disorientation_level_family_member, "daily_disorientation_level_family_member")) {
                                                                                    if (checkValidation(current, dailyForm, data?.daily_sanitary_situation_incident, "daily_sanitary_situation_incident")) {
                                                                                        CallApi(current);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                // }
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
                        }
                    }
                }
            }
        } else if (everyDay) {
            data.type = "two_days";
            if (checkValidation(current, everyDay, data?.day_rr_systolic, "day_rr_systolic")) {
                if (checkValidation(current, everyDay, data?.day_rr_diastolic, "day_rr_diastolic")) {
                    if (checkValidation2(current, everyDay, data?.day_Sick, "day_Sick", data)) {
                        if (checkValidation(current, everyDay, data?.day_anamnesis_o2_saturation, "day_anamnesis_o2_saturation")) {
                            if (checkValidation(current, everyDay, data?.day_decubitus_picture_with_scale, "day_decubitus_picture_with_scale")) {
                                if (checkValidation(current, everyDay, data?.day_decubitus_amount_of_wounds, "day_decubitus_amount_of_wounds")) {
                                    if (checkValidation(current, everyDay, data?.day_decubitus_condition, "day_decubitus_condition")) {
                                        // if (checkValidation(current, everyDay, data?.day_thrombose_diameter_leg, "day_thrombose_diameter_leg")) {
                                        // if (checkValidation(current, everyDay, data?.day_thrombose_condition, "day_thrombose_condition")) {
                                        if (checkValidation(current, everyDay, data?.day_falling_risk_incident, "day_falling_risk_incident")) {
                                            if (checkValidation(current, everyDay, data?.day_falling_risk_use_of_tools, "day_falling_risk_use_of_tools")) {
                                                if (checkValidation(current, everyDay, data?.day_thrombose_food_eaten_condition, "day_thrombose_food_eaten_condition")) {
                                                    if (checkValidation(current, everyDay, data?.day_thrombose_water_trinkung, "day_thrombose_water_trinkung")) {
                                                        if (checkValidation(current, everyDay, data?.day_thrombose_toilet_situation, "day_thrombose_toilet_situation")) {
                                                            if (checkValidation(current, everyDay, data?.day_thrombose_pain_status, "day_thrombose_pain_status")) {
                                                                if (checkValidation(current, everyDay, data?.day_thrombose_picture_with_scale, "day_thrombose_picture_with_scale")) {
                                                                    if (checkValidation(current, everyDay, data?.day_thrombose_amount_of_wounds, "day_thrombose_amount_of_wounds")) {
                                                                        if (checkValidation(current, everyDay, data?.day_thrombose_situation, "day_thrombose_situation")) {
                                                                            if (checkValidation(current, everyDay, data?.day_depression_good_today, "day_depression_good_today")) {
                                                                                if (checkValidation(current, everyDay, data?.day_disorientation_level_ask_for_news, "day_disorientation_level_ask_for_news")) {
                                                                                    if (checkValidation(current, everyDay, data?.day_disorientation_level_family_member, "day_disorientation_level_family_member")) {
                                                                                        if (checkValidation(current, everyDay, data?.day_sanitary_situation_ask_for_incident, "day_sanitary_situation_ask_for_incident")) {
                                                                                            // if (checkValidation(current, everyDay, data?.day_pneunomie_o2_saturation, "day_pneunomie_o2_saturation")) {
                                                                                            if (checkValidation(current, everyDay, data?.day_pneunomie_o2_sound_recording, "day_pneunomie_o2_sound_recording")) {
                                                                                                if (checkValidation(current, everyDay, data?.day_nutrition_situation_fruits, "day_nutrition_situation_fruits")) {
                                                                                                    if (checkValidation(current, everyDay, data?.day_nutrition_situation_protein, "day_nutrition_situation_protein")) {
                                                                                                        CallApi(current);
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
                                            // }
                                            // }
                                            // }
                                            // }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (everyWeek) {
            data.type = "two_weeks";
            if (checkValidation(current, everyWeek, data?.week_rr_systolic, "week_rr_systolic")) {
                if (checkValidation(current, everyWeek, data?.week_rr_diastolic, "week_rr_diastolic")) {
                    if (checkValidation(current, everyWeek, data?.week_anamnesis_weight, "week_anamnesis_weight")) {
                        if (checkValidation(current, everyWeek, data?.week_anamnesis_diameter_leg, "week_anamnesis_diameter_leg")) {
                            if (checkValidation(current, everyWeek, data?.week_anamnesis_condition, "week_anamnesis_condition")) {
                                if (checkValidation(current, everyWeek, data?.week_decubitus_picture_with_scale, "week_decubitus_picture_with_scale")) {
                                    if (checkValidation(current, everyWeek, data?.week_decubitus_amount_of_wounds, "week_decubitus_amount_of_wounds")) {
                                        if (checkValidation(current, everyWeek, data?.week_decubitus_condition, "week_decubitus_condition")) {
                                            // if (checkValidation(current, everyWeek, data?.week_thrombose_diameter_leg, "week_thrombose_diameter_leg")) {
                                            // if (checkValidation(current, everyWeek, data?.week_thrombose_diameter_leg_condition, "week_thrombose_diameter_leg_condition")) {
                                            if (checkValidation(current, everyWeek, data?.week_falling_risk_ask_for_incident, "week_falling_risk_ask_for_incident")) {
                                                if (checkValidation(current, everyWeek, data?.week_falling_risk_use_of_tools, "week_falling_risk_use_of_tools")) {
                                                    if (checkValidation(current, everyWeek, data?.week_thrombose_food_eaten, "week_thrombose_food_eaten")) {
                                                        if (checkValidation(current, everyWeek, data?.week_thrombose_water_trinkung, "week_thrombose_water_trinkung")) {
                                                            if (checkValidation(current, everyWeek, data?.week_thrombose_toilet_situation, "week_thrombose_toilet_situation")) {
                                                                if (checkValidation(current, everyWeek, data?.week_thrombose_pain_status, "week_thrombose_pain_status")) {
                                                                    if (checkValidation(current, everyWeek, data?.week_thrombose_picture_with_scale, "week_thrombose_picture_with_scale")) {
                                                                        if (checkValidation(current, everyWeek, data?.week_thrombose_amount_of_wounds, "week_thrombose_amount_of_wounds")) {
                                                                            if (checkValidation(current, everyWeek, data?.week_thrombose_condition, "week_thrombose_condition")) {
                                                                                // if (checkValidation(current, everyWeek, data?.week_depression_good_today, "week_depression_good_today")) {
                                                                                if (checkValidation(current, everyWeek, data?.week_disorientation_level_ask_for_news, "week_disorientation_level_ask_for_news")) {
                                                                                    if (checkValidation(current, everyWeek, data?.week_disorientation_level_family_member, "week_disorientation_level_family_member")) {
                                                                                        if (checkValidation(current, everyWeek, data?.week_sanitary_situation_ask_for_incidents, "week_sanitary_situation_ask_for_incidents")) {
                                                                                            if (checkValidation(current, everyWeek, data?.week_anamnesis_falling_up_go, "week_anamnesis_falling_up_go")) {
                                                                                                if (checkValidation(current, everyWeek, data?.week_depression_risk_good_today, "week_depression_risk_good_today")) {
                                                                                                    CallApi(current);
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
                                                        // }
                                                        // }
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
                }
            }


        } else {
            data.type = "quarter"
            // if (checkValidation(current, everyQuarter, data?.quarter_bartel_index_full_questionaire, "quarter_bartel_index_full_questionaire")) {
            if (checkValidation(current, everyQuarter, data?.quarter_feeding, "quarter_feeding")) {
                if (checkValidation(current, everyQuarter, data?.quarter_chair_bed_transfer, "quarter_chair_bed_transfer")) {
                    if (checkValidation(current, everyQuarter, data?.quarter_ambulation, "quarter_ambulation")) {
                        if (checkValidation(current, everyQuarter, data?.quarter_wheelchair_management, "quarter_wheelchair_management")) {
                            if (checkValidation(current, everyQuarter, data?.quarter_stairs, "quarter_stairs")) {
                                if (checkValidation(current, everyQuarter, data?.quarter_on_and_off_toilet, "quarter_on_and_off_toilet")) {
                                    if (checkValidation(current, everyQuarter, data?.quarter_bowels, "quarter_bowels")) {
                                        if (checkValidation(current, everyQuarter, data?.quarter_bladder, "quarter_bladder")) {
                                            CallApi(current);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // }
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
        questionary_type: allQuestionData?.type
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
                    questionnaire_type: allQuestionData?.type,
                    nurse_info: {
                        "first_name": current.props.stateLoginValueAim?.user?.first_name,
                        "last_name": current.props.stateLoginValueAim?.user?.last_name,
                        "image": current.props.stateLoginValueAim?.user?.image,
                        "alies_id": current.props.stateLoginValueAim?.user?.alies_id,
                        "user_id": current.props.stateLoginValueAim?.user?._id
                    },
                    nurse_id: current.props.stateLoginValueAim?.user?._id,
                    house_id: selectHouse?.value,
                    questionnaire_type: allQuestionData?.type,
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
                        current.setState({ loaderImage: false, allQuestionData: {}, successMsg: Your_form_data_successfully_submitted });
                        setTimeout(() => { current.setState({ successMsg: "" }) }, 5000)
                        MoveTop(0);
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
            console.log("response", response)
            current.setState({ prevData: response.data.data, loaderImage: false });
        })
        .catch((error) => {
            current.setState({ loaderImage: false });
        });
};

export const openFullQues = (current, data) => {
    current.setState({ openModal: true, ModalData: data });
}

export const closeFullQues = (current) => {
    current.setState({ openModal: false });
}
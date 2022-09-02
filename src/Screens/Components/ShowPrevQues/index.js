import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { pure } from "recompose";
import { Settings } from 'Screens/Login/setting';
import Modal from '@material-ui/core/Modal';
import FileViews from "../../Components/TimelineComponent/FileViews/index";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { getDate } from 'Screens/Components/BasicMethod';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item || {},
            openModal: this.props.openModal,
            settings: this.props.settings,
            comesFrom: this.props.comesFrom
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.comesFrom !== this.props.comesFrom) {
            this.setState({ comesFrom: this.props.comesFrom });
        }
        if (prevProps.item !== this.props.item) {
            this.setState({ item: this.props.item });
        }
        if (prevProps.openModal !== this.props.openModal) {
            this.setState({ openModal: this.props.openModal });
        }
        if (prevProps.settings !== this.props.settings) {
            this.setState({ settings: this.props.settings });
        }
    };

    capitalizeFirstLetter = (string) => {
        return string && string.charAt(0).toUpperCase() + string.slice(1);
    }

    closeFullQues = () => {
        this.props.closeFullQues();
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            o2_Saturation,
            Report_Date,
            Type_Report,
            Feeding,
            Anamnesis,
            blood_pressure,
            Systolic,
            Diastolic,
            Measure_diameter_Leg,
            Picture_with_Scale,
            Decubitus_Situation,
            Amount_of_wounds,
            Worse,
            Better,
            Thrombose_Situation,
            Wound_doc,
            Falling_Risk,
            ask_for_incidents,
            Fall_today,
            Use_of_tools,
            Diameter_Leg,
            use_yours_tools,
            Sick,
            Weight,
            Ask_for_Food,
            Yes,
            No,
            Water,
            Patient_tell_news_Days,
            Patient_remebmer_Family_Memer,
            Name_of_Family_Members,
            Sanitary_Situation,
            No_Incidents_Sanitary_Situation,
            Pneunomie_Situation,
            SoundRecording_Techdevelopment,
            Nutrition_Situation,
            Fruits,
            Second_Day,
            Condition,
            Bladder,
            Have_you_eaten_Fruits,
            Bowels,
            Have_you_eaten,
            On_and_off_Toilet,
            Stairs,
            Wheelchair_Management,
            Chair_Bed_Transfers,
            Ambulation,
            Have_you_eaten_Meat,
            Pain_Status,
            Depression_Risk,
            what_was_today,
            Patient_tell_Good_Day,
            Disorientation_Level,
            ask_for_News_Day,
            Protein,
            Have_you_been_trinkung,
            Toilet_situation,
            Could_you_go_Toilet,
            timed_up_and_go,
            Details,
            Month_If_not_acute_daily,
            Could_the_Patient_tell_day
        } = translate;
        var item = this.state.item;
        const selectoption = [
            {
                label: "Feeding",
                result: item?.questionnaire_answers?.quarter_feeding || item?.questionnaire_answers?.full_feeding,
                value: [
                    "dependent in all aspects and needs to be fed",
                    "can manipulate an eating device, usually a spoon, but someone must provide active assistance during the meal",
                    "able to feed self with supervision. Assistance is required with associated tasks such as putting milk/sugar into tea, salt, pepper,spreading butter, turning a plate or other “set up” activities",
                    "independence in feeding with prepared tray, except may need meat cut, milk carton opened or jar lid etc. The presence of another person is not required",
                    "The patient can feed self from a tray or table when someone puts the food within reach. The patient must put on an assistive device if needed, cut food, and if desired use salt and pepper, spread butter, etc..",
                ],
            },
            {
                label: "Chair/Bed Transfers",
                result:
                    item?.questionnaire_answers?.quarter_chair_bed_transfer || item?.questionnaire_answers?.full_chair_bed_transfer,
                value: [
                    "Unable to participate in a transfer. Two attendants are required to transfer the patient with or without a mechanical device.",
                    "Able to participate but maximum assistance of one other person is require in all aspects of the transfer.",
                    "The presence of another person is required either as a confidence measure, to provide supervision for safety.",
                    "The patient can safety approach the bed walking or in a wheelchair, look breaks, lift footrest, or position walking aid, move safely to bed, lie down, come to a sitting position on the side of the bed, chnage the position of the wheelchair, transfer back into it safely.",
                    "The patient must be independent in all phases of this activity.",
                ],
            },
            {
                label: "Ambulation",
                result: item?.questionnaire_answers?.quarter_ambulation || item?.questionnaire_answers?.full_ambulation,
                value: [
                    "Dependent in ambulation.",
                    "Constant presence of one or more assistant is required during ambulation.",
                    "Assistance is required with reaching aids and/ or their manipulation. One person is required to offer assistance.",
                    "The patient is independent in ambulation but unable to walk 50 metres/yards without help, or supervision in needed for confidence or safety in hazardous situations.",
                    "The patient must be able to wear braces if required, lock and unlock these braces assume standing position, sit down and place the necessary aids into position for use. The patient must be able to crutches, canes, or a walkarette, and walk 50 meters/yards without help or Supervision.",
                ],
            },
            {
                label:
                    "Wheelchair Management(*Only use this item if the patient is rated “0” for ambulation, and then only if the patient has been trained in w/c management.)",
                result:
                    item?.questionnaire_answers?.quarter_wheelchair_management || item?.questionnaire_answers?.full_wheelchair_management,
                value: [
                    "Dependent in wheelchair ambulation.",
                    "Patient can propel self short distance on flat surface, but assistance is required for all other steps of wheelchair management",
                    "Presence of one person is necessary and constant assistance is required to manipulate chair to table, bed, etc.",
                    "The patient can propel self for a reasonable duration over regularly encountered terrain. Minimal assistance may still be required in “tight corners” or to negotiate a kerb 100mm high.",
                    "To propel wheelchair independently, the patient must be able to go around corners, turn around, manoeuvre the chair to a table, bed, toilet, etc. The patient must be able to push a chair at least 50 meters and negotiate a kerb.",
                ],
            },
            {
                label: "Stairs",
                result: item?.questionnaire_answers?.quarter_stairs || item?.questionnaire_answers?.full_stairs,
                value: [
                    "The patient is unable to climb stairs.",
                    "Assistance is required in all aspects of stairclimbing, including assistance with walking aids.",
                    "The patient is able to ascend/desend but is unable to carry walking aids and needs supervision and assistance.The patient is able to ascend/desend but is unable to carry walking aids and needs supervision and assistance.",
                    "Generally no assistance is required. At times supervision is required for safety due to morning stiffness, shortness of breath, etc.",
                    "The patient is able to go up and down a flight of stairs safety without help or supervision. The patient is able to use hand rails, cane or Crutches when needed and is able to carry these devices as he/she ascends or descends.",
                ],
            },
            {
                label: "On and Off the Toilet",
                result: item?.questionnaire_answers?.quarter_on_and_off_toilet || item?.questionnaire_answers?.full_on_and_off_toilet,
                value: [
                    "Fully dependent in toileting.",
                    "Assistance required in all aspects of toileting.",
                    "Assistance may be required with management of clothing, transferring, or washing hands.",
                    "Supervision may be required for safety with normal toilet. A commode may be used at night but assistance is required for emptying and cleaning.",
                    "The patient is able to get on/off the toilet, fasten clothing and use toilet paper without help. If necessary, the patient may use a bed pan or Commode or urinal at night, but must be able to empty it and clean it.",
                ],
            },
            {
                label: "Bowels",
                result: item?.questionnaire_answers?.quarter_bowels || item?.questionnaire_answers?.full_bowels,
                value: [
                    "The patient is bowel incontient.",
                    "The patient needs help to assume appropriate position, and with bowel movement facilitatory techniques.",
                    "The patient can assume appropriate position, but can not use facilitatory techniques or clean self without assistance and has frequent accident. Assistance is required with incontinence aids such as pad, etc.",
                    "The patient may require supervision with the use of suppository or enema and has occasional accident.",
                    "The patient can control bowels and has no accidents, can use suppository, or take an enema when necessary.",
                ],
            },
            {
                label: "Bladder",
                result: item?.questionnaire_answers?.quarter_bladder || item?.questionnaire_answers?.full_bladder,
                value: [
                    "The patient is dependent in bladder management, is incontinent, or has indwelling catheter.",
                    "The patient is incontinent but is able to assist with the application of an internal or external device.",
                    "The patient is generally dry by day, but not at night and needs some assistance with the devices.",
                    "The patient is generally dry by day and night, but may have an occasional accident or need minimal assistance with internal or external devices.",
                    "The patient is able to control bladder day and night, and/or is independent with internal or external devices.",
                ],
            },
        ]

        return (
            <Grid>
                {/* Model setup */}
                <Modal
                    open={this.state.openModal}
                    onClose={() => this.closeFullQues()}
                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === 'dark'
                            ? 'darkTheme'
                            : ''
                    }
                >
                    <Grid className="creatTaskModel3 creatTaskModel11">
                        <Grid className="creatTaskCntnt">
                            <Grid>
                                <Grid container direction="row" justify="center" className="addSpeclLbl">
                                    <Grid item xs={8} md={8} lg={8}>
                                        <label>{Details}</label>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <Grid>
                                            <Grid className="entryCloseBtn">
                                                <a onClick={() => this.closeFullQues()}>
                                                    <img
                                                        src={require("assets/images/close-search.svg")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="setDetail-eval"
                                >
                                    <Grid item xs={12} md={12} className="taskDescp">
                                        <Grid className="stndQues stndQues1 allQuestionShow">
                                            {item && (item?.questionnaire_type === "quarter" || item?.questionary_type === "quarter") && (
                                                <Grid className=" selectOptionCmn">
                                                    {this.state.comesFrom === "PatientEnd" &&
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss MainclassQues1">
                                                                    <h1>{Type_Report}</h1>

                                                                    <label>
                                                                        {item.questionary_type === "daily" || item.questionnaire_type === "daily" ?
                                                                            "Daily" : item.questionary_type === "two_days" || item.questionnaire_type === "two_days" ?
                                                                                "Two Days" : item.questionary_type === "two_weeks" || item.questionnaire_type === "two_weeks"?
                                                                                    "Two weeks" : item.questionary_type === "quarter" || item.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}
                                                                    </label>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss MainclassQues1">
                                                                    <h1>{Report_Date}</h1>
                                                                    <label>{getDate(item.created_on ? item.created_on:item.submitDate, this.state.date_format)}</label>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    <Grid className="allQuestionShow1">
                                                        {selectoption.map((item) => (
                                                            <FormControl className="selectOption">
                                                                <FormLabel id="main-topic-counted" className="mainQueLab">
                                                                    {item.label}
                                                                </FormLabel>
                                                                {item.value?.map((option, index) => {
                                                                    const compareResult = parseInt(item && item?.result && item?.result?.value &&
                                                                        item?.result?.value.split('_v').pop())
                                                                    return (
                                                                        <Grid className={compareResult === index + 1 &&('selectdcolchange')}>

                                                                        <RadioGroup
                                                                            aria-labelledby="main-topic-counted"
                                                                            name="quarter_feeding"
                                                                        >
                                                                            <FormControlLabel
                                                                                control={<Radio />}
                                                                                label={this.capitalizeFirstLetter(option)}
                                                                                checked={
                                                                                    compareResult === index + 1 ? (
                                                                                        <Radio />
                                                                                    ) : null
                                                                                }
                                                                            />
                                                                          
                                                                        </RadioGroup>
                                                                        </Grid>
                                                                    );
                                                                })}
                                                                
                                                            </FormControl>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {item && (item?.questionnaire_type === "two_weeks" || item?.questionary_type === "two_weeks") && (
                                                <Grid className="MainclassQues MainclassQues1">
                                                    {this.state.comesFrom === "PatientEnd" &&
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Type_Report}</h1>
                                                                    <label>
                                                                    {item.questionary_type === "daily" || item.questionnaire_type === "daily" ?
                                                                            "Daily" : item.questionary_type === "two_days" || item.questionnaire_type === "two_days" ?
                                                                                "Two Days" : item.questionary_type === "two_weeks" || item.questionnaire_type === "two_weeks"?
                                                                                    "Two weeks" : item.questionary_type === "quarter" || item.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}
                                                                    </label>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Report_Date}</h1>
                                                                    <label>{getDate(item.created_on ? item.created_on:item.submitDate, this.state.date_format)}</label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    <Grid>
                                                        <h1>{Anamnesis}</h1>
                                                        <h3>{blood_pressure}</h3>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={3} md={3}>
                                                                <label>{Systolic}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_rr_systolic}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={3} md={3}>
                                                                <label>{Diastolic}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_rr_diastolic}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={3} md={3}>
                                                                <label>{Weight}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_anamnesis_weight}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={3} md={3}>
                                                                <label>{Measure_diameter_Leg}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_anamnesis_diameter_leg}
                                                                </p>
                                                            </Grid>
                                                        </Grid>


                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Decubitus_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.week_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.week_decubitus_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Thrombose_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>{Measure_diameter_Leg}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_thrombose_diameter_leg}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.week_thrombose_diameter_leg_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Falling_Risk}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>{ask_for_incidents}</label>
                                                                {item?.questionnaire_answers?.week_falling_risk_ask_for_incident && <p>{Fall_today}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>{Use_of_tools}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_falling_risk_use_of_tools && <p>{use_yours_tools}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Nutrition_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Ask_for_Food}</h3>
                                                                <label>{Have_you_eaten}</label>
                                                                {item?.questionnaire_answers?.week_thrombose_food_eaten === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Water}</h3>
                                                                <label>{Have_you_been_trinkung}</label>
                                                                {item?.questionnaire_answers?.week_thrombose_water_trinkung === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Toilet_situation}</h3>
                                                                <label>{Could_you_go_Toilet}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_thrombose_toilet_situation === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>{Pain_Status}</label>
                                                        <p>{item?.questionnaire_answers?.week_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Wound_doc}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.week_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_thrombose_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.week_thrombose_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Depression_Risk}</h1>
                                                        <label>{what_was_today}</label>
                                                        {item?.questionnaire_answers?.week_decubitus_conditionweek_depression_good_today === 'month If not acute daily' ?
                                                            <p>{Month_If_not_acute_daily}</p> : <p>{Could_the_Patient_tell_day}</p>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Disorientation_Level}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{ask_for_News_Day}</h3>
                                                                <label>{Patient_tell_news_Days}</label>
                                                                {item?.questionnaire_answers?.week_disorientation_level_ask_for_news ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Name_of_Family_Members}</h3>
                                                                <label>{Patient_remebmer_Family_Memer}</label>
                                                                {item?.questionnaire_answers?.week_disorientation_level_family_member ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Sanitary_Situation}</h1>
                                                        <h3>{ask_for_incidents}</h3>
                                                        <label>{No_Incidents_Sanitary_Situation}</label>
                                                        {item?.questionnaire_answers?.week_sanitary_situation_ask_for_incidents ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Falling_Risk}</h1>
                                                        <label>{timed_up_and_go} (2 Weeks)</label>
                                                        {item?.questionnaire_answers?.week_anamnesis_falling_up_go === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Depression_Risk}</h1>
                                                        <h3>{what_was_today} (every 2 Weeks  If not acute daily)</h3>
                                                        <label>{Patient_tell_Good_Day}</label>
                                                        {item?.questionnaire_answers?.week_depression_risk_good_today ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>
                                                </Grid>

                                            )}
                                            {item && (item?.questionnaire_type === "two_days" || item?.questionary_type === "two_days") && (
                                                <Grid className="MainclassQues MainclassQues1">
                                                    {this.state.comesFrom === "PatientEnd" &&
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Type_Report}</h1>
                                                                    <label>
                                                                    {item.questionary_type === "daily" || item.questionnaire_type === "daily" ?
                                                                            "Daily" : item.questionary_type === "two_days" || item.questionnaire_type === "two_days" ?
                                                                                "Two Days" : item.questionary_type === "two_weeks" || item.questionnaire_type === "two_weeks"?
                                                                                    "Two weeks" : item.questionary_type === "quarter" || item.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}
                                                                    </label>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Report_Date}</h1>
                                                                    <label>{getDate(item.created_on ? item.created_on:item.submitDate, this.state.date_format)}</label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    <Grid>
                                                        <h1>{Anamnesis}</h1>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{blood_pressure}</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Systolic}</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.day_rr_systolic}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Diastolic}</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.day_rr_diastolic}
                                                                        </p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {item && item?.questionnaire_answers?.day_Sick === 'yes' &&
                                                                <Grid xs={6} md={6}>
                                                                    <h3>{Sick}</h3>
                                                                    <Grid container xs={12} md={12}>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>{Weight}</label>
                                                                            <p>
                                                                                {item?.questionnaire_answers?.day_anamnesis_weight}
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>{o2_Saturation}</label>
                                                                            <p>
                                                                                {item?.questionnaire_answers?.day_anamnesis_o2_saturation}
                                                                            </p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Decubitus_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.day_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.day_decubitus_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Falling_Risk}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>{ask_for_incidents}</label>
                                                                {item?.questionnaire_answers?.day_falling_risk_incident && <p>{Fall_today}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>{Use_of_tools}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_falling_risk_use_of_tools && <p>{use_yours_tools}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Nutrition_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Ask_for_Food}</h3>
                                                                <label>{Have_you_eaten}</label>
                                                                {item?.questionnaire_answers?.day_thrombose_food_eaten_condition === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Water}</h3>
                                                                <label>{Have_you_been_trinkung}</label>
                                                                {item?.questionnaire_answers?.day_thrombose_water_trinkung === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Toilet_situation}</h3>
                                                                <label>{Could_you_go_Toilet}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_thrombose_toilet_situation === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>{Pain_Status}</label>
                                                        <p>{item?.questionnaire_answers?.day_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Wound_doc}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.day_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_thrombose_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.day_thrombose_situation === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Depression_Risk}</h1>
                                                        <h3>{what_was_today} (every 2 Weeks  If not acute daily)</h3>
                                                        <label>{Patient_tell_Good_Day}</label>
                                                        {item?.questionnaire_answers?.day_depression_good_today ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Disorientation_Level}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{ask_for_News_Day}</h3>
                                                                <label>{Patient_tell_news_Days}</label>
                                                                {item?.questionnaire_answers?.day_disorientation_level_ask_for_news ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Name_of_Family_Members}</h3>
                                                                <label>{Patient_remebmer_Family_Memer}</label>
                                                                {item?.questionnaire_answers?.day_disorientation_level_family_member ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Sanitary_Situation}</h1>
                                                        <h3>{ask_for_incidents}</h3>
                                                        <label>{No_Incidents_Sanitary_Situation}</label>
                                                        {item?.questionnaire_answers?.day_sanitary_situation_ask_for_incident ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Pneunomie_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{o2_Saturation}</h3>
                                                                <label>{Second_Day}</label>
                                                                {item?.questionnaire_answers?.day_pneunomie_o2_saturation ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{SoundRecording_Techdevelopment}</h3>
                                                                <label>{Second_Day}</label>
                                                                {item?.questionnaire_answers?.day_pneunomie_o2_sound_recording ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Nutrition_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Fruits}</h3>
                                                                <label>{Have_you_eaten_Fruits}</label>
                                                                {item?.questionnaire_answers?.day_nutrition_situation_fruits ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Protein}</h3>
                                                                <label>{Have_you_eaten_Meat}</label>
                                                                {item?.questionnaire_answers?.day_nutrition_situation_protein ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>



                                            )}
                                            {item && (item?.questionnaire_type === "daily" || item?.questionary_type === "daily") && (
                                                <Grid className="MainclassQues MainclassQues1">
                                                    {this.state.comesFrom === "PatientEnd" &&
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Type_Report}</h1>
                                                                    <label>
                                                                    {item.questionary_type === "daily" || item.questionnaire_type === "daily" ?
                                                                            "Daily" : item.questionary_type === "two_days" || item.questionnaire_type === "two_days" ?
                                                                                "Two Days" : item.questionary_type === "two_weeks" || item.questionnaire_type === "two_weeks"?
                                                                                    "Two weeks" : item.questionary_type === "quarter" || item.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}
                                                                    </label>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Report_Date}</h1>
                                                                    <label>{getDate(item.created_on ? item.created_on:item.submitDate, this.state.date_format)}</label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    <Grid>
                                                        <h1>{Anamnesis}</h1>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{blood_pressure}</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Systolic}</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.daily_rr_systolic}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Diastolic}</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.daily_rr_diastolic}
                                                                        </p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {item && item?.questionnaire_answers?.daily_diameter_leg === 'yes' &&
                                                                <Grid xs={6} md={6}>
                                                                    <h3>{Diameter_Leg}</h3>
                                                                    <Grid container xs={12} md={12}>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>{Measure_diameter_Leg}</label>
                                                                            <p>
                                                                                {item?.questionnaire_answers?.daily_anamnesis_diameter_leg}
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>{Condition}</label>
                                                                            <p>
                                                                                {item?.questionnaire_answers?.daily_anamnesis_condition}
                                                                            </p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Decubitus_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.daily_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.daily_decubitus_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Falling_Risk}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>{ask_for_incidents}</label>
                                                                {item?.questionnaire_answers?.daily_falling_risk_incident_today && <p>{Fall_today}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>{Use_of_tools}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_falling_risk_incident_today && <p>{use_yours_tools}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Nutrition_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Ask_for_Food}</h3>
                                                                <label>{Have_you_eaten}</label>
                                                                {item?.questionnaire_answers?.daily_thrombose_food_eaten_condition === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Water}</h3>
                                                                <label>{Have_you_been_trinkung}</label>
                                                                {item?.questionnaire_answers?.daily_thrombose_water_trinkung === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Toilet_situation}</h3>
                                                                <label>{Could_you_go_Toilet}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_thrombose_toilet_situation === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>{Pain_Status}</label>
                                                        <p>{item?.questionnaire_answers?.daily_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Wound_doc}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.daily_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_thrombose_amout_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.daily_thrombose_situation === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Depression_Risk}</h1>
                                                        <h3>{what_was_today} (every 2 Weeks  If not acute daily)</h3>
                                                        <label>{Patient_tell_Good_Day}</label>
                                                        {item?.questionnaire_answers?.daily_depression_good_today ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Disorientation_Level}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{ask_for_News_Day}</h3>
                                                                <label>{Patient_tell_news_Days}</label>
                                                                {item?.questionnaire_answers?.daily_disorientation_level_patient_tell ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Name_of_Family_Members}</h3>
                                                                <label>{Patient_remebmer_Family_Memer}</label>
                                                                {item?.questionnaire_answers?.daily_disorientation_level_family_member ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Sanitary_Situation}</h1>
                                                        <h3>{ask_for_incidents}</h3>
                                                        <label>{No_Incidents_Sanitary_Situation}</label>
                                                        {item?.questionnaire_answers?.daily_sanitary_situation_incident ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {item && (item?.questionnaire_type === "full" || item?.questionary_type === "full") && (
                                                <Grid className="MainclassQues MainclassQues1">
                                                    {this.state.comesFrom === "PatientEnd" &&
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Type_Report}</h1>
                                                                    <label>
                                                                    {item.questionary_type === "daily" || item.questionnaire_type === "daily" ?
                                                                            "Daily" : item.questionary_type === "two_days" || item.questionnaire_type === "two_days" ?
                                                                                "Two Days" : item.questionary_type === "two_weeks" || item.questionnaire_type === "two_weeks"?
                                                                                    "Two weeks" : item.questionary_type === "quarter" || item.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}
                                                                    </label>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="RportCss">
                                                                    <h1>{Report_Date}</h1>
                                                                    <label>{getDate(item.created_on ? item.created_on:item.submitDate, this.state.date_format)}</label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    <Grid>
                                                        <h1>{Anamnesis}</h1>
                                                        <Grid container xs={12} md={12}>
                                                            <h3>{blood_pressure}</h3>
                                                            <Grid container xs={12} md={12}>
                                                                <Grid xs={6} md={6}>
                                                                    <label>{Systolic}</label>
                                                                    <p>
                                                                        {item?.questionnaire_answers?.full_rr_systolic}
                                                                    </p>
                                                                </Grid>
                                                                <Grid xs={6} md={6}>
                                                                    <label>{Diastolic}</label>
                                                                    <p>
                                                                        {item?.questionnaire_answers?.full_rr_diastolic}
                                                                    </p>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        {item && item?.questionnaire_answers?.full_diameter_leg === 'yes' &&
                                                            <Grid container xs={12} md={12}>
                                                                <h3>{Diameter_Leg}</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Measure_diameter_Leg}</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.full_anamnesis_diameter_leg}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Condition}</label>
                                                                        {item?.questionnaire_answers?.full_anamnesis_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>}

                                                        {item && item?.questionnaire_answers?.full_Sick === 'yes' &&
                                                            <Grid container xs={12} md={12}>
                                                                <h3>{Sick}</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{Weight}</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.full_anamnesis_weight}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>{o2_Saturation}</label>
                                                                        <p>{item?.questionnaire_answers?.full_anamnesis_o2_saturation}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Decubitus_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.full_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.full_decubitus_condition === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Falling_Risk}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>{ask_for_incidents}</label>
                                                                {item?.questionnaire_answers?.full_falling_risk_incident_today && <p>{Fall_today}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>{Use_of_tools}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_falling_risk_incident_tools && <p>{use_yours_tools}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Nutrition_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Ask_for_Food}</h3>
                                                                <label>{Have_you_eaten}</label>
                                                                {item?.questionnaire_answers?.full_thrombose_food_eaten_condition === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Water}</h3>
                                                                <label>{Have_you_been_trinkung}</label>
                                                                {item?.questionnaire_answers?.full_thrombose_water_trinkung === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>{Toilet_situation}</h3>
                                                                <label>{Could_you_go_Toilet}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_thrombose_toilet_situation === 'yes' ? <p>{Yes}</p> : <p>{No}</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>{Pain_Status}</label>
                                                        <p>{item?.questionnaire_answers?.full_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Wound_doc}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>{Picture_with_Scale}</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.full_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Amount_of_wounds}</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_thrombose_amout_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>{Condition}</label>
                                                                {item?.questionnaire_answers?.full_thrombose_situation === "better" ? <p>{Better}</p> : <p>{Worse}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Depression_Risk}</h1>
                                                        <h3>{what_was_today}(every 2 Weeks  If not acute daily)</h3>
                                                        <label>{Patient_tell_Good_Day}</label>
                                                        {item?.questionnaire_answers?.full_depression_good_today ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Disorientation_Level}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{ask_for_News_Day}</h3>
                                                                <label>{Patient_tell_news_Days}</label>
                                                                {item?.questionnaire_answers?.full_disorientation_level_patient_tell ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Name_of_Family_Members}</h3>
                                                                <label>{Patient_remebmer_Family_Memer}</label>
                                                                {item?.questionnaire_answers?.full_disorientation_level_family_member ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>{Sanitary_Situation}</h1>
                                                        <h3>{ask_for_incidents}</h3>
                                                        <label>{No_Incidents_Sanitary_Situation}</label>
                                                        {item?.questionnaire_answers?.full_sanitary_situation_incident ? <p>{Yes}</p> : <p>{No}</p>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Pneunomie_Situation}</h1>
                                                        </Grid>
                                                        <Grid>
                                                            <label>{SoundRecording_Techdevelopment}</label>
                                                            {item?.questionnaire_answers?.full_pneunomie_o2_sound_recording ? <p>{Yes}</p> : <p>{No}</p>}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>{Nutrition_Situation}</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Fruits}</h3>
                                                                <label>{Have_you_eaten_Fruits}</label>
                                                                {item?.questionnaire_answers?.full_nutrition_situation_fruits ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>{Protein}</h3>
                                                                <label>{Have_you_eaten_Meat}</label>
                                                                {item?.questionnaire_answers?.full_nutrition_situation_protein ? <p>{Yes}</p> : <p>{No}</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    {/* <Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Feeding}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_feeding?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Chair_Bed_Transfers}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_chair_bed_transfer?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Ambulation}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_ambulation?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Wheelchair_Management}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_wheelchair_management?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Stairs}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_stairs?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{On_and_off_Toilet}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_on_and_off_toilet?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Bowels}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_bowels?.label)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>{Bladder}</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_bladder?.label)}</p>
                                                        </Grid>
                                                    </Grid> */}

                                                    <Grid className="selectOptionCmn">
                                                        <Grid className="allQuestionShow1">
                                                            {selectoption.map((item) => (
                                                                <FormControl className="selectOption">
                                                                    <FormLabel id="main-topic-counted" className="mainQueLab">
                                                                        {item.label}
                                                                    </FormLabel>
                                                                    {item.value?.map((option, index) => {
                                                                        const compareResult = parseInt(item && item?.result && item?.result?.value &&
                                                                            item?.result?.value.split('_v').pop())
                                                                        return (
                                                                            <RadioGroup
                                                                                aria-labelledby="main-topic-counted"
                                                                                name="quarter_feeding"
                                                                            >
                                                                                <FormControlLabel
                                                                                    control={<Radio />}
                                                                                    label={this.capitalizeFirstLetter(option)}
                                                                                    checked={
                                                                                        compareResult === index + 1 ? (
                                                                                            <Radio />
                                                                                        ) : null
                                                                                    }
                                                                                />
                                                                            </RadioGroup>
                                                                        );
                                                                    })}
                                                                </FormControl>
                                                            ))}
                                                        </Grid>
                                                    </Grid>


                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}
            </Grid>
        )
    }


}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    return {
        stateLanguageType,
        settings
    };
};
export default pure(withRouter(
    connect(mapStateToProps, { Settings, LanguageFetchReducer })(Index)
));


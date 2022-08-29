import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import { Redirect, Route } from "react-router-dom";
import LeftMenuMobile from "Screens/Components/Menus/NurseLeftMenu/mobile";
import LeftMenu from "Screens/Components/Menus/NurseLeftMenu/index";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from 'Screens/Components/mmHgField/index';
import { getLanguage } from 'translations/index';
import PainIntensity from "Screens/Components/PainIntansity/index";
import FatiqueQuestion from "Screens/Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions";
import { S3Image } from 'Screens/Components/GetS3Images/index';
import { getDate } from 'Screens/Components/BasicMethod';
import {
    updateAllEntrySec2,
    handleChangeForm,
    updateAllEntrySec,
    handleSubmit,
    updateAllEntrySec1,
    FileAttachMulti,
    allHouses,
    updateEntryState,
    updateEntryState1,
    openFullQues,
    closeFullQues,
    updateAllEntrySec0,
    showHouseValue
} from "./api"
import FileUploader from "Screens/Components/JournalFileUploader/index";
import Select from "react-select";
import Loader from 'Screens/Components/Loader/index';
import PreviousInfo from "../../Components/PreviousInfo/index"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            dailyForm: true,
            everyQuarter: false,
            everyWeek: false,
            everyDay: false,
            errorChrMsg: '',
            selectForm: "Daily",
            allQuestionData: {},
            openQues: false,
            errorChrMsg1: '',
            loaderImage: false,
            FileAttach: [],
            successMsg: '',
            openModal: false
        }
    }

    componentDidMount() {
        allHouses(this);
    }

    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (
            stateLoginValueAim.user === "undefined" ||
            stateLoginValueAim.token === 450 ||
            stateLoginValueAim.token === "undefined" ||
            !this.props.verifyCode ||
            !this.props.verifyCode.code
        ) {
            if (stateLoginValueAim.user) {
                if (
                    stateLoginValueAim?.user?.type === "nurse" ||
                    stateLoginValueAim?.user?.type === "therapist"
                ) {
                } else {
                    return <Redirect to={"/"} />;
                }
            } else {
                return <Redirect to={"/"} />;
            }
        }

        let translate = getLanguage(this.props.stateLanguageType);
        const { rr_systolic, RR_diastolic, Search_Select, ForPatient, For_Hospital, Daily, every_2_week, Every_2_Day, Quarter, blood_pressure
            , Picture_with_Scale,
            Anamnesis,
            full_information,
            Decubitus_Situation,
            On_and_off_Toilet,
            Amount_of_wounds,
            Chair_Bed_Transfers,
            Worse,
            Better,
            Thrombose_Situation,
            Measure_diameter_Leg,
            Falling_Risk,
            ask_for_incidents,
            Did_you_fall_today,
            Use_of_tools,
            Can_you_use_your_tools,
            Ask_for_Food,
            Have_you_eaten, Yes, No,
            Water,
            Have_you_been_trinkung,
            Could_you_go_Toilet,
            Toilet_situation,
            Pain_Status,
            Depression_Risk,
            what_was_today,
            Patient_tell_Good_Day,
            Disorientation_Level,
            ask_for_News_Day,
            Patient_tell_news_Days,
            Name_of_Family_Members,
            Patient_remebmer_Family_Memer,
            Sanitary_Situation,
            No_Incidents_Sanitary_Situation,
            Sick,
            Weight,
            o2_Saturation,
            Pneunomie_Situation,
            Second_Day,
            Nutrition_Situation,
            Fruits,
            Have_you_eaten_Fruits,
            Protein,
            Have_you_eaten_Meat,
            Can_manipulate_an_eating_device,
            Month_If_not_acute_daily,
            Could_the_Patient_tell_day,
            Feeding,
            Dependent_in_all_aspects,
            The_patient_control_bladder,
            The_patient_is_generally_dry,
            The_patient_generally_day,
            The_patient_incontinent,
            The_patient_dependent_bladder_management,
            The_patient_control_bowels_accidents,
            The_patient_require_supervision,
            The_patient_can_assume_appropriate_position,
            The_patient_appropriate_position,
            The_patient_is_bowel_incontient,
            The_patient_toilet,
            Supervision_safety_with_normal_toilet,
            Assistance_required_management_hands,
            Assistance_required_aspects_toileting,
            Fully_dependent_in_toileting,
            The_patient_up_and_down,
            Generally_no_assistance_required,
            The_patient_ascend_desend,
            Assistance_is_required,
            The_patient_unable_climb_stairs,
            Stairs,
            To_propel_wheelchair_independently,
            The_patient_propel_self_reasonable_duration,
            Presence_one_person_necessary,
            Patient_self_short_distance,
            Dependent_in_wheelchair,
            Wheelchair_Management,
            The_patient_must_wear_braces,
            The_patient_is_independent,
            Assistance_required_with_reaching,
            Constant_presence_of_one,
            Dependent_in_ambulation,
            The_patient_must_be_independent,
            The_patient_safety_approach,
            The_presence_another_person_required,
            Able_participate_but_maximum,
            Unable_participate_transfer,
            The_patient_can_feed_tray,
            Independence_in_feeding,
            Able_to_feed_self,
            Bowels,
            Submit,
            Diameter_Leg,
            Sound_Recording_auscultation,
            tech_development,
            timed_up_and_go,
            Bladder,
            Ambulation,
            SoundRecording_Techdevelopment
        } = translate;
        const { selectForm,
            dailyForm,
            everyDay,
            everyWeek,
            everyQuarter,
            allQuestionData,
            currentList,
            selectHouse,
            selectPatient,
            selectService,
            openQues } = this.state;
        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "homeBg darkTheme"
                        : "homeBg"
                }
            >
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner homeBgIner">

                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="questionnary" />
                                <LeftMenuMobile isNotShow={true} currentPage="questionnary" />
                                <Notification />
                                {/* End of Website Menu */}
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid className="allFormSection">
                                        {!openQues ?
                                            <Grid>
                                                <div className="err_message">{this.state.errorChrMsg1}</div>

                                                <Grid item xs={12} sm={9} md={6}>
                                                    <label>{For_Hospital}</label>
                                                    <Grid>
                                                        <Select
                                                            name="for_hospital"
                                                            options={this.state.currentList}
                                                            placeholder={Search_Select}
                                                            onChange={(e) => updateEntryState(this, e)}
                                                            value={this.state.selectHouse || ""}
                                                            className="addStafSelect"
                                                            isMulti={false}
                                                            isSearchable={true}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={9} md={6}>
                                                    <label>{ForPatient}</label>
                                                    <Grid>
                                                        <Select
                                                            name="patient"
                                                            options={this.state.users1}
                                                            placeholder={Search_Select}
                                                            onChange={(e) => updateEntryState1(this, e)}
                                                            value={this.state.selectPatient || ""}
                                                            className="addStafSelect"
                                                            isMulti={false}
                                                            isSearchable={true}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                {/* <Grid item xs={12} md={12}>
                                                    <label>For Service</label>
                                                    <Grid>
                                                        <Select
                                                            name="service"
                                                            options={this.state.users1}
                                                            placeholder={Search_Select}
                                                            // onChange={(e) => updateEntryState(this, e)}
                                                            value={this.state.selectService || ""}
                                                            className="addStafSelect"
                                                            isMulti={false}
                                                            isSearchable={true}
                                                        />
                                                    </Grid>
                                                </Grid> */}
                                            </Grid> : <Grid>

                                                <Grid
                                                    className="backFlow backFlow34"
                                                    onClick={() => {
                                                        this.setState({ openQues: false, allQuestionData: {} });
                                                    }}
                                                >
                                                    <a>
                                                        <img
                                                            src={require('assets/virtual_images/rightArrow.png')}
                                                            alt=""
                                                            title=""
                                                        />
                                                        Back
                                                    </a>
                                                </Grid>
                                                <FormControl className="careQuesCheck careQuesCheckTp">
                                                    <RadioGroup row aria-labelledby="openForms" name="selectForm">
                                                        <FormControlLabel
                                                            checked={selectForm === 'Daily'}
                                                            value="Daily"
                                                            control={<Radio onClick={() => handleChangeForm(this, 1)} />}
                                                            label={Daily}
                                                        />
                                                        <FormControlLabel
                                                            checked={selectForm === 'Every_2_Day'}
                                                            value="Every_2_Day"
                                                            control={<Radio onClick={() =>
                                                                handleChangeForm(this, 2)} />}
                                                            label={Every_2_Day} />
                                                        <FormControlLabel
                                                            checked={selectForm === 'Every_2_Weeks'}
                                                            value="Every_2_Weeks"
                                                            control={<Radio onClick={() => handleChangeForm(this, 3)} />}
                                                            label={every_2_week}
                                                        />
                                                        <FormControlLabel
                                                            checked={selectForm === 'Quarter'}
                                                            value="Quarter"
                                                            control={<Radio onClick={() => handleChangeForm(this, 4)} />}
                                                            label={Quarter}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div className="err_message">{this.state.errorChrMsg}</div>
                                                <div className="success_message">{this.state.successMsg}</div>
                                                {selectForm && selectForm === 'Daily' &&
                                                    <Grid>
                                                        <Grid >
                                                            <Grid className="anamneSecMid">
                                                                <p>{Anamnesis}</p>
                                                                {/* <Grid className="anamneSec"> */}
                                                                <Grid className="bloodPrseure">
                                                                    <label>{blood_pressure}</label>
                                                                    <Grid container direction="row" spacing="1">
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="daily_rr_systolic"
                                                                                    Unit="mmHg"
                                                                                    label={rr_systolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={allQuestionData?.daily_rr_systolic || ''}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="daily_rr_diastolic"
                                                                                    Unit="mmHg"
                                                                                    label={RR_diastolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={allQuestionData?.daily_rr_diastolic || ''}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <Grid className="fatiqueQues">

                                                                            <FatiqueQuestion updateEntryState1={(e) => updateAllEntrySec2(this, e, 'daily_diameter_leg')} label={Diameter_Leg} value={allQuestionData?.daily_diameter_leg} />

                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                {allQuestionData?.daily_diameter_leg === 'yes' && <Grid className="anamneSec">

                                                                    <Grid className="measureInput">
                                                                        <label>{Measure_diameter_Leg}</label>

                                                                        <input
                                                                            type="number"
                                                                            name="daily_anamnesis_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.daily_anamnesis_diameter_leg}
                                                                        />

                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_anamnesis_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_anamnesis_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_anamnesis_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>

                                                                </Grid>}

                                                                {/* <Grid>
                                                                <label>Blood pressure</label>
                                                                <input type="text" placeholder="" name="" />
                                                            </Grid> */}
                                                                {/* </Grid> */}
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Decubitus_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>{Picture_with_Scale}</label>

                                                                        <FileUploader
                                                                            // cur_one={this.props.cur_one}
                                                                            attachfile={
                                                                                allQuestionData && allQuestionData?.daily_decubitus_picture_with_scale
                                                                                    ? allQuestionData?.daily_decubitus_picture_with_scale
                                                                                    : []
                                                                            }
                                                                            name="daily_decubitus_picture_with_scale"
                                                                            comesFrom="journal"
                                                                            isMulti={true}
                                                                            fileUpload={(e) => FileAttachMulti(this, e, "daily_decubitus_picture_with_scale")}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Amount_of_wounds}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="daily_decubitus_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.daily_decubitus_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_decubitus_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_decubitus_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_decubitus_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            {/* <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>{Measure_diameter_Leg}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="daily_thrombose_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.daily_thrombose_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid className="anamneSecMid">
                                                                <p>{Falling_Risk} </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_incidents}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="daily_falling_risk_incident_today"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.daily_falling_risk_incident_today &&
                                                                                            allQuestionData?.daily_falling_risk_incident_today === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.daily_falling_risk_incident_today === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Did_you_fall_today}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Use_of_tools}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="daily_falling_risk_incident_tools"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.daily_falling_risk_incident_tools &&
                                                                                            allQuestionData?.daily_falling_risk_incident_tools === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.daily_falling_risk_incident_tools === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Can_you_use_your_tools}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Ask_for_Food}</label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Have_you_eaten} </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_food_eaten_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_food_eaten_condition === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_food_eaten_condition === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Water} </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Have_you_been_trinkung} </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_water_trinkung">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_water_trinkung === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_water_trinkung === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Toilet_situation} </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Could_you_go_Toilet}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_toilet_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_toilet_situation === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_toilet_situation === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Pain_Status}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="painIntencty">
                                                                        <PainIntensity
                                                                            name="daily_thrombose_pain_status"
                                                                            comesFrom="Evalute"
                                                                            // Forview={true}
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={Math.round(this.state.allQuestionData?.daily_thrombose_pain_status) || 0}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>{Picture_with_Scale}</label>
                                                                        <FileUploader
                                                                            // cur_one={this.props.cur_one}
                                                                            attachfile={
                                                                                allQuestionData && allQuestionData?.daily_thrombose_picture_with_scale
                                                                                    ? allQuestionData?.daily_thrombose_picture_with_scale
                                                                                    : []
                                                                            }
                                                                            name="daily_thrombose_picture_with_scale"
                                                                            comesFrom="journal"
                                                                            isMulti={true}
                                                                            fileUpload={(e) => FileAttachMulti(this, e, "daily_thrombose_picture_with_scale")}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Amount_of_wounds} </label>
                                                                        <input
                                                                            type="number"
                                                                            value={allQuestionData?.daily_thrombose_amout_of_wounds || ''}
                                                                            name="daily_thrombose_amout_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_situation === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_situation === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Depression_Risk}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>

                                                                        <FormLabel>{what_was_today}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="daily_depression_good_today"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.daily_depression_good_today &&
                                                                                            allQuestionData?.daily_depression_good_today === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.daily_depression_good_today === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_tell_Good_Day}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Disorientation_Level}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_News_Day}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="daily_disorientation_level_patient_tell"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.daily_disorientation_level_patient_tell &&
                                                                                            allQuestionData?.daily_disorientation_level_patient_tell === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.daily_disorientation_level_patient_tell === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_tell_news_Days}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Name_of_Family_Members}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="daily_disorientation_level_family_member"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.daily_disorientation_level_family_member &&
                                                                                            allQuestionData?.daily_disorientation_level_family_member === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.daily_disorientation_level_family_member === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_remebmer_Family_Memer}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Sanitary_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_incidents}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="daily_sanitary_situation_incident"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.daily_sanitary_situation_incident &&
                                                                                            allQuestionData?.daily_sanitary_situation_incident === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.daily_sanitary_situation_incident === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={No_Incidents_Sanitary_Situation}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                }

                                                {selectForm && selectForm === 'Every_2_Day' &&
                                                    <Grid>
                                                        <Grid >
                                                            <Grid className="anamneSecMid">
                                                                <p>{Anamnesis}</p>
                                                                {/* <Grid className="anamneSec"> */}
                                                                <Grid className="bloodPrseure">
                                                                    <label>{blood_pressure}</label>
                                                                    <Grid container direction="row" spacing="1">
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="day_rr_systolic"
                                                                                    Unit="mmHg"
                                                                                    label={rr_systolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={allQuestionData?.day_rr_systolic || ''}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="day_rr_diastolic"
                                                                                    Unit="mmHg"
                                                                                    label={RR_diastolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={allQuestionData?.day_rr_diastolic || ''}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <Grid className="fatiqueQues">

                                                                            <FatiqueQuestion updateEntryState1={(e) => updateAllEntrySec2(this, e, 'day_Sick')} label={Sick} value={allQuestionData?.day_Sick} />

                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                {allQuestionData?.day_Sick === 'yes' && <Grid className="anamneSec">

                                                                    <Grid className="measureInput">
                                                                        <label>{Weight}</label>

                                                                        <input
                                                                            type="number"
                                                                            name="day_anamnesis_weight"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_anamnesis_weight}
                                                                        />

                                                                    </Grid>
                                                                </Grid>}
                                                                <Grid className="anamneSec">

                                                                    <Grid className="measureInput">
                                                                        <label>{o2_Saturation}</label>

                                                                        <input
                                                                            type="number"
                                                                            name="day_anamnesis_o2_saturation"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_anamnesis_o2_saturation}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Decubitus_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>{Picture_with_Scale}</label>
                                                                        <FileUploader
                                                                            // cur_one={this.props.cur_one}
                                                                            attachfile={
                                                                                allQuestionData && allQuestionData?.day_decubitus_picture_with_scale
                                                                                    ? allQuestionData?.day_decubitus_picture_with_scale
                                                                                    : []
                                                                            }
                                                                            name="day_decubitus_picture_with_scale"
                                                                            comesFrom="journal"
                                                                            isMulti={true}
                                                                            fileUpload={(e) => FileAttachMulti(this, e, "day_decubitus_picture_with_scale")}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Amount_of_wounds}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="day_decubitus_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_decubitus_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_decubitus_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_decubitus_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_decubitus_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            {/* <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>{Measure_diameter_Leg}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="day_thrombose_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_thrombose_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid className="anamneSecMid">
                                                                <p>{Falling_Risk} </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_incidents}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_falling_risk_incident"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_falling_risk_incident &&
                                                                                            allQuestionData?.day_falling_risk_incident === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_falling_risk_incident === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Did_you_fall_today}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Use_of_tools}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_falling_risk_use_of_tools"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_falling_risk_use_of_tools &&
                                                                                            allQuestionData?.day_falling_risk_use_of_tools === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_falling_risk_use_of_tools === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Can_you_use_your_tools}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Ask_for_Food}</label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Have_you_eaten}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_food_eaten_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_food_eaten_condition === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_food_eaten_condition === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Water} </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Have_you_been_trinkung} </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_water_trinkung">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_water_trinkung === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_water_trinkung === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Toilet_situation}</label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Could_you_go_Toilet}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_toilet_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_toilet_situation === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_toilet_situation === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Pain_Status}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="painIntencty">
                                                                        <PainIntensity
                                                                            name="day_thrombose_pain_status"
                                                                            comesFrom="Evalute"
                                                                            // Forview={true}
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={Math.round(this.state.allQuestionData?.day_thrombose_pain_status) || ''}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>{Picture_with_Scale}</label>
                                                                        <FileUploader
                                                                            // cur_one={this.props.cur_one}
                                                                            attachfile={
                                                                                allQuestionData && allQuestionData?.day_thrombose_picture_with_scale
                                                                                    ? allQuestionData?.day_thrombose_picture_with_scale
                                                                                    : []
                                                                            }
                                                                            name="day_thrombose_picture_with_scale"
                                                                            comesFrom="journal"
                                                                            isMulti={true}
                                                                            fileUpload={(e) => FileAttachMulti(this, e, "day_thrombose_picture_with_scale")}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Amount_of_wounds} </label>
                                                                        <input
                                                                            type="number"
                                                                            name="day_thrombose_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_thrombose_amount_of_wounds}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_situation === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_situation === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Depression_Risk}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>

                                                                        <FormLabel>{what_was_today}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_depression_good_today"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_depression_good_today &&
                                                                                            allQuestionData?.day_depression_good_today === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_depression_good_today === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_tell_Good_Day}
                                                                        />

                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Disorientation_Level}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_News_Day}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_disorientation_level_ask_for_news"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_disorientation_level_ask_for_news &&
                                                                                            allQuestionData?.day_disorientation_level_ask_for_news === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_disorientation_level_ask_for_news === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_tell_news_Days}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Name_of_Family_Members}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_disorientation_level_family_member"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_disorientation_level_family_member &&
                                                                                            allQuestionData?.day_disorientation_level_family_member === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_disorientation_level_family_member === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_remebmer_Family_Memer}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Sanitary_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_incidents}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_sanitary_situation_ask_for_incident"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_sanitary_situation_ask_for_incident &&
                                                                                            allQuestionData?.day_sanitary_situation_ask_for_incident === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_sanitary_situation_ask_for_incident === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={No_Incidents_Sanitary_Situation}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            {/* <Grid className="anamneSecMid">
                                                                <p>Anamnesis</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Weight</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_anamnesis_weight"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_anamnesis_weight &&
                                                                                            allQuestionData?.day_anamnesis_weight === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_anamnesis_weight === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label="2 Weekly / If sick could be evers second day"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>o2 Saturation</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_anamnesis_o2_saturation"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_anamnesis_o2_saturation &&
                                                                                            allQuestionData?.day_anamnesis_o2_saturation === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_anamnesis_o2_saturation === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label="Second Day"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid className="anamneSecMid">
                                                                <p>{Pneunomie_Situation}</p>
                                                                <Grid className="anamneSec">

                                                                    {/* <FormControl>
                                                                        <FormLabel>o2 Saturation</FormLabel>

                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_pneunomie_o2_saturation"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_pneunomie_o2_saturation &&
                                                                                            allQuestionData?.day_pneunomie_o2_saturation === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_pneunomie_o2_saturation === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Second_Day}
                                                                        />
                                                                    </FormControl> */}
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>

                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_pneunomie_o2_sound_recording"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_pneunomie_o2_sound_recording &&
                                                                                            allQuestionData?.day_pneunomie_o2_sound_recording === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_pneunomie_o2_sound_recording === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }

                                                                            label={SoundRecording_Techdevelopment}

                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Nutrition_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Fruits}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_nutrition_situation_fruits"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_nutrition_situation_fruits &&
                                                                                            allQuestionData?.day_nutrition_situation_fruits === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_nutrition_situation_fruits === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Have_you_eaten_Fruits}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Protein}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="day_nutrition_situation_protein"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.day_nutrition_situation_protein &&
                                                                                            allQuestionData?.day_nutrition_situation_protein === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.day_nutrition_situation_protein === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Have_you_eaten_Meat}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                }

                                                {selectForm && selectForm === 'Every_2_Weeks' &&
                                                    <Grid>
                                                        <Grid >
                                                            <Grid className="anamneSecMid">
                                                                <p>{Anamnesis}</p>
                                                                {/* <Grid className="anamneSec"> */}
                                                                <Grid className="bloodPrseure">
                                                                    <label>{blood_pressure}</label>
                                                                    <Grid container direction="row" spacing="1">
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="week_rr_systolic"
                                                                                    Unit="mmHg"
                                                                                    label={rr_systolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={allQuestionData?.week_rr_systolic || ""}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="week_rr_diastolic"
                                                                                    Unit="mmHg"
                                                                                    label={RR_diastolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={allQuestionData?.week_rr_diastolic || ''}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>{Weight}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_anamnesis_weight"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_anamnesis_weight}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Measure_diameter_Leg} </label>

                                                                        <input
                                                                            type="number"
                                                                            name="week_anamnesis_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_anamnesis_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse} </FormLabel>

                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_anamnesis_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Decubitus_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>{Picture_with_Scale}</label>
                                                                        <FileUploader
                                                                            // cur_one={this.props.cur_one}
                                                                            attachfile={
                                                                                allQuestionData && allQuestionData?.week_decubitus_picture_with_scale
                                                                                    ? allQuestionData?.week_decubitus_picture_with_scale
                                                                                    : []
                                                                            }
                                                                            name="week_decubitus_picture_with_scale"
                                                                            comesFrom="journal"
                                                                            isMulti={true}
                                                                            fileUpload={(e) => FileAttachMulti(this, e, "week_decubitus_picture_with_scale")}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Amount_of_wounds}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_decubitus_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_decubitus_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_decubitus_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_decubitus_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_decubitus_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            {/* <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>{Measure_diameter_Leg}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_thrombose_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_thrombose_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_diameter_leg_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_diameter_leg_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_diameter_leg_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid className="anamneSecMid">



                                                                <p>{Falling_Risk}</p>

                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_incidents}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="week_falling_risk_ask_for_incident"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.week_falling_risk_ask_for_incident &&
                                                                                            allQuestionData?.week_falling_risk_ask_for_incident === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.week_falling_risk_ask_for_incident === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Did_you_fall_today}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Use_of_tools}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="week_falling_risk_use_of_tools"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.week_falling_risk_use_of_tools &&
                                                                                            allQuestionData?.week_falling_risk_use_of_tools === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.week_falling_risk_use_of_tools === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Can_you_use_your_tools}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Ask_for_Food} </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Have_you_eaten}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_food_eaten">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_food_eaten === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_food_eaten === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Water}</label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Have_you_been_trinkung}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_water_trinkung">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_water_trinkung === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_water_trinkung === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>{Toilet_situation} </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">{Could_you_go_Toilet}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_toilet_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_toilet_situation === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_toilet_situation === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Pain_Status}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="painIntencty">
                                                                        <PainIntensity
                                                                            name="week_thrombose_pain_status"
                                                                            comesFrom="Evalute"
                                                                            // Forview={true}
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={Math.round(this.state.allQuestionData?.week_thrombose_pain_status) || ''}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Thrombose_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>{Picture_with_Scale}</label>
                                                                        <FileUploader
                                                                            // cur_one={this.props.cur_one}
                                                                            attachfile={
                                                                                allQuestionData && allQuestionData?.week_thrombose_picture_with_scale
                                                                                    ? allQuestionData?.week_thrombose_picture_with_scale
                                                                                    : []
                                                                            }
                                                                            name="week_thrombose_picture_with_scale"
                                                                            comesFrom="journal"
                                                                            isMulti={true}
                                                                            fileUpload={(e) => FileAttachMulti(this, e, "week_thrombose_picture_with_scale")}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>{Amount_of_wounds}</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_thrombose_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_thrombose_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{Better} / {Worse}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Better}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Worse}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>

                                                            {/* <Grid className="anamneSecMid">
                                                                <p>{Depression_Risk}</p>

                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{what_was_today}</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_depression_good_today">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_depression_good_today === 'month If not acute daily'}
                                                                                value="month If not acute daily"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Month_If_not_acute_daily}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_depression_good_today === 'could the Patient tell somethink that was good to day'}
                                                                                value="could the Patient tell somethink that was good to day"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Could_the_Patient_tell_day}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid className="anamneSecMid">
                                                                <p>{Disorientation_Level}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_News_Day}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="week_disorientation_level_ask_for_news"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.week_disorientation_level_ask_for_news &&
                                                                                            allQuestionData?.week_disorientation_level_ask_for_news === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.week_disorientation_level_ask_for_news === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_tell_news_Days}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{Name_of_Family_Members}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="week_disorientation_level_family_member"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.week_disorientation_level_family_member &&
                                                                                            allQuestionData?.week_disorientation_level_family_member === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.week_disorientation_level_family_member === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={Patient_remebmer_Family_Memer}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>{Sanitary_Situation}</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>{ask_for_incidents}</FormLabel>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="week_sanitary_situation_ask_for_incidents"
                                                                                    value={
                                                                                        allQuestionData &&
                                                                                            allQuestionData?.week_sanitary_situation_ask_for_incidents &&
                                                                                            allQuestionData?.week_sanitary_situation_ask_for_incidents === true
                                                                                            ? false
                                                                                            : true
                                                                                    }
                                                                                    checked={
                                                                                        allQuestionData?.week_sanitary_situation_ask_for_incidents === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        updateAllEntrySec1(this, e);
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={No_Incidents_Sanitary_Situation}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid >
                                                            {/* <Grid className="anamneSecMid">
                                                                <p>Anamnesis </p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>Weight (Every 2Weeks / If sick could be evers second day)</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_anamnesis_weight"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_anamnesis_weight}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>Measure diameter Leg (If Yes daily if not evry 2 Weeks)</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_anamnesis_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_anamnesis_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse (If Yes daily if not evry 2 Weeks)</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_anamnesis_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid className="anamneSecMid">
                                                                <p>{Falling_Risk} </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">{timed_up_and_go}(2 Weeks)</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_anamnesis_falling_up_go">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_falling_up_go === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={Yes}
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_falling_up_go === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label={No}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSecMid">
                                                                    <p>{Depression_Risk}</p>
                                                                    <Grid className="anamneSec">
                                                                        <FormControl>
                                                                            <FormLabel>{what_was_today}</FormLabel>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        name="week_depression_risk_good_today"
                                                                                        value={
                                                                                            allQuestionData &&
                                                                                                allQuestionData?.week_depression_risk_good_today &&
                                                                                                allQuestionData?.week_depression_risk_good_today === true
                                                                                                ? false
                                                                                                : true
                                                                                        }
                                                                                        checked={
                                                                                            allQuestionData?.week_depression_risk_good_today === true
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                        onChange={(e) => {
                                                                                            updateAllEntrySec1(this, e);
                                                                                        }}
                                                                                    />
                                                                                }
                                                                                label={Patient_tell_Good_Day}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                }

                                                {selectForm && selectForm === 'Quarter' &&
                                                    <Grid>
                                                        <Grid >
                                                            <Grid className="anamneSecMid">
                                                                <p>{Anamnesis}</p>
                                                                {/* <Grid className="anamneSecMid">
                                                                    <p>Bartel Index</p>
                                                                    <Grid className="anamneSec">
                                                                        <FormControl>
                                                                            <FormLabel>every Quarter</FormLabel>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        name="quarter_bartel_index_full_questionaire"
                                                                                        value={
                                                                                            allQuestionData &&
                                                                                                allQuestionData?.quarter_bartel_index_full_questionaire &&
                                                                                                allQuestionData?.quarter_bartel_index_full_questionaire === true
                                                                                                ? false
                                                                                                : true
                                                                                        }
                                                                                        checked={
                                                                                            allQuestionData?.quarter_bartel_index_full_questionaire === true
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                        onChange={(e) => {
                                                                                            updateAllEntrySec1(this, e);
                                                                                        }}
                                                                                    />
                                                                                }
                                                                                label="Full Questionaire"
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                </Grid> */}
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="selectOptionCmn">
                                                            <FormControl className="selectOption">
                                                                <FormLabel id="main-topic-counted">{Feeding}</FormLabel>
                                                                <RadioGroup aria-labelledby="main-topic-counted" name="quarter_feeding">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding?.value === 'feeding_v1'}
                                                                        value="feeding_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_feeding", z: { value: "feeding_v1", label: "dependent in all aspects and needs to be fed" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Dependent_in_all_aspects}
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding?.value === 'feeding_v2'}
                                                                        value="feeding_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_feeding", z: { value: "feeding_v2", label: "can manipulate an eating device, usually a spoon, but someone must provide active assistance during the meal" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Can_manipulate_an_eating_device}
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding?.value === 'feeding_v3'}
                                                                        value="feeding_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_feeding", z: { value: "feeding_v3", label: "able to feed self with supervision. Assistance is required with associated tasks such as putting milk/sugar into tea, salt, pepper,spreading butter, turning a plate or other “set up” activities" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Able_to_feed_self}
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding?.value === 'feeding_v4'}
                                                                        value="feeding_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_feeding", z: { value: "feeding_v4", label: "independence in feeding with prepared tray, except may need meat cut, milk carton opened or jar lid etc. The presence of another person is not required" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}

                                                                        control={<Radio />}
                                                                        label={Independence_in_feeding}
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding?.value === 'feeding_v5'}
                                                                        value="feeding_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_feeding", z: { value: "feeding_v5", label: "the patient can feed self from a tray or table when someone puts the food within reach. The patient must put on an assistive device if needed, cut food, and if desired use salt and pepper, spread butter, etc.." } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_can_feed_tray}
                                                                    />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Chair-Bed-Transfers">{Chair_Bed_Transfers}</FormLabel>
                                                                <RadioGroup aria-labelledby="Chair-Bed-Transfers" name="quarter_chair_bed_transfer">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer?.value === 'chair_bed_v1'}
                                                                        value="chair_bed_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_chair_bed_transfer", z: { value: "chair_bed_v1", label: "unable to participate in a transfer. Two attendants are required to transfer the patient with or without a mechanical device" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Unable_participate_transfer} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer?.value === 'chair_bed_v2'}
                                                                        value="chair_bed_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_chair_bed_transfer", z: { value: "chair_bed_v2", label: "able to participate but maximum assistance of one other person is require in all aspects of the transfer" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}

                                                                        control={<Radio />}
                                                                        label={Able_participate_but_maximum} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer?.value === 'chair_bed_v3'}
                                                                        value="chair_bed_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_chair_bed_transfer", z: { value: "chair_bed_v3", label: "the presence of another person is required either as a confidence measure, to provide supervision for safety" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}

                                                                        control={<Radio />}
                                                                        label={The_presence_another_person_required} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer?.value === 'chair_bed_v4'}
                                                                        value="chair_bed_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_chair_bed_transfer", z: { value: "chair_bed_v4", label: "the patient can safety approach the bed walking or in a wheelchair, look breaks, lift footrest, or position walking aid, move safely to bed, lie down, come to a sitting position on the side of the bed, chnage the position of the wheelchair, transfer back into it safely" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}

                                                                        control={<Radio />}
                                                                        label={The_patient_safety_approach} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer?.value === 'chair_bed_v5'}
                                                                        value="chair_bed_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_chair_bed_transfer", z: { value: "chair_bed_v5", label: "the patient must be independent in all phases of this activity" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_must_be_independent} />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Ambulation">{Ambulation}</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Ambulation" name="quarter_ambulation">
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_ambulation?.value === 'abulation_v1'}
                                                                        value="abulation_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_ambulation", z: { value: "abulation_v1", label: "the patient must be independent in all phases of this activity" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Dependent_in_ambulation} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_ambulation?.value === 'abulation_v2'}
                                                                        value="abulation_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_ambulation", z: { value: "abulation_v2", label: "constant presence of one or more assistant is required during ambulation" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Constant_presence_of_one} />
                                                                    <FormControlLabel


                                                                        checked={this.state.allQuestionData?.quarter_ambulation?.value === 'abulation_v3'}
                                                                        value="abulation_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_ambulation", z: { value: "abulation_v3", label: "assistance is required with reaching aids and/ or their manipulation. One person is required to offer assistance" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Assistance_required_with_reaching} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_ambulation?.value === 'abulation_v4'}
                                                                        value="abulation_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_ambulation", z: { value: "abulation_v4", label: "the patient is independent in ambulation but unable to walk 50 metres/yards without help, or supervision in needed for confidence or safety in hazardous situations" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_is_independent} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_ambulation?.value === 'abulation_v5'}
                                                                        value="abulation_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_ambulation", z: { value: "abulation_v5", label: "the patient must be able to wear braces if required, lock and unlock these braces assume standing position, sit down and place the necessary aids into position for use. The patient must be able to crutches, canes, or a walkarette, and walk 50 meters/yards without help or Supervision" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_must_wear_braces} />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Wheelchair" className="wheelChr">
                                                                    {Wheelchair_Management}
                                                                    <span>(*Only use this item if the patient is rated “0” for ambulation, and then only if the patient has been trained in w/c management.)</span>
                                                                </FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Wheelchair" name="quarter_wheelchair_management">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management?.value === 'wheelchair_v1'}
                                                                        value="wheelchair_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_wheelchair_management", z: { value: "wheelchair_v1", label: "dependent in wheelchair ambulation" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Dependent_in_wheelchair} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management?.value === 'wheelchair_v2'}
                                                                        value="wheelchair_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_wheelchair_management", z: { value: "wheelchair_v2", label: "patient can propel self  short distance on flat surface, but assistance is required for all other steps of wheelchair management" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}

                                                                        control={<Radio />}
                                                                        label={Patient_self_short_distance} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management?.value === 'wheelchair_v3'}
                                                                        value="wheelchair_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_wheelchair_management", z: { value: "wheelchair_v3", label: "presence of one person is necessary and constant assistance is required to manipulate chair to table, bed, etc" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Presence_one_person_necessary} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management?.value === 'wheelchair_v4'}
                                                                        value="wheelchair_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_wheelchair_management", z: { value: "wheelchair_v4", label: "the patient can propel self for a reasonable duration over regularly encountered terrain. Minimal assistance may still be required in “tight corners” or to negotiate a kerb 100mm high" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_propel_self_reasonable_duration} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management?.value === 'wheelchair_v5'}
                                                                        value="wheelchair_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_wheelchair_management", z: { value: "wheelchair_v5", label: "To propel wheelchair independently, the patient must be able to go around corners, turn around, manoeuvre the chair to a table, bed, toilet, etc. The patient must be able to push a chair at least 50 meters and negotiate a kerb" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={To_propel_wheelchair_independently} />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Stairs">{Stairs}</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Stairs" name="quarter_stairs">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs?.value === 'stairs_v1'}
                                                                        value="stairs_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_stairs", z: { value: "stairs_v1", label: "the patient is unable to climb stairs" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_unable_climb_stairs} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs?.value === 'stairs_v2'}
                                                                        value="stairs_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_stairs", z: { value: "stairs_v2", label: "assistance is required in all aspects of stairclimbing, including assistance with walking aids" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Assistance_is_required} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs?.value === 'stairs_v3'}
                                                                        value="stairs_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_stairs", z: { value: "stairs_v3", label: "the patient is unable to climb stairs" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_ascend_desend} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs?.value === 'stairs_v4'}
                                                                        value="stairs_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_stairs", z: { value: "stairs_v4", label: "generally no assistance is required. At times supervision is required for safety due to morning stiffness, shortness of breath, etc" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Generally_no_assistance_required} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs?.value === 'stairs_v5'}
                                                                        value="stairs_v5"
                                                                        onChange={(e) => {
                                                                            var e = { quartername: "quarter_stairs", z: { value: "stairs_v5", label: "the patient is able to go up and down a flight of stairs safety without help or supervision. The patient is able to use hand rails, cane or Crutches when needed and is able to carry these devices as he/she ascends or descends" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_up_and_down} />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-OnOff">{On_and_off_Toilet}</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-OnOff" name="quarter_on_and_off_toilet">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet?.value === 'on_of_toilet_v1'}
                                                                        value="on_of_toilet_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_on_and_off_toilet", z: { value: "on_of_toilet_v1", label: "fully dependent in toileting" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Fully_dependent_in_toileting} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet?.value === 'on_of_toilet_v2'}
                                                                        value="on_of_toilet_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_on_and_off_toilet", z: { value: "on_of_toilet_v2", label: "assistance required in all aspects of toileting" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Assistance_required_aspects_toileting} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet?.value === 'on_of_toilet_v3'}
                                                                        value="on_of_toilet_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_on_and_off_toilet", z: { value: "on_of_toilet_v3", label: "assistance may be required with management of clothing, transferring, or washing hands" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Assistance_required_management_hands} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet?.value === 'on_of_toilet_v4'}
                                                                        value="on_of_toilet_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_on_and_off_toilet", z: { value: "on_of_toilet_v4", label: "supervision may be required for safety with normal toilet. A commode may be used at night but assistance is required for emptying and cleaning" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={Supervision_safety_with_normal_toilet} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet?.value === 'on_of_toilet_v5'}
                                                                        value="on_of_toilet_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_on_and_off_toilet", z: { value: "on_of_toilet_v5", label: "the patient is able to get on/off the toilet, fasten clothing and use toilet paper without help. If necessary, the patient may use a bed pan or Commode or urinal at night, but must be able to empty it and clean it" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_toilet} />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Ambulation">{Bowels}</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Ambulation" name="quarter_bowels">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels?.value === 'bowels_v1'}
                                                                        value="bowels_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bowels", z: { value: "bowels_v1", label: "the patient is bowel incontient" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_is_bowel_incontient} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_bowels?.value === 'bowels_v2'}
                                                                        value="bowels_v2"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bowels", z: { value: "bowels_v2", label: "the patient needs help to assume appropriate position, and with bowel movement facilitatory techniques" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_appropriate_position} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_bowels?.value === 'bowels_v3'}
                                                                        value="bowels_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bowels", z: { value: "bowels_v3", label: "the patient can assume appropriate position, but can not use facilitatory techniques or clean self without assistance and has frequent accident. Assistance is required with incontinence aids such as pad, etc" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_can_assume_appropriate_position} />
                                                                    <FormControlLabel

                                                                        checked={this.state.allQuestionData?.quarter_bowels?.value === 'bowels_v4'}
                                                                        value="bowels_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bowels", z: { value: "bowels_v4", label: "the patient may require supervision with the use of suppository or enema and has occasional accident" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_require_supervision} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels?.value === 'bowels_v5'}
                                                                        value="bowels_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bowels", z: { value: "bowels_v5", label: "the patient can control bowels and has no accidents, can use suppository, or take an enema when necessary" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_control_bowels_accidents} />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Bladder">{Bladder}</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Bladde" name="quarter_bladder">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder?.value === 'bladder_v1'}
                                                                        value="bladder_v1"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bladder", z: { value: "bladder_v1", label: "the patient is dependent in bladder management, is incontinent, or has indwelling catheter" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_dependent_bladder_management} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder?.value === 'bladder_v2'}
                                                                        value="bladder_v2"
                                                                        onChange={(e) => {
                                                                            var e = { quartername: "quarter_bladder", z: { value: "bladder_v2", label: "the patient is incontinent but is able to assist with the application of an internal or external device" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_incontinent} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder?.value === 'bladder_v3'}
                                                                        value="bladder_v3"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bladder", z: { value: "bladder_v3", label: "the patient is generally dry by day, but not at night and needs some assistance with the devices" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_generally_day} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder?.value === 'bladder_v4'}
                                                                        value="bladder_v4"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bladder", z: { value: "bladder_v4", label: "the patient is generally dry by day and night, but may have an occasional accident or need minimal assistance with internal or external devices" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_is_generally_dry} />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder?.value === 'bladder_v5'}
                                                                        value="bladder_v5"
                                                                        onChange={(e) => {
                                                                            var e = { name: "quarter_bladder", z: { value: "bladder_v5", label: "the patient is able to control bladder day and night, and/or is independent with internal or external devices" } }
                                                                            updateAllEntrySec0(this, e)
                                                                        }}
                                                                        control={<Radio />}
                                                                        label={The_patient_control_bladder} />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </Grid>}
                                        <Grid item xs={12} sm={9} md={6}>
                                            <Grid className="infoShwSave3">
                                                <input
                                                    type={Submit}
                                                    value={Submit}
                                                    onClick={() => handleSubmit(this)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3}>

                                    <PreviousInfo
                                        openQues={openQues}
                                        prevData={this.state.prevData}
                                        closeFullQues={() => closeFullQues(this)}
                                        showHouseValue={(id) => showHouseValue(this, id)}
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
    })(Index)
);

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
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
import {
    updateAllEntrySec2,
    handleChangeForm,
    updateAllEntrySec,
    handleSubmit,
    updateAllEntrySec1,
    FileAttachMulti,
    allHouses,
    updateEntryState,
    updateEntryState1
} from "./api"
import FileUploader from "Screens/Components/JournalFileUploader/index";
import Select from "react-select";
import Loader from 'Screens/Components/Loader/index';

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
            loaderImage: false
        }
    }

    componentDidMount() {
        allHouses(this);
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        const { rr_systolic, RR_diastolic, Search_Select, ForPatient } = translate;
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
                                <Grid item xs={12} sm={12} md={9}>
                                    <Grid className="allFormSection">
                                        {!openQues ?
                                            <Grid>
                                                <div className="err_message">{this.state.errorChrMsg1}</div>
                                                <Grid item xs={12} md={12}>
                                                    <label>For Hospital</label>
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
                                                <Grid item xs={12} md={12}>
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
                                                <FormControl className="careQuesCheck careQuesCheckTp">
                                                    <RadioGroup row aria-labelledby="openForms" name="selectForm">
                                                        <FormControlLabel
                                                            checked={selectForm === 'Daily'}
                                                            value="Daily"
                                                            control={<Radio onClick={() => handleChangeForm(this, 1)} />}
                                                            label="Daily"
                                                        />
                                                        <FormControlLabel
                                                            checked={selectForm === 'Every_2_Day'}
                                                            value="Every_2_Day"
                                                            control={<Radio onClick={() =>
                                                                handleChangeForm(this, 2)} />}
                                                            label="Every 2 Day" />
                                                        <FormControlLabel
                                                            checked={selectForm === 'Every_2_Weeks'}
                                                            value="Every_2_Weeks"
                                                            control={<Radio onClick={() => handleChangeForm(this, 3)} />}
                                                            label="Every 2 Weeks"
                                                        />
                                                        <FormControlLabel
                                                            checked={selectForm === 'Quarter'}
                                                            value="Quarter"
                                                            control={<Radio onClick={() => handleChangeForm(this, 4)} />}
                                                            label="Quarter"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div className="err_message">{this.state.errorChrMsg}</div>
                                                {selectForm && selectForm === 'Daily' &&
                                                    <Grid>
                                                        <Grid >
                                                            <Grid className="anamneSecMid">
                                                                <p>Anamnesis</p>
                                                                {/* <Grid className="anamneSec"> */}
                                                                <Grid className="bloodPrseure">
                                                                    <label>Blood pressure</label>
                                                                    <Grid container direction="row" spacing="1">
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="daily_rr_systolic"
                                                                                    Unit="mmHg"
                                                                                    label={rr_systolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={
                                                                                        dailyForm
                                                                                            ? allQuestionData?.daily_rr_systolic
                                                                                            : ''
                                                                                    }
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
                                                                                    value={allQuestionData?.daily_rr_diastolic}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                <Grid className="measureInput">
                                                                        <Grid className="fatiqueQues">
                                                                            <FatiqueQuestion updateEntryState1={(e)=>updateAllEntrySec2(this, e, 'daily_diameter_leg')} label={"Diameter Leg"} value={allQuestionData?.daily_diameter_leg}/>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                {allQuestionData?.daily_diameter_leg === 'yes' && <Grid className="anamneSec">
                                                                <Grid className="measureInput">
                                                                <label>Measure diameter Leg</label>
                                                                        <input
                                                                            type="number"
                                                                            name="daily_anamnesis_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.daily_anamnesis_diameter_leg}
                                                                        />
                                                                    
                                                                </Grid>
                                                                <FormControl>
                                                                    <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="daily_anamnesis_condition">
                                                                        <FormControlLabel
                                                                            checked={this.state.allQuestionData?.daily_anamnesis_condition === 'better'}
                                                                            value="better"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            control={<Radio />}
                                                                            label="Better"
                                                                        />
                                                                        <FormControlLabel
                                                                            checked={this.state.allQuestionData?.daily_anamnesis_condition === 'worse'}
                                                                            value="worse"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            control={<Radio />}
                                                                            label="Worse"
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
                                                                <p>Decubitus Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>Picture with Scale</label>
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
                                                                        <label>Amount of wounds</label>
                                                                        <input
                                                                            type="number"
                                                                            name="daily_decubitus_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.daily_decubitus_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_decubitus_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_decubitus_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_decubitus_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>Measure diameter Leg </label>
                                                                        <input
                                                                            type="number"
                                                                            name="daily_thrombose_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.daily_thrombose_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Falling Risk </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for incidents</FormLabel>
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
                                                                            label="Did you fall today"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Use of tools</FormLabel>
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
                                                                            label="Can you use your tools"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Ask for Food </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Have you eaten </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_food_eaten_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_food_eaten_condition === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_food_eaten_condition === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Water </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Have you been trinkung </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_water_trinkung">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_water_trinkung === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_water_trinkung === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Toilet situation </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Could you go to the Toilet</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_toilet_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_toilet_situation === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_toilet_situation === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Pain Status</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="painIntencty">
                                                                        <PainIntensity
                                                                            name="daily_thrombose_pain_status"
                                                                            comesFrom="Evalute"
                                                                            // Forview={true}
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={Math.round(this.state.allQuestionData?.daily_thrombose_pain_status) || ''}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>Picture with Scale</label>
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
                                                                        <label>Amount of wounds </label>
                                                                        <input
                                                                            type="number"
                                                                            value={allQuestionData?.daily_thrombose_amout_of_wounds || ''}
                                                                            name="daily_thrombose_amout_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="daily_thrombose_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_situation === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.daily_thrombose_situation === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Depression Risk</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                    <FormLabel>what was good today</FormLabel>
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
                                                                                label="Can the Patient tell somethink Good this Day"
                                                                            />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Disorientation Level</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for News of the Day </FormLabel>
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
                                                                            label="Can the Patient tell you a news of the Days"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Name of Family Members</FormLabel>
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
                                                                            label="Does the Patient remebmer the Name of a Family Memer"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Sanitary Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for Incidents</FormLabel>
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
                                                                            label="No Incidents at the Sanitary Situation"
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
                                                                <p>Anamnesis</p>
                                                                {/* <Grid className="anamneSec"> */}
                                                                <Grid className="bloodPrseure">
                                                                    <label>Blood pressure</label>
                                                                    <Grid container direction="row" spacing="1">
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="day_rr_systolic"
                                                                                    Unit="mmHg"
                                                                                    label={rr_systolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={
                                                                                        everyDay
                                                                                            ? allQuestionData?.day_rr_systolic
                                                                                            : ''
                                                                                    }
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
                                                                                    value={allQuestionData?.day_rr_diastolic}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                <Grid className="measureInput">
                                                                        <Grid className="fatiqueQues">
                                                                            <FatiqueQuestion updateEntryState1={(e)=>updateAllEntrySec2(this, e, 'day_Sick')} label={"Sick"} value={allQuestionData?.day_Sick}/>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                {allQuestionData?.day_Sick === 'yes' && <Grid className="anamneSec">
                                                                <Grid className="measureInput">
                                                                        <label>Weight</label>
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
                                                                        <label>o2 Saturation</label>
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
                                                                <p>Decubitus Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>Picture with Scale</label>
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
                                                                        <label>Amount of wounds</label>
                                                                        <input
                                                                            type="number"
                                                                            name="day_decubitus_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_decubitus_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_decubitus_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_decubitus_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_decubitus_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>Measure diameter Leg </label>
                                                                        <input
                                                                            type="number"
                                                                            name="day_thrombose_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_thrombose_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Falling Risk </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for incidents</FormLabel>
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
                                                                            label="Did you fall today"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Use of tools</FormLabel>
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
                                                                            label="Can you use your tools"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Ask for Food </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Have you eaten </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_food_eaten_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_food_eaten_condition === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_food_eaten_condition === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Water </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Have you been trinkung </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_water_trinkung">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_water_trinkung === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_water_trinkung === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Toilet situation </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Could you go to the Toilet</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_toilet_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_toilet_situation === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_toilet_situation === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Pain Status</p>
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
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>Picture with Scale</label>
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
                                                                        <label>Amount of wounds </label>
                                                                        <input
                                                                            type="number"
                                                                            name="day_thrombose_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.day_thrombose_amount_of_wounds}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="day_thrombose_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_situation === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.day_thrombose_situation === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Depression Risk</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                    <FormLabel>what was good today</FormLabel>
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
                                                                                label="Can the Patient tell somethink Good this Day"
                                                                            />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Disorientation Level</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for News of the Day </FormLabel>
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
                                                                            label="Can the Patient tell you a news of the Days"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Name of Family Members</FormLabel>
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
                                                                            label="Does the Patient remebmer the Name of a Family Memer"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Sanitary Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for Incidents</FormLabel>
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
                                                                            label="No Incidents at the Sanitary Situation"
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
                                                                <p>Pneunomie Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
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
                                                                            label="Second Day"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Sound Recording auscultation/ tech_development</FormLabel>
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
                                                                            label="Second Day"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Nutrition Situation </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Fruits</FormLabel>
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
                                                                            label="Have you eaten Fruits"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Protein</FormLabel>
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
                                                                            label="Have you eaten Meat / Egg / Beans"
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
                                                                <p>Anamnesis</p>
                                                                {/* <Grid className="anamneSec"> */}
                                                                <Grid className="bloodPrseure">
                                                                    <label>Blood pressure</label>
                                                                    <Grid container direction="row" spacing="1">
                                                                        <Grid item md={6} sm={6}>
                                                                            <Grid className="fillDia">
                                                                                <MMHG
                                                                                    name="week_rr_systolic"
                                                                                    Unit="mmHg"
                                                                                    label={rr_systolic}
                                                                                    onChange={(e) => updateAllEntrySec(this, e)}
                                                                                    value={
                                                                                        dailyForm
                                                                                            ? allQuestionData?.week_rr_systolic
                                                                                            : ''
                                                                                    }
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
                                                                                    value={allQuestionData?.week_rr_diastolic}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>Weight</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_anamnesis_weight"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_anamnesis_weight}
                                                                        />
                                                                    </Grid>
                                                                    <Grid className="measureInput">
                                                                        <label>Measure diameter Leg</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_anamnesis_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_anamnesis_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
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
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Decubitus Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>Picture with Scale</label>
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
                                                                        <label>Amount of wounds</label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_decubitus_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_decubitus_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_decubitus_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_decubitus_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_decubitus_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid className="measureInput">
                                                                        <label>Measure diameter Leg </label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_thrombose_diameter_leg"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_thrombose_diameter_leg}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_diameter_leg_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_diameter_leg_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_diameter_leg_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Falling Risk </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for incidents</FormLabel>
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
                                                                            label="Did you fall today"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Use of tools</FormLabel>
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
                                                                            label="Can you use your tools"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Ask for Food </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Have you eaten </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_food_eaten">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_food_eaten === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_food_eaten === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Water </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Have you been trinkung </FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_water_trinkung">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_water_trinkung === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_water_trinkung === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec anamneSecDbl">
                                                                    <label>Toilet situation </label>
                                                                    <FormControl className="inrLbl">
                                                                        <FormLabel id="Condition-Radio">Could you go to the Toilet</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_toilet_situation">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_toilet_situation === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_toilet_situation === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Pain Status</p>
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
                                                                <p>Thrombose Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <Grid>
                                                                        <label>Picture with Scale</label>
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
                                                                        <label>Amount of wounds </label>
                                                                        <input
                                                                            type="number"
                                                                            name="week_thrombose_amount_of_wounds"
                                                                            onChange={(e) => updateAllEntrySec(this, e)}
                                                                            value={allQuestionData?.week_thrombose_amount_of_wounds || ''}
                                                                        />
                                                                    </Grid>
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_thrombose_condition">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_condition === 'better'}
                                                                                value="better"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Better"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_thrombose_condition === 'worse'}
                                                                                value="worse"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Worse"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Depression Risk</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">what was good today</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_depression_good_today">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_depression_good_today === 'month If not acute daily'}
                                                                                value="month If not acute daily"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Month If not acute daily"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_depression_good_today === 'could the Patient tell somethink that was good to day'}
                                                                                value="could the Patient tell somethink that was good to day"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Could the Patient tell somethink that was good to day"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Disorientation Level</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for News of the Day </FormLabel>
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
                                                                            label="Can the Patient tell you a news of the Days"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>Name of Family Members</FormLabel>
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
                                                                            label="Does the Patient remebmer the Name of a Family Memer"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="anamneSecMid">
                                                                <p>Sanitary Situation</p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel>ask for Incidents</FormLabel>
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
                                                                            label="No Incidents at the Sanitary Situation"
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
                                                                <p>Falling Risk </p>
                                                                <Grid className="anamneSec">
                                                                    <FormControl>
                                                                        <FormLabel id="Condition-Radio">timed up and go (2 Weeks)</FormLabel>
                                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="week_anamnesis_falling_up_go">
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_falling_up_go === 'yes'}
                                                                                value="yes"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="Yes"
                                                                            />
                                                                            <FormControlLabel
                                                                                checked={this.state.allQuestionData?.week_anamnesis_falling_up_go === 'no'}
                                                                                value="no"
                                                                                onChange={(e) => updateAllEntrySec(this, e)}
                                                                                control={<Radio />}
                                                                                label="No"
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid className="anamneSecMid">
                                                                    <p>Depression Risk</p>
                                                                    <Grid className="anamneSec">
                                                                        <FormControl>
                                                                            <FormLabel>what was good today</FormLabel>
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
                                                                                label="Can the Patient tell somethink Good this Day"
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
                                                                <p>Anamnesis</p>
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
                                                                <FormLabel id="main-topic-counted">Feeding</FormLabel>
                                                                <RadioGroup aria-labelledby="main-topic-counted" name="quarter_feeding">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding === 'dependent in all aspects and needs to be fed'}
                                                                        value="dependent in all aspects and needs to be fed"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Dependent in all aspects and needs to be fed."
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding === 'can manipulate an eating device, usually a spoon, but someone must provide active assistance during the meal'}
                                                                        value="can manipulate an eating device, usually a spoon, but someone must provide active assistance during the meal"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Can manipulate an eating device, usually a spoon, but someone must provide active assistance during the meal."
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding === 'able to feed self with supervision. Assistance is required with associated tasks such as putting milk/sugar into tea, salt, pepper,spreading butter, turning a plate or other “set up” activities'}
                                                                        value="able to feed self with supervision. Assistance is required with associated tasks such as putting milk/sugar into tea, salt, pepper,spreading butter, turning a plate or other “set up” activities"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Able to feed self with supervision. Assistance is required with associated tasks such as putting milk/sugar into tea, salt, pepper,spreading butter, turning a plate or other “set up” activities."
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding === 'independence in feeding with prepared tray, except may need meat cut, milk carton opened or jar lid etc. The presence of another person is not required'}
                                                                        value="independence in feeding with prepared tray, except may need meat cut, milk carton opened or jar lid etc. The presence of another person is not required"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Independence in feeding with prepared tray, except may need meat cut, milk carton opened or jar lid etc. The presence of another person is not required."
                                                                    />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_feeding === 'the patient can feed self from a tray or table when someone puts the food within reach. The patient must put on an assistive device if needed, cut food, and if desired use salt and pepper, spread butter, etc..'}
                                                                        value="the patient can feed self from a tray or table when someone puts the food within reach. The patient must put on an assistive device if needed, cut food, and if desired use salt and pepper, spread butter, etc.."
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient can feed self from a tray or table when someone puts the food within reach. The patient must put on an assistive device if needed, cut food, and if desired use salt and pepper, spread butter, etc.."
                                                                    />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Chair-Bed-Transfers">Chair/Bed Transfers</FormLabel>
                                                                <RadioGroup aria-labelledby="Chair-Bed-Transfers" name="quarter_chair_bed_transfer">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer === 'unable to participate in a transfer. Two attendants are required to transfer the patient with or without a mechanical device.'}
                                                                        value="unable to participate in a transfer. Two attendants are required to transfer the patient with or without a mechanical device."
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Unable to participate in a transfer. Two attendants are required to transfer the patient with or without a mechanical device." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer === 'able to participate but maximum assistance of one other person is require in all aspects of the transfer'}
                                                                        value="able to participate but maximum assistance of one other person is require in all aspects of the transfer"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Able to participate but maximum assistance of one other person is require in all aspects of the transfer." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer === 'the presence of another person is required either as a confidence measure, to provide supervision for safety'}
                                                                        value="the presence of another person is required either as a confidence measure, to provide supervision for safety"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The presence of another person is required either as a confidence measure, to provide supervision for safety." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer === 'the patient can safety approach the bed walking or in a wheelchair, look breaks, lift footrest, or position walking aid, move safely to bed, lie down, come to a sitting position on the side of the bed, chnage the position of the wheelchair, transfer back into it safely'}
                                                                        value="the patient can safety approach the bed walking or in a wheelchair, look breaks, lift footrest, or position walking aid, move safely to bed, lie down, come to a sitting position on the side of the bed, chnage the position of the wheelchair, transfer back into it safely"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient can safety approach the bed walking or in a wheelchair, look breaks, lift footrest, or position walking aid, move safely to bed, lie down, come to a sitting position on the side of the bed, chnage the position of the wheelchair, transfer back into it safely." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_chair_bed_transfer === 'the patient must be independent in all phases of this activity'}
                                                                        value="the patient must be independent in all phases of this activity"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient must be independent in all phases of this activity." />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Ambulation">Ambulation</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Ambulation" name="quarter_ambulation">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_ambulation === 'dependent in ambulation'}
                                                                        value="dependent in ambulation"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Dependent in ambulation." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_ambulation === 'constant presence of one or more assistant is required during ambulation'}
                                                                        value="constant presence of one or more assistant is required during ambulation"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Constant presence of one or more assistant is required during ambulation." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_ambulation === 'assistance is required with reaching aids and/ or their manipulation. One person is required to offer assistance'}
                                                                        value="assistance is required with reaching aids and/ or their manipulation. One person is required to offer assistance"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Assistance is required with reaching aids and/ or their manipulation. One person is required to offer assistance." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_ambulation === 'the patient is independent in ambulation but unable to walk 50 metres/yards without help, or supervision in needed for confidence or safety in hazardous situations'}
                                                                        value="the patient is independent in ambulation but unable to walk 50 metres/yards without help, or supervision in needed for confidence or safety in hazardous situations"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient is independent in ambulation but unable to walk 50 metres/yards without help, or supervision in needed for confidence or safety in hazardous situations. " />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_ambulation === 'the patient must be able to wear braces if required, lock and unlock these braces assume standing position, sit down and place the necessary aids into position for use. The patient must be able to crutches, canes, or a walkarette, and walk 50 meters/yards without help or Supervision'}
                                                                        value="the patient must be able to wear braces if required, lock and unlock these braces assume standing position, sit down and place the necessary aids into position for use. The patient must be able to crutches, canes, or a walkarette, and walk 50 meters/yards without help or Supervision"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient must be able to wear braces if required, lock and unlock these braces assume standing position, sit down and place the necessary aids into position for use. The patient must be able to crutches, canes, or a walkarette, and walk 50 meters/yards without help or Supervision." />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Wheelchair" className="wheelChr">
                                                                    Wheelchair Management
                                                                    <span>(*Only use this item if the patient is rated “0” for ambulation, and then only if the patient has been trained in w/c management.)</span>
                                                                </FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Wheelchair" name="quarter_wheelchair_management">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management === 'dependent in wheelchair ambulation'}
                                                                        value="dependent in wheelchair ambulation"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Dependent in wheelchair ambulation." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management === 'patient can propel self  short distance on flat surface, but assistance is required for all other steps of wheelchair management'}
                                                                        value="patient can propel self  short distance on flat surface, but assistance is required for all other steps of wheelchair management"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Patient can propel self  short distance on flat surface, but assistance is required for all other steps of wheelchair management." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management === 'presence of one person is necessary and constant assistance is required to manipulate chair to table, bed, etc'}
                                                                        value="presence of one person is necessary and constant assistance is required to manipulate chair to table, bed, etc"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Presence of one person is necessary and constant assistance is required to manipulate chair to table, bed, etc." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management === 'the patient can propel self for a reasonable duration over regularly encountered terrain. Minimal assistance may still be required in “tight corners” or to negotiate a kerb 100mm high'}
                                                                        value="the patient can propel self for a reasonable duration over regularly encountered terrain. Minimal assistance may still be required in “tight corners” or to negotiate a kerb 100mm high"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient can propel self for a reasonable duration over regularly encountered terrain. Minimal assistance may still be required in “tight corners” or to negotiate a kerb 100mm high." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_wheelchair_management === 'To propel wheelchair independently, the patient must be able to go around corners, turn around, manoeuvre the chair to a table, bed, toilet, etc. The patient must be able to push a chair at least 50 meters and negotiate a kerb'}
                                                                        value="To propel wheelchair independently, the patient must be able to go around corners, turn around, manoeuvre the chair to a table, bed, toilet, etc. The patient must be able to push a chair at least 50 meters and negotiate a kerb"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="To propel wheelchair independently, the patient must be able to go around corners, turn around, manoeuvre the chair to a table, bed, toilet, etc. The patient must be able to push a chair at least 50 meters and negotiate a kerb." />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Stairs">Stairs</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Stairs" name="quarter_stairs">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs === 'the patient is unable to climb stairs'}
                                                                        value="the patient is unable to climb stairs"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="The patient is unable to climb stairs." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs === 'assistance is required in all aspects of stairclimbing, including assistance with walking aids'}
                                                                        value="assistance is required in all aspects of stairclimbing, including assistance with walking aids"
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        control={<Radio />}
                                                                        label="Assistance is required in all aspects of stairclimbing, including assistance with walking aids." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs === 'the patient is able to ascend/desend but is unable to carry walking aids and needs supervision and assistance'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is able to ascend/desend but is unable to carry walking aids and needs supervision and assistance"
                                                                        control={<Radio />}
                                                                        label="The patient is able to ascend/desend but is unable to carry walking aids and needs supervision and assistance." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs === 'generally no assistance is required. At times supervision is required for safety due to morning stiffness, shortness of breath, etc'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="generally no assistance is required. At times supervision is required for safety due to morning stiffness, shortness of breath, etc"
                                                                        control={<Radio />}
                                                                        label="Generally no assistance is required. At times supervision is required for safety due to morning stiffness, shortness of breath, etc." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_stairs === 'the patient is able to go up and down a flight of stairs safety without help or supervision. The patient is able to use hand rails, cane or Crutches when needed and is able to carry these devices as he/she ascends or descends'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is able to go up and down a flight of stairs safety without help or supervision. The patient is able to use hand rails, cane or Crutches when needed and is able to carry these devices as he/she ascends or descends"
                                                                        control={<Radio />}
                                                                        label="The patient is able to go up and down a flight of stairs safety without help or supervision. The patient is able to use hand rails, cane or Crutches when needed and is able to carry these devices as he/she ascends or descends." />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-OnOff">On and Off the Toilet</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-OnOff" name="quarter_on_and_off_toilet">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet === 'fully dependent in toileting'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="fully dependent in toileting"
                                                                        control={<Radio />}
                                                                        label="Fully dependent in toileting." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet === 'assistance required in all aspects of toileting'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="assistance required in all aspects of toileting"
                                                                        control={<Radio />}
                                                                        label="Assistance required in all aspects of toileting." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet === 'assistance may be required with management of clothing, transferring, or washing hands'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="assistance may be required with management of clothing, transferring, or washing hands"
                                                                        control={<Radio />}
                                                                        label="Assistance may be required with management of clothing, transferring, or washing hands." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet === 'supervision may be required for safety with normal toilet. A commode may be used at night but assistance is required for emptying and cleaning'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="supervision may be required for safety with normal toilet. A commode may be used at night but assistance is required for emptying and cleaning"
                                                                        control={<Radio />}
                                                                        label="Supervision may be required for safety with normal toilet. A commode may be used at night but assistance is required for emptying and cleaning." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_on_and_off_toilet === 'the patient is able to get on/off the toilet, fasten clothing and use toilet paper without help. If necessary, the patient may use a bed pan or Commode or urinal at night, but must be able to empty it and clean it'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is able to get on/off the toilet, fasten clothing and use toilet paper without help. If necessary, the patient may use a bed pan or Commode or urinal at night, but must be able to empty it and clean it"
                                                                        control={<Radio />}
                                                                        label="The patient is able to get on/off the toilet, fasten clothing and use toilet paper without help. If necessary, the patient may use a bed pan or Commode or urinal at night, but must be able to empty it and clean it." />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Ambulation">Bowels</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Ambulation" name="quarter_bowels">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels === 'the patient is bowel incontient'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is bowel incontient"
                                                                        control={<Radio />}
                                                                        label="The patient is bowel incontient." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels === 'the patient needs help to assume appropriate position, and with bowel movement facilitatory techniques'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient needs help to assume appropriate position, and with bowel movement facilitatory techniques"
                                                                        control={<Radio />}
                                                                        label="The patient needs help to assume appropriate position, and with bowel movement facilitatory techniques." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels === 'the patient can assume appropriate position, but can not use facilitatory techniques or clean self without assistance and has frequent accident. Assistance is required with incontinence aids such as pad, etc'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient can assume appropriate position, but can not use facilitatory techniques or clean self without assistance and has frequent accident. Assistance is required with incontinence aids such as pad, etc"
                                                                        control={<Radio />}
                                                                        label="The patient can assume appropriate position, but can not use facilitatory techniques or clean self without assistance and has frequent accident. Assistance is required with incontinence aids such as pad, etc." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels === 'the patient may require supervision with the use of suppository or enema and has occasional accident'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient may require supervision with the use of suppository or enema and has occasional accident"
                                                                        control={<Radio />}
                                                                        label="The patient may require supervision with the use of suppository or enema and has occasional accident." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bowels === 'the patient can control bowels and has no accidents, can use suppository, or take an enema when necessary'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient can control bowels and has no accidents, can use suppository, or take an enema when necessary"
                                                                        control={<Radio />}
                                                                        label="The patient can control bowels and has no accidents, can use suppository, or take an enema when necessary." />
                                                                </RadioGroup>
                                                            </FormControl>

                                                            <FormControl className="selectOption">
                                                                <FormLabel id="Radio-Bladder">Bladder</FormLabel>
                                                                <RadioGroup aria-labelledby="Radio-Bladde" name="quarter_bladder">
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder === 'the patient is dependent in bladder management, is incontinent, or has indwelling catheter'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is dependent in bladder management, is incontinent, or has indwelling catheter"
                                                                        control={<Radio />}
                                                                        label="The patient is dependent in bladder management, is incontinent, or has indwelling catheter." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder === 'the patient is incontinent but is able to assist with the application of an internal or external device'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is incontinent but is able to assist with the application of an internal or external device"
                                                                        control={<Radio />}
                                                                        label="The patient is incontinent but is able to assist with the application of an internal or external device." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder === 'the patient is generally dry by day, but not at night and needs some assistance with the devices'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is generally dry by day, but not at night and needs some assistance with the devices"
                                                                        control={<Radio />}
                                                                        label="The patient is generally dry by day, but not at night and needs some assistance with the devices." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder === 'the patient is generally dry by day and night, but may have an occasional accident or need minimal assistance with internal or external devices'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is generally dry by day and night, but may have an occasional accident or need minimal assistance with internal or external devices"
                                                                        control={<Radio />}
                                                                        label="The patient is generally dry by day and night, but may have an occasional accident or need minimal assistance with internal or external devices." />
                                                                    <FormControlLabel
                                                                        checked={this.state.allQuestionData?.quarter_bladder === 'the patient is able to control bladder day and night, and/or is independent with internal or external devices'}
                                                                        onChange={(e) => updateAllEntrySec(this, e)}
                                                                        value="the patient is able to control bladder day and night, and/or is independent with internal or external devices"
                                                                        control={<Radio />}
                                                                        label="The patient is able to control bladder day and night, and/or is independent with internal or external devices." />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </Grid>}
                                        <Grid className="infoShwSave3">
                                            <input
                                                type="submit"
                                                value="Submit"
                                                onClick={() => handleSubmit(this)}
                                            />
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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

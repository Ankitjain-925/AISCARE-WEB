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


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item || {},
            openModal: this.props.openModal,
            settings: this.props.settings
        };
    }

    componentDidUpdate = (prevProps) => {
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
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    closeFullQues = () => {
        this.props.closeFullQues();
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            blood_sugar,
            Hba1c,
            situation,
            visible,
            show,
            date,
            time,
            hide,
            until,
            visibility,
            edit,
            Delete,
            not_mentioned,
            always,
            VeiwGraph,
            img_files,
            details,
            Change,
            archive,
            de_archive,
            Download,
            nurse_questionnaire,
            daily,
            Daily,
            every_2_week,
            all_2_days,
            quarter,
            full_information,
            care_quationnary,
        } = translate;
        var item = this.state.item;
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
                    <Grid className="creatTaskModel creatTaskModel11">
                        <Grid className="creatTaskCntnt">
                            <Grid>
                                <Grid container direction="row" justify="center" className="addSpeclLbl">
                                    <Grid item xs={8} md={8} lg={8}>
                                        <label>Details</label>
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

                                            {item?.questionnaire_type === "quarter" && (
                                                <Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Feeding</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_feeding)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Chair/Bed Transfers</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_chair_bed_transfer)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Ambulation</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_ambulation)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Wheelchair Management</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_wheelchair_management)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Stairs</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_stairs)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>On and Off the Toilet</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_on_and_off_toilet)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Bowels</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_bowels)}</p>
                                                    </Grid>
                                                    <Grid className="allQuestionShow1">
                                                        <h1>Bladder</h1>
                                                        <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_bladder)}</p>
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {item?.questionnaire_type === "two_weeks" && (
                                                <Grid className="MainclassQues">
                                                    <Grid>
                                                        <h1>Anamnesis</h1>
                                                        <h3>Blood pressure</h3>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={3} md={3}>
                                                                <label>Systolic</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_rr_systolic}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={3} md={3}>
                                                                <label>Diastolic</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_rr_diastolic}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={3} md={3}>
                                                                <label>Weight</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_anamnesis_weight}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={3} md={3}>
                                                                <label>Measure diameter Leg</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_anamnesis_diameter_leg}
                                                                </p>
                                                            </Grid>
                                                        </Grid>


                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Decubitus Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.week_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.week_decubitus_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>Measure diameter Leg </label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_thrombose_diameter_leg}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.week_thrombose_diameter_leg_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Falling Risk</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>Ask for incidents</label>
                                                                {item?.questionnaire_answers?.week_falling_risk_ask_for_incident && <p>Fall today</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>Use of tools</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_falling_risk_use_of_tools && <p>use yours tools</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Ask for Food</h3>
                                                                <label>Have you eaten</label>
                                                                {item?.questionnaire_answers?.week_thrombose_food_eaten === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Water</h3>
                                                                <label>Have you been trinkung</label>
                                                                {item?.questionnaire_answers?.week_thrombose_water_trinkung === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Toilet situation</h3>
                                                                <label>Could you go to the Toilet</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_thrombose_toilet_situation === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>Pain Status</label>
                                                        <p>{item?.questionnaire_answers?.week_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.week_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.week_thrombose_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.week_thrombose_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Depression Risk</h1>
                                                        <label>What was good today</label>
                                                        {item?.questionnaire_answers?.week_decubitus_conditionweek_depression_good_today === 'month If not acute daily' ?
                                                            <p>Month If not acute daily</p> : <p>Could the Patient tell somethink that was good to day</p>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Disorientation Level</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Ask for News of the Day</h3>
                                                                <label>Can the Patient tell you a news of the Days</label>
                                                                {item?.questionnaire_answers?.week_disorientation_level_ask_for_news ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Name of Family Members</h3>
                                                                <label>Does the Patient remebmer the Name of a Family Memer</label>
                                                                {item?.questionnaire_answers?.week_disorientation_level_family_member ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Sanitary Situation</h1>
                                                        <h3>Ask for Incidents</h3>
                                                        <label>No Incidents at the Sanitary Situation</label>
                                                        {item?.questionnaire_answers?.week_sanitary_situation_ask_for_incidents ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Falling Risk</h1>
                                                        <label>Timed up and go (2 Weeks)</label>
                                                        {item?.questionnaire_answers?.week_anamnesis_falling_up_go === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Depression Risk</h1>
                                                        <h3>What was good today (every 2 Weeks  If not acute daily)</h3>
                                                        <label>Can the Patient tell somethink Good this Day</label>
                                                        {item?.questionnaire_answers?.week_depression_risk_good_today ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>
                                                </Grid>

                                            )}
                                            {item?.questionnaire_type === "two_days" && (
                                                <Grid className="MainclassQues">
                                                    <Grid>
                                                        <h1>Anamnesis</h1>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Blood pressure</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Systolic</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.day_rr_systolic}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Diastolic</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.day_rr_diastolic}
                                                                        </p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {item && item?.questionnaire_answers?.day_Sick === 'yes' &&
                                                                <Grid xs={6} md={6}>
                                                                    <h3>Sick</h3>
                                                                    <Grid container xs={12} md={12}>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>Weight</label>
                                                                            <p>
                                                                                {item?.questionnaire_answers?.day_anamnesis_weight}
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>o2 Saturation</label>
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
                                                            <h1>Decubitus Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.day_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.day_decubitus_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Falling Risk</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>Ask for incidents</label>
                                                                {item?.questionnaire_answers?.day_falling_risk_incident && <p>Fall today</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>Use of tools</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_falling_risk_use_of_tools && <p>use yours tools</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Ask for Food</h3>
                                                                <label>Have you eaten</label>
                                                                {item?.questionnaire_answers?.day_thrombose_food_eaten_condition === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Water</h3>
                                                                <label>Have you been trinkung</label>
                                                                {item?.questionnaire_answers?.day_thrombose_water_trinkung === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Toilet situation</h3>
                                                                <label>Could you go to the Toilet</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_thrombose_toilet_situation === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>Pain Status</label>
                                                        <p>{item?.questionnaire_answers?.day_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.day_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.day_thrombose_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.day_thrombose_situation === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Depression Risk</h1>
                                                        <h3>What was good today (every 2 Weeks  If not acute daily)</h3>
                                                        <label>Can the Patient tell somethink Good this Day</label>
                                                        {item?.questionnaire_answers?.day_depression_good_today ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Disorientation Level</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Ask for News of the Day</h3>
                                                                <label>Can the Patient tell you a news of the Days</label>
                                                                {item?.questionnaire_answers?.day_disorientation_level_ask_for_news ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Name of Family Members</h3>
                                                                <label>Does the Patient remebmer the Name of a Family Memer</label>
                                                                {item?.questionnaire_answers?.day_disorientation_level_family_member ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Sanitary Situation</h1>
                                                        <h3>Ask for Incidents</h3>
                                                        <label>No Incidents at the Sanitary Situation</label>
                                                        {item?.questionnaire_answers?.day_sanitary_situation_ask_for_incident ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Pneunomie Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>o2 Saturation</h3>
                                                                <label>Second Day</label>
                                                                {item?.questionnaire_answers?.day_pneunomie_o2_saturation ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Sound Recording auscultation/ tech_development</h3>
                                                                <label>Second Day</label>
                                                                {item?.questionnaire_answers?.day_pneunomie_o2_sound_recording ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Nutrition Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Fruits</h3>
                                                                <label>Have you eaten Fruits</label>
                                                                {item?.questionnaire_answers?.day_nutrition_situation_fruits ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Protein</h3>
                                                                <label>Have you eaten Meat / Egg / Beans</label>
                                                                {item?.questionnaire_answers?.day_nutrition_situation_protein ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>



                                            )}
                                            {item?.questionnaire_type === "daily" && (
                                                <Grid className="MainclassQues">
                                                    <Grid>
                                                        <h1>Anamnesis</h1>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Blood pressure</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Systolic</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.daily_rr_systolic}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Diastolic</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.daily_rr_diastolic}
                                                                        </p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {item && item?.questionnaire_answers?.daily_diameter_leg === 'yes' &&
                                                                <Grid xs={6} md={6}>
                                                                    <h3>Diameter leg</h3>
                                                                    <Grid container xs={12} md={12}>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>Measure diameter Leg</label>
                                                                            <p>
                                                                                {item?.questionnaire_answers?.daily_anamnesis_diameter_leg}
                                                                            </p>
                                                                        </Grid>
                                                                        <Grid xs={6} md={6}>
                                                                            <label>Condition</label>
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
                                                            <h1>Decubitus Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.daily_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.daily_decubitus_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Falling Risk</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>Ask for incidents</label>
                                                                {item?.questionnaire_answers?.daily_falling_risk_incident_today && <p>Fall today</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>Use of tools</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_falling_risk_incident_today && <p>use yours tools</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Ask for Food</h3>
                                                                <label>Have you eaten</label>
                                                                {item?.questionnaire_answers?.daily_thrombose_food_eaten_condition === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Water</h3>
                                                                <label>Have you been trinkung</label>
                                                                {item?.questionnaire_answers?.daily_thrombose_water_trinkung === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Toilet situation</h3>
                                                                <label>Could you go to the Toilet</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_thrombose_toilet_situation === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>Pain Status</label>
                                                        <p>{item?.questionnaire_answers?.daily_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.daily_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.daily_thrombose_amout_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.daily_thrombose_situation === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Depression Risk</h1>
                                                        <h3>What was good today (every 2 Weeks  If not acute daily)</h3>
                                                        <label>Can the Patient tell somethink Good this Day</label>
                                                        {item?.questionnaire_answers?.daily_depression_good_today ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Disorientation Level</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Ask for News of the Day</h3>
                                                                <label>Can the Patient tell you a news of the Days</label>
                                                                {item?.questionnaire_answers?.daily_disorientation_level_patient_tell ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Name of Family Members</h3>
                                                                <label>Does the Patient remebmer the Name of a Family Memer</label>
                                                                {item?.questionnaire_answers?.daily_disorientation_level_family_member ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Sanitary Situation</h1>
                                                        <h3>Ask for Incidents</h3>
                                                        <label>No Incidents at the Sanitary Situation</label>
                                                        {item?.questionnaire_answers?.daily_sanitary_situation_incident ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {item?.questionnaire_type === "full" && (
                                                <Grid className="MainclassQues">
                                                    <Grid>
                                                        <h1>Anamnesis</h1>
                                                        <Grid container xs={12} md={12}>
                                                            <h3>Blood pressure</h3>
                                                            <Grid container xs={12} md={12}>
                                                                <Grid xs={6} md={6}>
                                                                    <label>Systolic</label>
                                                                    <p>
                                                                        {item?.questionnaire_answers?.full_rr_systolic}
                                                                    </p>
                                                                </Grid>
                                                                <Grid xs={6} md={6}>
                                                                    <label>Diastolic</label>
                                                                    <p>
                                                                        {item?.questionnaire_answers?.full_rr_diastolic}
                                                                    </p>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        {item && item?.questionnaire_answers?.full_diameter_leg === 'yes' &&
                                                            <Grid container xs={12} md={12}>
                                                                <h3>Diameter Leg</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Measure diameter Leg</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.full_anamnesis_diameter_leg}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Condition</label>
                                                                        {item?.questionnaire_answers?.full_anamnesis_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>}

                                                        {item && item?.questionnaire_answers?.full_Sick === 'yes' &&
                                                            <Grid container xs={12} md={12}>
                                                                <h3>Sick</h3>
                                                                <Grid container xs={12} md={12}>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>Weight</label>
                                                                        <p>
                                                                            {item?.questionnaire_answers?.full_anamnesis_weight}
                                                                        </p>
                                                                    </Grid>
                                                                    <Grid xs={6} md={6}>
                                                                        <label>o2 Saturation</label>
                                                                        <p>{item?.questionnaire_answers?.full_anamnesis_o2_saturation}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Decubitus Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.full_decubitus_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_decubitus_amount_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.full_decubitus_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Falling Risk</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <label>Ask for incidents</label>
                                                                {item?.questionnaire_answers?.full_falling_risk_incident_today && <p>Fall today</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <label>Use of tools</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_falling_risk_incident_tools && <p>use yours tools</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Ask for Food</h3>
                                                                <label>Have you eaten</label>
                                                                {item?.questionnaire_answers?.full_thrombose_food_eaten_condition === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Water</h3>
                                                                <label>Have you been trinkung</label>
                                                                {item?.questionnaire_answers?.full_thrombose_water_trinkung === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <h3>Toilet situation</h3>
                                                                <label>Could you go to the Toilet</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_thrombose_toilet_situation === 'yes' ? <p>Yes</p> : <p>No</p>}
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <Grid className="allQuestionShow1">
                                                        <label>Pain Status</label>
                                                        <p>{item?.questionnaire_answers?.full_thrombose_pain_status}</p>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Thrombose Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={4} md={4}>
                                                                <Grid className="SetImagesOn">
                                                                    <label>Picture with scale</label>
                                                                    <FileViews
                                                                        comesFrom='Picture_Task'
                                                                        attachfile={item?.questionnaire_answers?.full_thrombose_picture_with_scale}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Amount of wounds</label>
                                                                <p>
                                                                    {item?.questionnaire_answers?.full_thrombose_amout_of_wounds}
                                                                </p>
                                                            </Grid>
                                                            <Grid xs={4} md={4}>
                                                                <label>Condition</label>
                                                                {item?.questionnaire_answers?.full_thrombose_situation === "better" ? <p>Better</p> : <p>Worse</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Depression Risk</h1>
                                                        <h3>What was good today (every 2 Weeks  If not acute daily)</h3>
                                                        <label>Can the Patient tell somethink Good this Day</label>
                                                        {item?.questionnaire_answers?.full_depression_good_today ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>


                                                    <Grid>
                                                        <Grid>
                                                            <h1>Disorientation Level</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Ask for News of the Day</h3>
                                                                <label>Can the Patient tell you a news of the Days</label>
                                                                {item?.questionnaire_answers?.full_disorientation_level_patient_tell ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Name of Family Members</h3>
                                                                <label>Does the Patient remebmer the Name of a Family Memer</label>
                                                                {item?.questionnaire_answers?.full_disorientation_level_family_member ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="allQuestionShow1">
                                                        <h1>Sanitary Situation</h1>
                                                        <h3>Ask for Incidents</h3>
                                                        <label>No Incidents at the Sanitary Situation</label>
                                                        {item?.questionnaire_answers?.full_sanitary_situation_incident ? <p>Yes</p> : <p>No</p>}
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Pneunomie Situation</h1>
                                                        </Grid>
                                                        <Grid>
                                                            <label>Sound Recording auscultation/ tech_development</label>
                                                            {item?.questionnaire_answers?.full_pneunomie_o2_sound_recording ? <p>Yes</p> : <p>No</p>}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid>
                                                            <h1>Nutrition Situation</h1>
                                                        </Grid>
                                                        <Grid container xs={12} md={12}>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Fruits</h3>
                                                                <label>Have you eaten Fruits</label>
                                                                {item?.questionnaire_answers?.full_nutrition_situation_fruits ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                            <Grid xs={6} md={6}>
                                                                <h3>Protein</h3>
                                                                <label>Have you eaten Meat / Egg / Beans</label>
                                                                {item?.questionnaire_answers?.full_nutrition_situation_protein ? <p>Yes</p> : <p>No</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Feeding</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_feeding)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Chair/Bed Transfers</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_chair_bed_transfer)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Ambulation</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_ambulation)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Wheelchair Management</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_wheelchair_management)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Stairs</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_stairs)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>On and Off the Toilet</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_on_and_off_toilet)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Bowels</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_bowels)}</p>
                                                        </Grid>
                                                        <Grid className="allQuestionShow1">
                                                            <h1>Bladder</h1>
                                                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_bladder)}</p>
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

                {/* End of Model setup */}</Grid>
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
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import ReactTooltip from "react-tooltip";
import FileViews from "./../FileViews/index";
import { getDate, newdate, getTime, getImage } from "Screens/Components/BasicMethod/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel1 } from "../../GetMetaData/index.js";
import DownloadFullTrack from "Screens/Components/DownloadFullTrack/index.js";
import { LanguageFetchReducer } from "Screens/actions";
import CreatedBySec from "Screens/Components/TimelineComponent/CreatedBysec";
import { getLanguage } from "translations/index"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { pure } from "recompose";
import { Settings } from 'Screens/Login/setting';
import Modal from '@material-ui/core/Modal';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data || {},
      date_format: this.props.date_format,
      time_foramt: this.props.time_format,
      archive: this.props.archive,
      loggedinUser: this.props.loggedinUser,
      images: this.props.images,
      TrackRecord: this.props.TrackRecord,
      onlyOverview: this.props.onlyOverview,
      openModal: false,
      settings: this.props.settings
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.data !== this.props.data ||
      prevProps.loggedinUser !== this.props.loggedinUser
    ) {
      this.setState({
        item: this.props.data,
        loggedinUser: this.props.loggedinUser,
      });
    }
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
    if (prevProps.TrackRecord !== this.props.TrackRecord) {
      this.setState({ TrackRecord: this.props.TrackRecord });
    }
    if (prevProps.onlyOverview !== this.props.onlyOverview) {
      this.setState({ onlyOverview: this.props.onlyOverview });
    }
    if (prevProps.settings !== this.props.settings) {
      this.setState({ settings: this.props.settings });
    }
  };

  openFullInfo = () => {
    this.setState({ openModal: true });
  }

  closeFullInfo = () => {
    this.setState({ openModal: false });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
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
      full_information,
      care_quationnary,
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
      Falling_Risk,
      ask_for_incidents,
      Fall_today,
      Use_of_tools,
      Diameter_Leg,
      use_yours_tools,
      Submit,
      Sick,
      Weight,
      O2Saturation,
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
      The_patient_control_bowels_accidents,
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
    return (
      <Grid container direction="row" className="descpCntnt">
        <Grid item xs={12} md={1} className="descpCntntLft">
          {newdate(item.datetime_on)}
        </Grid>
        <Grid item xs={12} md={10} className="descpCntntRght">
          <Grid className="descpInerRght descpInerBlue">
            <Grid container direction="row" className="addSpc">
              <Grid item xs={12} md={6}>
                <Grid className="blodPrsurImg">
                  <a className="blodPrsurNote">
                    <img
                      src={require("assets/images/blood-pressure-sugar.svg")}
                      alt=""
                      title=""
                    />
                    <span>{care_quationnary}</span>
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid className="bp_vsblSec scndOptionIner1">
                  <a
                    onClick={() => this.props.EidtOption(item.type, item, true)}
                    className="bp_vsblEye"
                  >
                    <img
                      src={require("assets/images/eye2.png")}
                      alt=""
                      title=""
                    />{" "}
                    {item.visible === "show" ? (
                      <span>{visible}</span>
                    ) : item.visible === "hide" ? (
                      <span>{hide}</span>
                    ) : (
                      <span>{not_mentioned}</span>
                    )}{" "}
                  </a>
                  <a
                    className="vsblTime"
                    data-tip
                    data-for={item.track_id + "visibility"}
                  >
                    <img
                      src={require("assets/images/clock.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                  <ReactTooltip
                    className="timeIconClas"
                    id={item.track_id + "visibility"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    {item.visible === "show" ? (
                      <label>
                        {show} {until}
                      </label>
                    ) : (
                      <label>
                        {hide} {until}
                      </label>
                    )}
                    {item.public === "always" ? (
                      <p> {always} </p>
                    ) : (
                      <p>{getDate(item.public, this.state.date_format)}</p>
                    )}
                  </ReactTooltip>
                  <a className="openScndhrf1">
                    <a className="vsblDots">
                      <img
                        src={require("assets/images/nav-more.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                    {!this.props.Archive ? (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {archive}
                          </a>
                        </li>
                        {/* {this.props.comesfrom === "patient" && (
                          <li>
                            <a
                              onClick={() =>
                                this.props.EidtOption(item.type, item, true)
                              }
                            >
                              <img
                                src={require("assets/images/edit.svg")}
                                alt=""
                                title=""
                              />
                              {Change} {visibility}
                            </a>
                          </li>
                        )} */}
                        {/* {this.props.comesfrom !== "patient" && (
                          <li>
                            <a
                              onClick={() =>
                                this.props.EidtOption(item.type, item)
                              }
                            >
                              <img
                                src={require("assets/images/edit-1.svg")}
                                alt=""
                                title=""
                              />
                              {edit}
                            </a>
                          </li>
                        )} */}

                        {/* <li>
                          <a onClick={() => this.props.downloadTrack(item)}>
                            <img
                              src={require("assets/images/download.svg")}
                              alt=""
                              title=""
                            />
                            {Download}
                          </a>
                        </li> */}
                        <li>
                          <DownloadFullTrack
                            TrackRecord={this.state.TrackRecord}
                          />
                        </li>
                        {/* <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li> */}
                      </ul>
                    ) : (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {de_archive}
                          </a>
                        </li>
                        {/* <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li> */}
                      </ul>
                    )}
                  </a>
                </Grid>
              </Grid>
              <Grid className="clear"></Grid>
            </Grid>

            <Grid className="bp_hg addSpc">
              <label>
                <span>{item.questionary_type === "daily" ?
                  "Daily" : item.questionary_type === "two_days" ?
                    "Two Days" : item.questionary_type === "two_weeks" ?
                      "Two weeks" : item.questionary_type === "quarter" ? "Quarter" : "Full Questionnaire"}</span>
              </label>

            </Grid>

            <Collapsible
              trigger={<ExpandMoreIcon />}
              triggerWhenOpen={<ExpandLessIcon />}
              open={!this.state.onlyOverview}
            >
              {
                <Grid>
                  <Grid container direction="row" className="addSpc bpJohnMain">
                    <Grid item xs={12} md={12}>
                      <CreatedBySec data={item} />

                    </Grid>
                    <Grid className="clear"></Grid>
                  </Grid>
                  <Grid className="addSpc detailMark">
                    <Collapsible trigger={details} open="true">
                      <Grid className="detailCntnt">
                        <Grid container direction="row">
                          <Grid item xs={12} md={12} className="bloodPreBy">
                            {item && item?.questionary_type === "quarter" &&
                              <Grid className="stndQues stndQues1">
                                <Grid className="MainclassQues">
                                  <Grid container direction="row">
                                    <Grid className="allQuestionShow1">
                                      <h1>{Feeding}</h1>
                                      <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_feeding)}</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>}
                            {item && item?.questionary_type === "two_weeks" &&
                              <Grid className="stndQues stndQues1">
                                <Grid className="MainclassQues">
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
                                </Grid>
                              </Grid>}
                            {item && item?.questionary_type === "two_days" &&
                              <Grid className="stndQues stndQues1">
                                <Grid className="MainclassQues">
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
                                              <label>{O2Saturation}</label>
                                              <p>
                                                {item?.questionnaire_answers?.day_anamnesis_o2_saturation}
                                              </p>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      }
                                    </Grid>
                                  </Grid>
                                </Grid>

                              </Grid>}
                            {item && item?.questionary_type === "daily" &&
                              <Grid className="stndQues stndQues1">
                                <Grid className="MainclassQues">
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
                                </Grid>
                              </Grid>
                            }
                            {item?.questionary_type === "full" && (
                              <Grid className="stndQues stndQues1">
                                <Grid className="MainclassQues MainclassQues1">
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
                                            <label>{O2Saturation}</label>
                                            <p>{item?.questionnaire_answers?.full_anamnesis_o2_saturation}</p>
                                          </Grid>
                                        </Grid>
                                      </Grid>}
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>

                        </Grid>
                        <Grid className="bp_graph FullInfoSet">

                          <Grid>
                            <a onClick={() => this.openFullInfo()}>
                              {full_information}
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapsible>
                  </Grid>
                </Grid>}
            </Collapsible>
          </Grid>
        </Grid>
        {/* Model setup */}
        <Modal
          open={this.state.openModal}
          onClose={() => this.closeFullInfo()}
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
                    <label>{Details}</label>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Grid>
                      <Grid className="entryCloseBtn">
                        <a onClick={() => this.closeFullInfo()}>
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
                {/* <Grid container direction="row">
                   <Grid item xs={8} md={8} lg={8}>
                                    <label>{Details}</label>
                                </Grid>
                                 <Grid item xs={4} md={4} lg={4}>
                    <Grid className="creatLbl">
                      <Grid className="creatLblClose createLSet">
                        <a onClick={() => this.closeFullInfo()}>
                          <img
                            src={require('assets/images/close-search.svg')}
                            alt=""
                            title=""
                          />
                        </a>
                      </Grid>
                      </Grid>
                    </Grid>
                  </Grid> */}

                <Grid
                  container
                  direction="row"
                  className="setDetail-eval"
                >
                  <Grid item xs={12} md={12} className="taskDescp">
                    <Grid className="stndQues stndQues1 allQuestionShow">

                      {item?.questionary_type === "quarter" && (
                        <Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Feeding}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_feeding)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Chair_Bed_Transfers}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_chair_bed_transfer)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Ambulation}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_ambulation)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Wheelchair_Management}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_wheelchair_management)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Stairs}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_stairs)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{On_and_off_Toilet}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_on_and_off_toilet)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Bowels}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_bowels)}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>{Bladder}</h1>
                            <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.quarter_bladder)}</p>
                          </Grid>
                        </Grid>
                      )}
                      {item?.questionary_type === "two_weeks" && (
                        <Grid className="MainclassQues">
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

                            {/* <Grid container xs={12} md={12}>
                              <Grid xs={4} md={4}>
                                <label>Weight</label>
                                <p>
                                  {item?.questionnaire_answers?.week_anamnesis_weight}
                                </p>
                              </Grid>
                              <Grid xs={4} md={4}>
                                <label>Measure_diameter_Leg</label>
                                <p>
                                  {item?.questionnaire_answers?.week_anamnesis_diameter_leg}
                                </p>
                              </Grid>
                              <Grid xs={4} md={4}>
                                <label>Condition</label>
                                {item?.questionnaire_answers?.week_anamnesis_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                              </Grid>
                            </Grid> */}
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
                              <h1>{Thrombose_Situation}</h1>
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
                              <h1>{Thrombose_Situation}</h1>
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
                      {item?.questionary_type === "two_days" && (
                        <Grid className="MainclassQues">
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
                                      <label>{O2Saturation}</label>
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
                              <h1>{Thrombose_Situation}</h1>
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
                              <h1>{Thrombose_Situation}</h1>
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
                            <h3>{what_was_today}(every 2 Weeks  If not acute daily)</h3>
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
                                <h3>{O2Saturation}</h3>
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
                      {item?.questionary_type === "daily" && (
                        <Grid className="MainclassQues">
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
                              <h1>{Thrombose_Situation}</h1>
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
                              <h1>{Thrombose_Situation}</h1>
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
                            <h3>{what_was_today}(every 2 Weeks  If not acute daily)</h3>
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
                      {item?.questionary_type === "full" && (
                        <Grid className="MainclassQues">
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
                                    <label>{O2Saturation}</label>
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
                              <h1>{Thrombose_Situation}</h1>
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
                              <h1>{Thrombose_Situation}</h1>
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
                            <h3>{what_was_today} (every 2 Weeks  If not acute daily)</h3>
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
                                {item?.questionnaire_answers?.full_nutrition_situation_fruits ? <p>{Yes}</p> : <p>{No}</p>}
                              </Grid>
                              <Grid xs={6} md={6}>
                                <h3>{Protein}</h3>
                                <label>{Have_you_eaten_Meat}</label>
                                {item?.questionnaire_answers?.full_nutrition_situation_protein ? <p>{Yes}</p> : <p>{No}</p>}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Feeding}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_feeding)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Chair_Bed_Transfers}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_chair_bed_transfer)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Ambulation}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_ambulation)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Wheelchair_Management}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_wheelchair_management)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Stairs}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_stairs)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{On_and_off_Toilet}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_on_and_off_toilet)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Bowels}</h1>
                              <p>{this.capitalizeFirstLetter(item?.questionnaire_answers?.full_bowels)}</p>
                            </Grid>
                            <Grid className="allQuestionShow1">
                              <h1>{Bladder}</h1>
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

        {/* End of Model setup */}
      </Grid>

    );
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

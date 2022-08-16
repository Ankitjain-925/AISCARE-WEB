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
      openModal: false
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
  };

  openFullInfo = () => {
    this.setState({ openModal: true });
  }

  closeFullInfo = () => {
    this.setState({ openModal: false });
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
                    <span>{'Care Quationnary'}</span>
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
                        {this.props.comesfrom === "patient" && (
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
                        )}
                        {this.props.comesfrom !== "patient" && (
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
                        )}

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
                        <li>
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
                        </li>
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
                        <li>
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
                        </li>
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
                    "Two Days" : item.questionary_type === "two_weeks" ? "Two weeks" : "Quarter"}</span>
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
                  {console.log('itemsss', item)}
                  <Grid className="addSpc detailMark">
                    <Collapsible trigger={details} open="true">
                      <Grid className="detailCntnt">
                        <Grid container direction="row">
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>{Daily}</label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>{item.blood_sugar && item.blood_sugar}</span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>{every_2_week}</label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>
                                  {item.situation &&
                                    GetShowLabel1(
                                      this.props.list,
                                      item.situation.value,
                                      this.props.stateLanguageType,
                                      true
                                    )}</span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>{all_2_days}</label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>{item.Hba1c && item.Hba1c}</span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>
                                  {quarter}
                                </label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>
                                  {item.date_measured &&
                                    getDate(
                                      item.date_measured,
                                      this.state.date_format
                                    )}{" "}
                                  {item.time_measured &&
                                    ", " +
                                    getTime(
                                      new Date(item.time_measured),
                                      this.state.time_foramt
                                    )}
                                </span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid className="clear"></Grid>
                        </Grid>
                        <Grid className="bp_graph">

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
                <Grid container direction="row">
                  <Grid item xs={12} md={12}>
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
                      <label>Details</label>
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

                      {item?.questionary_type === "quarter" && (
                        <Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Feeding</h1>
                            <p>{item?.questionnaire_answers?.quarter_feeding}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Chair/Bed Transfers</h1>
                            <p>{item?.questionnaire_answers?.quarter_chair_bed_transfer}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Ambulation</h1>
                            <p>{item?.questionnaire_answers?.quarter_ambulation}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Wheelchair Management</h1>
                            <p>{item?.questionnaire_answers?.quarter_wheelchair_management}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Stairs</h1>
                            <p>{item?.questionnaire_answers?.quarter_stairs}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>On and Off the Toilet</h1>
                            <p>{item?.questionnaire_answers?.quarter_on_and_off_toilet}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Bowels</h1>
                            <p>{item?.questionnaire_answers?.quarter_bowels}</p>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Bladder</h1>
                            <p>{item?.questionnaire_answers?.quarter_bladder}</p>
                          </Grid>
                        </Grid>
                      )}
                      {item?.questionary_type === "two_weeks" && (
                        <Grid>
                          <Grid>
                            <Grid>
                              <h1>Anamnesis</h1>
                              <h3>Blood pressure</h3>
                            </Grid>
                            <Grid container xs={12} md={12}>
                              <Grid xs={6} md={6}>
                                <label>rr_systolic</label>
                                <p>
                                  {item?.questionnaire_answers?.week_rr_systolic}
                                </p>
                              </Grid>
                              <Grid xs={6} md={6}>
                                <label>RR_diastolic</label>
                                <p>
                                  {item?.questionnaire_answers?.week_rr_diastolic}
                                </p>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid className="allQuestionShow1">
                            <h1>Condition</h1>
                            {item?.questionnaire_answers?.week_anamnesis_condition === "better" ? <p>Better</p> : <p>Worse</p>}
                          </Grid>

                          <Grid>
                            <Grid>
                              <h1>Decubitus Situation</h1>
                            </Grid>
                            <Grid container xs={12} md={12}>
                              <Grid xs={4} md={4}>
                                <label>Picture with scale</label>
                                <FileViews
                                  comesFrom='Picture_Task'
                                  attachfile={item?.questionnaire_answers?.week_decubitus_picture_with_scale}
                                />
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
                                <label>Picture with scale</label>
                                <FileViews
                                  comesFrom='Picture_Task'
                                  attachfile={item?.questionnaire_answers?.week_thrombose_picture_with_scale}
                                />
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
                      {/* {this.state.newTask.stomach_problems === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{stomach_problems}</h3>
                          </Grid>
                          <Grid>
                            <h1>{Pain_begin}</h1>
                            <PainPoint
                              gender={this.state.gender}
                              painPoint={
                                this.state.newTask
                                  .stomach_painbegin_painPoint
                              }
                              isView={true}
                            />
                          </Grid>
                          <Grid>
                            <h1>{hurtnow}</h1>
                            <PainPoint
                              gender={this.state.gender}
                              painPoint={
                                this.state.newTask
                                  .stomach_hurtnow_painPoint
                              }
                              isView={true}
                            />
                          </Grid>

                          <Grid container xs={12} md={12}>
                            <Grid xs={4} md={4}>
                              <label>{stomach_sternum}</label>
                              {this.state.newTask &&
                                this.state.newTask
                                  ?.stomach_behind_the_sternum === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={4} md={4}>
                              <label>{stomach_attack}</label>
                              {this.state.newTask &&
                                this.state.newTask?.stomach_heart_attack ===
                                'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={4} md={4}>
                              <label>{stomach_failure}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.stomach_heart_failure === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                          </Grid>

                          <Grid>
                            <Grid>
                              <h1>{blood_pressure}</h1>
                            </Grid>
                            <Grid container xs={12} md={12}>
                              <Grid xs={6} md={6}>
                                <label>{rr_systolic}</label>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_rr_systolic}
                                </p>
                              </Grid>
                              <Grid xs={6} md={6}>
                                <label>{RR_diastolic}</label>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_rr_diastolic}
                                </p>
                              </Grid>
                            </Grid>
                          </Grid>
                          {this.state.newTask.stomach_have_diabetes ===
                            'yes' && (
                              <Grid>
                                <Grid>
                                  <h1>{diabetes}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{blood_sugar}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.stomach_blood_sugar}
                                    </p>
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{Hba1c}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.stomach_Hba1c}
                                    </p>
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{situation}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.stomach_situation &&
                                        this.state.newTask
                                          ?.stomach_situation?.value &&
                                        GetShowLabel1(
                                          this.state.Allsituation,
                                          this.state.newTask
                                            ?.stomach_situation?.value,
                                          this.props.stateLanguageType,
                                          true,
                                          'anamnesis'
                                        )}
                                    </p>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}

                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{stomach_periodically}</label>
                              {this.state.newTask &&
                                this.state.newTask
                                  ?.stomach_continuously_or_periodically ===
                                'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid>
                              <h1>{body_temp}</h1>
                            </Grid>
                            <Grid>
                              <label>{stomach_temp}</label>
                            </Grid>
                            <p>
                              {this.state.newTask &&
                                this.state.newTask?.stomach_body_temp}
                            </p>
                            <Grid>
                              <Grid className="sickAllMngSec">
                                <label>{stomach_take_painkillers}</label>
                              </Grid>
                              {this.state.newTask &&
                                this.state.newTask
                                  ?.stomach_take_painkillers === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid className="sickAllMngSec">
                              <label>{stomach_intensity}</label>
                              <p>
                                {this.state.newTask &&
                                  this.state.newTask
                                    ?.stomach_pain_intensity}
                              </p>
                            </Grid>
                            <Grid>
                              <Grid className="sickAllMngSec">
                                <label>
                                  {stomach_undergoing_treatment}
                                </label>
                              </Grid>
                              {this.state.newTask &&
                                this.state.newTask
                                  ?.stomach_undergoing_treatment ===
                                'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      {this.state.newTask.diarrhea === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{Diarrhea}</h3>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{diarrhea_symptoms_begin}</label>
                            </Grid>
                            <p>
                              {getDate(
                                this.state.newTask &&
                                this.state.newTask
                                  ?.diarrhea_symptoms_begin,
                                this.props.settings &&
                                this.props.settings?.setting &&
                                this.props.settings?.setting
                                  ?.date_format
                              )}
                            </p>
                          </Grid>
                          <Grid className="sickAllMngSec">
                            <label>{diarrhea_vomiting}</label>

                            {this.state.newTask &&
                              this.state.newTask
                                ?.diarrhea_suffer_from_vomiting ===
                              'yes' ? (
                              <p>{yes}</p>
                            ) : (
                              <p>{no}</p>
                            )}
                          </Grid>
                          <Grid>
                            <Grid>
                              <h1>{body_temp}</h1>
                            </Grid>
                            <Grid>
                              <label>{diarrhea_body_temp}</label>
                            </Grid>
                            <p>
                              {this.state.newTask &&
                                this.state.newTask?.diarrhea_body_temp}
                            </p>
                            <Grid className="sickAllMngSec">
                              <label>{diarrhea_suffer_symtoms}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.diarrhea_envi_suffer_symtoms ===
                                'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid className="sickAllMngSec">
                              <label>{diarrhea_liquids}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.diarrhea_liquids_with_you === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      {this.state.newTask.have_fever === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{Fever}</h3>
                          </Grid>

                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{fever_symptoms_begin}</label>
                            </Grid>
                            <p>
                              {getDate(
                                this.state.newTask &&
                                this.state.newTask
                                  ?.fever_symptoms_begin,
                                this.props.settings &&
                                this.props.settings?.setting &&
                                this.props.settings?.setting
                                  ?.date_format
                              )}
                            </p>
                          </Grid>
                          <Grid>
                            <h1>{body_temp}</h1>
                          </Grid>
                          <Grid container xs={12} md={12}>
                            <Grid xs={6} md={6}>
                              <label>{fever_top_body_temp}</label>
                              <p>
                                {this.state.newTask &&
                                  this.state.newTask?.fever_top_body_temp}
                              </p>
                            </Grid>
                            <Grid xs={6} md={6}>
                              <label>{fever_low_body_temp}</label>
                              <p>
                                {this.state.newTask &&
                                  this.state.newTask?.fever_low_body_temp}
                              </p>
                            </Grid>
                          </Grid>

                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{fever_pain_intensity}</label>
                            </Grid>
                            <p>
                              {this.state.newTask &&
                                this.state.newTask?.fever_pain_intensity}
                            </p>
                          </Grid>
                          {this.state.newTask.fever_have_a_cough ===
                            'yes' && (
                              <Grid>
                                <Grid>
                                  <h1>{cough}</h1>
                                </Grid>

                                <Grid container xs={12} md={12}>
                                  <Grid xs={6} md={6}>
                                    <label>{fever_cold}</label>
                                    {this.state.newTask &&
                                      this.state.newTask?.fever_cold ===
                                      true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={6} md={6}>
                                    <label>{fever_hoarseness}</label>

                                    {this.state.newTask &&
                                      this.state.newTask?.fever_hoarseness ===
                                      true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{fever_sputum}</label>
                            </Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.newTask &&
                                  this.state.newTask?.fever_sputum,
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                      {this.state.newTask.back_pain === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{back_pain}</h3>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{back_symptoms_begin}</label>
                            </Grid>
                            <p>
                              {getDate(
                                this.state.newTask &&
                                this.state.newTask
                                  ?.back_pain_symptoms_begin,
                                this.props.settings &&
                                this.props.settings?.setting &&
                                this.props.settings?.setting
                                  ?.date_format
                              )}
                            </p>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{back_injured}</label>
                            </Grid>
                            {this.state.newTask &&
                              this.state.newTask?.back_pain_been_injured ===
                              'yes' ? (
                              <p>{yes}</p>
                            ) : (
                              <p>{no}</p>
                            )}
                          </Grid>
                          <Grid className="sickAllMngSec">
                            <label>{back_strained}</label>

                            {this.state.newTask &&
                              this.state.newTask
                                ?.back_pain_physically_strained ===
                              'yes' ? (
                              <p>{yes}</p>
                            ) : (
                              <p>{no}</p>
                            )}
                          </Grid>
                          <Grid className="sickAllMngSec">
                            <label>{back_depression}</label>

                            {this.state.newTask &&
                              this.state.newTask
                                ?.back_pain_stress_depression === 'yes' ? (
                              <p>{yes}</p>
                            ) : (
                              <p>{no}</p>
                            )}
                          </Grid>
                          {this.state.newTask.back_pain_have_diabetes ===
                            'yes' && (
                              <Grid>
                                <Grid>
                                  <h1>{diabetes} </h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{blood_sugar}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.back_pain_blood_sugar}
                                    </p>
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{Hba1c}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.back_pain_Hba1c}
                                    </p>
                                  </Grid>

                                  <Grid xs={4} md={4}>
                                    <label>{situation}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.back_pain_situation &&
                                        this.state.newTask
                                          ?.back_pain_situation?.value &&
                                        GetShowLabel1(
                                          this.state.Allsituation,
                                          this.state.newTask
                                            ?.back_pain_situation?.value,
                                          this.props.stateLanguageType,
                                          true,
                                          'anamnesis'
                                        )}
                                    </p>
                                  </Grid>
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{back_attack}</label>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.back_pain_heart_attack === 'yes' ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{back_failure}</label>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.back_pain_heart_failure === 'yes' ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <h1>{blood_pressure}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={6} md={6}>
                                      <label>{rr_systolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            ?.back_pain_rr_systolic}
                                      </p>
                                    </Grid>
                                    <Grid xs={6} md={6}>
                                      <label>{RR_diastolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            ?.back_pain_rr_diastolic}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                        </Grid>
                      )}
                      {this.state.newTask.cough_and_snees === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{cough_and_snees}</h3>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{cough_symptoms_begin}</label>
                            </Grid>
                            <p>
                              {getDate(
                                this.state.newTask &&
                                this.state.newTask
                                  ?.cough_symptoms_begin,
                                this.props.settings &&
                                this.props.settings?.setting &&
                                this.props.settings?.setting
                                  ?.date_format
                              )}
                            </p>
                          </Grid>
                          <Grid>
                            <h1>{body_temp}</h1>
                          </Grid>
                          <Grid>
                            <Grid>
                              <label>{body_temp}</label>
                            </Grid>
                            <p>
                              {this.state.newTask &&
                                this.state.newTask?.cough_body_temp}
                            </p>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{cough_suffer_symtoms}</label>
                            </Grid>
                            {this.state.newTask &&
                              this.state.newTask
                                ?.cough_envi_suffer_symtoms === 'yes' ? (
                              <p>{yes}</p>
                            ) : (
                              <p>{no}</p>
                            )}
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{cough_allergies}</label>
                            </Grid>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  this.state.newTask &&
                                  this.state.newTask
                                    ?.cough_suffer_from_allergies,
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                      {this.state.newTask.feel_depressed === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{feel_depressed}</h3>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{depressed_symptoms_begin}</label>
                            </Grid>
                            <p>
                              {getDate(
                                this.state.newTask &&
                                this.state.newTask
                                  ?.depressed_symptoms_begin,
                                this.props.settings &&
                                this.props.settings?.setting &&
                                this.props.settings?.setting
                                  ?.date_format
                              )}
                            </p>
                          </Grid>
                          <Grid>
                            <Grid className="sickAllMngSec">
                              <label>{pain_level}</label>
                            </Grid>
                            <p>
                              {this.state.newTask &&
                                this.state.newTask
                                  ?.depressed_pain_intensity}
                            </p>
                          </Grid>
                          <Grid container xs={12} md={12}>
                            <Grid xs={4} md={4} className="sickAllMngSec">
                              <label>{depressed_do_you_sleep}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.depressed_do_you_sleep === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={4} md={4} className="sickAllMngSec">
                              <label>{depressed_suicidal_thoughts}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.depressed_suicidal_thoughts ===
                                'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={4} md={4} className="sickAllMngSec">
                              <label>{depressed_hurt_yourself}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.depressed_hurt_yourself === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      {this.state.newTask.cardiac_problems === 'yes' && (
                        <Grid>
                          <Grid className="allSickHeadSec">
                            <h3>{cardiac_problems}</h3>
                          </Grid>
                          <Grid>
                            <h1>{blood_pressure}</h1>
                          </Grid>
                          <Grid container xs={12} md={12}>
                            <Grid xs={6} md={6}>
                              <label>{rr_systolic}</label>
                              <p>
                                {this.state.newTask &&
                                  this.state.newTask?.cardiac_rr_systolic}
                              </p>
                            </Grid>
                            <Grid xs={6} md={6}>
                              <label>{RR_diastolic}</label>
                              <p>
                                {this.state.newTask &&
                                  this.state.newTask
                                    ?.cardiac_rr_diastolic}
                              </p>
                            </Grid>
                          </Grid>

                          <Grid container xs={12} md={12}>
                            <Grid xs={3} md={3} className="sickAllMngSec">
                              <label>{cardiac_heart_attack}</label>

                              {this.state.newTask &&
                                this.state.newTask?.cardiac_heart_attack ===
                                'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={3} md={3} className="sickAllMngSec">
                              <label>{cardiac_heart_failure}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.cardiac_heart_failure === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={3} md={3} className="sickAllMngSec">
                              <label>{cardiac_dizziness}</label>
                              {this.state.newTask &&
                                this.state.newTask
                                  ?.cardiac_have_dizziness === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                            <Grid xs={3} md={3} className="sickAllMngSec">
                              <label>{cardiac_shoulder_pain}</label>

                              {this.state.newTask &&
                                this.state.newTask
                                  ?.cardiac_have_shoulder_pain === 'yes' ? (
                                <p>{yes}</p>
                              ) : (
                                <p>{no}</p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )} */}
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
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";

import { getLanguage } from "translations/index";
import { Doctorset } from "Screens/Doctor/actions";
import { houseSelect } from '../../VirtualHospital/Institutes/selecthouseaction';


class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEntry: this.props.openEntry,
      value: this.props.value,
      openBy: this.props.openBy,
    };
  }

  //For close the pop up
  handleCloseEntry = () => {
    this.props.handleCloseEntry();
  };
  // For set the value for the new entry
  handleChangeEntry = (value) => {
    this.props.onChange(value);
    this.props.handleCloseEntry();
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.openEntry !== this.props.openEntry) {
      this.setState({ openEntry: this.props.openEntry });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.openEntry !== this.props.openEntry ||
      nextState.openEntry !== this.state.openEntry ||
      nextProps.openBy !== this.props.openBy
    );
  }

  componentDidMount = () => { };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      anamnesis,
      Selectentrytype,
      blood_pressure,
      blood_sugar,
      condition_pain,
      covid_diary,
      diagnosis,
      diary,
      doc_visit,
      family_anmnies,
      file_uplod,
      hosp_visit,
      lab_result,
      VaccinationTrial,
      marcumar_pass,
      medication,
      prescription,
      secnd_openion,
      sick_cert,
      smoking_status,
      long_covid,
      vaccination,
      weight_bmi,
      respiration,
    } = translate;
    return (
      <Modal
        open={this.state.openEntry}
        onClose={this.handleCloseEntry}
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode === "dark"
            ? "darkTheme"
            : "addScrollBar"
        }
      >
        <Grid
          className={
            this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode === "dark"
              ? "entryBoxCntnt darkTheme addSpeclContnt"
              : "entryBoxCntnt addSpeclContnt"
          }
        >
          <Grid className="addSpeclContntIner">
            <Grid className="entryCourse ">
              <Grid container direction="row" justify="center">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center">
                    <Grid item xs={8} md={8} lg={8}>
                      <label>{Selectentrytype}</label>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <Grid>
                        <Grid className="entryCloseBtn">
                          <a onClick={this.handleCloseEntry}>
                            <img
                              src={require("assets/images/close-search.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <p>Click or input number on your keyboard</p> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="checkHelth 1111 checkHelth2">

              <Grid container direction="row">
                {this.props.Doctorsetget?.byhospital ? (
                  this.props.stateLoginValueAim.user.houses.map((newmember) => (

                    this.props.Doctorsetget?.byhospital == newmember.value ? (

                      <>
                      {console.log("1111aman")}
                        <Grid item xs={12} sm={6} md={6}>
                          <Grid className="checkHelthLbl 111">
                            {newmember.roles.includes("add_anamnesis") ? (
                              this.state.openBy !== "patient" && (
                                <Grid>
                                  <a onClick={() => this.handleChangeEntry("anamnesis")}>
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                    <p>{anamnesis}</p>
                                  </a>
                                </Grid>
                              ))
                              : (
                                " "
                              )
                            }
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_blood_pressure") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("blood_pressure")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{blood_pressure}</p>
                                </a>
                              </Grid>
                            ) : (
                              " "
                            )}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_blood_sugar") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("blood_sugar")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{blood_sugar}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_condition_pain") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("condition_pain")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{condition_pain}</p>
                                </a>
                              </Grid>) : (
                              " ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_covid_diary") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("covid_19")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{covid_diary}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_vaccination_trial") ? (

                              <Grid>
                                <a
                                  onClick={() =>
                                    this.handleChangeEntry("vaccination_trial")
                                  }
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{VaccinationTrial}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_diagnosis") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("diagnosis")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{diagnosis}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_diary") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("diary")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{diary}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_doctor_visit") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("doctor_visit")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{doc_visit}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_family_anamnesis") ? (

                              <Grid>
                                <a
                                  onClick={() =>
                                    this.handleChangeEntry("family_anamnesis")
                                  }
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{family_anmnies}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_files_upload") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("file_upload")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{file_uplod}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_hospital_visit") ? (

                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("hospitalization")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      <p>{hosp_visit}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}
                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {/* {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}>{this.state.openBy !=='patient' ? <span>11</span>: <span>10</span> }<p>{hosp_visit}</p></a></Grid>}
                                                            {this.state.openBy !=='patient' && <Grid className="clear"></Grid>} */}
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Grid className="checkHelthLbl">
                            {newmember.roles.includes("add_hospital_visit") ? (

                              <>
                                {this.state.openBy === "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("hospitalization")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      <p>{hosp_visit}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>
                            ) : (" ")}
                            {this.state.openBy === "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {newmember.roles.includes("add_laboratory_result") ? (

                              <Grid>
                                <a
                                  onClick={() =>
                                    this.handleChangeEntry("laboratory_result")
                                  }
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{lab_result}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_long_covid_tool") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("long_covid")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{long_covid}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_marcumar_pass") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("marcumar_pass")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{marcumar_pass}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_medication") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("medication")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{medication}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_prescription") ? (
                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() => this.handleChangeEntry("prescription")}
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      {/* {this.state.openBy !== "patient" && <span>16</span>} */}
                                      <p>{prescription}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>
                            ) : (" ")}
                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {newmember.roles.includes("add_respiration") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("respiration")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{respiration}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_second_opinion") ? (

                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("second_opinion")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      {/* {this.state.openBy !== "patient" && <span>18</span>} */}
                                      <p>{secnd_openion}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}
                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {newmember.roles.includes("add_sick certificate") ? (

                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("sick_certificate")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      {/* {this.state.openBy !== "patient" && <span>19</span>} */}
                                      <p>{sick_cert}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}

                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {newmember.roles.includes("add_smoking status") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("smoking_status")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{smoking_status}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_vaccination") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("vaccination")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{vaccination}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_wieght_bmi") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("weight_bmi")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{weight_bmi}</p>
                                </a>
                              </Grid>
                            ) : (
                              " "
                            )}
                            <Grid className="clear"></Grid>
                            {newmember.roles.includes("add_promotion") ? (

                              <>
                                {this.state.openBy === "adminstaff" && (
                                  <Grid>
                                    <a onClick={() => this.handleChangeEntry("promotion")}>
                                      <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      <p>{"Journal Promotion"}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}
                          </Grid>

                        </Grid>
                      </>
                    ) : (" ")


                  )))
                  : (this.props.openBy == "adminstaff" ? (
                   
                      

                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <Grid className="checkHelthLbl 111">
                            {this.props.House.roles.includes("add_anamnesis") ? (
                              this.state.openBy !== "patient" && (
                                <Grid>
                                  <a onClick={() => this.handleChangeEntry("anamnesis")}>
                                    <span className="se"><ArrowRightIcon/></span>
                                    <p>{anamnesis}</p>
                                  </a>
                                </Grid>
                              ))
                              : (
                                " "
                              )
                            }
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_blood_pressure") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("blood_pressure")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{blood_pressure}</p>
                                </a>
                              </Grid>
                            ) : (
                              " "
                            )}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_blood_sugar") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("blood_sugar")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{blood_sugar}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_condition_pain") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("condition_pain")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{condition_pain}</p>
                                </a>
                              </Grid>) : (
                              " ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_covid_diary") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("covid_19")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{covid_diary}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_vaccination_trial") ? (

                              <Grid>
                                <a
                                  onClick={() =>
                                    this.handleChangeEntry("vaccination_trial")
                                  }
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{VaccinationTrial}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_diagnosis") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("diagnosis")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{diagnosis}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_diary") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("diary")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{diary}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_doctor_visit") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("doctor_visit")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{doc_visit}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_family_anamnesis") ? (

                              <Grid>
                                <a
                                  onClick={() =>
                                    this.handleChangeEntry("family_anamnesis")
                                  }
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{family_anmnies}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_files_upload") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("file_upload")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{file_uplod}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_hospital_visit") ? (

                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("hospitalization")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      <p>{hosp_visit}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}
                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {/* {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}>{this.state.openBy !=='patient' ? <span>11</span>: <span>10</span> }<p>{hosp_visit}</p></a></Grid>}
                                                              {this.state.openBy !=='patient' && <Grid className="clear"></Grid>} */}
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Grid className="checkHelthLbl">
                            {this.props.House.roles.includes("add_hospital_visit") ? (

                              <>
                                {this.state.openBy === "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("hospitalization")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      <p>{hosp_visit}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>
                            ) : (" ")}
                            {this.state.openBy === "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {this.props.House.roles.includes("add_laboratory_result") ? (

                              <Grid>
                                <a
                                  onClick={() =>
                                    this.handleChangeEntry("laboratory_result")
                                  }
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{lab_result}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_long_covid_tool") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("long_covid")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{long_covid}</p>
                                </a>
                              </Grid>) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_marcumar_pass") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("marcumar_pass")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{marcumar_pass}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_medication") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("medication")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{medication}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_prescription") ? (
                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() => this.handleChangeEntry("prescription")}
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      {/* {this.state.openBy !== "patient" && <span>16</span>} */}
                                      <p>{prescription}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>
                            ) : (" ")}
                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {this.props.House.roles.includes("add_respiration") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("respiration")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{respiration}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_second_opinion") ? (

                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("second_opinion")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      {/* {this.state.openBy !== "patient" && <span>18</span>} */}
                                      <p>{secnd_openion}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}
                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {this.props.House.roles.includes("add_sick certificate") ? (

                              <>
                                {this.state.openBy !== "patient" && (
                                  <Grid>
                                    <a
                                      onClick={() =>
                                        this.handleChangeEntry("sick_certificate")
                                      }
                                    >
                                      {this.state.openBy !== "patient" ? (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      ) : (
                                        <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      )}
                                      {/* {this.state.openBy !== "patient" && <span>19</span>} */}
                                      <p>{sick_cert}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}

                            {this.state.openBy !== "patient" && (
                              <Grid className="clear"></Grid>
                            )}
                            {this.props.House.roles.includes("add_smoking status") ? (

                              <Grid>
                                <a
                                  onClick={() => this.handleChangeEntry("smoking_status")}
                                >
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{smoking_status}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_vaccination") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("vaccination")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{vaccination}</p>
                                </a>
                              </Grid>
                            ) : (" ")}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_wieght_bmi") ? (

                              <Grid>
                                <a onClick={() => this.handleChangeEntry("weight_bmi")}>
                                  {this.state.openBy !== "patient" ? (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  ) : (
                                    <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                  )}
                                  <p>{weight_bmi}</p>
                                </a>
                              </Grid>
                            ) : (
                              " "
                            )}
                            <Grid className="clear"></Grid>
                            {this.props.House.roles.includes("add_promotion") ? (

                              <>
                                {this.state.openBy === "adminstaff" && (
                                  <Grid>
                                    <a onClick={() => this.handleChangeEntry("promotion")}>
                                      <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                      <p>{"Journal Promotion"}</p>
                                    </a>
                                  </Grid>
                                )}
                              </>) : (" ")}
                          </Grid>

                        </Grid>
                      </>



                    ) : (<>
                    
                      <Grid item xs={12} sm={6} md={6}>
                        <Grid className="checkHelthLbl 111">




                          {this.state.openBy !== "patient" && (
                            <Grid>
                              <a onClick={() => this.handleChangeEntry("anamnesis")}>
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                <p>{anamnesis}</p>
                              </a>
                            </Grid>
                          )
                          }
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a
                              onClick={() => this.handleChangeEntry("blood_pressure")}
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{blood_pressure}</p>
                            </a>
                          </Grid>

                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("blood_sugar")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{blood_sugar}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>

                          <Grid>
                            <a
                              onClick={() => this.handleChangeEntry("condition_pain")}
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{condition_pain}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("covid_19")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{covid_diary}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a
                              onClick={() =>
                                this.handleChangeEntry("vaccination_trial")
                              }
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{VaccinationTrial}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("diagnosis")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{diagnosis}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("diary")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{diary}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("doctor_visit")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{doc_visit}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a
                              onClick={() =>
                                this.handleChangeEntry("family_anamnesis")
                              }
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{family_anmnies}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("file_upload")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{file_uplod}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>

                          {this.state.openBy !== "patient" && (
                            <Grid>
                              <a
                                onClick={() =>
                                  this.handleChangeEntry("hospitalization")
                                }
                              >
                                {this.state.openBy !== "patient" ? (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                ) : (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                )}
                                <p>{hosp_visit}</p>
                              </a>
                            </Grid>
                          )}

                          {this.state.openBy !== "patient" && (
                            <Grid className="clear"></Grid>
                          )}
                          {/* {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}>{this.state.openBy !=='patient' ? <span>11</span>: <span>10</span> }<p>{hosp_visit}</p></a></Grid>}
                                                          {this.state.openBy !=='patient' && <Grid className="clear"></Grid>} */}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Grid className="checkHelthLbl">

                          {this.state.openBy === "patient" && (
                            <Grid>
                              <a
                                onClick={() =>
                                  this.handleChangeEntry("hospitalization")
                                }
                              >
                                {this.state.openBy !== "patient" ? (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                ) : (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                )}
                                <p>{hosp_visit}</p>
                              </a>
                            </Grid>
                          )}

                          {this.state.openBy === "patient" && (
                            <Grid className="clear"></Grid>
                          )}
                          <Grid>
                            <a
                              onClick={() =>
                                this.handleChangeEntry("laboratory_result")
                              }
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{lab_result}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("long_covid")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{long_covid}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a
                              onClick={() => this.handleChangeEntry("marcumar_pass")}
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{marcumar_pass}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("medication")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{medication}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>

                          {this.state.openBy !== "patient" && (
                            <Grid>
                              <a
                                onClick={() => this.handleChangeEntry("prescription")}
                              >
                                {this.state.openBy !== "patient" ? (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                ) : (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                )}
                                {/* {this.state.openBy !== "patient" && <span>16</span>} */}
                                <p>{prescription}</p>
                              </a>
                            </Grid>
                          )}

                          {this.state.openBy !== "patient" && (
                            <Grid className="clear"></Grid>
                          )}
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("respiration")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{respiration}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>

                          {this.state.openBy !== "patient" && (
                            <Grid>
                              <a
                                onClick={() =>
                                  this.handleChangeEntry("second_opinion")
                                }
                              >
                                {this.state.openBy !== "patient" ? (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                ) : (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                )}
                                {/* {this.state.openBy !== "patient" && <span>18</span>} */}
                                <p>{secnd_openion}</p>
                              </a>
                            </Grid>
                          )}

                          {this.state.openBy !== "patient" && (
                            <Grid className="clear"></Grid>
                          )}

                          {this.state.openBy !== "patient" && (
                            <Grid>
                              <a
                                onClick={() =>
                                  this.handleChangeEntry("sick_certificate")
                                }
                              >
                                {this.state.openBy !== "patient" ? (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                ) : (
                                  <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                )}
                                {/* {this.state.openBy !== "patient" && <span>19</span>} */}
                                <p>{sick_cert}</p>
                              </a>
                            </Grid>
                          )}


                          {this.state.openBy !== "patient" && (
                            <Grid className="clear"></Grid>
                          )}
                          <Grid>
                            <a
                              onClick={() => this.handleChangeEntry("smoking_status")}
                            >
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{smoking_status}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>
                          <Grid>
                            <a onClick={() => this.handleChangeEntry("vaccination")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{vaccination}</p>
                            </a>
                          </Grid>
                          <Grid className="clear"></Grid>

                          <Grid>
                            <a onClick={() => this.handleChangeEntry("weight_bmi")}>
                              {this.state.openBy !== "patient" ? (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              ) : (
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                              )}
                              <p>{weight_bmi}</p>
                            </a>
                          </Grid>

                          <Grid className="clear"></Grid>

                          {this.state.openBy === "adminstaff" && (
                            <Grid>
                              <a onClick={() => this.handleChangeEntry("promotion")}>
                                <span className="se"><ArrowRightIcon></ArrowRightIcon></span>
                                <p>{"Journal Promotion"}</p>
                              </a>
                            </Grid>
                          )}

                        </Grid>

                      </Grid>
                    </>)
                  )
                }



              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { Doctorsetget } = state.Doctorset;
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;

  return {
    stateLanguageType,
    House,
    Doctorsetget,
    stateLoginValueAim,



  };
};
export default pure(
  withRouter(connect(mapStateToProps, {
    LanguageFetchReducer,
    houseSelect,
    Doctorset,
    LoginReducerAim,



  })(PointPain))
);

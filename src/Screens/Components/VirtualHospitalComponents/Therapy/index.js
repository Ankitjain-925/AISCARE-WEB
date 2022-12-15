import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index";
import Modal from "@material-ui/core/Modal";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import Loader from "Screens/Components/Loader/index";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import { withRouter } from "react-router-dom";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import sitedata from "sitedata";
import axios from "axios";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { commonHeader } from "component/CommonHeader/index";
import { getProfessionalData } from "Screens/VirtualHospital/PatientFlow/data";
import { getPatientData } from "Screens/Components/CommonApi/index";
import { Speciality } from "Screens/Login/speciality.js";
import { confirmAlert } from "react-confirm-alert";
import _ from "lodash";
import moment from "moment";
import { ConsoleCustom } from "Screens/Components/BasicMethod/index";
import { ConversationListManager } from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/CometChatConversationList/controller";
import { initStateWithPrevTab } from "redux-state-sync";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 48,
    minHeight: 48,
  }),
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAss1: this.props.openAss1 ? this.props.openAss1 : false,
      service: this.props.service || {},
      serviceList1: [],
      users1: {},
      selectedPat: {},
      professional_id_list1: [],
      date_format: this.props.date_format,
      time_format: this.props.time_format,
      openIndex: false,
      errorMsg: "",
      selectedHouse: this.props.selectedHouse,
      authErr: false,
      disableAssignment: false,
    };
  }

  componentDidMount() {
    this.getPatientData();
    this.getProfessionalData();
    if (this.props?.House?.value) {
      this.therapylist();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.openAss1 !== this.props.openAss1) {
      if (this.props.comesFrom !== "Professional") {
        this.setState({
          openAss1: this.props.openAss1,
          authErr: false,
          professional_id_list1: this.state.professional_id_list,
        });
      } else {
        this.setState({
          openAss1: this.props.openAss1,
          selectedHouse: {},
          authErr: false,
        });
      }
    }
    if (prevProps.therapy !== this.props.therapy) {
      this.settherapy(this.props.therapy);
    }
  };

  handleCloseAss = () => {
    this.setState(
      {
        service: {},
        selectedPat: {},
        showError: "",
        selectedHouse: {},
      },
      () => {
        if (this.props.comesFrom === "detailTask") {
          let user = { value: this.props.patient?.patient_id };
          this.updateEntryState2(user);
        }
      }
    );
    this.props.handleCloseAss();
  };
  openTaskTime = (index) => {
    this.setState({ openIndex: index });
  };

  closeTaskTime = () => {
    this.setState({ openIndex: false });
  };

  // assignedTo = (e) => {
  //     this.setState({ assignedTo: e }, () => {
  //         var data =
  //             e?.length > 0 &&
  //             e.reduce((last, this, index) => {
  //                 let isProf =
  //                     this.state.professionalArray?.length > 0 &&
  //                     this.state.professionalArray.filter(
  //                         (data, index) => data.user_id === this.value
  //                     );
  //                 if (isProf && isProf.length > 0) {
  //                     last.push(isProf[0]);
  //                 }
  //                 return last;
  //             }, []);
  //         const state = this.state.service;
  //         state["assinged_to"] = data;
  //         this.setState({ service: state }, () => {
  //             this.selectProf(
  //                 this.state.service?.assinged_to,
  //                 this.state.professional_id_list
  //             );
  //         });
  //     });
  // }

  // manage assign to list

  // selectProf = (listing, data) => {
  //     var showdata = data;
  //     var alredyAssigned =
  //         listing &&
  //         listing?.length > 0 &&
  //         listing.map((item) => {
  //             return item.user_id;
  //         });
  //     if (alredyAssigned && alredyAssigned.length > 0) {
  //         showdata =
  //             data?.length > 0 &&
  //             data.filter((item) => !alredyAssigned.includes(item.value));
  //         var assignedto =
  //             data?.length > 0 &&
  //             data.filter((item) => alredyAssigned.includes(item.value));
  //         this.setState({ assignedTo: assignedto });
  //     }
  //     this.setState({ professional_id_list1: showdata });
  // };

  // Get the Professional data
  getProfessionalData = async (fromEdit) => {
    if (this.props?.House?.value || this.state.selectedHouse?.value) {
      this.setState({ loaderImage: true });
      var data = await getProfessionalData(
        this.props.comesFrom === "Professional"
          ? this.state.selectedHouse?.value
          : this.props?.House?.value,
        this.props.stateLoginValueAim.token
      );
      if (data) {
        this.setState({
          loaderImage: false,
          professionalArray: data.professionalArray,
          professional_id_list: data.professionalList,
          professional_id_list1: data.professionalList,
        });
      } else {
        this.setState({ loaderImage: false });
      }
    }
  };

  // Get the Patient data
  getPatientData = async () => {
    if (this.props?.House?.value || this.state.selectedHouse?.value) {
      this.setState({ loaderImage: true });
      let response = await getPatientData(
        this.props.stateLoginValueAim.token,
        this.props?.House?.value || this.state.selectedHouse?.value,
        "taskpage"
      );
      if (response?.isdata) {
        this.setState(
          { users1: response.PatientList1, users: response.patientArray },
          () => {
            if (this.props.location?.state?.user) {
              let user =
                this.state.users1.length > 0 &&
                this.state.users1.filter(
                  (user) =>
                    user.value === this.props.location?.state?.user.value
                );

              this.updateEntryState2(this.props.location?.state?.user);
            }
          }
        );
      } else {
        this.setState({ loaderImage: false });
      }
    }
  };

  updateEntryState2 = (user) => {
    var user1 =
      this.state.users?.length > 0 &&
      this.state.users.filter((data) => data.user_id === user.value);
    if (user1 && user1?.length > 0) {
      const state = this.state.service;
      state["patient"] = user1[0];
      state["patient_id"] = user1[0].user_id;
      state["case_id"] = user1[0].case_id;
      if (!user.label) {
        user["label"] =
          user1[0].first_name && user1[0].last_name
            ? user1[0].first_name + " " + user1[0].last_name
            : user1[0].first_name;
      }
      if (!state?.speciality) {
        state["speciality"] = user1[0].speciality;
        this.setState({
          selectSpec: {
            label: user1[0]?.speciality?.specialty_name,
            value: user1[0]?.speciality?._id,
          },
        });
      }
      this.setState({ service: state, selectedPat: user });
    }
  };

  updateEntry = (value, name, index) => {
    var due_on = this.state.therapy_sequence?.[index]?.due_on
      ? this.state.therapy_sequence?.[index]?.due_on
      : { date: new Date(), time: new Date() };
    const state = this.state.therapy_sequence;
    if (name === "date" || name === "time") {
      due_on[name] = value;
      state[index]["due_on"] = due_on;
    } else if (name === "assinged_to1") {
      // state[index][name] = value;
      var data =
        value?.length > 0 &&
        value.reduce((last, value, index) => {
          let isProf =
            this.state.professionalArray?.length > 0 &&
            this.state.professionalArray.filter(
              (data, index) =>
                data.user_id === value?.value || data._id === value?.value
            );
          if (isProf && isProf.length > 0) {
            last.push(isProf[0]);
          }
          return last;
        }, []);
      state[index]["assinged_to"] = data;
    } else {
      state[name] = value;
    }
    this.setState({ therapy_sequence: state });
  };

  FinalServiceSubmit = () => {
    var data = this.state.service;
    var house_id = this.props.House?.value
      ? this.props.House?.value
      : this.state.selectedHouse?.value;
    var sequence = this.state.therapy_sequence;
    var finalData = {};
    finalData.patient = data?.patient;
    finalData.therapy_id = data?.therapy_id;
    finalData.therapy_name = data?.therapy_name;
    finalData.speciality = data?.speciality;
    finalData.house_id = house_id;
    finalData.status = "open";
    finalData.sequence_list = sequence;

    this.setState({ errorMsg: "" });
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      plz_enter_time,
      plz_enter_date,
      Not_selected_hospital,
      Patient_not_selected,
      Therapy_not_selected,
    } = translate;

    if (!house_id) {
      this.setState({ errorMsg: "Please select the hospital" });
    } else if (!data.patient_id) {
      this.setState({ errorMsg: "Please select the patient" });
    } else if (!data?.therapy_id) {
      this.setState({ errorMsg: "Please select therapy" });
    } else {
      var sequence = this.state.therapy_sequence;
      var gotall = true;
      if (sequence?.length > 0) {
        sequence.map((item) => {
          if (
            !item?.assinged_to?.legnth > 0 &&
            !item?.due_on?.date &&
            !item?.due_on?.time
          ) {
            gotall = false;
          }
        });
        if (!gotall) {
          this.setState({
            errorMsg:
              "Please fill due on date/time and professional for each sequence",
          });
        } else {
          this.setState({
            loaderImage: true,
          });
          axios
            .post(
              sitedata.data.path + "/vt/SaveTherapy",
              finalData,
              commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((responce) => {
              this.setState({
                loaderImage: false,
                openAss1: false,
              });
            })
            .catch(() => {
              this.setState({ loaderImage: false });
            });
        }
      }
    }
    // else if (!data?.due_on?.time) {
    //     this.setState({ errorMsg: plz_enter_time })
    // } else if (!data?.due_on?.date) {
    //     this.setState({ errorMsg: plz_enter_date })
    // }
    // else {
    //     console.log("1")
    // }
  };

  settherapy = (value) => {
    var state = this.state.service;
    var datas =
      this.state.service_id_list?.length > 0 &&
      this.state.service_id_list.filter((item) => item?._id === value?.value);
    if (datas?.length > 0) {
      state["therapy_id"] = datas[0]?._id;
      state["therapy_name"] = datas[0]?.therapy_name;
      if (datas[0]?.assinged_to) {
        var data =
          datas[0]?.assinged_to?.length > 0 &&
          datas[0]?.assinged_to.reduce((last, e, index) => {
            let isProf =
              this.state.professional_id_list?.length > 0 &&
              this.state.professional_id_list.filter(
                (data, index) =>
                  data.value === e.user_id || data.value === e._id
              );
            if (isProf && isProf.length > 0) {
              last.push(isProf[0]);
            }
            return last;
          }, []);
      }

      this.setState({
        service: state,
        therapy_assignedto1: data,
        therapy_assignedto: datas[0]?.assinged_to,
        therapy_sequence: datas[0]?.sequence_list,
      });
    }
  };

  //to get the speciality list
  // specailityList = () => {
  //     var spec =
  //         this.props.speciality?.SPECIALITY &&
  //         this.props?.speciality?.SPECIALITY.length > 0 &&
  //         this.props?.speciality?.SPECIALITY.map((data) => {
  //             return { label: data.specialty_name, value: data._id };
  //         });
  //     this.setState({ specilaityList: spec });
  // };

  //get therapy list
  therapylist = () => {
    var serviceList = [],
      serviceList1 = [];
    var house_id = this.props?.House?.value
      ? this.props?.House?.value
      : this.state.selectedHouse?.value;
    axios
      .get(
        sitedata.data.path + "/vt/GettherapyHouse/" + house_id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data?.hassuccessed) {
          response?.data?.data &&
            response.data.data.map((element) => {
              serviceList.push(element);
              serviceList1.push({
                label: element?.therapy_name,
                value: element?._id,
              });
            });
          this.setState({
            service_id_list: serviceList,
            serviceList1: serviceList1,
          });
        }
      });
  };

  updateEntryState7 = (e) => {
    this.setState({ selectedHouse: e }, () => {
      this.getProfessionalData();
      this.getPatientData();
      this.therapylist();
      const { roles = [] } = e || {};
      this.setState({ authErr: true });
    });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Searchserviceoraddcustominput,
      Addservice,
      For_Hospital,
      ForPatient,
      Search_Select,
      Assignedto,
      Assign_Therapy,
      Dueon,
      Addtime,
      save_and_close,
      remove_time,
      Therapy,
      Task_Name,
      Task_Description,
      Assign_Title,
      TotalAmount,
      Services,
      ServiceName,
      Service_Amount,
      Quantity,
    } = translate;
    return (
      <>
        {this.state.loaderImage && <Loader />}
        <Modal
          open={this.state.openAss1}
          onClose={() => this.handleCloseAss()}
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
              ? "darkTheme addSpeclModel"
              : "addSpeclModel"
          }
        >
          <Grid
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
                ? "darkTheme addSpeclContnt2"
                : "addServContnt"
            }
            // className="addServContnt"
          >
            {/* {this.state.disableAssignment && 
                                <div className="err_message">You dont have authority to Assign Service</div>} */}
            <Grid className="addSpeclContntIner2">
              <Grid
                container
                direction="row"
                justify="center"
                className="addSpeclLbl"
              >
                <Grid item xs={8} md={8} lg={8}>
                  <label>{Assign_Therapy}</label>
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                  <Grid>
                    <Grid className="entryCloseBtn">
                      <a onClick={() => this.handleCloseAss()}>
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
              <Grid className="enterServMain">
                <Grid className="enterSpcl enterSpclSec enterSpclSec1">
                  {this.props.comesFrom === "Professional" && (
                    <Grid item xs={12} md={12}>
                      <Grid>
                        <label>{For_Hospital}</label>
                        <Select
                          name="for_hospital"
                          options={this.props.thisList}
                          placeholder={Search_Select}
                          onChange={(e) => this.updateEntryState7(e)}
                          value={this.state.selectedHouse || ""}
                          className="addStafSelect"
                          isMulti={false}
                          isSearchable={true}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12} md={12}>
                    <label>{ForPatient}</label>

                    {this.props.comesFrom === "Professional" &&
                    this.state.service?.patient?._id ? (
                      <h2>
                        {this.state.service?.patient?.first_name}{" "}
                        {this.state.service?.patient?.last_name}
                      </h2>
                    ) : this.props.comesFrom === "detailTask" ? (
                      <h2>
                        {this.state.service?.patient?.first_name}{" "}
                        {this.state.service?.patient?.last_name}
                      </h2>
                    ) : (
                      <Grid>
                        <Select
                          name="patient"
                          options={this.state.users1}
                          placeholder={Search_Select}
                          onChange={(e) => this.updateEntryState2(e)}
                          value={this.state.selectedPat || ""}
                          className="addStafSelect"
                          isMulti={false}
                          isSearchable={true}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} md={12} className="customservicetitle">
                    <label>{Therapy}</label>
                    <Grid>
                      <Select
                        name="therapy"
                        onChange={(e) => this.settherapy(e, "therapy")}
                        // value={this.state.therapies}
                        value={this.props.therapy}
                        options={this.state.serviceList1}
                        placeholder={Search_Select}
                        className="addStafSelect"
                        isMulti={false}
                        isSearchable={true}
                        isDisabled={true}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={12} className="customservicetitle">
                    <label>{Assignedto}</label>
                    <Grid>
                      <Select
                        name="professional"
                        // onChange={(e) => this.assignedTo(e, 'professional')}
                        value={this.state.therapy_assignedto1}
                        options={this.state.professional_id_list1}
                        placeholder={Search_Select}
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                        isDisabled={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} className="customservicetitle">
                    <Grid className="allCustomService">
                      <p><span>{"Sequence of Tasks / Assigned services"}</span></p>
                      {this.state.therapy_sequence &&
                        this.state.therapy_sequence?.length > 0 &&
                        this.state.therapy_sequence.map((item, index) => (
                          <>
                            <Grid className="tskSrvsPart">
                              <p>{index + 1}.</p>
                              <p>
                                {item?.type === "task"
                                  ? "Task"
                                  : "Assigned Service"}
                              </p>
                            </Grid>

                            {item?.type === "task" ? (
                              <div>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                >
                                  <Grid item xs={6} md={6} lg={6}>
                                    <p>{Task_Name} :</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <label>{item.task_name}</label>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <p>{Task_Description} :</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <label>{item.task_description}</label>
                                  </Grid>
                                </Grid>
                              </div>
                            ) : (
                              <div>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                >
                                  <Grid item xs={6} md={6} lg={6}>
                                    <p>{Assign_Title} :</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <label>{item.title}</label>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <p>{TotalAmount} :</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <label>{item.total_amount}</label>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <p>{Services} : </p>
                                  </Grid>
                                  <Grid item xs={6} md={6} lg={6}>
                                    <label></label>
                                  </Grid>
                                </Grid>
                                <div>
                                  {item.services?.length > 0 &&
                                    item.services.map((cont) => (
                                      <>
                                        <Grid className="serAmntQunty">
                                          <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                          >
                                            <Grid item xs={6} md={6} lg={6}>
                                              <p>{ServiceName} :</p>
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                              <label>{cont?.service}</label>
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                              <p>{Service_Amount} :</p>
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                              <label>{cont?.amount}</label>
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                              <p>{Quantity} :</p>
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                              <label>{cont?.quantity}</label>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </>
                                    ))}
                                </div>
                              </div>
                            )}

                            <Grid
                              item
                              xs={12}
                              md={12}
                              className="dueOn creatInfoIner allCreatInfo"
                            >
                              <p>{Dueon}</p>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className="timeTask"
                              >
                                <Grid item xs={8} md={8}>
                                  {/* {this.state.openDate ? ( */}
                                  <DateFormat
                                    name="date"
                                    value={
                                      item?.due_on?.date
                                        ? new Date(item?.due_on?.date)
                                        : new Date() || {}
                                    }
                                    notFullBorder
                                    date_format={this.state.date_format}
                                    onChange={(e) =>
                                      this.updateEntry(e, "date", index)
                                    }

                                    // disabled={
                                    //   this.props.comesFrom === 'Professional'
                                    //     ? true
                                    //     : false
                                    // }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  md={4}
                                  className={
                                    this.state.openIndex !== index
                                      ? "addTimeTask addTimeTaskSec"
                                      : "addTimeTask1"
                                  }
                                >
                                  {this.state.openIndex !== index ? (
                                    <Button
                                      onClick={() => {
                                        this.openTaskTime(index);
                                      }}
                                    >
                                      {Addtime}
                                    </Button>
                                  ) : (
                                    <>
                                      <TimeFormat
                                        className="timeFormatTask"
                                        name="time"
                                        value={
                                          item?.due_on?.time
                                            ? new Date(item?.due_on?.time)
                                            : new Date()
                                        }
                                        time_format={this.state.time_format}
                                        onChange={(e) =>
                                          this.updateEntry(e, "time", index)
                                        }
                                      />
                                      <span
                                        className="addTimeTask1span"
                                        onClick={() => {
                                          this.closeTaskTime(index);
                                        }}
                                      >
                                        {remove_time}
                                      </span>
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              className="customservicetitle"
                            >
                              <label>{Assignedto}</label>
                              <Grid
                                onClick={() => {
                                  this.updateEntry(
                                    this.state.therapy_assignedto1,
                                    "assinged_to1",
                                    index
                                  );
                                }}
                                className="allThrapySec"
                              >
                                <label>{"Same as therapy"}</label>
                              </Grid>
                              <Grid>
                                <Select
                                  name="professional"
                                  onChange={(e) =>
                                    this.updateEntry(e, "assinged_to1", index)
                                  }
                                  value={item.assinged_to1}
                                  options={this.state.professional_id_list1}
                                  placeholder={Assignedto}
                                  className="addStafSelect"
                                  isMulti={true}
                                  isSearchable={true}
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <a>
                <div className="err_message err_message1">
                  {this.state.errorMsg}
                </div>
              </a>

              <Grid
                className="servSaveBtn"
                onClick={() => this.FinalServiceSubmit()}
              >
                <a>
                  <Button disabled={this.state.disableAssignment}>
                    {save_and_close}
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { speciality } = state.Speciality;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    speciality,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    Speciality,
  })(Index)
);

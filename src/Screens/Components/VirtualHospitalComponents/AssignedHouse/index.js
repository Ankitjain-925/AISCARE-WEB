import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import axios from "axios";
import SelectField from "Screens/Components/Select/index";
import Button from "@material-ui/core/Button";
import { Settings } from "Screens/Login/setting";
import { getLanguage } from "translations/index";
import { LoginReducerAim } from "Screens/Login/actions";
import NewRole from "Screens/VirtualHospital/New Role/index";
import { commonHeader } from "component/CommonHeader/index";
// import io from "socket.io-client";
import { GetSocketUrl } from "Screens/Components/BasicMethod/index";
// const SOCKET_URL = GetSocketUrl();
// console.log("SOCKET_URL", SOCKET_URL);
// var socket;
import {SocketIo, clearScoket} from "socket";
class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHouse: this.props.openHouse,
      alredyExist: this.props.alredyExist,
      selectRole: this.props.selectRole,
      current_user: this.props.current_user,
      Housesoptions: this.props.Housesoptions,
      currentHouses: this.props.currentHouses,
      deleteHouses: this.props.deleteHouses,
      assignedhouse: this.props.assignedhouse,
      blankerror: this.props.blankerror,
      alredyExist: false,
      openHouse1: false,
      checkboxdata: this.props.checkboxdata,
      values: false,
      finalArray: [],
      loaderImage: false,
    };
    // socket = io(SOCKET_URL);
  }

  updateEntryState1 = (value, name) => {
    console.log("selectRole", this.state.selectRole);
    this.setState({
      alredyExist: false,
      assignedhouse: false,
      values: true,
      selectRole: false,
    });
    let data = this.state.current_user;

    let id1 = value;
    let current = data.houses.map((element) => {
      return element.value;
    });
    let status = current.includes(id1.value);
    if (status == true) {
      this.setState({ alredyExist: true });
    }

    this.props.updateEntryState1(value, name);
  };

  UpdateAuthorityHouse = (value, index) => {
    if (this.state.current_user?.houses[index]?.value === value) {
      var getHouse = this.state.current_user?.houses;
      getHouse[index].roles = this.state.finalArray;
    }
    axios
      .put(
        sitedata.data.path +
          "/UserProfile/Users/update/" +
          this.state.current_user?._id,
        {
          houses: getHouse,
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.props.closeHouse();
        this.setState({ loaderImage: true });
        var sendSec = {
          _id: responce.data.data?._id,
          houses: responce.data.data?.houses,
        };

        var socket =SocketIo();
        if (responce.data.data.type == "nurse") {
          socket.emit("nurse", sendSec);
        } else if (responce.data.data.type == "doctor") {
          socket.emit("doctor", sendSec);
        } else if (responce.data.data.type == "adminstaff") {
          socket.emit("adminstaff", sendSec);
        }
        this.setState({ values: false });
      });
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (
      prevProps.openHouse !== this.props.openHouse ||
      prevProps.selectRole !== this.props.selectRole ||
      prevProps.alredyExist !== this.props.alredyExist ||
      prevProps.current_user !== this.props.current_user ||
      prevProps.Housesoptions !== this.props.Housesoptions ||
      prevProps.deleteHouses !== this.props.deleteHouses ||
      prevProps.assignedhouse !== this.props.assignedhouse ||
      prevProps.blankerror !== this.props.blankerror ||
      prevProps.checkboxdata !== this.props.checkboxdata
    ) {
      this.setState({
        openHouse: this.props.openHouse,
        selectRole: this.props.selectRole,
        alreadyExist: this.props.alredyExist,
        currentHouses: this.props.currentHouses,
        current_user: this.props.current_user,
        Housesoptions: this.props.Housesoptions,
        deleteHouses: this.props.deleteHouses,
        assignedhouse: this.props.assignedhouse,
        blankerror: this.props.blankerror,
        checkboxdata: this.props.checkboxdata,
      });
    }
  };

  finalArray = (data) => {
    this.setState({ finalArray: data });
  };

  componentDidMount = () => {
    // socket.on("connection", () => {});
    // console.log("socket12", socket);
  };

  render() {
    var { checkboxdata } = this.state;
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      ManageHouse,
      House_assigned_to_user,
      House_alread_exist_to_user,
      Select_atleast_one_house,
      AssignedHouses,
      Delete,
      Save,
      Please_select_authority_first,
      Give_Authority_User,
      Manage_Authority,
      Change_Authority,
    } = translate;

    return (
      <Grid>
        <Modal
          open={this.state.openHouse}
          onClose={() => {
            this.setState({ values: false });
            this.props.closeHouse();
          }}
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
              ? "addSpeclModel darkTheme"
              : "addSpeclModel"
          }
        >
          <Grid className="addSpeclContnt">
            <Grid className="addSpeclContntIner formscrool">
              <Grid className="addSpeclLbl">
                <Grid className="addSpeclClose">
                  <a
                    onClick={() => {
                      this.setState({ values: false });
                      this.props.closeHouse();
                    }}
                  >
                    <img
                      src={require("assets/images/close-search.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <Grid>
                  <label>{ManageHouse}</label>
                </Grid>
              </Grid>
              <Grid className="enterSpclUpr">
                <Grid className="enterSpclMain allEnterSpclSec">
                  {/* <Grid className="enterSpcl"> */}
                  <Grid container direction="row">
                    {this.state.assignedhouse && (
                      <div className="success_message">
                        {House_assigned_to_user}
                      </div>
                    )}
                    {/* {this.state.deleteHouses && (
                    <div className="success_message">
                      House id deleted from the User
                    </div>
                  )} */}
                    {this.state.alredyExist && (
                      <div className="err_message">
                        {House_alread_exist_to_user}
                      </div>
                    )}
                    {this.state.selectRole && (
                      <div className="err_message">
                        {Please_select_authority_first}
                      </div>
                    )}
                    {this.state.blankerror && (
                      <div className="err_message">
                        {Select_atleast_one_house}
                      </div>
                    )}
                    <Grid item sm={12} xs={12} md={12}>
                      <Grid className="enterSpclSec">
                        <SelectField
                          isSearchable={true}
                          name="houses"
                          option={this.state.Housesoptions}
                          onChange={(e) => this.updateEntryState1(e, "houses")}
                          value={this.state.currentHouses}
                          // isMulti={true}
                        />
                      </Grid>
                    </Grid>
                    {this.state.values === true && (
                      <>
                        {this.state.checkboxdata && this.state.checkboxdata && (
                          <Grid item xs={10} md={12} className="authorityvalue">
                            <b>{Give_Authority_User}</b>
                            <Grid container direction="row">
                              <Grid item xs={12} md={12}>
                                <div>
                                  <NewRole
                                    finalArray={(data) => this.finalArray(data)}
                                    data={this.state.checkboxdata}
                                    demo={this.state.finalArray}
                                  />
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </>
                    )}
                    <Grid item xs={12} md={12}>
                      <b className="authorityvalue">{AssignedHouses}</b>
                      <Grid container direction="row">
                        {this.state.current_user?.houses?.length > 0 &&
                          this.state.current_user?.houses.map((item, index) => (
                            <>
                              <Grid container direction="row" justify="center">
                                <Grid item xs={12} md={12}>
                                  <Grid className="allMngAutSec">
                                    <Grid
                                      container
                                      direction="row"
                                      justify="center"
                                    >
                                      <Grid item xs={12} sm={7} md={7}>
                                        {item.group_name} - {item.label} (
                                        {item.value})
                                        {/* <Button onClick={()=>{this.newrole()}} >Next</Button> */}
                                      </Grid>
                                      <Grid item xs={6} sm={2} md={2}>
                                        <a
                                          className="delet-house"
                                          onClick={() => {
                                            this.props.deleteHouse(item.value);
                                          }}
                                        >
                                          {Delete}
                                        </a>
                                      </Grid>
                                      <Grid item xs={6} sm={3} md={3}>
                                        <a
                                          className="manage-authority"
                                          onClick={() => {
                                            this.setState({
                                              values: item.value,
                                              finalArray: item.roles,
                                            });
                                          }}
                                        >
                                          {Manage_Authority}
                                        </a>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid container direction="row">
                                {this.state.values === item.value && (
                                  <Grid item xs={12} md={12}>
                                    <div>
                                      <NewRole
                                        finalArray={(data) =>
                                          this.finalArray(data)
                                        }
                                        data={this.state.checkboxdata}
                                        demo={this.state.finalArray}
                                      />

                                      <Button
                                        className="manage-authority-btn"
                                        onClick={() => {
                                          this.UpdateAuthorityHouse(
                                            item.value,
                                            index
                                          );
                                        }}
                                      >
                                        {Change_Authority}
                                      </Button>
                                    </div>
                                  </Grid>
                                )}
                              </Grid>
                            </>
                          ))}
                      </Grid>
                    </Grid>
                    <Grid className="spclSaveBtn saveNclose">
                      {this.state.alredyExist === false &&
                        this.state.values === true && (
                          <Button
                            onClick={() =>
                              this.props.SaveAssignHouse(this.state.finalArray)
                            }
                          >
                            {Save}
                          </Button>
                        )}
                    </Grid>
                  </Grid>
                  {/* </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
        {/* <NewRole
          openHouse1={this.state.openHouse1}
          closeHouse1={this.closeHouse1}
          finalArray={this.state.finalArray}
       
        /> */}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { stateLoginValueAim } =
    state.LoginReducerAim;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    settings,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      LanguageFetchReducer,
      Settings,
    })(PointPain)
  )
);

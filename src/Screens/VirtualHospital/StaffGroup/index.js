import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from "@material-ui/core/Modal";
import { confirmAlert } from "react-confirm-alert";
import Pagination from "Screens/Components/Pagination/index";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import Select from "react-select";
import {
  onChangePage,
  handleOpenServ,
  handleCloseServ,
  updateEntryState1,
  onFieldChange,
  selectedID,
  getSpecialty,
} from "../../VirtualHospital/Services/api";

import { getLanguage } from "translations/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openServ: false,
      title: "",
      description: "",
      price: "",
      house_id: "",
      speciality_id: false,
      services_data: [],
      AllServices: [],
      updateTrack: {},
      AllSpeciality: [],
      errorMsg: "",
      SearchValue: "",
      sickamount: true,
      sickamount1: {},
      openAss: false

    };
  }

  componentDidMount() {
    getSpecialty(this);
  }

 
  //For adding the New staff 
handleSubmit = () => {
  let translate = getLanguage(this.props.stateLanguageType);
  let {} = translate;
  this.setState({ errorMsg: '' })
  var data = this.state.updateTrack;
  if (!data.title || (data && data?.title && data?.title.length < 1)) {
    this.setState({ errorMsg: "please enter title name" })
  }
  else if (!data.description) {
   this.setState({ errorMsg: "please enter description" })
  }
  else if (!data.ward) {
    this.setState({ errorMsg: "please enter ward name" })
   }
  else {
   console.log('no value')
   handleCloseServ(this);
  }
};

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      StaffGroup,
      newstaffGroup,
      AddnewstaffGroup,
      speciality,
      save_and_close,
      Ward,
      Grouptitle,
      EnterGroupname,
      Entergroupshortdescription,
      Groupshortdescription,
      nurselist,
      staffgrouptitle,
      staffgroupname,
      Search
    } = translate;
    const { services_data } = this.state;
    const { stateLoginValueAim, House } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "adminstaff" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
    if (House && House?.value === null) {
      return <Redirect to={"/VirtualHospital/institutes"} />;
    }
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
        <Grid className="homeBgIner vh-section">
          {this.state.loaderImage && <Loader />}
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              {/* Mobile menu */}
              <LeftMenuMobile isNotShow={true} currentPage="more" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="more" />
                </Grid>
                {/* End of Menu */}

                {/* Start of Right Section */}
                <Grid item xs={12} md={10}>
                  <Grid className="topLeftSpc">
                    <Grid container direction="row">
                      <Grid item xs={6} md={6}>

                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid className="openAssser">


                          <Grid className="newServc">
                            <Button onClick={() => handleOpenServ(this)}>
                              {newstaffGroup}
                            </Button>
                            <Modal
                              open={this.state.openServ}
                              onClose={() => handleCloseServ(this)}
                              className={
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
                                    ? "darkTheme addSpeclContnt"
                                    : "addServContnt"
                                }
                              // className="addServContnt"
                              >
                                <Grid className="addSpeclContntIner">
                                  <Grid className="addSpeclLbl">
                                    <Grid
                                      container
                                      direction="row"
                                      justify="center"
                                    >
                                      <Grid item xs={8} md={8} lg={8}>
                                        <label>{AddnewstaffGroup}</label>
                                      </Grid>
                                      <Grid item xs={4} md={4} lg={4}>
                                        <Grid>
                                          <Grid className="entryCloseBtn">
                                            <a
                                              onClick={() =>
                                                handleCloseServ(this)
                                              }
                                            >
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
                                  </Grid>
                                  <div className="error_message">
                                      {this.state.errorMsg}
                                    </div>
                                    <Grid className="enterServMain">
                                    <Grid className="enterSpcl">
                                      <Grid>
                                        <VHfield
                                          label={Grouptitle}
                                          name="title"
                                          placeholder={EnterGroupname}
                                          onChange={(e) =>
                                            updateEntryState1(e, this)
                                          }
                                          value={this.state.updateTrack.title}
                                        />
                                      </Grid>

                                      <Grid>
                                        <VHfield
                                          label={Groupshortdescription}
                                          name="description"
                                          placeholder={
                                            Entergroupshortdescription
                                          }
                                          onChange={(e) =>
                                            updateEntryState1(e, this)
                                          }
                                          value={
                                            this.state.updateTrack.description
                                          }
                                        />
                                      </Grid>
                                      <Grid className="enterSpcl">
                                        <Grid className="customservicetitle">
                                          <label>{speciality}</label>
                                        </Grid>
                                        <Grid className="sevicessection serviceallSec">
                                          <Select
                                           onChange={(e) =>
                                            onFieldChange(e, this)
                                          }
                                          options={this.state.AllSpeciality}
                                          name="specialty_name"
                                          isSearchable={true}
                                          className="addStafSelect"
                                          isMulti={true}
                                          value={selectedID(
                                            this.state.updateTrack.specialty_id,
                                            this
                                          )}
                                          />
                                        </Grid>
                                      </Grid>


                                      <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        className="enterPricePart1"
                                      >
                                        <VHfield
                                          label={Ward}
                                          name="ward"
                                          placeholder="enter ward"
                                          onChange={(e) =>
                                            updateEntryState1(e, this)
                                          }
                                          value={
                                            this.state.updateTrack.ward
                                          }
                                        />

                                      </Grid>
                                      <label className="enterSpcl">
                                        {nurselist}
                                      </label>
                                      <Grid className="sevicessection serviceallSec">
                                        <Select
                                          name="specialty_name"
                                          isSearchable={true}
                                          className="addStafSelect"
                                          isMulti={true}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid className="servSaveBtn">
                                    <a>
                                      <Button
                                      onClick={() => this.handleSubmit()}
                                      >
                                        {save_and_close}
                                      </Button>
                                    </a>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Modal>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>


                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={9}>
                          <Grid className="roomBreadCrumb medcalCntr">
                            <ul>
                              <li>
                                <a>
                                  <label>{StaffGroup}</label>
                                </a>
                              </li>
                            </ul>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid className="settingInfo">
                          {this.state.showinput && (
                              <input
                                name="Search"
                                 placeholder={Search}
                                value={this.state.SearchValue}
                                className="serchInput"
                                // onChange={(e) => searchFilter(e, this)}
                              />
                            )}
                            <a>
                              {!this.state.showinput ? (
                                <img
                                  src={require("assets/virtual_images/search-entries.svg")}
                                  alt=""
                                  title=""
                                  onClick={() => {
                                    this.setState({
                                      showinput: !this.state.showinput,
                                    });
                                  }}
                                />
                              ) : (
                                <img
                                  src={require("assets/images/close-search.svg")}
                                  alt=""
                                  title=""
                                  onClick={() => {
                                    this.setState({
                                      showinput: !this.state.showinput,
                                      SearchValue: "",
                                    });
                                    // getAllServices(this);
                                  }}
                                />
                              )}
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Bread Crumb */}


                    {/* service price content */}
                    <Grid className="srvcTable3">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>{staffgrouptitle}</Th>
                            <Th>{staffgroupname}</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                        </Tbody>
                      </Table>

                      <Grid className="tablePagNum">
                        <Grid container direction="row">
                          <Grid item xs={12} md={6}>
                            <Grid className="totalOutOff">
                              <a>
                                {this.state.currentPage} of{" "}
                                {this.state.totalPage}
                              </a>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {this.state.totalPage > 1 && (
                              <Grid className="prevNxtpag">
                                <Pagination
                                  totalPage={this.state.totalPage}
                                  currentPage={this.state.currentPage}
                                  pages={this.state.pages}
                                  onChangePage={(page) => {
                                    onChangePage(page, this);
                                  }}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* end of service price content */}
                  </Grid>
                </Grid>
                {/* End of Right Section */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index)
);

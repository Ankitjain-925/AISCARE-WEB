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
import { S3Image } from "Screens/Components/GetS3Images/index";
import {
  onChangePage,
  handleOpenServ,
  handleCloseServ,
  updateEntryState1,
  teamstaff,
  handleSubmit,
  DeleteStaff,
  stffchange,
  // GetProfessionalwstaff1,
  editStaff,
} from "./api";

import { Speciality } from "Screens/Login/speciality.js";
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
      openAss: false,
      teamstaff: [],
      staff_data: [],
      AllStaff: [],
      specilaityList: [],
      selectSpec2: "",
      wardList: [],
      selectWard: "",
      staffslct: [],
      openServSec: false,
      showStaff: [],
    };
  }

  componentDidMount() {
    teamstaff(this);
    // GetProfessionalwstaff1(this);
    this.specailityList();
   
  }

  //On Changing the specialty id
  onFieldChange2 = (e) => {
    this.setState({ selectWard: "" });
    let specialityList =
      this.props.speciality?.SPECIALITY &&
      this.props.speciality?.SPECIALITY.length > 0 &&
      this.props.speciality?.SPECIALITY.filter((item) => {
        return item && item._id == e.value;
      });
    let wardsFullData =
      specialityList && specialityList.length > 0 && specialityList[0].wards;
    let wards_data =
      wardsFullData &&
      wardsFullData.length > 0 &&
      wardsFullData.map((item) => {
        return { label: item.ward_name, value: item._id };
      });
    var state = this.state.updateTrack;
    state["speciality_id"] = e?.value;

    this.setState({
      selectSpec2: e,
      wardList: wards_data,
      allWards: wardsFullData,
      updateTrack: state,
    });
  };
  // ward Change
  onWardChange = (e) => {
    var state = this.state.updateTrack;
    console.log("e", e);
    state["ward_id"] = e.value;
    this.setState({ selectWard: e, updateTrack: state });
  };

  // //to get the speciality list
  specailityList = () => {
    var spec =
      this.props.speciality?.SPECIALITY &&
      this.props?.speciality?.SPECIALITY.length > 0 &&
      this.props?.speciality?.SPECIALITY.map((data) => {
        return { label: data.specialty_name, value: data._id };
      });
    this.setState({ specilaityList: spec ? spec : [] });
  };
handleOpenServSec = (item) => {
    this.setState({ openServSec: true, showStaff: item });
  };
  handleCloseServSec = () => {
    this.setState({ openServSec: false });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      editstaff,
      deleteStaff,
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
      staffname,
      staffmembers,
      Search,
      staff_members,
    } = translate;
    const { services_data, staff_data } = this.state;
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

    const { House: { roles = [] } = {} } = this.props || {}
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
                      <Grid item xs={6} md={6}></Grid>
                      <Grid item xs={12} md={6}>
                        <Grid className="openAssser">
                          <Grid className="newServc">
                            {roles.includes('add_group_staff') &&
                              <Button onClick={() => handleOpenServ(this)}>
                                {newstaffGroup}
                              </Button>}
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
                                      <label>{speciality}</label>
                                      <Grid className="addInput">
                                        <Select
                                          onChange={(e) =>
                                            this.onFieldChange2(e)
                                          }
                                          options={this.state.specilaityList}
                                          name="speciality_id"
                                          value={this.state.selectSpec2}
                                          className="addStafSelect"
                                          isMulti={false}
                                          isSearchable={true}
                                        />
                                      </Grid>
                                    </Grid>

                                    {/* {this.state.wardList &&
                                      this.state.wardList.length > 0 && ( */}
                                    <Grid className="enterSpcl">
                                      <label>{Ward}</label>
                                      <Grid className="addInput">
                                        <Select
                                          onChange={(e) => this.onWardChange(e)}
                                          options={this.state.wardList}
                                          name="ward_name"
                                          value={this.state.selectWard}
                                          isMulti={false}
                                          className="addStafSelect"
                                          isSearchable={true}
                                        />
                                      </Grid>
                                    </Grid>
                                    {/* )} */}

                                    <Grid className="enterSpcl">
                                      <Grid>
                                        <VHfield
                                          label={Grouptitle}
                                          name="team_name"
                                          placeholder={EnterGroupname}
                                          onChange={(e) =>
                                            updateEntryState1(e, this)
                                          }
                                          value={this.state.team_name}
                                        />
                                      </Grid>
                                      <label className="enterSpcl">
                                        {nurselist}
                                      </label>
                                      <Grid className="sevicessection serviceallSec">
                                        <Select
                                          onChange={(e) => stffchange(e, this)}
                                          options={this.state.teamstaff}
                                          name="staff"
                                          isSearchable={true}
                                          isMulti={true}
                                          className="addStafSelect"
                                          value={this.state.staffslct}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid className="servSaveBtn">
                                    <a>
                                      <Button
                                        onClick={() => handleSubmit(this)}
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
                            <Th>{staffname}</Th>
                            <Th>{staffmembers}</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {staff_data?.length > 0 &&
                            staff_data.map((data) => (
                              <>
                                <Tr>
                                  <Td>
                                    <label>{data?.team_name}</label>
                                  </Td>

                                  <Td
                                    onClick={() => {
                                      this.handleOpenServSec(data?.staff);
                                    }}
                                  >
                                    {data?.staff?.length}
                                  </Td>

                                  <Grid className="newServc">
                                    <Modal
                                      open={this.state.openServSec}
                                      onClose={this.handleCloseServSec}
                                      className={
                                        this.props.settings.setting &&
                                          this.props.settings.setting.mode &&
                                          this.props.settings.setting.mode ===
                                          "dark"
                                          ? "darkTheme addSpeclModel"
                                          : "addSpeclModel"
                                      }
                                    >
                                      <Grid
                                        className={
                                          this.props.settings &&
                                            this.props.settings.setting &&
                                            this.props.settings.setting.mode &&
                                            this.props.settings.setting.mode ===
                                            "dark"
                                            ? "darkTheme addSpeclContnt addStaffPart"
                                            : "addServContnt addStaffPart"
                                        }
                                      >
                                        <Grid className="addSpeclContntIner">
                                          <Grid className="addSpeclLbl">
                                            <Grid
                                              container
                                              direction="row"
                                              justify="center"
                                            >
                                              <Grid item xs={8} md={8} lg={8}>
                                                <label>{staff_members}</label>
                                              </Grid>
                                              <Grid item xs={4} md={4} lg={4}>
                                                <Grid>
                                                  <Grid className="entryCloseBtn">
                                                    <a
                                                      onClick={
                                                        this.handleCloseServSec
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

                                          <Grid className="enterServMain">
                                            {this.state.showStaff &&
                                              this.state.showStaff.length > 0 &&
                                              this.state.showStaff.map(
                                                (item) => {
                                                  return (
                                                    <Grid className="creatDetail">
                                                      <Grid className="creatInfoIner tasklistName allInfo">
                                                        <Grid>
                                                          <S3Image
                                                            imgUrl={item?.image}
                                                          />
                                                        </Grid>
                                                        <Grid className="allStaffRghtSec">
                                                          <Grid>
                                                            <label>
                                                              {item.first_name}{" "}
                                                              {item.last_name}
                                                            </label>
                                                          </Grid>
                                                          <p>
                                                            {item.profile_id}
                                                          </p>
                                                        </Grid>
                                                      </Grid>
                                                    </Grid>
                                                  );
                                                }
                                              )}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Modal>
                                  </Grid>

                                  {/* <Td className="srvcDots"> */}

                                  <Td>
                                    <Grid
                                      item
                                      xs={6}
                                      md={6}
                                      className="spcMgntRght7 presEditDot scndOptionIner scndOptionInerPart"
                                    >
                                      <a className="openScndhrf">
                                        <img
                                          src={require("assets/images/three_dots_t.png")}
                                          alt=""
                                          title=""
                                          className="openScnd specialuty-more"
                                        />
                                        <ul>
                                          {roles.includes('edit_group_staff') &&
                                            <li
                                              onClick={() => {
                                                editStaff(data, this);
                                              }}
                                            >
                                              <a>
                                                <img
                                                  src={require("assets/virtual_images/pencil-1.svg")}
                                                  alt=""
                                                  title=""
                                                />
                                                {editstaff}
                                              </a>
                                            </li>}
                                          {roles.includes('delete_group_staff') &&
                                            <li
                                              onClick={() => {
                                                DeleteStaff(data, this);
                                              }}
                                            >
                                              <a>
                                                <img
                                                  src={require("assets/images/cancel-request.svg")}
                                                  alt=""
                                                  title=""
                                                />
                                                {deleteStaff}
                                              </a>
                                            </li>}
                                        </ul>
                                      </a>
                                    </Grid>
                                  </Td>
                                </Tr>
                              </>
                            ))}
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

  console.log("=============state=====================>", state)
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

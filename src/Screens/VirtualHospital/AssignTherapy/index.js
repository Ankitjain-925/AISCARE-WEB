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
    getSpecialty
} from "../../VirtualHospital/Services/api";
import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
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

    //For adding the New therapy
    handleSubmit = () => {
        let translate = getLanguage(this.props.stateLanguageType);
        let { } = translate;
        this.setState({ errorMsg: '' })
        var data = this.state.updateTrack;
        if (!data.title || (data && data?.title && data?.title.length < 1)) {
            this.setState({ errorMsg: "please enter therapy name" })
        }
        else if (!data.description) {
            this.setState({ errorMsg: "please enter therapy description" })
        }
        else if (!data.testing) {
            this.setState({ errorMsg: "please enter therapy testing" })
        }
        else {
            axios
            .post(sitedata.data.path + "/Addtherapy", commonHeader(this.props.stateLoginValueAim.token))
            .then((responce) => {
              handleCloseServ(this);
            })
            .catch(function (error) {
              console.log(error);
             this.setState({ errorMsg: "Something_went_wrong" })
      
            });
        console.log('no value')
            handleCloseServ(this);
        }
    };


    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            Addnewtherapy,
            Therapy,
            speciality,
            addtherapy,
            save_and_close,
            all,
            therapyTesting,
            EnterTherapyname,
            newTherapy,
            editTherapy,
            viewTherapy,
            deleteTherapy,
            assign_to_patient,
            DiseaseName,
            therapy_name,
            total_task_or_services,
            Entertherapyshortdescription,
            EntertherapyTesting,
            Therapyshortdescription,
            Therapyname,
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
        const data = [
            { name: "Interpersonal therapy", disease: 'Dengue', total_tasks: "2" },
            { name: "Exposure therapy", disease: 'Babesiosis', total_tasks: "3" },
            { name: "Psychodynamic therapy", disease: 'Campylobacteriosis', total_tasks: "4" },
            { name: "Animal-assisted therapy", disease: 'Chickenpox', total_tasks: "8" },
            { name: "Cognitive-behavioral therapy", disease: 'Giardiasis', total_tasks: "9" },
        ];
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
                                                {/* Back common button */}
                                                {/* End of Back common button */}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Grid className="openAssser"> <Grid className="newServc">
                                                    <Button onClick={() => handleOpenServ(this)}>
                                                        {addtherapy}
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
                                                                            <label>{Addnewtherapy}</label>
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
                                                                                label={Therapyname}
                                                                                name="title"
                                                                                placeholder={EnterTherapyname}
                                                                                onChange={(e) =>
                                                                                    updateEntryState1(e, this)
                                                                                }
                                                                                value={this.state.updateTrack.title}
                                                                            />
                                                                        </Grid>

                                                                        <Grid>
                                                                            <VHfield
                                                                                label={Therapyshortdescription}
                                                                                name="description"
                                                                                placeholder={
                                                                                    Entertherapyshortdescription
                                                                                }
                                                                                onChange={(e) =>
                                                                                    updateEntryState1(e, this)
                                                                                }
                                                                                value={
                                                                                    this.state.updateTrack.description
                                                                                }
                                                                            />
                                                                        </Grid>

                                                                        <label className="specbutton1">
                                                                            {speciality}
                                                                        </label>
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

                                                                        <Grid
                                                                            item
                                                                            xs={12}
                                                                            md={12}
                                                                            className="enterPricePart1"
                                                                        >
                                                                            <VHfield
                                                                                label={therapyTesting}
                                                                                name="testing"
                                                                                placeholder={EntertherapyTesting}
                                                                                onChange={(e) =>
                                                                                    updateEntryState1(e, this)
                                                                                }
                                                                                value={
                                                                                    this.state.updateTrack.testing
                                                                                }
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
                                                    <Modal
                                                        open={this.state.viewTher}
                                                        // onClose={() => handleCloseServ(this)}
                                                        onClose={() => this.setState({ viewTher: false })}
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
                                                                            {/* <label>{Addnewservice}</label> */}
                                                                            <label>View Therapy</label>

                                                                        </Grid>
                                                                        <Grid item xs={4} md={4} lg={4}>
                                                                            <Grid>
                                                                                <Grid className="entryCloseBtn">
                                                                                    <a
                                                                                        // onClick={() =>
                                                                                        //   handleCloseServ(this)
                                                                                        // }
                                                                                        onClick={() => this.setState({ viewTher: false })}

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
                                                                    <Grid className="enterSpcl">
                                                                        <Grid>
                                                                            <label className="specbutton1">
                                                                                Therapy Name
                                                                            </label>
                                                                            <div style={{ paddingBottom: 8 }}>Interpersonal therapy</div>
                                                                        </Grid>
                                                                        <Grid>
                                                                            <label className="specbutton1">
                                                                                Therapy description
                                                                            </label>
                                                                            <div style={{ paddingBottom: 8 }}>Fever	</div>

                                                                        </Grid>
                                                                        <Grid>
                                                                            <label className="specbutton1">
                                                                                Disease name
                                                                            </label>
                                                                            <div style={{ paddingBottom: 8 }}>Dengue	</div>

                                                                        </Grid>
                                                                        <Grid>
                                                                            <label className="specbutton1">
                                                                                Assigned To
                                                                            </label>
                                                                            <div style={{ paddingBottom: 8 }}>Vibhav	</div>

                                                                        </Grid>
                                                                        <Grid>
                                                                            <label className="specbutton1">
                                                                                Sequence of Tasks/ Assigned services

                                                                            </label>
                                                                            <div style={{ paddingBottom: 8 }}>-	</div>

                                                                        </Grid>
                                                                        <Grid className="srvcTable3">
                                                                            <Table>
                                                                                <Thead>
                                                                                    <Tr>
                                                                                        <Th></Th>
                                                                                        <Th>Type</Th>
                                                                                        <Th>Title of type </Th>
                                                                                        <Th>Description of Type</Th>
                                                                                    </Tr>
                                                                                </Thead>
                                                                                <Tbody>
                                                                                    <Tr>

                                                                                        <Td>1</Td>
                                                                                        <Td>-</Td>
                                                                                        <Td>-</Td>
                                                                                        <Td>-</Td>
                                                                                    </Tr>
                                                                                </Tbody>
                                                                            </Table>
                                                                        </Grid>

                                                                    </Grid>

                                                                    <div className="err_message">
                                                                        {this.state.errorMsg}
                                                                    </div>
                                                                </Grid>
                                                                <Grid className="servSaveBtn">
                                                                    <a>
                                                                        <Button
                                                                            //onClick={() => handleSubmit(this)}
                                                                            disabled={this.state.isButtonDisabled}

                                                                        >
                                                                            {/* {save_and_close} */}
                                                                            Close
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
                                                                    <label>{Therapy}</label>
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
                                        <Grid className="cardioGrup">
                                            <Grid className="cardioGrupBtn">
                                                <Button
                                                    onClick={() => {
                                                        // getSpecialtyData(false, this);
                                                    }}
                                                    className={
                                                        !this.state.speciality_id ? "cardioActv" : ""
                                                    }
                                                    variant="contained"
                                                >
                                                    {all}
                                                </Button>

                                            </Grid>
                                        </Grid>

                                        {/* service price content */}
                                        <Grid className="srvcTable3">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>{therapy_name}</Th>
                                                        <Th>{DiseaseName}</Th>
                                                        <Th>{total_task_or_services}</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data.map((item) => (

                                                        <Tr key={item.name}>
                                                            <Td>{item.name}</Td>
                                                            <Td>{item.disease}</Td>
                                                            <Td>{item.total_tasks}</Td>
                                                            <Td className="srvcDots">
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
                                                                            <li onClick={() => this.setState({ viewTher: true })}
                                                                            >
                                                                                <a>
                                                                                    <img
                                                                                        src={require("assets/virtual_images/pencil-1.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    {viewTherapy}
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a>
                                                                                    <img
                                                                                        src={require("assets/virtual_images/pencil-1.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    {assign_to_patient}
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a>
                                                                                    <img
                                                                                        src={require("assets/virtual_images/pencil-1.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    {editTherapy}
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a>
                                                                                    <img
                                                                                        src={require("assets/images/cancel-request.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    {deleteTherapy}
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </a>

                                                                </Grid>
                                                            </Td>
                                                        </Tr>
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

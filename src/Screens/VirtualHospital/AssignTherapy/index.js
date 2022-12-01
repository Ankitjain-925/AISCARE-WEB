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
    updateEntryState1,
    onFieldChange,
    selectedID,
    getSpecialty
} from "../../VirtualHospital/Services/api";
import { getLanguage } from "translations/index";
import {
    handleSubmit,
    handleOpenServ,
    handleCloseServ,
    getAllTherpy,
    EditTherapy,
    DeleteTherapy,
    GetProfessionalData,
    updateEntryState3,
    taskSelection,
    updateEntry,
    handleAddData,
    editTaskSer,
    removeServices,
    closeFullQues
} from "./api"
// import AssignPatient from "./AssignPatient";
import ViewTherapy from "./ViewTherapy";

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
            AddTaskSection: [
                { value: 'task', label: 'Task' },
                { value: 'assign_service', label: 'Assign Service' }
            ],
            allSequence: {},
            seqItems: [],
            indexForUpdate: 0
        };
    }

    // updateEntry = (e) => {
    //     const state = this.state.allSequence;
    //     state[e.target.name] = e.target.value;
    //     this.setState({ allSequence: state });
    // }

    componentDidMount() {
        getSpecialty(this);
        getAllTherpy(this);
        GetProfessionalData(this);
    }

    handleOpenAssPat = () => {
        this.setState({ openAssPat: true });
    }

    closeFullQues = () => {
        this.setState({ viewTher: false });
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            viewData,
            Assignedto,
            Search_Select,
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
            Enterdiseasename,
            therapy_name,
            total_task_or_services,
            Entertherapyshortdescription,
            EntertherapyTesting,
            Therapyshortdescription,
            Therapyname,
            Price,
            Enterserviceprice,
            Search
        } = translate;
        const { AllTherpy, assignTask, taskName, viewAllData } = this.state;
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
                                                            <Grid className="addSpeclContntIner1">
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
                                                                                name="therapy_name"
                                                                                placeholder={EnterTherapyname}
                                                                                onChange={(e) =>
                                                                                    updateEntryState1(e, this)
                                                                                }
                                                                                value={this.state.updateTrack?.therapy_name}
                                                                            />
                                                                        </Grid>

                                                                        <Grid>
                                                                            <VHfield
                                                                                label={Therapyshortdescription}
                                                                                name="therapy_description"
                                                                                placeholder={
                                                                                    Entertherapyshortdescription
                                                                                }
                                                                                onChange={(e) =>
                                                                                    updateEntryState1(e, this)
                                                                                }
                                                                                value={
                                                                                    this.state.updateTrack?.therapy_description
                                                                                }
                                                                            />
                                                                        </Grid>

                                                                        <Grid>
                                                                            <VHfield
                                                                                label={DiseaseName}
                                                                                name="disease_name"
                                                                                placeholder={
                                                                                    Enterdiseasename
                                                                                }
                                                                                onChange={(e) =>
                                                                                    updateEntryState1(e, this)
                                                                                }
                                                                                value={
                                                                                    this.state.updateTrack?.disease_name
                                                                                }
                                                                            />
                                                                        </Grid>

                                                                        <Grid item xs={12} md={12} className="assignSection">
                                                                            <label>{Assignedto}</label>
                                                                            <Grid>
                                                                                <Select
                                                                                    name="professional"
                                                                                    onChange={(e) => updateEntryState3(this, e)}
                                                                                    value={this.state.assignedTo}
                                                                                    options={this.state.professional_id_list1}
                                                                                    placeholder={Search_Select}
                                                                                    className="addStafSelect"
                                                                                    isMulti={true}
                                                                                    isSearchable={true}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>


                                                                        <Grid className="addSrvcBtn3" >
                                                                            <h3 className="service-head">Sequence of Task / Assigned Services</h3>
                                                                        </Grid>


                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid className="wardsGrup3">
                                                                                {/* {this.state.taskData?.length > 0 && */}
                                                                                <Grid className="roomsNum3" style={{ "paddingLeft": "30px", "paddingRight": "30px" }}>
                                                                                    <Grid container direction="row">
                                                                                        <Grid item xs={12} md={12} className="services-head">
                                                                                            {/* <b>Tasks</b> */}
                                                                                            <table>
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th style={{ "width": "20%", "text-align": "left" }}>No.</th>
                                                                                                        <th style={{ "width": "30%", "text-align": "left" }}>Name</th>
                                                                                                        <th style={{ "width": "40%", "text-align": "left" }}>Description</th>
                                                                                                        <th style={{ "width": "10%", "text-align": "left" }}>Edit/Delete</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                {this.state.seqItems.map((item, index) => {
                                                                                                    return <tbody>
                                                                                                        <tr>
                                                                                                            <td style={{ "maxWidth": "30px" }} key={index}>{index + 1}</td>
                                                                                                            <td style={{ "maxWidth": "50px" }} key={index}>{item?.task_name || item?.service_name}</td>
                                                                                                            <td style={{ "maxWidth": "100px" }} key={index}>{item?.task_description || item?.service_description}</td>
                                                                                                            <td style={{ "maxWidth": "40px" }} key={index}>
                                                                                                                <Grid className="setEditDelBut">
                                                                                                                    <img
                                                                                                                        style={{ "padding": "7px", "cursor": "pointer" }}
                                                                                                                        onClick={() => {
                                                                                                                            editTaskSer(this, item, index);
                                                                                                                        }}
                                                                                                                        src={require("assets/virtual_images/pencil-1.svg")}
                                                                                                                        alt=""
                                                                                                                        title=""
                                                                                                                    />
                                                                                                                    <img
                                                                                                                        style={{ "padding": "7px", "cursor": "pointer" }}
                                                                                                                        onClick={() => {
                                                                                                                            removeServices(this, index, item);
                                                                                                                        }}
                                                                                                                        src={require("assets/virtual_images/bin.svg")}
                                                                                                                        alt=""
                                                                                                                        title=""
                                                                                                                    />
                                                                                                                </Grid>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                })}
                                                                                            </table>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                {/* } */}

                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid className="addSrvcBtn3" >
                                                                            <h3 style={{ "padding": "30px", "paddingTop": "0px" }} className="service-head">
                                                                                <a onClick={() => { this.setState({ assignTask: true, allSequence: {}, taskName: {} }) }}>Add Sequences</a>
                                                                            </h3>
                                                                        </Grid>
                                                                        <div className="error_message">
                                                                            {this.state.errorMsg1}
                                                                        </div>

                                                                        {assignTask &&
                                                                            <Grid style={{ "padding": "30px", "paddingTop": "0px" }}>
                                                                                <label>Type</label>
                                                                                <Select
                                                                                    name="type"
                                                                                    options={this.state.AddTaskSection}
                                                                                    placeholder="Select Type"
                                                                                    onChange={(e) => taskSelection(this, e)}
                                                                                    value={this.state.taskName}
                                                                                    className="addStafSelect"
                                                                                    isMulti={false}
                                                                                    isSearchable={true}
                                                                                />
                                                                            </Grid>
                                                                        }

                                                                        {taskName?.value === "task" &&
                                                                            <Grid style={{ "padding": "30px", "paddingTop": "0px" }}>
                                                                                <VHfield
                                                                                    label="Task Name"
                                                                                    name="task_name"
                                                                                    placeholder="Task Name"
                                                                                    onChange={(e) => updateEntry(this, e)}
                                                                                    value={this.state?.allSequence?.task_name || ""}
                                                                                />
                                                                                <p className="err_message">{this.state.errorTaskName}</p>
                                                                                <VHfield
                                                                                    label="Task Description"
                                                                                    name="task_description"
                                                                                    placeholder="Task Description"
                                                                                    onChange={(e) => updateEntry(this, e)}
                                                                                    value={this.state?.allSequence?.task_description || ""}
                                                                                />
                                                                                <p className="err_message">{this.state.errorTaskDesc}</p>
                                                                                {/* <Grid className="addSrvcBtn3" >
                                                                                    <h3 style={{ "padding": "30px", "paddingTop": "0px" }} className="service-head">
                                                                                        <a onClick={this.handleAddTasks}>Add Tasks</a>
                                                                                    </h3>
                                                                                </Grid> */}
                                                                            </Grid>}
                                                                        {taskName?.value === "assign_service" &&
                                                                            <Grid style={{ "padding": "30px", "paddingTop": "0px" }}>
                                                                                <VHfield
                                                                                    label="Service Name"
                                                                                    name="service_name"
                                                                                    placeholder="Service Name"
                                                                                    onChange={(e) =>
                                                                                        updateEntry(this, e)
                                                                                    }
                                                                                    value={this.state?.allSequence?.service_name || ""}
                                                                                />
                                                                                <p className="err_message">{this.state.errorServiceName}</p>
                                                                                <VHfield
                                                                                    label="Service Description"
                                                                                    name="service_description"
                                                                                    placeholder="Service Description"
                                                                                    onChange={(e) =>
                                                                                        updateEntry(this, e)
                                                                                    }
                                                                                    value={this.state?.allSequence?.service_description || ""}
                                                                                />
                                                                                <p className="err_message">{this.state.errorServiceDesc}</p>
                                                                                {/* <label>Services</label> */}
                                                                                {/* <Select
                                                                                    name="services"
                                                                                    onChange={(e) => this.onServiceChanges(e, "services")}
                                                                                    value={this.state?.assignedService || []}
                                                                                    options={this.state.servicesDataObj}
                                                                                    placeholder="Select Services"
                                                                                    className="addStafSelect"
                                                                                    isMulti={true}
                                                                                    isSearchable={true}
                                                                                /> */}

                                                                                {/* <VHfield
                                                                                    label={Price}
                                                                                    name="service_price"
                                                                                    placeholder={Enterserviceprice}
                                                                                    onChange={(e) =>
                                                                                        updateEntry(this, e)
                                                                                    }
                                                                                    value={
                                                                                        this.state.allSequence.service_price || 0
                                                                                    }
                                                                                /> */}
                                                                                <p className="err_message">{this.state.errorServices}</p>
                                                                                {/* <Grid className="addSrvcBtn3" >
                                                                                    <h3 style={{ "padding": "30px", "paddingTop": "0px" }} className="service-head">
                                                                                        <a onClick={this.handleAddServices}>Add Services</a>
                                                                                    </h3>
                                                                                </Grid> */}
                                                                            </Grid>}
                                                                        {taskName?.value && <Grid className="addSrvcBtn3" >
                                                                            <h3 style={{ "padding": "30px", "paddingTop": "0px" }} className="service-head">
                                                                                <a onClick={() => { handleAddData(this) }}>{taskName?.value === "task" ? "Add Task" : "Add Service"}</a>
                                                                            </h3>
                                                                        </Grid>}


                                                                        {/* <label className="specbutton1">
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
                                                                        </Grid> */}

                                                                        {/* <Grid
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
                                                                        </Grid> */}
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
                                                    {AllTherpy && AllTherpy.length > 0 && AllTherpy.map((item, index) => (
                                                        <Tr key={index}>
                                                            <Td>{item?.therapy_name}</Td>
                                                            <Td>{item?.disease_name}</Td>
                                                            <Td>{item?.sequence_list?.length}</Td>
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
                                                                            <li onClick={() => this.setState({ viewTher: true, viewAllData: item })}
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
                                                                            <li onClick={() => { this.handleOpenAssPat() }}>
                                                                                <a>
                                                                                    <img
                                                                                        src={require("assets/virtual_images/pencil-1.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    {assign_to_patient}
                                                                                </a>
                                                                            </li>
                                                                            <li onClick={() => EditTherapy(this, item)}>
                                                                                <a>
                                                                                    <img
                                                                                        src={require("assets/virtual_images/pencil-1.svg")}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    {editTherapy}
                                                                                </a>
                                                                            </li>
                                                                            <li onClick={() => DeleteTherapy(this, item)}>
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
                                            {/* <AssignPatient /> */}
                                            <ViewTherapy
                                                viewTher={this.state.viewTher}
                                                item={viewAllData}
                                                closeFullQues={() => this.closeFullQues()}
                                            />

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

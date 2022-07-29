import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index";
import Modal from "@material-ui/core/Modal";
import DateFormat from 'Screens/Components/DateFormat/index';
import TimeFormat from 'Screens/Components/TimeFormat/index';
import Button from "@material-ui/core/Button";
import Select from "react-select";
import TextField from '@material-ui/core/TextField';
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
import { getProfessionalData } from 'Screens/VirtualHospital/PatientFlow/data';
import { getPatientData } from 'Screens/Components/CommonApi/index';
import { Speciality } from 'Screens/Login/speciality.js';



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
            openAss: this.props.openAss ? this.props.openAss : false,
            service: {},
            viewCutom: false,
            serviceList1: [],
            users1: {},
            selectedPat: {},
            professional_id_list1: [],
            assignedTo: [],
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            openDate: true,
            AllSpeciality: [],
            specilaityList: [],
            newspeciality: []
        };
    }

    componentDidMount() {
        this.getAssignService();
        this.getPatientData();
        this.getProfessionalData();
        this.specailityList();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.openAss !== this.props.openAss) {
            this.setState({ openAss: this.props.openAss });
        }
    };

    handleOpenAss = () => {
        this.setState({ openAss: true });
    };

    handleCloseAss = () => {
        this.setState({ openAss: false, service: {}, selectedPat: {}, viewCutom: false, errorMsg: false });
    };
    openTaskTime = () => {
        this.setState({ openDate: !this.state.openDate });
    };

    onFieldChange1 = (e, name) => {
        const state = this.state.service;
        if (name === 'service') {
            if (e.value === 'custom') {
                this.setState({ viewCutom: true });
            } else {
                this.setState({ viewCutom: false });
            }
            state['price'] = e.price;
            state[name] = e;
        } else {
            state[name] = e;
        }
        this.setState({ service: state });


    };

    patientField = (e) => {
        this.setState({ selectedPat: e });

    };
    assignedTo = (e) => {
        this.setState({ assignedTo: e });
    }
    //Get patient list
    getPatientData = async () => {
        this.setState({ loaderImage: true });
        let response = await getPatientData(
            this.props.stateLoginValueAim.token,
            this.props?.House?.value,
            'invoice'
        );
        if (response.isdata) {
            this.setState({
                users1: response.PatientList1,
                users: response.patientArray,
                loaderImage: false,
            });
        } else {
            this.setState({ loaderImage: false });
        }
    };

    //to get the speciality list
    specailityList = () => {
        var spec =
            this.props.speciality?.SPECIALITY &&
            this.props?.speciality?.SPECIALITY.length > 0 &&
            this.props?.speciality?.SPECIALITY.map((data) => {
                return { label: data.specialty_name, value: data._id };
            });
        this.setState({ specilaityList: spec });
    };

    // Get the Professional data
    getProfessionalData = async () => {
        this.setState({ loaderImage: true });
        var data = await getProfessionalData(
            this.props?.House?.value,
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
    };


    specialityField = (e) => {
        this.setState({ newspeciality: e });
    };




    updateEntry = (value, name) => {
        var due_on = this.state.service?.due_on ? this.state.service?.due_on : {};
        const state = this.state.service;
        if (name === 'date' || name === 'time') {
            due_on[name] = value;
            state['due_on'] = due_on;
        } else {
            state[name] = value;
        }
        this.setState({ service: state });

    };
    //get services list
    getAssignService = () => {
        var serviceList = [],
            serviceList1 = [];
        axios
            .get(
                sitedata.data.path + '/vh/GetService/' + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ allServData: response.data.data });
                for (let i = 0; i < this.state.allServData.length; i++) {
                    serviceList1.push(this.state.allServData[i]);
                    serviceList.push({
                        price: this.state.allServData[i].price,
                        // description: this.state.allServData[i].description,
                        value: this.state.allServData[i]._id,
                        label: this.state.allServData[i]?.title,
                    });
                }
                var addCustom = <div className="addCustom">+ add custom service</div>;
                serviceList = [{ value: 'custom', label: addCustom }, ...serviceList];
                this.setState({
                    service_id_list: serviceList,
                    serviceList1: serviceList1,
                });
            });
    };


    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Searchserviceoraddcustominput,
            Addservice,
            Customservicedescription,
            Customservicetitle,
            ForPatient,
            Search_Select,
            Entertitle,
            Assignedtitle,
            Assignedto,
            Price,
            speciality,
            Enterserviceprice,
            FilterbySpeciality,
            Dueon,
            Addtime,
            save_and_close,
            remove_time,
            assignService,
            Addnewservice } = translate;
        return (

            <Grid className="newServc newServicAllSec">
                <Button onClick={() => this.handleOpenAss()} >
                    {assignService}
                </Button>
                <Modal
                    open={this.state.openAss}
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
                        <Grid className="addSpeclContntIner2">

                            <Grid className="addSpeclLbl">
                                <Grid className="addSpeclClose">
                                    <a onClick={() => this.handleCloseAss()}>
                                        <img
                                            src={require("assets/images/close-search.svg")}
                                            alt=""
                                            title=""
                                        />
                                    </a>
                                </Grid>
                                <Grid>
                                    <label>{Addnewservice}</label>
                                </Grid>
                            </Grid>


                            <Grid className="enterServMain">
                                <Grid className="enterSpcl">
                                    <Grid>
                                        <VHfield
                                            label={Assignedtitle}
                                            name="title"
                                            placeholder={Entertitle}
                                            onChange={(e) =>
                                                this.onFieldChange1(e.target.value, 'title')
                                            }
                                            value={this.state.service.title}
                                        />
                                    </Grid>
                                    <Grid>
                                        <label>{Addservice}</label>
                                        <Select
                                            value={this.state.service?.service || ''}
                                            name="service"
                                            onChange={(e) =>
                                                this.onFieldChange1(e, 'service')
                                            }
                                            options={this.state.service_id_list}
                                            placeholder={Searchserviceoraddcustominput}
                                            className="cstmSelect2"
                                            isSearchable={true}
                                            styles={customStyles}
                                        />
                                    </Grid>
                                    {this.state.viewCutom && (
                                        <Grid
                                            className='customservicetitle'

                                        >
                                            <Grid item xs={12} md={12}>
                                                <label>{Customservicetitle}</label>
                                                <TextField
                                                    placeholder={Customservicetitle}
                                                    name="custom_title"
                                                    onChange={(e) =>
                                                        this.onFieldChange1(
                                                            e.target.value,
                                                            'custom_title'
                                                        )
                                                    }
                                                    value={this.state.service?.custom_title || ''}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label>{Customservicedescription}</label>
                                                <TextField
                                                    placeholder={Customservicedescription}
                                                    name="custom_description"
                                                    onChange={(e) =>
                                                        this.onFieldChange1(
                                                            e.target.value,
                                                            'custom_description'
                                                        )
                                                    }
                                                    value={
                                                        this.state.service?.custom_description || ''
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        className="enterPricePart1 customservicetitle"
                                    >
                                        <VHfield
                                            label={Price}
                                            name="price"
                                            placeholder={Enterserviceprice}
                                            onChange={(e) =>
                                                this.onFieldChange1(
                                                    e.target.value,
                                                    'price'
                                                )
                                            }
                                            value={
                                                this.state?.service?.price || 0
                                            }
                                        />
                                        <p className="enterPricePart3">€</p>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label>{ForPatient}</label>
                                        <Grid>
                                            <Select
                                                name="patient"
                                                options={this.state.users1}
                                                placeholder={Search_Select}
                                                onChange={(e) =>
                                                    this.patientField(e, 'patient')
                                                }
                                                value={this.state.selectedPat || ''}
                                                className="addStafSelect"
                                                isMulti={false}
                                                isSearchable={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} className="customservicetitle">
                                        <label>{Assignedto}</label>
                                        <Grid>
                                            <Select
                                                name="professional"
                                                onChange={(e) => this.assignedTo(e, 'professional')}
                                                value={this.state.assignedTo}
                                                options={this.state.professional_id_list1}
                                                placeholder={Search_Select}
                                                className="addStafSelect"
                                                isMulti={true}
                                                isSearchable={true}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid className="enterSpcl">
                                        <Grid className="customservicetitle">
                                            <label>{speciality}</label>
                                        </Grid>
                                        <Grid className="sevicessection serviceallSec">
                                            <Select
                                                onChange={(e) => this.specialityField(e, 'specialty_name')}
                                                options={this.state.specilaityList}
                                                name="specialty_name"
                                                isSearchable={true}
                                                className="addStafSelect"
                                                isMulti={true}
                                                value={this.state.newspeciality}



                                            // isDisabled={
                                            //     this.props.comesFrom === 'Professional'
                                            //         ? true
                                            //         : false
                                            // }
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={12} className="dueOn creatInfoIner">
                                            <label>{Dueon}</label>
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
                                                            this.state.service?.due_on?.date
                                                                ? new Date(
                                                                    this.state.service?.due_on?.date
                                                                )
                                                                : new Date()
                                                        }
                                                        notFullBorder
                                                        date_format={this.state.date_format}
                                                        onChange={(e) =>
                                                            this.updateEntry(e, 'date')
                                                        }

                                                    // disabled={
                                                    //   this.props.comesFrom === 'Professional'
                                                    //     ? true
                                                    //     : false
                                                    // }
                                                    />
                                                    {/* { console.log("date_format",this.state.date_format)} */}
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={4}
                                                    md={4}
                                                    className={
                                                        this.state.openDate
                                                            ? 'addTimeTask'
                                                            : 'addTimeTask1'
                                                    }
                                                >
                                                    {this.state.openDate ? (
                                                        <Button
                                                            onClick={() => {
                                                                this.openTaskTime();
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
                                                                    this.state.service?.due_on?.time
                                                                        ? new Date(
                                                                            this.state.service?.due_on?.time
                                                                        )
                                                                        : new Date()
                                                                }
                                                                time_format={this.state.time_format}
                                                                onChange={(e) =>
                                                                    this.updateEntry(e, 'time')
                                                                }
                                                            // disabled={
                                                            //   this.props.comesFrom ===
                                                            //     'Professional'
                                                            //     ? true
                                                            //     : false
                                                            // }
                                                            />
                                                            <span
                                                                className="addTimeTask1span"
                                                                onClick={() => {
                                                                    this.setState({ openDate: true });
                                                                }}
                                                            >
                                                                {remove_time}
                                                            </span>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <div className="err_message">
                                    {this.state.errorMsg}
                                </div>
                            </Grid>
                            <Grid className="servSaveBtn">
                                <a>
                                    <Button>
                                        {save_and_close}
                                    </Button>
                                </a>
                            </Grid>

                        </Grid>
                    </Grid>
                </Modal>
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

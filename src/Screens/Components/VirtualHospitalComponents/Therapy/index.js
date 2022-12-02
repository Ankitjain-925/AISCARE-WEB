import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index";
import Modal from "@material-ui/core/Modal";
import DateFormat from 'Screens/Components/DateFormat/index';
import TimeFormat from 'Screens/Components/TimeFormat/index';
import Button from "@material-ui/core/Button";
import Select from "react-select";
import Loader from "Screens/Components/Loader/index";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
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
import { confirmAlert } from 'react-confirm-alert';
import _ from 'lodash';
import moment from "moment";
import { ConsoleCustom } from "Screens/Components/BasicMethod/index";

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
            openAss: this.props.openAss1 ? this.props.openAss1 : false,
            service: this.props.service || {},
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
            newspeciality: [],
            items: [],
            editServ: false,
            newServiceIndex: false,
            error: '',
            errorMsg: '',
            addservice: {},
            selectedHouse: this.props.selectedHouse,
            authErr: false,
            disableAssignment: false

        };
    }

    componentDidMount() {
        // this.getPatientData();
        // this.getProfessionalData();
        // this.therapylist();
    }

    createDuplicate = (data) => {
        delete data._id;
        data.archived = false;
        this.setState({ service: data });
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.patient !== this.props.patient) {
            let user = { value: this.props.patient?.patient_id };
            this.updateEntryState2(user);
        }
        if (prevProps.openAss1 !== this.props.openAss1) {
            // if (this.props.comesFrom !== 'Professional') {
                this.setState({ openAss: this.props.openAss1, authErr: false, professional_id_list1: this.state.professional_id_list });
            // }
            // else {
            //     this.setState({ openAss: this.props.openAss, selectedHouse: {}, authErr: false })
            // }
        }
    };

    handleCloseAss = () => {
        this.setState({
            service: {},
            selectedPat: {},
            assignedTo: [], newspeciality: '', errorMsg: '', error: '',
            items: [], total_amount: 0, showError: '',

        }, () => {
            if (this.props.comesFrom === 'detailTask') {
                let user = { value: this.props.patient?.patient_id };
                this.updateEntryState2(user);
            }
        });
        this.props.handleCloseAss();

    };
    openTaskTime = () => {
        this.setState({ openDate: !this.state.openDate });
    };

    onFieldChange = (e) => {
        const state = this.state.service;
        this.setState({ selectSpec: e });
        var speciality =
            this.props.speciality?.SPECIALITY &&
            this.props?.speciality?.SPECIALITY.length > 0 &&
            this.props?.speciality?.SPECIALITY.filter((data) => data._id === e.value);
        if (speciality && speciality.length > 0) {
            state["speciality"] = {
                background_color: speciality[0]?.background_color,
                color: speciality[0]?.color,
                specialty_name: speciality[0]?.specialty_name,
                _id: speciality[0]?._id,
            };
            this.setState({ service: state });
        }
    };

    onFieldChange1 = (e, name) => {
        const state = this.state.service;
        const state1 = this.state.addservice;
        if (name === 'service') {
            if (e.value === 'custom') {
                this.setState({ viewCutom: true });
            } else {
                this.setState({ viewCutom: false });
            }

            state1['price_per_quantity'] = e.price;
            state1['quantity'] = 1;
            state1[name] = e;
        } else if (name === 'quantity') {
            state1['quantity'] = parseInt(e);
        }
        else {
            state[name] = e;
        }
        this.setState({ service: state, addservice: state1 });
    };

    assignedTo = (e) => {
        this.setState({ assignedTo: e }, () => {
            var data =
                e?.length > 0 &&
                e.reduce((last, current, index) => {
                    let isProf =
                        this.state.professionalArray?.length > 0 &&
                        this.state.professionalArray.filter(
                            (data, index) => data.user_id === current.value
                        );
                    if (isProf && isProf.length > 0) {
                        last.push(isProf[0]);
                    }
                    return last;
                }, []);
            const state = this.state.service;
            state["assinged_to"] = data;
            this.setState({ service: state }, () => {
                this.selectProf(
                    this.state.service?.assinged_to,
                    this.state.professional_id_list
                );
            });
        });
    }


    // manage assign to list
    selectProf = (listing, data) => {
        var showdata = data;
        var alredyAssigned =
            listing &&
            listing?.length > 0 &&
            listing.map((item) => {
                return item.user_id;
            });
        if (alredyAssigned && alredyAssigned.length > 0) {
            showdata =
                data?.length > 0 &&
                data.filter((item) => !alredyAssigned.includes(item.value));
            var assignedto =
                data?.length > 0 &&
                data.filter((item) => alredyAssigned.includes(item.value));
            this.setState({ assignedTo: assignedto });
        }
        this.setState({ professional_id_list1: showdata });
    };

    // Get the Professional data
    getProfessionalData = async (fromEdit) => {
        this.setState({ loaderImage: true });
        var data = await getProfessionalData(
            this.props.comesFrom === "Professional"
                ? this.state.service?.house_id || this.state.selectedHouse?.value
                : this.props?.House?.value,
            this.props.stateLoginValueAim.token
        );
        if (data) {
            this.setState({
                loaderImage: false,
                professionalArray: data.professionalArray,
                professional_id_list: data.professionalList,
                professional_id_list1: data.professionalList,
            }, () => {
                if (fromEdit) {
                    this.selectProf(
                        this.state.service?.assinged_to,
                        this.state.professional_id_list
                    );
                }
            });
        } else {
            this.setState({ loaderImage: false });
        }
    };

    // Get the Patient data
    getPatientData = async () => {
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
                                (user) => user.value === this.props.location?.state?.user.value
                            );
                     
                        this.updateEntryState2(this.props.location?.state?.user);
                    }
                }
            );
        } else {
            this.setState({ loaderImage: false });
        }
    };
    //Switch status done / open
    switchStatus = (alrady) => {
        if (!alrady) {
            const state = this.state.service;
            state["status"] = state.status === "done" ? "open" : "done";
            if (state.status === "done") {
                state["done_on"] = new Date();
            }
            this.setState({ service: state });
        }
    };

    updateEntryState2 = (user) => {
        var user1 =
            this.state.users?.length > 0 &&
            this.state.users.filter((data) => data.user_id === user.value);
        if (user1 && user1?.length > 0) {
            const state = this.state.service;
            state['patient'] = user1[0];
            state['patient_id'] = user1[0].user_id;
            state['case_id'] = user1[0].case_id;
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
            this.setState({ service: state, selectedPat: user },
            );
        }
    };

    updateEntry = (value, name) => {
        var due_on = this.state.service?.due_on ? this.state.service?.due_on : { date: new Date(), time: new Date() };
        const state = this.state.service;
        if (name === 'date' || name === 'time') {
            due_on[name] = value;
            state['due_on'] = due_on;
        } else {
            state[name] = value;
        }
        this.setState({ service: state });

    };
    
    FinalServiceSubmit = () => {
      

    }

    settherapy = (value)=>{
        var state = this.state.service;
        console.log('value', value)
        var datas = this.state.serviceList?.length>0 && this.state.serviceList.filter((item)=>item?._id===value?.value)
        if(datas?.length>0){
            this.setState({})
        }
    }
  
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

    //get therapy list
    therapylist = () => {
        var serviceList = [],
            serviceList1 = [];
        var house_id = this.props?.House?.value ? this.props?.House?.value : this.state.selectedHouse?.value;
        axios
            .get(
                sitedata.data.path + '/vt/GettherapyHouse/'+ house_id,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if(response.data?.hassuccessed){
                    response?.data?.data &&
                        response.data.data.map((element)=>{
                        serviceList.push(element);
                        serviceList1.push({label: element?.therapy_name, value: element?._id})
                    })
                this.setState({
                    service_id_list: serviceList,
                    serviceList1: serviceList1,
                }); 
                }
            });
    };

    handleCloseServ = () => {
        this.setState({ editServ: false, addservice: {} });
    };
    // Set the state of quantity and price_per_quantity
    updateEntryState1 = (e, name) => {
        const state = this.state.service;
        state[name] = e.target.value;
        this.setState({ service: state });
    };

    updateEntryState7 = (e) => {
        this.setState({ selectedHouse: e }, () => {
            this.getProfessionalData();
            this.getPatientData();
            this.therapylist();
            const { roles = [] } = e || {};
    
                this.setState(
                    {
                        authErr: true,
                    },
                    () => {
                        // setTimeout(
                        //     () => this.setState({ openAss: false }),
                        //     2000
                        // );
                    }
                );
           
            
        });
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Searchserviceoraddcustominput,
            Addservice,
            For_Hospital,
            Customservicedescription,
            Customservicetitle,
            ForPatient,
            Search_Select,
            Entertitle,
            Assignedtitle,
            Assignedto,
            Price,
            speciality,
            Archive,
            Delete,
            Enterserviceprice,
            FilterbySpeciality,
            Duplicate,
            Dueon,
            Addtime,
            save_and_close,
            remove_time,
            assignService,
            Addnewservice,
            Services,
            srvc,
            qty,
            Add,
            Markasdone,
            ServiceAmount,
            Editservice,
            Servicename,
            EnterTitlename,
            Add_assigned_services,
            Please_select_atlest,
            Quantity,
            Enterquantity
        } = translate;
        return (

            <>
                {this.state.loaderImage && <Loader />}
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
                        {/* {this.state.disableAssignment && 
                                <div className="err_message">You dont have authority to Assign Service</div>} */}
                        <Grid className="addSpeclContntIner2">
                            <Grid container direction="row" justify="center" className="addSpeclLbl">
                                <Grid item xs={8} md={8} lg={8}>
                                    <label>Assign Therapy</label>
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

                                <Grid className="enterSpcl enterSpclSec">
                                   
                                    <Grid item xs={12} md={12}>\
                                                <Grid>
                                                    <label>{For_Hospital}</label>
                                                    <Select
                                                        name="for_hospital"
                                                        options={this.props.currentList}
                                                        placeholder={Search_Select}
                                                        onChange={(e) => this.updateEntryState7(e)}
                                                        value={this.state.selectedHouse || ""}
                                                        className="addStafSelect"
                                                        isMulti={false}
                                                        isSearchable={true}
                                                    />
                                                </Grid>
                                       
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label>{ForPatient}</label>

                                        {this.props.comesFrom === "Professional" &&
                                            this.state.service?.patient?._id ? (

                                            <h2>
                                                {this.state.service?.patient?.first_name}{" "}
                                                {this.state.service?.patient?.last_name}
                                            </h2>) :
                                            this.props.comesFrom === "detailTask" ? (
                                                <h2>
                                                    {this.state.service?.patient?.first_name}{" "}
                                                    {this.state.service?.patient?.last_name}
                                                </h2>)
                                                :
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

                                                </Grid>}
                                    </Grid>
                                    <Grid item xs={12} md={12} className="customservicetitle">
                                        <label>Therapy</label>
                                        <Grid>
                                            <Select
                                                name="therapy"
                                                onChange={(e) => this.settherapy(e, 'therapy')}
                                                value={this.state.therapies}
                                                options={this.state.serviceList1}
                                                placeholder={Search_Select}
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
                                                // onChange={(e) => this.assignedTo(e, 'professional')}
                                                value={this.state.therapy_assignedto}
                                                options={this.state.professional_id_list1}
                                                placeholder={Search_Select}
                                                className="addStafSelect"
                                                isMulti={true}
                                                isSearchable={true}
                                                disabled={true}

                                            />
                                        </Grid>
                                    </Grid>
                                    {this.state.therapy_sequence?.length>0 && 
                                    this.state.therapy_sequence.map((element)=>(
                                        <>
                                        <p>
                                            {element?.tpye}
                                        </p>
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
                                    </>
                                    ))
                                    }
                                </Grid>


                            </Grid>
                            <a>
                                <div className="err_message err_message1">
                                    {this.state.errorMsg}
                                </div>
                            </a>

                            <Grid className="servSaveBtn" onClick={() =>
                                this.FinalServiceSubmit()
                            }>
                                <a>
                                    <Button
                                    disabled={this.state.disableAssignment}
                                    >
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

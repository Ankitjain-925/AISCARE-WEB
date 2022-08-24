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
            openAss: this.props.openAss ? this.props.openAss : false,
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
            total_amount:0,
            errorMsg: '',
            addservice:{},
            selectedHouse: this.props.selectedHouse
        };
    }

    componentDidMount() {
        this.getAssignService();
        this.getPatientData();
        this.getProfessionalData();
        this.specailityList();

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
        if (prevProps.openAss !== this.props.openAss) {
            if(this.props.comesFrom !== 'Professional'){
                this.setState({ openAss: this.props.openAss , professional_id_list1: this.state.professional_id_list});
            }
            else{
                this.setState({ openAss: this.props.openAss})
            }
        }
        // if (prevProps.selectedHouse !== this.props.selectedHouse) {
        //     this.setState({ selectedHouse: this.props.selectedHouse },()=>{
                
        //     });
        // }
        if(prevProps.service !== this.props.service){
            this.setState({addservice: {}, service: this.props.service, items: this.props.service?.assign_service,
                selectSpec: { label: this.props.service?.speciality?.specialty_name, value: this.props.service?.speciality?._id},},
            ()=>{
                if(this.props.comesFrom !== 'Professional'){
                this.selectProf(
                    this.state.service?.assinged_to,
                    this.state.professional_id_list
                );
                let user = { value: this.state.service?.patient?.user_id };
                this.updateEntryState2(user);
                }
                else{
                        this.getProfessionalData(true)
                }
            })
         
        } 
    };

    handleCloseAss = () => {
        this.setState({
            service: {},
            selectedPat: {},
            assignedTo: [], newspeciality: '', errorMsg: '', error: '',
            items: [], addinvoice: {},showError:''
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
        } else if(name === 'quantity' ){
            state1['quantity'] = parseInt(e);
        }
        else {
            state[name] = e;
        }
        this.setState({ service: state, addservice : state1 });
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
  getProfessionalData = async (fromEdit) => {
    console.log('herreeee')
    this.setState({ loaderImage: true });
    var data = await getProfessionalData(
      this.props.comesFrom === "Professional"
        ? this.state.service?.house_id
        : this.props?.House?.value,
      this.props.stateLoginValueAim.token
    );
    if (data) {
      this.setState({
        loaderImage: false,
        professionalArray: data.professionalArray,
        professional_id_list: data.professionalList,
        professional_id_list1: data.professionalList,
      }, ()=>{
        if(fromEdit){
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
            this.props?.House?.value,
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
                        // if (user?.length > 0) {
                        //   this.setState({ q: user[0]?.name, selectedUser: user[0] });
                        // }
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
        var due_on = this.state.service?.due_on ? this.state.service?.due_on : {date : new Date(), time: new Date()};
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
        let translate = getLanguage(this.props.stateLanguageType);
        let { Something_went_wrong,pleaseEntertitle, please_enter_dueon, plz_select_patient, Plz_select_a_staff,Please_add_atleast_one_service } = translate;
        var data = this.state.service;
        data.assign_service = this.state.items;
        data.amount = this.state.total_amount;
        data.status = data.status ? data.status : "open";
        data.created_at = new Date();
        if(!data.title || data.title === ''){
            this.setState({ errorMsg:pleaseEntertitle });
        }else if (!data.patient ||
            (data && data.patient && data.patient.length < 1)
        ) {
            this.setState({ errorMsg: plz_select_patient });
        }
       else if ( !data.assinged_to ) {
            this.setState({ errorMsg:Plz_select_a_staff });
        }
        else if(!data.due_on?.date || !data.due_on?.time){
            this.setState({ errorMsg:please_enter_dueon });
        }
        else if(!data.assign_service || data.assign_service?.length === 0){
            this.setState({ errorMsg:Please_add_atleast_one_service });
        }
        else {
        this.setState({ loaderImage: true })
        console.log('dats',data)
            if(data?._id){
                // data.house_id = this.state.selectedHouse?.value;
                axios
                .put(
                    sitedata.data.path + "/assignservice/Updateassignservice/"+ data?._id,
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    this.setState({ loaderImage: false, service: {} });
                    this.props.getAddTaskData();
                    this.handleCloseAss();

                }).catch((error)=> {
                    this.setState({ errorMsg: Something_went_wrong })
                });
            }
            else{
                data.house_id = this.props?.House?.value;
                axios
                .post(
                    sitedata.data.path + "/assignservice/Addassignservice",
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    this.setState({ loaderImage: false, service: {} });
                    this.props.getAddTaskData();
                    this.handleCloseAss();

                }).catch((error)=> {
                    this.setState({ errorMsg: Something_went_wrong })
                });
            }
        }
    }
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
                        // value: this.state.allServData[i]._id,
                        label: this.state.allServData[i]?.title,
                    });
                }
                // var addCustom = <div className="addCustom">+ add custom service</div>;
                // serviceList = [{ value: 'custom', label: addCustom }, ...serviceList];
                this.setState({
                    service_id_list: serviceList,
                    serviceList1: serviceList1,
                });
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

    updateEntryState5 = (e, name) => {
        const state = this.state.addservice;
        state[name] = e.target.value;
        this.setState({ addservice: state });
    };
    // For edit service
    editService = (data, index) => {
        var deep = _.cloneDeep(data);
        this.setState({ addservice: deep, newServiceIndex: index, editServ: true });
    };

    

    //Add the services
    handleAddSubmit = () => {
        if (
            this.state.addservice?.service &&
            this.state.addservice?.quantity &&
            this.state?.addservice?.price_per_quantity
        ) {
            let translate = getLanguage(this.props.stateLanguageType);
            let {
                Ser_already_exists,
                Please_enter_valid_price,
                Custom_service_title_cant_be_empty,
            } = translate;
            this.setState({ error: '', showError: '' });
            var newService = this.state.addservice;
            var a =
                this.state.items &&
                this.state.items?.length > 0 &&
                this.state.items.map((element) => {
                    return element?.service;
                });
            var b = a?.length > 0 && a.includes(this.state.addservice?.service?.label);
            if (b == true) {
                this.setState({ error: Ser_already_exists });
            }
            else {
                newService.price =
                    newService?.price_per_quantity * newService?.quantity;
                newService.service = this.state.addservice?.service?.label;
                // newService.service = this.state.service?.title;
                let items = this.state.items ? [...this.state.items] : [];
                items.push(newService);
                this.setState({ items ,addservice:{}}, () => {
                    this.updateTotalPrize();
                });
            }
        } else {
            this.setState({ showError: true });
        }
    };


    updateTotalPrize = () => {
        var total = 0;
        this.state.items?.length > 0 &&
            this.state.items.map((data) => {
                if (data && data?.price) {
                    total = total + parseInt(data?.price);
                }
            });
        this.setState({ total_amount: total });
    };

    //Update the services
    handleAddUpdate = () => {
        var newService = this.state.addservice;
        newService.price = newService?.price_per_quantity * newService?.quantity;
        var index = this.state.newServiceIndex;
        var array = this.state.items;
        array[index].price = newService?.price;
        array[index].quantity = newService?.quantity;
        this.setState({items: array}, ()=>{
            this.updateTotalPrize();
            this.setState({ addservice: {}, newServiceIndex: false, editServ: false });
        })
    };


    //Delete the perticular service confirmation box
    removeServices = (id) => {
        this.props.handleCloseAss();
        this.setState({ message: null, 
       });
        let translate = getLanguage(this.props.stateLanguageType);
        let { RemoveService, sure_remove_service_from_assigned, No, Yes } =
            translate;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === 'dark'
                                ? 'dark-confirm react-confirm-alert-body'
                                : 'react-confirm-alert-body'
                        }
                    >
                        <h1>{RemoveService}</h1>

                        <p>{sure_remove_service_from_assigned}</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={() => onClose()}>{No}</button>
                            <button
                                onClick={() => {
                                    onClose();
                                    this.deleteClickService(id);


                                }}
                            >
                                {Yes}
                            </button>
                           
                        </div>
                    </div>
                );
                
            },
        });
        
    };

    deleteClickService(id) {
        this.props.handleOpenAss();
        // delete this.state.items[id]
      this.state.items.splice(id, 1);
        this.setState({ items: this.state.items, loaderImage: true });
        var newService = this.state.addservice;
        newService.price = newService?.price_per_quantity * newService?.quantity;
        newService.service = this.state.addservice?.service?.label;
        let items = [...this.state.items];
        this.setState({ items, addservice: {} }, () => {
            this.setState({ loaderImage: false})
            this.updateTotalPrize();

        });

        // this.finishInvoice();
    }


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
                       
                        <Grid className="addSpeclContntIner2">
                            <Grid container direction="row" justify="center" className="addSpeclLbl">
                                <Grid item xs={8} md={8} lg={8}>
                                    <label>{Add_assigned_services}</label>
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
                                <Grid className="enterSpcl">
                            <Grid>
                               <VHfield
                                            label={Assignedtitle}
                                            name="title"
                                            placeholder={Entertitle}
                                            onChange={(e) =>
                                                this.onFieldChange1(e.target.value, 'title')
                                            }
                                            value={this.state.service?.title}
                                            
                                        />
                                    </Grid>
                                    <p className="err_message">{this.state.error}</p>
                                    <Grid>
                                     {this.state.showError && (
                                        <div className="err_message">
                                            {Please_select_atlest}
                                        </div>
                                    )}
                                        <label>{Addservice}</label>
                                        <Select
                                            name="service"
                                            onChange={(e) =>
                                                this.onFieldChange1(e, 'service')
                                            }
                                            value={this.state.addservice?.service || ''}

                                            className="addStafSelect"
                                            options={this.state.service_id_list}
                                            placeholder={Searchserviceoraddcustominput}
                                            isSearchable={true}
                                        // styles={customStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} className="customservicetitle">
                                        <VHfield
                                            label={Quantity}
                                            name="quantity"
                                            placeholder={Enterquantity}
                                            onChange={(e) =>
                                                this.onFieldChange1(e.target.value, 'quantity')
                                            }
                                            value={this.state.addservice?.quantity || 0}
                                        />
                                    </Grid>

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
                                                    'price_per_quantity'
                                                )
                                            }
                                            value={
                                                this.state?.addservice?.price_per_quantity || 0
                                            }
                                        />
                                        <p className="enterPricePart3">€</p>
                                    </Grid>
                                    <Grid className="addSrvcBtn3">
                                        <a onClick={this.handleAddSubmit}>
                                            {Add}
                                        </a>
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                        md={12}>
                                        <h3 className="service-head">{Services}</h3>

                                        <Grid container direction="row" spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Grid className="wardsGrup3">
                                                    {this.state.items?.length > 0 &&
                                                        this.state.items.map((data, id) => (
                                                            <Grid className="roomsNum3">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={6} className="services-head">
                                                                        <h3>{data?.service}</h3>
                                                                        <p>{data?.quantity}</p>
                                                                        <p>{data?.price} €</p>
                                                                      
                                                                    </Grid>
                                                                    <Grid item xs={6} md={6} className="wrdEdtDelBtn edtdelservice">

                                                                        <img
                                                                            onClick={() => {
                                                                                this.editService(data, id);
                                                                            }}
                                                                            src={require('assets/virtual_images/pencil-1.svg')}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                        <img
                                                                            onClick={() => {
                                                                                this.removeServices(id);
                                                                            }}
                                                                            src={require('assets/virtual_images/bin.svg')}
                                                                            alt=""
                                                                            title=""
                                                                        />

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid className="totalamount">
                                        <p>{ServiceAmount}</p>
                                        <label>{this.state?.total_amount} €</label>

                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label>{ForPatient}</label>

                                        {this.props.comesFrom === "Professional" &&
                              this.state.service?.patient?._id ? (
                              <h2>
                                {this.state.service?.patient?.first_name}{" "}
                                {this.state.service?.patient?.last_name}
                              </h2>):
                               this.props.comesFrom === "detailTask"  ? (
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
                                                onChange={(e) => this.onFieldChange(e)}
                                                options={this.state.specilaityList}
                                                name="specialty_name"
                                                isSearchable={true}
                                                className="addStafSelect"
                                                value={this.state.selectSpec}
                                                isDisabled={
                                                    this.props.comesFrom === "Professional"
                                                        ? true
                                                        : false
                                                }
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
                                  {this.state.service?._id &&  
                                    <Grid className="assignSecUpr">
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={12} sm={12} md={12}>
                                <Grid className="assignSec">
                                    <>
                                            <Grid
                                              onClick={() => {
                                                this.createDuplicate(
                                                  this.state.service
                                                );
                                              }}
                                            >
                                              <img
                                                src={require("assets/virtual_images/assign-to.svg")}
                                                alt=""
                                                title=""
                                              />
                                              <label>{Duplicate}</label>
                                            </Grid>
                                            <Grid
                                              onClick={() => {
                                                this.switchStatus();
                                              }}
                                              className="markDone"
                                            >
                                              {this.state.service?.status ===
                                                "done" ? (
                                                <Grid className="revwFiles ">
                                                  <Grid className="activeOntask">
                                                    <img
                                                      src={require("assets/virtual_images/greyImg.png")}
                                                      alt=""
                                                      title=""
                                                    />
                                                  </Grid>
                                                </Grid>
                                              ) : (
                                                <Grid className="revwFiles">
                                                  <Grid>
                                                    <img
                                                      src={require("assets/virtual_images/greyImg.png")}
                                                      alt=""
                                                      title=""
                                                    />
                                                  </Grid>
                                                </Grid>
                                              )}
                                              <label>{Markasdone}</label>
                                            </Grid>
                                            {this.state.service?.archived ==
                                              true ? (
                                              <Grid
                                                onClick={() => {
                                                  this.updateEntry(
                                                    false,
                                                    "archived"
                                                  );
                                                }}
                                                className="activeOntask"
                                              >
                                                <img
                                                  src={require("assets/images/archive-white.svg")}
                                                  alt=""
                                                  title=""
                                                />
                                                <label>{Archive}</label>
                                              </Grid>
                                            ) : (
                                              <Grid
                                                onClick={() => {
                                                  this.updateEntry(
                                                    true,
                                                    "archived"
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={require("assets/images/archive.svg")}
                                                  alt=""
                                                  title=""
                                                />
                                                <label>{Archive}</label>
                                              </Grid>
                                            )}
                                            <Grid>
                                              <img
                                                onClick={() => {
                                                  this.props.removeTask(this.state.service?._id);
                                                }}
                                                src={require("assets/virtual_images/deleteNew.png")}
                                                alt=""
                                                title=""
                                                className="manage-size"
                                              />
                                              <label
                                                onclick={() => {
                                                  this.props.removeTask(this.state.service?._id);
                                                }}
                                              >
                                                {Delete}
                                              </label>
                                            </Grid>
                                          </>
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>}
                                </Grid>


                            </Grid>
                            <a>
                              <div className="err_message">
                                  {this.state.errorMsg}
                                </div>
                                </a>
                     
                            <Grid className="servSaveBtn" onClick={() =>
                                this.FinalServiceSubmit()
                            }>
                                <a>
                                    <Button>
                                        {save_and_close}
                                    </Button>
                                </a>
                            </Grid>
                            <Modal
                                open={this.state.editServ}
                                onClose={this.handleCloseServ}
                                className={
                                    this.props.settings &&
                                        this.props.settings.setting &&
                                        this.props.settings.setting.mode &&
                                        this.props.settings.setting.mode === 'dark'
                                        ? 'darkTheme addSpeclModel'
                                        : 'addSpeclModel'
                                }
                            >
                                <Grid className="addServContnt">
                                    <Grid className="addSpeclLbl">
                                        <Grid container direction="row" justify="center">
                                            <Grid item xs={8} md={8} lg={8}>
                                                <label>{Editservice}</label>
                                            </Grid>
                                            <Grid item xs={4} md={4} lg={4}>
                                                <Grid>
                                                    <Grid className="entryCloseBtn">
                                                        <a onClick={this.handleCloseServ}>
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
                                                <VHfield
                                                    label={Servicename}
                                                    name="service"
                                                    placeholder={EnterTitlename}
                                                    disabled={true}
                                                    value={this.state.addservice?.service}
                                                />
                                            </Grid>
                                            <Grid>
                                                <VHfield
                                                    label={Quantity}
                                                    name="quantity"
                                                    placeholder={Enterquantity}
                                                    onChange={(e) =>
                                                        this.updateEntryState5(e, 'quantity')
                                                    }
                                                    value={this.state.addservice?.quantity}
                                                />
                                            </Grid>
                                            <Grid>
                                                <VHfield
                                                    label={Price}
                                                    name="price"
                                                    placeholder={Enterserviceprice}
                                                    onChange={(e) =>
                                                        this.updateEntryState5(
                                                            e,
                                                            'price_per_quantity'
                                                        )
                                                    }
                                                    value={this.state.addservice?.price_per_quantity}
                                                />
                                            </Grid>
                                        </Grid>
                                        
                                        {/* {console.log('dsfdf', this.state.errorMsg)} */}
                                    </Grid>
                                    <Grid item xs={12} md={12} className="saveTasks">
                                </Grid>
                                    <Grid className="servSaveBtn">
                                
                                        <a onClick={this.handleCloseServ}>
                                            <Button onClick={() => this.handleAddUpdate()}>
                                                {save_and_close}
                                            </Button>
                                        </a>
                                    </Grid>
                                </Grid>
                            </Modal>

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

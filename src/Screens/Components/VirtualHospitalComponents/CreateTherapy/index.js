import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index";
import Modal from "@material-ui/core/Modal";
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
      openCT: this.props.opeCT ? this.props.openCT : false,
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
      editTask: false,
      newTaskIndex: false,
      newServiceIndex: false,
      error: "",
      total_amount: this.props.total_amount,
      errorMsg: "",
      addService: {},
      addTask: {},
      selectedHouse: this.props.selectedHouse,
      AddTaskSection:  [
        { value: 'Task', label: 'Task' },
        { value: 'Assign Service', label: 'Assign Service' }
      ],
      taskValue: "",
      enableTask: false,
      enableService: false,
      assignTask: false,
      taskName: "",
      taskDesc: "",
      taskData: [],
      serviceData: [],
      allServData: [],
      servicesDataObj: [],
      serviceName: "",
      serviceDesc: "",
      assignedService: [],
      errorTaskName: "",
      errorTaskDesc: "",
      errorServiceName: "",
      errorServiceDesc: "",
      errorServices: "",
      editTaskName: "",
      editTaskDesc: "",
      editServiceName: "",
      editServiceDesc: "",
      editServices: ""
    };
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
    if (prevProps.total_amount !== this.props.total_amount) {
      this.setState({ total_amount: this.props.total_amount });
    }
    if (prevProps.openCT !== this.props.openCT) {
      if (this.props.comesFrom !== "Professional") {
        this.setState({
          openCT: this.props.openCT,
          professional_id_list1: this.state.professional_id_list,
        });
      } else {
        this.setState({ openCT: this.props.openCT });
      }
    }
    // if (prevProps.selectedHouse !== this.props.selectedHouse) {
    //     this.setState({ selectedHouse: this.props.selectedHouse },()=>{

    //     });
    // }
    if (prevProps.service !== this.props.service) {
      this.setState(
        {
          addservice: {},
          service: this.props.service,
          items: this.props.service?.assign_service,
          selectSpec: {
            label: this.props.service?.speciality?.specialty_name,
            value: this.props.service?.speciality?._id,
          },
        },
        () => {
          if (this.props.comesFrom !== "Professional") {
            this.selectProf(
              this.state.service?.assinged_to,
              this.state.professional_id_list
            );
            let user = { value: this.state.service?.patient?.user_id };
            this.updateEntryState2(user);
          } else {
            this.getProfessionalData(true);
          }
        }
      );
    }
  };

  handleCloseCT = () => {
    this.setState(
      {
        service: {},
        selectedPat: {},
        assignedTo: [],
        newspeciality: "",
        errorMsg: "",
        error: "",
        items: [],
        total_amount: 0,
        showError: "",
        taskName: "",
        taskDesc: "",
        serviceName: "",
        serviceDesc: "",
        errorTaskName: "",
        errorTaskDesc: "",
        errorServiceName: "",
        errorServiceDesc: "",
        errorTaskDesc: "",
        errorServices: ""
      },
      () => {
        if (this.props.comesFrom === "detailTask") {
          let user = { value: this.props.patient?.patient_id };
          this.updateEntryState2(user);
        }
      }
    );
    this.props.handleCloseCT();
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
    if (name === "service") {
      if (e.value === "custom") {
        this.setState({ viewCutom: true });
      } else {
        this.setState({ viewCutom: false });
      }

      state1["price_per_quantity"] = e.price;
      state1["quantity"] = 1;
      state1[name] = e;
    } else if (name === "quantity") {
      state1["quantity"] = parseInt(e);
    } else {
      state[name] = e;
    }
    this.setState({ service: state, addservice: state1 });
  };

  taskSelection = (e) => {
    if (e.value === 'Task') {
      this.setState({ enableTask: true });
      this.setState({ enableService: false });
    } else if (e.value === 'Assign Service') {
      this.setState({ enableTask: false });
      this.setState({ enableService: true });
    } else {
      this.setState({ enableTask: false });
      this.setState({ enableService: false });
    }
    this.setState({ taskValue: e });
  }

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
  };
  assignedServices = (e) => {
    this.setState({ assignedService: e }, () => {
      var data =
        e?.length > 0 &&
        e.reduce((last, current, index) => {
          let isProf =
            this.state.serviceData?.length > 0 &&
            this.state.serviceData.filter(
              (data, index) => data.user_id === current.value
            );
          if (isProf && isProf.length > 0) {
            last.push(isProf[0]);
          }
          return last;
        }, []);
      const state = this.state.service;
      state["assinged_service"] = data;
      this.setState({ service: state }, () => {
        this.selectProf(
          this.state.serviceData?.assinged_to,
          this.state.serviceData
        );
      });
    });
  };
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
    this.setState({ loaderImage: true });
    if (fromEdit) {
      var data = await getProfessionalData(
        this.state.service?.house_id || this.props?.House?.value,
        this.props.stateLoginValueAim?.token
      );
    } else {
      var data = await getProfessionalData(
        this.state.selectedHouse?.value,
        this.props.stateLoginValueAim?.token
      );
    }
    if (data) {
      this.setState(
        {
          loaderImage: false,
          professionalArray: data.professionalArray,
          professional_id_list: data.professionalList,
          professional_id_list1: data.professionalList,
        },
        () => {
          if (fromEdit) {
            this.selectProf(
              this.state.service?.assinged_to,
              this.state.professional_id_list
            );
          }
        }
      );
    } else {
      this.setState({ loaderImage: false });
    }
  };

  // Get the Patient data
  getPatientData = async (houseId) => {
    // this.setState({ loaderImage: true });
    let response = await getPatientData(
      this.props.stateLoginValueAim?.token,
      this.state.selectedHouse?.value || this.props?.House?.value,
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
  // switchStatus = (alrady) => {
  //   if (!alrady) {
  //     const state = this.state.service;
  //     state["status"] = state.status === "done" ? "open" : "done";
  //     if (state.status === "done") {
  //       state["done_on"] = new Date();
  //     }
  //     this.setState({ service: state });
  //   }
  // };

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

  updateEntry = (value, name) => {
    var due_on = this.state.service?.due_on
      ? this.state.service?.due_on
      : { date: new Date(), time: new Date() };
    const state = this.state.service;
    if (name === "date" || name === "time") {
      due_on[name] = value;
      state["due_on"] = due_on;
    } else {
      state[name] = value;
    }
    this.setState({ service: state });
  };
  FinalServiceSubmit = () => {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Something_went_wrong,
      pleaseEntertitle,
      please_enter_dueon,
      plz_select_patient,
      Plz_select_a_staff,
      Please_add_atleast_one_service,
    } = translate;
    var data = this.state.service;
    data.assign_service = this.state.serviceData;
    data.assign_task = this.state.taskData;
    data.created_at = new Date();
    var length = (data && data.assign_service?.length) + (data && data.assign_task?.length)
    if (length < 2) {
      this.setState({ errorMsg: 'Please add atleast two sequences' });
    } else {
      this.setState({ loaderImage: true });
      if (data?._id) {
        axios
          .put(
            sitedata.data.path +
            "/api/v4/vt/Addtherapy/" +
            data?._id,
            data,
            commonHeader(this.props.stateLoginValueAim.token)
          )
          .then((responce) => {
            this.setState({ loaderImage: false, service: {} });
            this.props.getAddTaskData();
            this.handleCloseCT();
          })
          .catch((error) => {
            this.setState({ errorMsg: Something_went_wrong });
          });
      } else {
        data.house_id = this.state.selectedHouse.value;
        axios
          .post(
            sitedata.data.path + "/api/v4/vt/Addtherapy/",
            data,
            commonHeader(this.props.stateLoginValueAim.token)
          )
          .then((responce) => {
            this.setState({ loaderImage: false, service: {} });
            this.props.getAddTaskData();
            this.handleCloseCT();
          })
          .catch((error) => {
            this.setState({ errorMsg: Something_went_wrong });
          });
      }
    }
  };
  //get services list
  getAssignService = () => {
    var serviceList = [],
      serviceList1 = [];
    axios
      .get(
        sitedata.data.path +
        "/vh/GetService/" +
        this.state.selectedHouse?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        this.setState({ allServData: response.data.data });
        for (let i = 0; i < this.state.allServData.length; i++) {
          serviceList1.push(this.state.allServData[i]);
          serviceList.push({
            price: this.state.allServData[i].price,
            description: this.state.allServData[i].description,
            value: this.state.allServData[i]._id,
            label: this.state.allServData[i]?.title,
          });
        }
        // var addCustom = <div className="addCustom">+ add custom service</div>;
        // serviceList = [{ value: 'custom', label: addCustom }, ...serviceList];
        this.setState({
          servicesDataObj: serviceList,
          serviceList1: serviceList1,
        });
      });
  };
  handleCloseTask = () => {
    if (this.state.addTask.taskName.length === 0 || this.state.addTask.taskDesc.length === 0) {
      return;
    }
    this.setState({ editTask: false, addTask: {} });
  };

  handleCloseServ = () => {
    if (this.state.addService.serviceName.length === 0 || this.state.addService.serviceDesc.length === 0
      || this.state.addService.services.length === 0) {
      return;
    }
    this.setState({ editServ: false, addService: {} });
  };
  // Set the state of quantity and price_per_quantity
  updateEntryState1 = (e, name) => {
    const state = this.state.service;
    state[name] = e.target.value;
    this.setState({ service: state });
  };

  // For edit task
  editTask = (data, index) => {
    var deep = _.cloneDeep(data);
    this.setState({ addTask: deep, newTaskIndex: index, editTask: true });
  };

  // For edit service
  editService = (data, index) => {
    var deep = _.cloneDeep(data);
    this.setState({ addService: deep, newServiceIndex: index, editServ: true });
  };

  //Add the Sequnces of Tasks and Services
  // handleAddSubmit = () => {
  //   if (
  //     this.state.addservice?.service &&
  //     this.state.addservice?.quantity &&
  //     this.state?.addservice?.price_per_quantity
  //   ) {
  //     let translate = getLanguage(this.props.stateLanguageType);
  //     let {
  //       Ser_already_exists,
  //       Please_enter_valid_price,
  //       Custom_service_title_cant_be_empty,
  //     } = translate;
  //     this.setState({ error: "", showError: "" });
  //     var newService = this.state.addservice;
  //     var a =
  //       this.state.items &&
  //       this.state.items?.length > 0 &&
  //       this.state.items.map((element) => {
  //         return element?.service;
  //       });
  //     var b =
  //       a?.length > 0 && a.includes(this.state.addservice?.service?.label);
  //     if (b == true) {
  //       this.setState({ error: Ser_already_exists });
  //     } else {
  //       newService.price =
  //         newService?.price_per_quantity * newService?.quantity;
  //       newService.service = this.state.addservice?.service?.label;
  //       // newService.service = this.state.service?.title;
  //       let items = this.state.items ? [...this.state.items] : [];
  //       items.push(newService);
  //       this.setState({ items, addservice: {} }, () => {
  //         this.updateTotalPrize();
  //       });
  //     }
  //   } else {
  //     this.setState({ showError: true });
  //   }
  // };
 
  assignIndividual = () => {
    this.setState({assignGroup: false});
    this.setState({assignIndividual: true});
  };
  assignGroup = () => {
    this.setState({assignGroup: true});
    this.setState({assignIndividual: false});
  };
  updateTotalPrize = () => {
    var total = 0;
    this.state.items?.length > 0 &&
      this.state.items.map((data, i) => {
        if (data && data?.price) {
          total = total + parseInt(data?.price);
        }
      });
    this.setState({ total_amount: total });
  };

  // Update the tasks
  handleTaskUpdate = () => {
    if (this.state.addTask.taskName.length === 0) {
      this.setState ({
        editTaskName : "Please enter Task Name"
      })
    } else {
      this.setState ({
        editTaskName : ""
      })
    }
    if (this.state.addTask.taskDesc.length === 0) {
      this.setState ({
        editTaskDesc : "Please enter Task Description"
      })
    } else {
      this.setState ({
        editTaskDesc : ""
      })
    }

    if (this.state.addTask.taskName.length === 0 || this.state.addTask.taskDesc.length === 0) {
      return;
    }
    let data = {
      taskName: this.state.addTask.taskName,
      taskDesc: this.state.addTask.taskDesc
    };
    let index = this.state.newTaskIndex;
    this.state.taskData[index] = data;
    this.setState({taskData: this.state.taskData});
  };
  // Update the service
  handleServiceUpdate = () => {
    if (this.state.addService.serviceName.length === 0) {
      this.setState ({
        editServiceName : "Please enter Service Name"
      })
    } else {
      this.setState ({
        editServiceName : ""
      })
    }
    if (this.state.addService.serviceDesc.length === 0) {
      this.setState ({
        editServiceDesc : "Please enter Service Description"
      })
    } else {
      this.setState ({
        editServiceDesc : ""
      })
    }

    if (this.state.addService.services.length === 0) {
      this.setState ({
        editServices : "Please enter Services"
      })
    } else {
      this.setState ({
        editServices : ""
      })
    }

    if (this.state.addService.serviceName.length === 0 || this.state.addService.serviceDesc.length === 0
      || this.state.addService.services.length === 0) {
      return;
    }
    let data = {
      serviceName: this.state.addService.serviceName,
      serviceDesc: this.state.addService.serviceDesc,
      services: this.state.addService.services
    };
    let index = this.state.newServiceIndex;
    this.state.serviceData[index] = data;
    this.setState({serviceData: this.state.serviceData});
  };

  //Update the services
  // handleAddUpdate = () => {
  //   var newService = this.state.addservice;
  //   newService.price = newService?.price_per_quantity * newService?.quantity;
  //   var index = this.state.newServiceIndex;
  //   var array = this.state.items;
  //   array[index].price = newService?.price;
  //   array[index].quantity = newService?.quantity;
  //   this.setState({ items: array }, () => {
  //     this.updateTotalPrize();
  //     this.setState({
  //       addservice: {},
  //       newServiceIndex: false,
  //       editServ: false,
  //     });
  //   });
  // };

  //Delete the perticular service confirmation box
  removeService = (id) => {
    this.props.handleCloseCT();
    this.setState({
      message: null,
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
                this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >
            <h1>Delete service</h1>

            <p>Are you sure you want to delete the service?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={() => onClose()}>{No}</button>
              <button
                onClick={() => {
                  onClose();
                  this.state.serviceData.splice(id, 1);
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

  //Delete the perticular task confirmation box
  removeTask = (id) => {
    this.props.handleCloseCT();
    this.setState({
      message: null,
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
                this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >
            <h1>Delete Task</h1>

            <p>Are you sure you want to delete the task?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={() => onClose()}>{No}</button>
              <button
                onClick={() => {
                  onClose();
                  this.state.taskData.splice(id, 1);
                  // this.deleteClickService(id);
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

  updateEntryState5 = (e) => {
    this.setState({ selectedHouse: e }, () => {
      var pat1name = "";
      if (
        this.props.stateLoginValueAim?.user?.first_name &&
        this.props.stateLoginValueAim?.user?.last_name
      ) {
        pat1name =
          this.props.stateLoginValueAim?.user?.first_name +
          " " +
          this.props.stateLoginValueAim?.user?.last_name;
      } else if (this.props.stateLoginValueAim?.user?.first_name) {
        pat1name = this.props.stateLoginValueAim?.user?.first_name;
      }
      var fullData = [
        {
          label: pat1name,
          value: this.props.stateLoginValueAim?.user?._id,
          email: this.props.stateLoginValueAim?.user?.email,
        },
      ];
      this.getProfessionalData();
      this.getPatientData();
      this.getAssignService();
    });
  };
  handleAddTask= () => {
    this.setState({assignTask: true});
  }
  onTaskNameChange= (data, id) => {
    this.setState({taskName: data});
  }
  onTaskDescChange= (data, id) => {
    this.setState({taskDesc: data});
  }
  onTaskNameEdit= (data, id) => {
    var updatedTask = {
      taskName: data,
      taskDesc: this.state.addTask.taskDesc
    }
    this.setState({ addTask: updatedTask });
  }
  onTaskDescEdit= (data, id) => {
    var updatedTask = {
      taskName: this.state.addTask.taskName,
      taskDesc: data
    }
    this.setState({ addTask: updatedTask });
  }
  onServiceNameEdit = (data, id) => {
    var updatedService = {
      serviceName: data,
      serviceDesc: this.state.addService.serviceDesc,
      services: this.state.addService.services
    }
    this.setState({ addService: updatedService });
  }
  onServiceDescEdit = (data, id) => {
    var updatedService = {
      serviceName: this.state.addService.serviceName,
      serviceDesc: data,
      services: this.state.addService.services
    }
    this.setState({ addService: updatedService });
  }
  onServicesEdit = (data, id) => {
    var updatedService = {
      serviceName: this.state.addService.serviceName,
      serviceDesc: this.state.addService.serviceDesc,
      services: data
    }
    this.setState({ addService: updatedService });
  }
  handleAddTasks= () => {
    if (this.state.taskName.length === 0) {
      this.setState ({
        errorTaskName : "Please enter Task Name"
      })
    } else {
      this.setState ({
        errorTaskName : ""
      })
    }
    if (this.state.taskDesc.length === 0) {
      this.setState ({
        errorTaskDesc : "Please enter Task Description"
      })
    } else {
      this.setState ({
        errorTaskDesc : ""
      })
    }

    if (this.state.taskName.length === 0 || this.state.taskDesc.length === 0) {
      return;
    }
    let data = {
      taskName: this.state.taskName,
      taskDesc: this.state.taskDesc
    };
    this.state.taskData.push(data);
    this.setState({taskData: this.state.taskData});
    this.setState({taskName: ""});
    this.setState({taskDesc: ""});
  }
  onServiceNameChange= (data, id) => {
    this.setState({serviceName: data});
  }
  onServiceDescChange= (data, id) => {
    this.setState({serviceDesc: data});
  }
  onServiceChanges= (data, id) => {
    this.setState({assignedService: data});
  }
  handleAddServices= () => {
    if (this.state.serviceName.length === 0) {
      this.setState ({
        errorServiceName : "Please enter Service Name"
      })
    } else {
      this.setState ({
        errorServiceName : ""
      })
    }
    if (this.state.serviceDesc.length === 0) {
      this.setState ({
        errorServiceDesc : "Please enter Service Description"
      })
    } else {
      this.setState ({
        errorServiceDesc : ""
      })
    }
    if (this.state.assignedService.length === 0) {
      this.setState ({
        errorServices : "Please select atleast one Service"
      })
    } else {
      this.setState ({
        errorServices : ""
      })
    }
    if (this.state.serviceName.length === 0 || this.state.serviceDesc.length === 0 || this.state.assignedService.length === 0) {
      return;
    }
    let data = {
      serviceName: this.state.serviceName,
      serviceDesc: this.state.serviceDesc,
      services: this.state.assignedService
    };
    this.state.serviceData.push(data);
    this.setState({serviceData: this.state.serviceData});
    this.setState({serviceName: ""});
    this.setState({serviceDesc: ""});
    this.setState({assignedService: []});
  }
  // deleteClickService(id) {
  //   this.props.handleOpenCT();
  //   // delete this.state.items[id]
  //   this.state.items.splice(id, 1);
  //   this.setState({ items: this.state.items, loaderImage: true });
  //   var newService = this.state.addservice;
  //   newService.price = newService?.price_per_quantity * newService?.quantity;
  //   newService.service = this.state.addservice?.service?.label;
  //   let items = [...this.state.items];
  //   this.setState({ items, addservice: {} }, () => {
  //     this.setState({ loaderImage: false });
  //     this.updateTotalPrize();
  //   });

  //   // this.finishInvoice();
  // }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Searchserviceoraddcustominput,
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
      For_Hospital,
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
      Enterquantity,
    } = translate;
    
    return (
      <>
        {this.state.loaderImage && <Loader />}
        <Modal
          open={this.state.openCT}
          onClose={() => this.handleCloseCT()}
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
              <Grid
                container
                direction="row"
                justify="center"
                className="addSpeclLbl"
              >
                <Grid item xs={8} md={8} lg={8}>
                  <label>Add Assigned Therapy</label>
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                  <Grid>
                    <Grid className="entryCloseBtn">
                      <a onClick={() => this.handleCloseCT()}>
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
                  <Grid item xs={12} md={12}>
                    {this.props.comesFrom === "Professional" && (
                      <>
                        {!this.state.service?._id && (
                          <Grid>
                            <label>{For_Hospital}</label>
                            <Select
                              name="for_hospital"
                              options={this.props.currentList}
                              placeholder={Search_Select}
                              onChange={(e) => this.updateEntryState5(e, 'house_id')}
                              value={this.state.selectedHouse || ""}
                              className="addStafSelect"
                              isMulti={false}
                              isSearchable={true}
                            />
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>
                  <Grid>
                    <VHfield
                      label= "Disease Name"
                      name="title"
                      placeholder= "Disease Name and Description"
                      onChange={(e) =>
                        this.onFieldChange1(e.target.value, "title")
                      }
                      value={this.state.service?.title || ""}
                    />
                  </Grid>
                  <p className="err_message">{this.state.error}</p>
                  
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
                    <label>{Assignedto}</label>
                    <Grid className="assignBtn">
                    <Button onClick={this.assignIndividual}>Assign Individual</Button>
                    <Button onClick={this.assignGroup}>Assign Group</Button>
                    </Grid>
                    <Grid>
                    {this.state.assignIndividual && 
                    <Select
                    name="professional"
                    onChange={(e) => this.assignedTo(e, "professional")}
                    value={this.state.assignedTo}
                    options={this.state.professional_id_list1}
                    placeholder={Search_Select}
                    className="addStafSelect"
                    isMulti={false}
                    isSearchable={true}
                    />}
                    {this.state.assignGroup && 
                    <Select
                    name="professional"
                    onChange={(e) => this.assignedTo(e, "professional")}
                    value={this.state.assignedTo}
                    options={this.state.professional_id_list1}
                    placeholder={Search_Select}
                    className="addStafSelect"
                    isMulti={true}
                    isSearchable={true}
                    />}
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="addSrvcBtn3" >
                    <h3 style={{"padding": "30px","paddingTop": "0px"}} className="service-head">Task / Assigned Services
                    <a onClick={this.handleAddTask}>Add Sequences</a>
                    </h3>
              </Grid>
              {/* <Grid container direction="row" spacing={2}> */}
                <Grid item xs={12} md={12}>
                  <Grid className="wardsGrup3">
                    {this.state.taskData?.length > 0 &&
                        <Grid className="roomsNum3" style={{"paddingLeft": "30px","paddingRight": "30px"}}>
                          <Grid container direction="row">
                            <Grid item xs={12} md={12} className="services-head">
                              <b>Tasks</b>
                              <table>
                                <thead>
                                <tr>
                                  <th style={{"width": "5%"}}>No.</th>
                                  <th style={{"width": "30%"}}>Task Name</th>
                                  <th style={{"width": "47%"}}>Task Description</th>
                                  <th style={{"width": "20%"}}>Edit / Delete</th>
                                </tr>
                                </thead>
                                {this.state.taskData.map((row, index) => {
                                  return <tbody>
                                          <tr>
                                          <td style={{"maxWidth": "10px"}} key={index}>{index+1}</td>
                                          <td style={{"maxWidth": "50px"}} key={index}>{row?.taskName}</td>
                                          <td style={{"maxWidth": "100px"}} key={index}>{row?.taskDesc}</td>
                                          <td style={{"maxWidth": "40px"}} key={index}>
                                          <img
                                            style={{"padding": "7px", "cursor": "pointer"}}
                                            onClick={() => {
                                              this.editTask(row, index);
                                            }}
                                            src={require("assets/virtual_images/pencil-1.svg")}
                                            alt=""
                                            title=""
                                          />
                                          <img
                                            style={{"padding": "7px", "cursor": "pointer"}}
                                            onClick={() => {
                                              this.removeTask(index);
                                            }}
                                            src={require("assets/virtual_images/bin.svg")}
                                            alt=""
                                            title=""
                                          />
                                          </td>
                                          </tr>
                                      </tbody>
                                })}
                              </table>
                            </Grid>
                          </Grid>
                        </Grid>}
                        {this.state.serviceData?.length > 0 &&
                        <Grid className="roomsNum3" style={{"paddingLeft": "30px","paddingRight": "30px"}}>
                          <Grid container direction="row">
                            <Grid item xs={12} md={12} className="services-head">
                              <b>Services</b>
                              <table>
                                <thead>
                                <tr>
                                  <th style={{"width": "5%"}}>No.</th>
                                  <th style={{"width": "30%"}}>Service Name</th>
                                  <th style={{"width": "47%"}}>Service Description</th>
                                  <th style={{"width": "20%"}}>Edit / Delete</th>
                                </tr>
                                </thead>
                                {this.state.serviceData.map((row, index) => {
                                  return <tbody>
                                          <tr>
                                          <td style={{"maxWidth": "10px"}} key={index}>{index+1}</td>
                                          <td style={{"maxWidth": "50px"}} key={index}>{row?.serviceName}</td>
                                          <td style={{"maxWidth": "100px"}} key={index}>{row?.serviceDesc}</td>
                                          <td style={{"maxWidth": "40px"}} key={index}>
                                          <img
                                            style={{"padding": "7px", "cursor": "pointer"}}
                                            onClick={() => {
                                              this.editService(row, index);
                                            }}
                                            src={require("assets/virtual_images/pencil-1.svg")}
                                            alt=""
                                            title=""
                                          />
                                          <img
                                            style={{"padding": "7px", "cursor": "pointer"}}
                                            onClick={() => {
                                              this.removeService(index);
                                            }}
                                            src={require("assets/virtual_images/bin.svg")}
                                            alt=""
                                            title=""
                                          />
                                          </td>
                                          </tr>
                                      </tbody>
                                })}
                              </table>
                            </Grid>
                          </Grid>
                        </Grid>}
                  </Grid>
                </Grid>
              {/* </Grid> */}
              {this.state.assignTask &&
              <Grid style={{"padding": "30px","paddingTop": "0px"}}>
                  <label>Type</label>
                  <Select
                    name="for_Task"
                    options={this.state.AddTaskSection}
                    placeholder= "Select Type"
                    onChange={(e) => this.taskSelection(e, "for_Task")}
                    value={this.state.taskValue}
                    className="addStafSelect"
                    isMulti={false}
                    isSearchable={true}
                  />
                </Grid>}
                {this.state.enableTask &&
                <Grid style={{"padding": "30px","paddingTop": "0px"}}>
                  <VHfield
                      label= "Task Name"
                      name="taskName"
                      placeholder= "Task Name"
                      onChange={(e) =>
                        this.onTaskNameChange(e.target.value, "taskName")
                      }
                      value={this.state?.taskName || ""}
                    />
                  <p className="err_message">{this.state.errorTaskName}</p>
                  <VHfield
                      label= "Task Description"
                      name="taskDesc"
                      placeholder= "Task Description"
                      onChange={(e) =>
                        this.onTaskDescChange(e.target.value, "taskDesc")
                      }
                      value={this.state?.taskDesc || ""}
                    />
                    <p className="err_message">{this.state.errorTaskDesc}</p>
                    <Grid className="addSrvcBtn3" >
                    <h3 style={{"padding": "30px","paddingTop": "0px"}} className="service-head">
                    <a onClick={this.handleAddTasks}>Add Tasks</a>
                    </h3>
              </Grid>
                </Grid>}
                {this.state.enableService &&
                <Grid style={{"padding": "30px","paddingTop": "0px"}}>
                  <VHfield
                      label= "Service Name"
                      name="serviceName"
                      placeholder= "Service Name"
                      onChange={(e) =>
                        this.onServiceNameChange(e.target.value, "serviceName")
                      }
                      value={this.state?.serviceName || ""}
                    />
                  <p className="err_message">{this.state.errorServiceName}</p>
                  <VHfield
                      label= "Service Description"
                      name="serviceDesc"
                      placeholder= "Service Description"
                      onChange={(e) =>
                        this.onServiceDescChange(e.target.value, "serviceDesc")
                      }
                      value={this.state?.serviceDesc || ""}
                    />
                  <p className="err_message">{this.state.errorServiceDesc}</p>
                  <label>Services</label>
                  <Select
                    name="services"
                    onChange={(e) => this.onServiceChanges(e, "services")}
                    value={this.state?.assignedService || []}
                    options={this.state.servicesDataObj}
                    placeholder="Select Services"
                    className="addStafSelect"
                    isMulti={true}
                    isSearchable={true}
                  />
                  <p className="err_message">{this.state.errorServices}</p>
                  <Grid className="addSrvcBtn3" >
                    <h3 style={{"padding": "30px","paddingTop": "0px"}} className="service-head">
                    <a onClick={this.handleAddServices}>Add Services</a>
                    </h3>
              </Grid>
                </Grid>}
              <a>
                <div className="err_message err_message1">{this.state.errorMsg}</div>
              </a>
              
              <Grid
                className="servSaveBtn"
                onClick={() => this.FinalServiceSubmit()}
              >
                <a>
                  <Button>{save_and_close}</Button>
                </a>
              </Grid>
              <Modal
                open={this.state.editTask}
                onClose={this.handleCloseTask}
                className={
                  this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "darkTheme addSpeclModel"
                    : "addSpeclModel"
                }
              >
                <Grid className="addServContnt">
                  <Grid className="addSpeclLbl">
                    <Grid container direction="row" justify="center">
                      <Grid item xs={8} md={8} lg={8}>
                        <label>Edit Task</label>
                      </Grid>
                      <Grid item xs={4} md={4} lg={4}>
                        <Grid>
                          <Grid className="entryCloseBtn">
                            <a onClick={this.handleCloseTask}>
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
                          label="Task Name"
                          name="editTaskName"
                          placeholder="Task Name"
                          onChange={(e) =>
                            this.onTaskNameEdit(e.target.value, "editTaskName")
                          }
                          disabled={false}
                          value={this.state.addTask?.taskName}
                        />
                      <p className="err_message">{this.state.editTaskName}</p>
                      </Grid>
                      <Grid>
                        <VHfield
                          label="Task Description"
                          name="editTaskDesc"
                          onChange={(e) =>
                            this.onTaskDescEdit(e.target.value, "editTaskDesc")
                          }
                          placeholder="Task Description"
                          disabled={false}
                          value={this.state.addTask?.taskDesc}
                        />
                      <p className="err_message">{this.state.editTaskDesc}</p>
                      </Grid>
                      <Grid>
                      </Grid>
                      <Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} className="saveTasks"></Grid>
                  <Grid className="servSaveBtn">
                    <a onClick={this.handleCloseTask}>
                      <Button onClick={() => this.handleTaskUpdate()}>
                        {save_and_close}
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </Modal>
              <Modal
                open={this.state.editServ}
                onClose={this.handleCloseServ}
                className={
                  this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "darkTheme addSpeclModel"
                    : "addSpeclModel"
                }
              >
                <Grid className="addServContnt">
                  <Grid className="addSpeclLbl">
                    <Grid container direction="row" justify="center">
                      <Grid item xs={8} md={8} lg={8}>
                        <label>Edit Service</label>
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
                          label="Service Name"
                          name="editServiceName"
                          placeholder="Service Name"
                          onChange={(e) =>
                            this.onServiceNameEdit(e.target.value, "editServiceName")
                          }
                          disabled={false}
                          value={this.state.addService?.serviceName}
                        />
                      <p className="err_message">{this.state.editServiceName}</p>
                      </Grid>
                      <Grid>
                        <VHfield
                          label="Service Description"
                          name="editServiceDesc"
                          onChange={(e) =>
                            this.onServiceDescEdit(e.target.value, "editServiceDesc")
                          }
                          placeholder="Service Description"
                          disabled={false}
                          value={this.state.addService?.serviceDesc}
                        />
                      <p className="err_message">{this.state.editServiceDesc}</p>
                         <Grid>
                      <label>Services</label>
                        <Select
                          name="services"
                          onChange={(e) => this.onServicesEdit(e, "services")}
                          value={this.state.addService?.services}
                          options={this.state.servicesDataObj}
                          placeholder="Select Services"
                          className="addStafSelect"
                          isMulti={true}
                          isSearchable={true}
                        />
                        <p className="err_message">{this.state.editServices}</p>
                      </Grid>
                      </Grid>
                      <Grid>
                      </Grid>
                      <Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} className="saveTasks"></Grid>
                  <Grid className="servSaveBtn">
                    <a onClick={this.handleCloseServ}>
                      <Button onClick={() => this.handleServiceUpdate()}>
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

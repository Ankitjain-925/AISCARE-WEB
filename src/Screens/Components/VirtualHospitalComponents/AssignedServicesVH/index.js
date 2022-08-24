import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import moment from 'moment';
import { LanguageFetchReducer } from 'Screens/actions';
import { getProfessionalData } from 'Screens/VirtualHospital/PatientFlow/data';
import FileUploader from 'Screens/Components/JournalFileUploader/index';
import { Speciality } from 'Screens/Login/speciality.js';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from 'Screens/VirtualHospital/Institutes/selecthouseaction';
import VHfield from 'Screens/Components/VirtualHospitalComponents/VHfield/index';
import { getPatientData } from 'Screens/Components/CommonApi/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import TimeFormat from 'Screens/Components/TimeFormat/index';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import TaskView from 'Screens/Components/VirtualHospitalComponents/TaskView/index';
import { getLanguage } from 'translations/index';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import {
  getDate,
  newdate,
  getTime,
  getImage,
} from 'Screens/Components/BasicMethod/index';
import _ from 'lodash';
import FileViews from '../../../Components/TimelineComponent/FileViews/index';
import {
  GetShowLabel1,
  GetShowLabel,
  GetLanguageDropdown,
} from 'Screens/Components/GetMetaData/index.js';
import { OptionList } from 'Screens/Login/metadataaction';
import PainPoint from 'Screens/Components/PointPain/index';
import Certificate from './certificate';
import AssignedService from 'Screens/Components/VirtualHospitalComponents/AssignedService';

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTask: this.props.openTask,
      tabvalue: 0,
      tabvalue2: this.props.tabvalue2 || 0,
      q: '',
      selectedUser: '',
      professional_data: [],
      date_format: this.props.date_format,
      time_format: this.props.time_format,
      patient_doc: [],
      patient_doc1: [],
      patient_id_list: [],
      patient_id_list1: [],
      allPatData: [],
      allPatData1: [],
      users: [],
      users1: [],
      userFilter: '',
      openAssign: false,
      newStaff: {},
      ProfMessage: false,
      newTask: {},
      Fileadd: '',
      AllTasks: this.props.AllTasks,
      shown: false,
      professionalArray: [],
      patientForFilter: this.props.patientForFilter,
      ArchivedTasks: this.props.ArchivedTasks,
      loaderImage: false,
      hope: false,
      openDate: true,
      specilaityList: [],
      wardList: [],
      roomList: [],
      assignedTo: [],
      assignedTo2: '',
      selectSpec: {},
      selectSpec2: '',
      selectWard: '',
      selectRoom: '',
      DoneTask: this.props.DoneTask,
      DeclinedTask: this.props.DeclinedTask,
      noWards: false,
      AllTaskCss: '',
      DeclinedTaskCss: '',
      DoneTaskCss: '',
      OpenTaskCss: '',
      ArchivedTasksCss: '',
      text: '',
      errorMsg: '',
      openServ: false,
      editcomment: false,
      check: {},
      allWards: '',
      newComment: '',
      length: '',
      selectedPat: {},
      professional_id_list1: [],
      images: [],
      Assigned_already: [],
      calculate_Length: {},
      checkingsec: false,
      AllSmokingStatus: [],
      AllSituation: [],
      AllGender: [],
      gender: 'female',
      info: this.props.info,
      certificateId: false,
      PatientID: false,
      taskData: {},
      openAss: false,

    };
  }

  handleOpenAss = () => {
    this.setState({ openAss: true, professional_id_list1: this.state.professional_id_list });
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.tabvalue2 !== this.props.tabvalue2 ||
      prevProps.AllTasks !== this.props.AllTasks ||
      prevProps.ArchivedTasks !== this.props.ArchivedTasks ||
      prevProps.DoneTask !== this.props.DoneTask ||
      prevProps.OpenTask !== this.props.OpenTask ||
      prevProps.DeclinedTask !== this.props.DeclinedTask ||
      prevProps.patientForFilter !== this.props.patientForFilter ||
      prevProps.info !== this.props.info
    ) {
      this.setState({
        tabvalue2: this.props.tabvalue2 || 0,
        AllTasks: this.props.AllTasks,
        ArchivedTasks: this.props.ArchivedTasks,
        DoneTask: this.props.DoneTask,
        OpenTask: this.props.OpenTask,
        DeclinedTask: this.props.DeclinedTask,
        patientForFilter: this.props.patientForFilter,
        item: this.props.data,
        info: this.props.info,
      });
    }
    if (prevProps.patient !== this.props.patient) {
      let user = { value: this.props.patient?.patient_id };
      this.updateEntryState2(user);
    }
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      this.getMetadata();
    }
  };

  //get list of list
  getMetadata = () => {
    this.setState({ allMetadata: this.props.metadata }, () => {
      var AllSmokingStatus = GetLanguageDropdown(
        this.state.allMetadata &&
        this.state.allMetadata.smoking_status &&
        this.state.allMetadata.smoking_status?.length > 0 &&
        this.state.allMetadata.smoking_status,
        this.props.stateLanguageType
      );
      var AllSituation = GetLanguageDropdown(
        this.state.allMetadata &&
        this.state.allMetadata.situation &&
        this.state.allMetadata.situation?.length > 0 &&
        this.state.allMetadata.situation,
        this.props.stateLanguageType
      );
      var AllGender = GetLanguageDropdown(
        this.state.allMetadata &&
        this.state.allMetadata.gender &&
        this.state.allMetadata.gender?.length > 0 &&
        this.state.allMetadata.gender,
        this.props.stateLanguageType
      );
      this.setState({
        AllSmokingStatus: AllSmokingStatus,
        AllSituation: AllSituation,
        AllGender: AllGender,
      });
    });
  };

  componentDidMount() {
    this.getMetadata();
    this.getPatientData();
    this.getProfessionalData();
    this.specailityList();
    if (
      this.props.location?.state?.speciality &&
      this.props.location?.state?.user
    ) {
      const state = this.state.newTask;
      this.setState({
        selectSpec: {
          label: this.props.location?.state?.speciality?.specialty_name,
          value: this.props.location?.state?.speciality?._id,
        },
      });
      state['speciality'] = this.props.location?.state?.speciality;
      state['patient'] = this.props.location?.state?.user;
      this.setState({ newTask: state });
      this.setState({ openTask: true });
    }
    if (
      this.props.history.location?.state?.data &&
      this.props.history.location?.state?.data === true
    ) {
      this.setState({ openTask: true });
    }
  }

  handleCloseAss = () => {
    this.setState({ openAss: false })
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
  // open model Add Task
  handleOpenTask = () => {
    var pat1name = '';
    if (
      this.props.stateLoginValueAim?.user?.first_name &&
      this.props.stateLoginValueAim?.user?.last_name
    ) {
      pat1name =
        this.props.stateLoginValueAim?.user?.first_name +
        ' ' +
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
    this.setState({
      service: {},
      openTask: true,
      newTask: {},
      assignedTo: [],
      q: '',
      selectSpec: {},
      selectedPat: {},
    });
    if (this.props.stateLoginValueAim?.user?.type === 'doctor') {
      this.updateEntryState3(fullData);
    }
    if (this.props.patient) {
      let user = { value: this.props.patient?.user_id };
      this.updateEntryState2(user);
    }
  };
  // close model Add Task
  handleCloseTask = () => {
    this.setState({
      openTask: false,
      newTask: {},
      openTask1: false,
      certificateId: false,
      PatientID: false,
      taskData: {},
      errorMsg: false
    });
  };
  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
  };
  handleChangeTab2 = (event, tabvalue2) => {
    // if (tabvalue2 == 4) {
    //   this.props.getArchived();
    // }
    this.setState({ tabvalue2 });
  };

  createDuplicate = (data) => {
    delete data._id;
    data.archived = false;
    this.setState({ newTask: data });
  };
  handleCloseRvw = () => {
    this.setState({ noWards: false });
  };
  handleOpenRvw = () => {
    this.setState({ noWards: true });
  };

  FileAttachMulti = (Fileadd) => {
    this.setState(
      {
        isfileuploadmulti: true,
        fileattach: Fileadd,
        fileupods: true,
      },
      () => {
        setTimeout(
          () => this.setState({ checkingsec: !this.state.checkingsec }),
          2000
        );
      }
    );
  };

  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
    });
  };

  handleComment = (e) => {
    var comments_by = {
      first_name: this.props.stateLoginValueAim.user.first_name,
      last_name: this.props.stateLoginValueAim.user.last_name,
      alies_id: this.props.stateLoginValueAim.user.alies_id,
      profile_id: this.props.stateLoginValueAim.user.profile_id,
      user_id: this.props.stateLoginValueAim.user._id,
      image: this.props.stateLoginValueAim.user.image,
    };
    let comments =
      this.state.newTask.comments?.length > 0
        ? this.state.newTask.comments
        : [];
    comments.push({
      comment: this.state.newComment,
      comment_on: new Date(),
      comment_by: comments_by,
    });
    var state = this.state.newTask;
    state['comments'] = comments;
    this.setState({
      newTask: state,
      newComment: '',
    });
  };
  updateTaskFilter = (e) => {
    const state = this.state.check;
    state[e.target.name] = e.target.value == 'true' ? true : false;
    this.setState({ taskFilter: state });
  };
  handleTaskSubmit1 = (type) => {
    this.handleTaskSubmit(type);
    this.handleDoctorMail();
  };

  handleDoctorMail = () => {
    var data = this.state.assignedTo;
    var email = [];
    if (this.state.Assigned_already) {
      data &&
        data.length > 0 &&
        data.map((a) => {
          if (!this.state.Assigned_already.includes(a?.value)) {
            return email.push(a?.email);
          } else {
            return false;
          }
        });
    } else {
      data &&
        data.length > 0 &&
        data.map((a) => {
          return email.push(a?.email);
        });
    }
    let first_name =
      this.props.patient?.first_name || this.state.newTask?.patient?.first_name;
    let last_name =
      this.props.patient?.first_name || this.state.newTask?.patient?.last_name;
    let patient_id =
      this.props.patient?._id || this.state.newTask?.patient?.profile_id;
    axios
      .post(
        sitedata.data.path + '/UserProfile/MailSendToDr',
        {
          email: email,
          patient_infos: {
            first_name: first_name,
            last_name: last_name,
            patient_id: patient_id,
          },
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          // this.setState({
          //   updateEvaluate: responce.data.data,
          // });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateCommemtState = (e) => {
    this.setState({ newComment: e });
  };

  removeComment = (index) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { remove_comment, No, Yes, you_sure_to_remove_comment } = translate;
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
            <h1>{remove_comment}</h1>
            <p>{you_sure_to_remove_comment}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>

              <button
                onClick={() => {
                  this.removebtn(index);
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

  removebtn = (index) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { RemoveComment, really_want_to_remove_comment, No, Yes } = translate;
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
            <h1 class="alert-btn">{RemoveComment}</h1>
            <p>{really_want_to_remove_comment}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>

              <button
                onClick={() => {
                  this.deleteClickComment(index);
                  onClose();
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

  deleteClickComment(index) {
    var state = this.state.newTask;
    var array = this.state.newTask.comments;
    array.splice(index, 1);
    state['comments'] = array;
    this.setState({ newTask: state, openTask: true });
  }

  editComment = (index) => {
    this.setState({ editcomment: index });
  };

  oNEditText(e, index) {
    var state = this.state.newTask;
    state['comments'][index]['comment'] = e.target.value;
    this.setState({ newTask: state });
  }

  setSpeciality = (data, case_id) => {
    // this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + '/cases/AddCase/' + case_id,
        {
          speciality: {
            background_color: data.background_color,
            color: data.color,
            specialty_name: data.specialty_name,
            _id: data._id,
          },
          wards: {},
          rooms: {},
          bed: '',
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce1) => { });
  };
  // onKeyUp = (e) => {
  //   if (e.key === "Enter") {
  //
  //   }
  // };

  // For adding a date,time
  updateEntryState1 = (value, name) => {
    var due_on = this.state.newTask?.due_on ? this.state.newTask?.due_on : {};
    const state = this.state.newTask;
    if (name === 'date' || name === 'time') {
      due_on[name] = value;
      state['due_on'] = due_on;
    } else {
      state[name] = value;
    }
    this.setState({ newTask: state });
  };

  //Switch status done / open
  switchStatus = (alrady) => {
    if (!alrady) {
      const state = this.state.newTask;
      state['status'] = state.status === 'done' ? 'open' : 'done';
      if (state.status === 'done') {
        state['done_on'] = new Date();
      }
      this.setState({ newTask: state });
    }
  };

  //Select the patient name
  updateEntryState2 = (user) => {
    var user1 =
      this.state.users?.length > 0 &&
      this.state.users.filter((data) => data.patient_id === user.value);
    if (user1 && user1?.length > 0) {
      const state = this.state.newTask;
      state['patient'] = user1[0];
      state['patient_id'] = user1[0].patient_id;
      state['case_id'] = user1[0].case_id;
      if (!user.label) {
        user['label'] =
          user1[0].first_name && user1[0].last_name
            ? user1[0].first_name + ' ' + user1[0].last_name
            : user1[0].first_name;
      }
      if (!state?.speciality) {
        state['speciality'] = user1[0].speciality;
        this.setState({
          selectSpec: {
            label: user1[0]?.speciality?.specialty_name,
            value: user1[0]?.speciality?._id,
          },
        });
      }
      this.setState({ newTask: state, selectedPat: user });
    }
  };
  // let filterbadge =
  //     this.state.selectedUserType.length +
  //     this.state.selectFacility.length +
  //     this.state.selectedType.length;

  updateUserFilter = (e) => {
    this.setState({ userFilter: e });
  };

  //Select the professional name
  updateEntryState4 = (e) => {
    this.setState({ assignedTo2: e });
  };
  updateEntryState3 = (e) => {
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
      const state = this.state.newTask;
      state['assinged_to'] = data;
      this.setState({ newTask: state }, () => {
        this.selectProf(
          this.state.newTask?.assinged_to,
          this.state.professional_id_list
        );
      });
    });
  };

  //Change the UserList
  onChange = (event) => {
    const q = event.target.value.toLowerCase();
    this.setState({ q }, () => this.filterList());
  };

  // Get the Patient data
  getPatientData = async () => {
    this.setState({ loaderImage: true });
    let response = await getPatientData(
      this.props.stateLoginValueAim.token,
      this.props?.House?.value,
      'taskpage'
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

  filterList = () => {
    let users = this.state.users1;
    let q = this.state.q;
    users =
      users &&
      users.length > 0 &&
      users.filter(function (user) {
        return (
          user.label.toLowerCase().indexOf(q) != -1 ||
          user.profile_id.toLowerCase().indexOf(q) != -1
        );
        // return  // returns true or false
      });
    this.setState({ filteredUsers: users });
    if (this.state.q == '') {
      this.setState({ filteredUsers: [] });
    }
  };

  //{Delete} the perticular service confirmation box
  removeTask = (id) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { remove_task, you_sure_to_remove_task, No, Yes } = translate;
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
            <h1>{remove_task}</h1>
            <p>{you_sure_to_remove_task}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.removeTask2(id);
                  // onClose();
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

  removeTask2 = (id) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { RemoveTask, really_want_to_remove_task, No, Yes } = translate;
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
            <h1 class="alert-btn">{RemoveTask}</h1>
            <p>{really_want_to_remove_task}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.deleteClickTask(id);
                  onClose();
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


  //for delete the Task
  deleteClickTask(id) {
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path + "/assignservice/Deleteassignservice/" + id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.props.getAddTaskData();
        }
        this.setState({ loaderImage: false });
      })
      .catch((error) => { });
  }

  FilterText = (e) => {
    this.setState({ text: e.target.value });
    let track1 = this.props.AllTasks;
    let FilterFromSearch1 =
      track1 &&
      track1.length > 0 &&
      track1.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ AllTasks: FilterFromSearch1 });

    let track2 = this.props.DoneTask;
    let FilterFromSearch2 =
      track2 &&
      track2.length > 0 &&
      track2.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ DoneTask: FilterFromSearch2 });

    let track3 = this.props.OpenTask;
    let FilterFromSearch3 =
      track3 &&
      track3.length > 0 &&
      track3.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ OpenTask: FilterFromSearch3 });

    let track4 = this.props.ArchivedTasks;
    let FilterFromSearch4 =
      track4 &&
      track4.length > 0 &&
      track4.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ ArchivedTasks: FilterFromSearch4 });
  };

  // open Edit model
  editTask = (data) => {
    var pat1name = "";
    if (data?.patient?.first_name && data?.patient?.last_name) {
      pat1name = data?.patient?.first_name + " " + data?.patient?.last_name;
    } else if (data?.first_name) {
      pat1name = data?.patient?.first_name;
    }
    this.selectProf(data?.assinged_to, this.state.professional_id_list);
    var Assigned_Aready =
      data &&
      data?.assinged_to &&
      data?.assinged_to?.length > 0 &&
      data?.assinged_to.map((item) => {
        return item?.user_id;
      });

    var deep = _.cloneDeep(data);
    this.setState({

      service: deep,
      // OpenTask:true,
      openAss: true,
      Assigned_already: Assigned_Aready?.length > 0 ? Assigned_Aready : [],
      calculate_Length: {
        attach_Length: data?.attachments?.length,
        comments_Length: data?.comments?.length,
      },
      // assignedTo: assignedTo,
      q: pat1name,
      selectedPat: { label: pat1name, value: data?.patient?._id },
      selectSpec: {
        label: data?.speciality?.specialty_name,
        value: data?.speciality?._id,
      },
    });
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

  myColor(position) {
    if (this.state.active === position) {
      return '#00a891';
    }
    return '';
  }

  color(position) {
    if (this.state.active === position) {
      return 'white';
    }
    return '';
  }

  onClick = () => {
    this.setState({ hope: true });
  };

  // Clear filter
  clearFilter = () => {
    let { tabvalue2, DoneTask, OpenTask, ArchivedTasks } = this.state;
    this.setState({
      userFilter: '',
      assignedTo2: '',
      selectSpec2: '',
      AllTasks: this.props.AllTasks,
      DoneTask: this.props.DoneTask,
      OpenTask: this.props.OpenTask,
      ArchivedTasks: this.props.ArchivedTasks,
      wardList: '',
      roomList: '',
      allWards: '',
      selectRoom: '',
      selectWard: '',
      noWards: false,
      AllTaskCss: '',
      DeclinedTaskCss: '',
    });
  };

  findData = () => {
    let {
      userFilter,
      assignedTo2,
      selectSpec2,
      tabvalue2,
      selectRoom,
      selectWard,
      check,
    } = this.state;
    let done = check && check?.done && check.done == true ? 'done' : '';
    let open = check && check?.open && check.open == true ? 'open' : '';
    let status = [];
    if (tabvalue2 === 0) {
      if (done && done.length > 0) {
        status = [done];
      }
      if (open && open.length > 0) {
        status = [open];
      }
      if (done && done.length > 0 && open && open.length > 0) {
        status = [done, open];
      }
    } else if (tabvalue2 === 1) {
      status = ['done'];
    } else if (tabvalue2 === 2) {
      status = ['open'];
    }

    var data = { house_id: this.props.House?.value };
    if (selectWard?.value) {
      data.ward_id = selectWard?.value;
    }
    if (selectRoom?.value) {
      data.room_id = selectRoom?.value;
    }
    if (status && status.length > 0) {
      data.status = status;
    }
    if (selectSpec2?.value) {
      data.speciality_id = selectSpec2?.value;
    }
    if (assignedTo2 && assignedTo2.length > 0) {
      data.assigned_to =
        assignedTo2 &&
        assignedTo2.length > 0 &&
        assignedTo2.map((item) => {
          return item.value;
        });
    }
    if (userFilter && userFilter.length > 0) {
      data.patient_id =
        userFilter &&
        userFilter.length > 0 &&
        userFilter.map((item) => {
          return item.value;
        });
    }

    let dd = axios
      .post(
        sitedata.data.path + '/vh/TaskFilter',
        data,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          return responce.data.data ? responce.data.data : [];
        }
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
    return dd;
  };

  applyFilter = () => {
    let {
      userFilter,
      assignedTo2,
      selectSpec2,
      tabvalue2,
      selectRoom,
      selectWard,
    } = this.state;

    let tasks = '';
    if (tabvalue2 === 0) {
      tasks = this.props.AllTasks;
    } else if (tabvalue2 === 1) {
      tasks = this.props.DoneTask;
    } else if (tabvalue2 === 2) {
      tasks = this.props.OpenTask;
    } else if (tabvalue2 === 3) {
      tasks = this.props.DeclinedTask;
    } else if (tabvalue2 === 4) {
      tasks = this.props.ArchivedTasks;
    }
    let data2 = this.findData();
    data2.then((resp) => {
      if (tabvalue2 === 0) {
        this.setState({ AllTasks: resp, AllTaskCss: 'filterApply' });
      } else if (tabvalue2 === 1) {
        this.setState({ DoneTask: resp, DoneTaskCss: 'filterApply' });
      } else if (tabvalue2 === 2) {
        this.setState({ OpenTask: resp, OpenTaskCss: 'filterApply' });
      } else if (tabvalue2 === 3) {
        this.setState({ DeclinedTask: resp, DeclinedTaskCss: 'filterApply' });
      }
    });
    this.handleCloseRvw();
  };

  //On Changing the specialty id
  onFieldChange2 = (e) => {
    this.setState({
      selectRoom: '',
      selectWard: '',
      wardList: [],
      roomList: [],
    });
    let specialityList =
      this.props &&
      this.props.speciality &&
      this.props.speciality.SPECIALITY.filter((item) => {
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
    this.setState({
      selectSpec2: e,
      wardList: wards_data,
      allWards: wardsFullData,
    });
  };

  // ward Change
  onWardChange = (e) => {
    this.setState({ selectRoom: '' });
    let { allWards } = this.state;
    let wardDetails =
      allWards &&
      allWards.length > 0 &&
      allWards.filter((item) => {
        return item && item._id == e.value;
      });
    let roomsData =
      wardDetails && wardDetails.length > 0 && wardDetails[0].rooms;
    let rooms =
      roomsData &&
      roomsData.length > 0 &&
      roomsData.map((item) => {
        return { label: item.room_name, value: item._id };
      });
    this.setState({ selectWard: e, roomList: rooms });
  };

  //room cahnge
  onRoomChange = (e) => {
    this.setState({ selectRoom: e });
  };
  onFieldChange = (e) => {
    const state = this.state.newTask;
    this.setState({ selectSpec: e });
    var speciality =
      this.props.speciality?.SPECIALITY &&
      this.props?.speciality?.SPECIALITY.length > 0 &&
      this.props?.speciality?.SPECIALITY.filter((data) => data._id === e.value);
    if (speciality && speciality.length > 0) {
      state['speciality'] = {
        background_color: speciality[0]?.background_color,
        color: speciality[0]?.color,
        specialty_name: speciality[0]?.specialty_name,
        _id: speciality[0]?._id,
      };
      this.setState({ newTask: state });
    }
  };

  openTaskTime = () => {
    this.setState({ openDate: !this.state.openDate });
  };

  calculateAge = (date) => {
    if (date) {
      var birthDate = new Date(date);
      var otherDate = new Date();
      var years = otherDate.getFullYear() - birthDate.getFullYear();
      if (
        otherDate.getMonth() < birthDate.getMonth() ||
        (otherDate.getMonth() == birthDate.getMonth() &&
          otherDate.getDate() < birthDate.getDate())
      ) {
        years--;
      }
      return years;
    }
    return '-';
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      CreateCertificate,
      Ward,
      Room,
      Patient,
      Staff,
      filters,
      Taskstatus,
      speciality,
      applyFilters,
      clear_all_filters,
      Search,
      Filterbypatient,
      FilterbyStaff,
      FilterbySpeciality,
      FilterbyWard,
      FilterbyRoom,
      ALL,
      Done,
      Open,
      Archived,
    } = translate;

    const {
      tabvalue,
      tabvalue2,
      professional_data,
      newTask,
      AllTasks,
      AllTaskCss,
      DoneTaskCss,
      DeclinedTaskCss,
      OpenTaskCss,
      assignService,
      ArchivedTasksCss,
    } = this.state;

    const userList =
      this.state.filteredUsers &&
      this.state.filteredUsers.map((user) => {
        return (
          <li
            key={user.id}
            style={{
              background: this.myColor(user.id),
              color: this.color(user.id),
            }}
            value={user.profile_id}
            onClick={() => {
              this.setState({ q: user.label, selectedUser: user });
              this.updateEntryState2(user);
              this.toggle(user.id);
              this.setState({ filteredUsers: [] });
            }}
          >
            {user.label} ( {user.profile_id} )
          </li>
        );
      });
    let { userFilter, assignedTo2, selectSpec2, selectWard, selectRoom } =
      this.state;

    return (
      <Grid className="topLeftSpc taskViewMob">
        <Grid container direction="row">
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid className="newServc newServicAllSec">
              <Button onClick={() => this.handleOpenAss()} >
                {"+ Assign service"}
              </Button>

              <AssignedService
                openAss={this.state.openAss}
                handleOpenAss={() => this.handleOpenAss()}
                handleCloseAss={() => this.handleCloseAss()}
                service={this.state.service}
                removeTask={(id) => this.removeTask(id)}
                editTask={(data) => this.editTask(data)}
                getAddTaskData={(tabvalue) => {
                  this.props.getAddTaskData(tabvalue);
                }}
                comesFrom={this.props.comesFrom} />
            </Grid>
          </Grid>

        </Grid>
        <Grid className="taskDetailMob">
          {/* {tabvalue === 0 && <TabContainer> */}
          <Grid className="taskCntntMng">
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12} sm={6} md={7}>
                <AppBar position="static" className="billTabs">
                  <Tabs value={tabvalue2} onChange={this.handleChangeTab2}>
                    <Tab label={ALL} className="billtabIner" />
                    <Tab label={Done} className="billtabIner" />
                    <Tab label={Open} className="billtabIner" />
                    {/* {this.props.comesFrom !== 'Professional' && (
                      <Tab label={Declined} className="billtabIner" />
                    )} */}
                    {this.props.comesFrom !== 'detailTask' && (
                      <Tab label={Archived} className="billtabIner" />
                    )}
                  </Tabs>
                </AppBar>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>

                <Grid className="taskSort">
                  {this.state.showinput && (
                    <input
                      className="TaskSearch"
                      type="text"
                      name="search"
                      placeholder={Search}
                      value={this.state.text}
                      onChange={this.FilterText}
                    />
                  )}
                  <a>
                    {!this.state.showinput ? (
                      <img
                        src={require('assets/virtual_images/search-entries.svg')}
                        alt=""
                        title=""
                        onClick={() => {
                          this.setState({ showinput: !this.state.showinput });
                        }}
                      />
                    ) : (
                      <img
                        src={require('assets/images/close-search.svg')}
                        alt=""
                        title=""
                        onClick={() => {
                          this.setState({
                            showinput: !this.state.showinput,
                            text: '',
                          });
                          this.clearFilter();
                        }}
                      />
                    )}
                  </a>
                  {console.log('ArchivedTasks', this.state.ArchivedTasks)}
                  {this.props.comesFrom !== 'Professional' &&
                    this.props.comesFrom !== 'detailTask' && (
                      <>
                        {tabvalue2 === 0 && (
                          <a className={AllTaskCss}>
                            <img
                              src={
                                AllTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />
                          </a>
                        )}
                        {tabvalue2 === 1 && (
                          <a className={DoneTaskCss}>
                            <img
                              src={
                                AllTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />
                          </a>
                        )}
                        {tabvalue2 === 2 && (
                          <a className={OpenTaskCss}>
                            <img
                              src={
                                AllTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />
                          </a>
                        )}
                        {tabvalue2 === 3 && (
                          <a className={DeclinedTaskCss}>
                            <img
                              src={
                                DeclinedTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />
                          </a>
                        )}
                      </>
                    )}
                  {tabvalue2 === 4 && (
                    <a className={ArchivedTasksCss}>
                      <img
                        src={
                          ArchivedTasksCss === 'filterApply'
                            ? require('assets/virtual_images/sort-active.png')
                            : require('assets/virtual_images/sort.png')
                        }
                        alt=""
                        title=""
                        onClick={this.handleOpenRvw}
                      />{' '}
                    </a>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {tabvalue2 === 0 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.AllTasks?.length > 0 &&
                  this.state.AllTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 1 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.DoneTask?.length > 0 &&
                  this.state.DoneTask.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 2 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.OpenTask?.length > 0 &&
                  this.state.OpenTask.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}

          {tabvalue2 === 3 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.ArchivedTasks?.length > 0 &&
                  this.state.ArchivedTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 4 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.ArchivedTasks?.length > 0 &&
                  this.state.ArchivedTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
        </Grid>
        <Modal open={this.state.noWards} onClose={this.handleCloseRvw}>
          <Grid
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === 'dark'
                ? 'nwEntrCntnt fltrClear darkTheme'
                : 'nwEntrCntnt fltrClear'
            }
          >
            <Grid className="fltrClearIner">
              <Grid className="fltrLbl">
                <Grid container direction="row" justify="center">
                  <Grid item xs={8} md={8} lg={8}>
                    <label>{filters}</label>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Grid>
                      <Grid className="entryCloseBtn">
                        <a onClick={this.handleCloseRvw}>
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

              <TabContainer>
                <Grid className="fltrForm">
                  {tabvalue2 === 0 && (
                    <Grid className="fltrInput">
                      <label>{Taskstatus}</label>
                      <Grid className="addInput">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="open"
                              value={
                                this.state.check &&
                                  this.state.check.open &&
                                  this.state.check.open == true
                                  ? false
                                  : true
                              }
                              color="#00ABAF"
                              checked={this.state.check.open}
                              onChange={(e) => this.updateTaskFilter(e)}
                            />
                          }
                          label={Open}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="done"
                              value={
                                this.state.check &&
                                  this.state.check.done &&
                                  this.state.check.done == true
                                  ? false
                                  : true
                              }
                              color="#00ABAF"
                              checked={this.state.check.done}
                              onChange={(e) => this.updateTaskFilter(e)}
                            />
                          }
                          label={Done}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Grid className="fltrInput">
                    <label>{Patient}</label>
                    <Grid className="addInput">
                      <Select
                        name="professional"
                        onChange={(e) => this.updateUserFilter(e)}
                        value={this.state.userFilter}
                        options={this.state.patientForFilter}
                        placeholder={Filterbypatient}
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="fltrInput">
                    <label>{Staff}</label>
                    <Grid className="addInput">
                      <Select
                        name="professional"
                        onChange={(e) => this.updateEntryState4(e)}
                        value={this.state.assignedTo2}
                        options={this.state.professional_id_list}
                        placeholder={FilterbyStaff}
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="fltrInput">
                    <label>{speciality}</label>
                    <Grid className="addInput">
                      <Select
                        onChange={(e) => this.onFieldChange2(e)}
                        options={this.state.specilaityList}
                        name="specialty_name"
                        value={this.state.selectSpec2}
                        placeholder={FilterbySpeciality}
                        isMulti={false}
                        className="addStafSelect"
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  {this.state.wardList && this.state.wardList.length > 0 && (
                    <Grid className="fltrInput">
                      <label>{Ward}</label>
                      <Grid className="addInput">
                        <Select
                          onChange={(e) => this.onWardChange(e)}
                          options={this.state.wardList}
                          name="ward_name"
                          value={this.state.selectWard}
                          placeholder={FilterbyWard}
                          isMulti={false}
                          className="addStafSelect"
                          isSearchable={true}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {this.state.roomList && this.state.roomList.length > 0 && (
                    <Grid className="fltrInput">
                      <label>{Room}</label>
                      <Grid className="addInput">
                        <Select
                          onChange={(e) => this.onRoomChange(e)}
                          options={this.state.roomList}
                          name="room_name"
                          value={this.state.selectRoom}
                          placeholder={FilterbyRoom}
                          isMulti={false}
                          className="addStafSelect"
                          isSearchable={true}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid className="aplyFltr">
                  <Grid className="aplyLft">
                    <label className="filterCursor" onClick={this.clearFilter}>
                      {clear_all_filters}
                    </label>
                  </Grid>
                  <Grid className="aplyRght">
                    <Button onClick={this.applyFilter}>{applyFilters}</Button>
                  </Grid>
                </Grid>
              </TabContainer>

              {/* } */}
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
  const { metadata } = state.OptionList;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    House,
    settings,
    verifyCode,
    speciality,
    metadata,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    OptionList,
    Speciality,
  })(Index)
);

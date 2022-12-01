import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { getLanguage } from "translations/index";
import _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert'; // Import
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export const getSpecialty = (current) => {
  current.setState({ loaderImage: true });
  axios
    .get(
      sitedata.data.path + "/vh/AddSpecialty/" + current.props?.House?.value,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      if (responce.data.hassuccessed && responce.data.data) {
        var newArray = responce.data?.data?.length > 0 && responce.data.data.map((item) => {
          return ({ label: item.specialty_name, value: item._id })
        })
        current.setState({ AllSpeciality: newArray });
      }
      current.setState({ loaderImage: false });
    });
};



export const onChangePage = (pageNumber, current) => {
  current.setState({
    staff_data: current.state.AllStaff.slice(
      (pageNumber - 1) * 10,
      pageNumber * 10
    ),
    currentPage: pageNumber,
  });
};

//On Changing the specialty id 
export const onFieldChange = (e, current) => {
  const state = current.state.updateTrack;
  state['speciality_id'] = e?.length > 0 && e.map((data) => { return data.value });
  current.setState({ updateTrack: state });
}

//Modal Open
export const handleOpenServ = (current) => {
  if (current.state.speciality_id && current.state.speciality_id !== 'general') {
    current.setState({ openServ: true, updateTrack: { speciality_id: [current.state.speciality_id] } });
  }
  else {
    current.setState({ openServ: true, updateTrack: {} });
  }

};

//Modal Close
export const handleCloseServ = (current) => {
  current.setState({ openServ: false, updateTrack: {} ,selectSpec2:'',selectWard: '',  wardList: [],errorMsg:false});
};
export const updateEntryState1 = (e, current) => {
  const state = current.state.updateTrack;
  state[e.target.name] = e.target.value;
  current.setState({ updateTrack: state });
};

// For getting the staff and implement Pagination
export const teamstaff = (current) => {
  current.setState({ loaderImage: true });
  axios
    .get(
      sitedata.data.path + "/teammember/GetTeam/" + current.props?.House?.value,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((response) => {
      var totalPage = Math.ceil(response.data.data.length / 10);
      current.setState(
        {
          AllStaff: response.data.data,
          loaderImage: false,
          totalPage: totalPage,
          currentPage: 1,
        },
        () => {
          current.setState({ loaderImage: false });
          if (totalPage > 1) {
            var pages = [];
            for (var i = 1; i <= current.state.totalPage; i++) {
              pages.push(i);
            }
            current.setState({
              staff_data: current.state.AllStaff.slice(0, 10),
              pages: pages,
            });
          } else {
            current.setState({ staff_data: current.state.AllStaff });
          }
        }
      );
    });
};

 //For adding the New staff 
 export const handleSubmit = (current) => {
    let translate = getLanguage(current.props.stateLanguageType);
    let {} = translate;
    current.setState({ errorMsg: '' })
      // data.house_id = current.props?.House?.value;
      // axios
      //   .post(sitedata.data.path + "/teammember/AddGroup", data, commonHeader(current.props.stateLoginValueAim.token))
      //   .then((responce) => {
      //     handleCloseServ(current);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     current.setState({ errorMsg: "Something_went_wrong" })
  
      //   });
    console.log('no value')
   
    }


    //Delete the Staff
    export const  DeleteStaff = (current) => {
    let translate = getLanguage(current.props.stateLanguageType);
      let {
        deleteStaff,
        yes_deleteStaff,
        are_you_sure,
        cancel_keepStaff,
      } = translate;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <Grid
              className={
                current.props.settings &&
                  current.props.settings.setting &&
                  current.props.settings.setting.mode === 'dark'
                  ? 'dark-confirm deleteStep'
                  : 'deleteStep'
              }
            >
              <Grid className="deleteStepLbl">
                <Grid>
                  <a
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <img
                      src={require('assets/images/close-search.svg')}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <label>{deleteStaff}</label>
              </Grid>
              <Grid className="deleteStepInfo">
                <label>{are_you_sure}</label>
                <Grid>
                  <label></label>
                </Grid>
                <Grid>
                  <Button
                    onClick={() => {
                    removestaff(current);
                    }}
                  >
                    {yes_deleteStaff}
                  </Button>
                  <Button
                    onClick={() => {
                      onClose();
                    }}
                  >
                    {cancel_keepStaff}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        },
      });
   
  };

  export const removestaff = (current) => {
    let translate = getLanguage(current.props.stateLanguageType);
    let { removeStaff, really_want_to_remove_staff, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              current.props.settings &&
                current.props.settings.setting &&
                current.props.settings.setting.mode &&
                current.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1 class="alert-btn">{removeStaff}</h1>
            <p>{really_want_to_remove_staff}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  DeleteStaffOk(current);
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
 

  export const DeleteStaffOk = (id,current) => {
    // axios
    // .delete(sitedata.data.path + ""+ id+ "/" + current.props?.House?.value,
    //  commonHeader(current.props.stateLoginValueAim.token))
    // .then((response) => {
    //   })
    // .catch((error) => { });
  };
 
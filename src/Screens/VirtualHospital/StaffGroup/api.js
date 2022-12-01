import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { getLanguage } from "translations/index";
import _ from 'lodash';

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
 
 
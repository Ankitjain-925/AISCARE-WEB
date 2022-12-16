import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import { AllBedOnWard } from 'Screens/VirtualHospital/PatientFlow/data';


//for getting all speciality
export const getSpeciality = async (current) => {
  current.setState({ loaderImage: true });
  axios
    .get(
      sitedata.data.path + '/vh/AddSpecialty/' + current.props?.House?.value,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then(async (responce) => {
      if (responce.data.hassuccessed && responce.data.data) {
        current.props.Speciality(
          true,
          current.props?.House?.value,
          current.props.stateLoginValueAim.token
        );
        var NewData = [];
        NewData =
          (await responce?.data?.data?.length) > 0 &&
          responce.data.data.map(async (item) => {
            item?.wards?.length > 0 &&
              item.wards.map(async (item1) => {
                var response = await AllBedOnWard(
                  item._id,
                  item1._id,
                  current.props?.House?.value,
                  current.props.stateLoginValueAim.token
                );
                if (response.data.hassuccessed) {
                  item1['available'] = response?.data?.data;
                }
              });
            return item;
          });
        if (NewData) {
          NewData = Promise.all(NewData).then((values) => {
            return values;
          });
          NewData.then((values1) => {
            setTimeout(() => {
              current.setState({
                loaderImage: false,
                openSpecl: false,
                specialityData: values1,
                specialityData2: values1,
              });
            }, 3000);
          });
        } else {
          setTimeout(() => {
            current.setState({
              loaderImage: false,
              openSpecl: false,
              specialityData: [],
              specialityData2: [],
            });
          }, 3000);
        }
      } else {
        current.setState({ loaderImage: false, openSpecl: false });
      }
    });
};
export const getSetting = (current) => {
    current.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + "/UserProfile/updateSetting",  commonHeader(current.props.stateLoginValueAim.token))
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          current.setState({
            timeF: {
              label: responce.data.data.time_format,
              value: responce.data.data.time_format,
            },
            dateF: {
              label: responce.data.data.date_format,
              value: responce.data.data.date_format,
            },
          });
          current.props.Settings(responce.data.data);
        } else {
          current.props.Settings({
            user_id: current.props?.stateLoginValueAim?.user?._id,
          });
        }
        current.setState(
          {
            loaderImage: false,
            languageValue:
              responce.data.data && responce.data.data.language
                ? responce.data.data.language
                : "en",
            mode:
              responce.data.data && responce.data.data.mode
                ? responce.data.data.mode
                : "normal",
          },
          () => {
            current.props.LanguageFetchReducer(current.state.languageValue);
          }
        );
      });
  };
  // export const checkauthority = (current, pagetitle) => {
  //   console.log('checkauthority')
  //   var data =  current.props.houses?.length>0 && this.props.houses.map((item)=> 
  //    {
  //      if(item.roles.includes(pagetitle)){
  //        return true
  //      }
  //      return false
  //    } )
  //    console.log("erorbr=tao",data)
  //    return data.indexOf(true)>-1;
  //  }
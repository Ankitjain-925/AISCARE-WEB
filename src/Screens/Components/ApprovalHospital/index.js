import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import sitedata from "sitedata";
import "react-calendar/dist/Calendar.css";
import { getLanguage } from "translations/index"
import io from "socket.io-client";
import Radio from "@material-ui/core/Radio";
import Select from 'react-select';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { GetSocketUrl } from "Screens/Components/BasicMethod/index";
const SOCKET_URL = GetSocketUrl()

var socket;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkexpire: false,
      actiondone: false,
      fav_doc:[],
      users_id: []
    };
    socket = io(SOCKET_URL);

  }

  notApprove = () => {
    this.props.history.push("/");
  };

  redirectPage = (status) => {
    this.setState({ loaderImage: true });
    axios.put(
      sitedata.data.path + "/cases/verifiedbyPatient/" + this.props.match.params.id,
      {  verifiedbyPatient : status
      },
    )
      .then((responce1) => {
        console.log("rep",responce1)
        if(!responce1.data.hassuccessed){
          this.setState({ linkexpire: true });
          setTimeout(() => {
          this.setState({ linkexpire: false })
          },5000);
        }
        else{
          if(status){
            this.mypatiantandDocSend();
            socket.emit("addpatient",{verifiedbyPatient:status,case_id:this.props.match.params.id})
            this.setState({actiondone : "Your are approved the hospital to share information successfully, Thanks for your co-operation"})
          }
          else{
            socket.emit("decline",{verifiedbyPatient:status,case_id:this.props.match.params.id})
            this.setState({actiondone : "Your are not approved the hospital, Thanks for your co-operation"})
          }
        }
        this.setState({ loaderImage: false });
      })
  }

  mypatiantandDocSend = ()=>{
    this.setState({ loaderImage: true });
    axios.put(
      sitedata.data.path + "/cases/addmypatient/" + this.props.match.params.id+"/"+this.props.match.params.house_id,
      {  users_id : this.state.users_id,
        fav_doctor : this.state.fav_doctor
      },
    )
      .then((responce1) => {
        if(!responce1.data.hassuccessed){
         console.log('in success')
        }
        else{
          console.log('in fail')
        }
        this.setState({ loaderImage: false });
      })
  }

  setAll_doc=(e)=>{
    this.setState({specific:e.target.checked? false: true})
    let data = this.state.professionalArray.map((item)=>{
      return {doctor: item?.profile_id,
        profile_id: item?.profile_id,
        user_type:item?.type ,
        byhospital: this.props.match.params.house_id};
    })
    let users_id = this.state.professionalArray.map((item)=>{
      return item?.id;
    })
    this.setState({fav_doctor : data, users_id : users_id})
  }

  setMy_doc= (e)=>{
    var data =
    e?.length > 0 &&
    e.reduce((last, current, index) => {
        let isProf =
            this.state.professionalArray?.length > 0 &&
            this.state.professionalArray.filter(
                (data, index) => data.user_id === current.value
            );
        if (isProf && isProf.length > 0) {
            last.push({doctor: isProf[0]?.profile_id,
                profile_id: isProf[0]?.profile_id,
                user_type:isProf[0]?.type ,
                byhospital: this.props.match.params.house_id})
              ;
        }
        return last;
    }, []);
    let users_id = e?.length>0 && e.map((item)=>{
      return item?.value;
    })
    this.setState({fav_doctor : data, users_id : users_id})
    this.setState({fav_doctor : data})
  }

  componentDidMount = async () => {
    var professionalList = [], professionalArray = [];
    this.setState({ loaderImage: true });
    var response = await axios.get(
      sitedata.data.path + '/hospitaladmin/GetProfessional1/' + this.props.match.params.house_id,
    );
    if (response.data.hassuccessed) {
      for (let i = 0; i < response.data?.data.length; i++) {
        var name = '';
        if (
          response.data?.data[i]?.first_name &&
          response.data?.data[i]?.last_name
        ) {
          name =
            response.data?.data[i]?.first_name +
            ' ' +
            response.data?.data[i]?.last_name;
        } else if (response.data?.data[i]?.first_name) {
          name = response.data?.data[i]?.first_name;
        }
          professionalArray.push({
            first_name: response.data?.data[i].first_name,
            last_name: response.data?.data[i].last_name,
            user_id: response.data?.data[i]._id,
            profile_id: response.data?.data[i].profile_id,
            alies_id: response.data?.data[i].alies_id,
            image: response.data?.data[i].image,
            type: response.data?.data[i].type,
            title: response.data?.data[i].title,
          });
  
        professionalList.push({
          value: response.data?.data[i]._id,
          label: name,
          email: response.data.data[i].email,
        });
      }
      this.setState({professionalList: professionalList, professionalArray: professionalArray, loaderImage: false })
    }
    else{
      this.setState({professionalList: [], professionalArray: [], loaderImage: false })
    }
  }

  render() {
    const { selectedOption } = this.state;
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      page_not_found,
      Oops,
      page_temparary_unavailable,
      go_to_home,
    } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "homeBg homeBgDrk"
            : "homeBg"
        }
      >
         {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={10} md={10}>
              <Grid className="webLogo">
                <a href="/">
                  <img
                    src={require("assets/images/LogoPNG.png")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
              {this.state.linkexpire &&
              <div className="err_message">{"Link limit is exceed, for getting new link must to contact hospital authority"}</div>}
              <div className="err_message">{"This link is valid till 24 hr Only or till you approve that. after that link will be deactivate."}</div>
              <div className="NotFound">
                <h1>Approve the hospital to access your information</h1>
              </div>
              <div className="NotFoundContent">
               {this.state.actiondone && <>
                <div className="OopsContent">{this.state.actiondone}</div>
                </>}
                {!this.state.actiondone && <>
                <div className="OopsContent"></div>
                <div>{"A hosptial wants the access to get your infomration for your treatment, If you approve the hospital then, you are able to admin in hospital for the futher treatment/ chechup."}</div>
                <div className="err_message">{"Note : - If any condition you are not approve the hospital then hospital are not able to admit you in hospital. And this link is available only for 24hr for approve."}</div>
                <div>
                <FormControlLabel
                  control={<Radio />}
                  name="follow_up_prescription"
                  value="yes"
                  color="#00ABAF"
                  checked={
                    this.state.specific === false
                  }
                  onChange={(e) => this.setAll_doc(e)}
                  label={"Do you want to trust all the doctors and nurses of this hospital"}
                />
                <FormControlLabel
                  control={<Radio />}
                  name="follow_up_prescription"
                  color="#00ABAF"
                  value="no"
                  checked={
                    this.state.specific === true
                  }
                  onChange={(e)=> this.setState({specific:e.target.checked? true: false})}
                  label={"Do you want to trust only specific Doctors and Nurses of this hospital."}
                />
                {this.state.specific &&
                    <Select
                  //  value={this.state.specialistOption}
                    className="selectapprove"
                    onChange={this.setMy_doc}
                    options={
                    this.state.professionalList
                    }
                    placeholder={"select"}
                    isSearchable={false}
                    isMulti={true}
                    name="fav_doc"
                  />
                      }
                </div>
                <div onClick={()=>this.redirectPage(true)} className="BackHomeBtn">
                  {"Approve"}
                </div>
                <div onClick={()=>this.redirectPage(false)} className="BackHomeBtn">
                  {"Not Approve"}
                </div>
                </>}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default connect(mapStateToProps, {
  LoginReducerAim,
  Settings,
  LanguageFetchReducer,
})(Index);

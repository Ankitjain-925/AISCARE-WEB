import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { LanguageFetchReducer } from "Screens/actions";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import sitedata from "sitedata";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import "react-flags-select/scss/react-flags-select.scss";
import Loader from "Screens/Components/Loader/index";
import { Settings } from "Screens/Login/setting";
import Toggle from "react-toggle";
import "assets/css/style_log.css";
import { NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { getLanguage } from "translations/index";
import contry from "Screens/Components/countryBucket/countries.json";
// import { updateCometUser } from "Screens/Components/CommonApi/index";
import { commonCometHeader, commonHeader } from "component/CommonHeader/index";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ran1: false,
        ran2: false,
        sum: 0,

    };
  }

  componentDidMount(){
    this.getRan()
  }

  //On change password
  getRan=()=>{
    var ran1 = Math.floor(Math.random() * 99) + 1;
    var ran2 = Math.floor(Math.random() * 99) + 1;
    var sum = ran1+ran2;
    this.setState({ran1 : ran1, ran2 : ran2, sum : sum})
  }

  render() {

    return (
      <Grid
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
            ? "loginSiteUpr homeBgDrk"
            : "loginSiteUpr"
        }
      >
        <Grid className="loginSite">
                {this.state.ran1 !== false &&  this.state.ran2 !== false&& 
                <>
                   <p>{}</p>
                </>
                 }
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
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
  LanguageFetchReducer,
  Settings,
})(Index);
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Grid';
import { getLanguage } from 'translations/index';
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from "Screens/Login/authy.js";
import { OptionList } from "Screens/Login/metadataaction";
import { Speciality } from "Screens/Login/speciality.js";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      color: this.props.color,
      backgroundColor: this.props.backgroundColor,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.label !== this.props.label ||
      prevProps.color !== this.props.color ||
      prevProps.backgroundColor !== this.props.backgroundColor
    ) {
      this.setState({
        color: this.props.color,
        backgroundColor: this.props.backgroundColor,
        label: this.props.label,
      });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { edit, Delete } = translate;
    const { House: { roles = [] } = {} } = this.props || {}
    return (
      <Grid className="">
        {this.state.label && (
          <Grid
            className={this.props.viewImage ? 'spcMgntUpr' : 'otherPageSpc'}
          >
            {this.props.viewImage ? (
              <Grid container direction="row">
                <Grid item xs={6} md={6} className="specialitybutton-parent">
                  <Button
                    className={
                      this.props.showActive
                        ? 'specialitybutton acitveButton'
                        : 'specialitybutton'
                    }
                    style={{
                      color: this.state.color,
                      backgroundColor: this.state.backgroundColor,
                    }}
                    variant="contained"
                  >
                    {this.state.label}{' '}
                    {this.props.showActive && <span>(current)</span>}
                  </Button>
                  {/* {this.props.showActive && <span>(current)</span>} */}
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  className="spcMgntRght7 presEditDot scndOptionIner"
                >
               {(roles.includes('edit_speciality') || roles.includes('delete_speciality') )&&
                  <a className="openScndhrf">
                    <img
                      src={require('assets/images/three_dots_t.png')}
                      alt=""
                      title=""
                      className="openScnd specialuty-more"
                    />
                    <ul>
                      <li>
                      {roles.includes('edit_speciality') &&
                        <a
                          onClick={() => {
                            this.props.onClick();
                          }}
                        >
                          <img
                            src={require('assets/images/details.svg')}
                            alt=""
                            title=""
                          />
                          {edit}
                        </a>}
                       {roles.includes('delete_speciality') &&
                        <a
                          onClick={() => {
                            this.props.deleteClick();
                          }}
                        >
                          <img
                            src={require('assets/images/details.svg')}
                            alt=""
                            title=""
                          />
                          {Delete}
                        </a>}
                      </li>
                    </ul>
                  </a>}
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="row">
                <Grid>
                  <Button
                    className={
                      this.props.showActive
                        ? 'specialitybutton acitveButton'
                        : 'specialitybutton'
                    }
                    onClick={this.props.onClick}
                    style={{
                      color: this.state.color,
                      backgroundColor: this.state.backgroundColor,
                    }}
                    variant="contained"
                  >
                    {this.state.label}{' '}
                    {this.props.showActive && <span>(current)</span>}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  const { speciality } = state.Speciality;
  const { House } = state.houseSelect;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
    House,
    speciality,
   
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    OptionList,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    Speciality,
 
  })(Index)
);

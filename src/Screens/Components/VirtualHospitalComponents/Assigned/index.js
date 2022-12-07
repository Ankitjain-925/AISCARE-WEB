import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { pure } from 'recompose';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import Modal from '@material-ui/core/Modal';
import { getLanguage } from 'translations/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Settings } from 'Screens/Login/setting';
import ShowStaffData from "../../../VirtualHospital/AssignTherapy/ShowStaffData";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigned_to: this.props.assigned_to,
    };
  }

  ViewPopup = () => {
    this.setState({ showAll: true });
  };

  removePopup = () => {
    this.setState({ showAll: false });
  };

  // Closing Show staff Modal
  closeStaffInfo = () => {
    this.setState({ openStaff: false });
  }


  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Assignedto } = translate;
    var viewImage =
      this.props.assigned_to?.length > 0 &&
      this.props.assigned_to.filter((data, index) => index <= 1 && data);
    var count =
      this.props.assigned_to?.length - 2 > 0
        ? this.props.assigned_to?.length - 2
        : 0;
    return (
      <>
        {this.props.withoutLabel ? (
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              <Grid className="asignUpr">
                <Grid className="asignLft">
                  <Grid>
                    <label>{Assignedto}</label>
                  </Grid>
                  <Grid>
                    {viewImage?.length > 0 &&
                      viewImage.map((data, index) => (
                        <S3Image imgUrl={data.image} />
                      ))}
                    {count > 0 && <a>+{count}</a>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid className="newassignLft">
            <Modal
              className={
                this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === 'dark'
                  ? 'darkTheme'
                  : ''
              }
              open={this.state.showAll}
              onClose={this.removePopup}
            >
              <Grid className="creatTaskModel " >
                <Grid className="creatTaskCntnt">
                  <Grid container direction="row">
                    <Grid container direction="row" justify="center" className="creatLbl" >
                      <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center">
                          <Grid item xs={8} md={8} lg={8}>
                            <label>{Assignedto}</label>
                          </Grid>
                          <Grid item xs={4} md={4} lg={4}>
                            <Grid>
                              <Grid className="entryCloseBtn">
                                <a onClick={this.removePopup}>
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
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                      <Grid className="creatLbl">
                        <Grid className="creatLblClose">
                          <a onClick={() => this.removePopup()}>
                            <img
                              src={require('assets/images/close-search.svg')}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                        <label>{Assignedto}</label>
                      </Grid>
                    </Grid> */}

                    <Grid item xs={12} md={12} lg={12}>
                      <Grid className="creatDetail">
                        <Grid className="creatInfoIner">
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item xs={12} md={12}>
                              {this.props.assigned_to?.length > 0 &&
                                this.props.assigned_to.map((data, index) => (<>
                                  {data?.staff && data?.staff?.length > 0 ? <>
                                    <a onClick={() => this.props.showData(data, data?.team_name)} > <Grid className="allInfo allInfo2 tasklistName tasklistName1">
                                      <Grid>
                                        <img src={this.props.settings.setting &&
                                          this.props.settings.setting.mode &&
                                          this.props.settings.setting.mode === "dark" ?
                                          require("assets/virtual_images/groupicon-black.jpg")
                                          : require("assets/virtual_images/groupicon.jpg")}></img>
                                      </Grid>
                                      <Grid className="allInfoRght">
                                        <Grid>
                                          <label>
                                            {data?.team_name}  {' -'} {"(Staff)"}
                                          </label>
                                        </Grid>
                                        <p>{data?.staff_id}</p>
                                      </Grid>
                                    </Grid></a>
                                    {/* {data?.staff.map((data1, index) => (
                                      <div className="showAllAssignedInner">
                                        <ol>
                                          <li>
                                            <Grid className="allInfo allInfo2 tasklistName tasklistName1">
                                              <Grid>
                                                <S3Image imgUrl={data1?.image} />
                                              </Grid>
                                              <Grid className="allInfoRght">
                                                <Grid>
                                                  <label>
                                                    {data1?.first_name} {data1?.last_name}
                                                  </label>
                                                </Grid>
                                                <p>{data1?.profile_id}</p>
                                              </Grid>
                                            </Grid>
                                          </li>  </ol>
                                      </div>
                                    ))} */}
                                  </> :
                                    <div className="showAllAssignedInner">
                                      <Grid className="allInfo allInfo2 tasklistName">
                                        <Grid>
                                          <S3Image imgUrl={data?.image} />
                                        </Grid>
                                        <Grid className="allInfoRght">
                                          <Grid>
                                            <label>
                                              {data?.first_name} {data?.last_name}
                                            </label>
                                          </Grid>
                                          <p>{data?.profile_id}</p>
                                        </Grid>
                                      </Grid>
                                    </div>

                                  } </>))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Modal>
            {viewImage?.length > 0 &&
              viewImage.map((data, index) => (
                <div className="setAssignedTo">
                  {data?.first_name ?
                    <span>
                      {data?.first_name} {data?.last_name} - ({data?.profile_id})
                    </span> :
                    <span>
                      {data?.team_name} {" "} {"(Staff)"}
                    </span>}
                  {data?.first_name ? <S3Image imgUrl={data.image} /> : <a onClick={() => this.props.showData(data, data?.team_name)} > <img src={this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark" ?
                    require("assets/virtual_images/groupicon-black.jpg")
                    : require("assets/virtual_images/groupicon.jpg")}></img></a>}
                </div>
              ))}
            {count > 0 && <a onClick={() => this.ViewPopup()}>+{count}</a>}
          </Grid>
        )
        }
        <ShowStaffData
          openStaff={this.state.openStaff}
          closeStaffInfo={() => this.closeStaffInfo()}
          AllStaffData={this.props.AllStaffData}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { settings } = state.Settings;
  return {
    settings,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, {
      Settings,
    })(Index)
  )
);

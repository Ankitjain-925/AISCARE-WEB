import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { LanguageFetchReducer } from 'Screens/actions';
import Button from '@material-ui/core/Button';
import { Settings } from 'Screens/Login/setting';
import { getLanguage } from 'translations/index';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import { getDate, getTime } from 'Screens/Components/BasicMethod/index';
import Assigned from 'Screens/Components/VirtualHospitalComponents/Assigned/index';
import SpecialityButton from 'Screens/Components/VirtualHospitalComponents/SpecialityButton';
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { LoginReducerAim } from "Screens/Login/actions";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Td } from 'react-super-responsive-table';
import moment from 'moment'
import AccessKeyLog from "../../../Doctor/AccessKeyLog/index"

class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }


  checkAuthority = (id, authority) => {
    if (id) {
      const { roles = [] } = this.props.stateLoginValueAim?.user?.houses?.find(e => e.value === id) || {};
      return roles.includes(authority);
    }
    return false;
  }

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  };

  checkdone = (item) => {
    let today = new Date().setHours(0, 0, 0, 0);
    let ttime = moment().format("HH:mm");
    let data_end = moment(item.end_time).format("HH:mm");
    let data_d = new Date(item.date).setHours(0, 0, 0, 0)

    if (item?.end_time && (moment(today).isAfter(data_d) || (moment(today).isSame(data_d) && data_end <= ttime))) {
      return true;
    }
    return false;
  }

  openAccessKey = () => {
    // return (<AccessKeyLog
    //   settings={this.props.settings}
    // />);
    this.props.history.push("/doctor/access-key");
  }
  componentDidMount = () => { };
  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Open,
      Done,
      see_details,
      Markasdone,
      EditTask,
      DeleteTask,
      assign_to_doctor,
      edit_picture_evaluation,
      decline_picture_evaluation,
      Declined,
      view_detail,
      decline,
      approved,
      Create_Certificate,
      Join_Meeting,
      Not_attended,
      Payment_pending,
      edit_assigned_services,
      delete_assigned_services
    } = translate;
    var data = this.state.data;
    let current_time = moment().format("HH:mm")
    const { House: { roles = [] } = {} } = this.props || {}
    return (
      <Grid className="allTabCntnt">
        <Grid container direction="row" alignItems="center">
          <Grid className="" item xs={12} sm={6} md={6}>
            <Grid container direction="row" alignItems="center">
              <Grid className="" item xs={12} sm={6} md={6}>
                <Grid className="revwFiles revwFiles1">
                  <>
                  </>
                  {data.status === 'done' ? (
                    <Grid>
                      <img
                        src={require('assets/virtual_images/rightTick.png')}
                        alt=""
                        title=""
                      />
                    </Grid>
                  ) : (
                    <Grid>
                      <img
                        src={require('assets/virtual_images/greyImg.png')}
                        alt=""
                        title=""
                      />
                    </Grid>
                  )}
                  <Grid className="revwFilesRght">
                    <Grid>
                      <SpecialityButton
                        label={data?.speciality?.specialty_name}
                        backgroundColor={data?.speciality?.background_color}
                        viewImage={false}
                        color={data?.speciality?.color}
                        showActive={false}
                      />
                    </Grid>
                    <Grid>
                      <label>{data.appointment_type ?
                        data.appointment_type === "homevisit_appointment" ? "Home visit" : "Office visit" :
                        data.task_name
                          ? data.task_name
                          : data?.title}</label>



                    </Grid>

                  </Grid>
                </Grid>
                <Grid className="allInfo tasklistName">
                  <Grid>
                    {data.appointment_type ?
                      <S3Image imgUrl={data?.patient?.image} /> : <S3Image imgUrl={data?.patient?.image} />}
                  </Grid>
                  {/* <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid> */}
                  <Grid className="allInfoRght">
                    {data.appointment_type ?
                      <>
                        <Grid>
                          <label>
                            {data?.patient_info?.first_name} {data?.patient_info?.last_name}
                          </label>
                        </Grid>
                        <p>{data?.patient_info?.patient_id}</p>
                      </>
                      :
                      <>
                        <Grid>
                          <label>
                            {data?.patient?.first_name} {data?.patient?.last_name}
                          </label>
                        </Grid>
                        <p>{data?.patient?.profile_id}</p>
                      </>}

                  </Grid>

                </Grid>
              </Grid>

              <Grid className="revwFiles addCssForTherapy" item xs={12} sm={4} md={4}>


                {data && data.therapy_name &&
                  <Grid>
                    <Grid>
                      <label>{data?.therapy_name}</label>
                    </Grid>
                    <Grid className="allInfo">
                      <p>Sequence {":"} {data?.sequence}</p>
                    </Grid>
                  </Grid>}
              </Grid>
            </Grid>
          </Grid>


          <Grid item xs={12} sm={6} md={6}>
            <Grid className="attchNoteMain">
              {data.appointment_type ?
                <>
                  <Grid className="attchNotePart">

                    <Grid
                      className={data.status === 'done' ? 'attchDone' : 'attchOpen'}
                    >
                      <Button>
                        <label></label>
                        {data?.status === 'done' || data?.status === 'Done' ? (
                          <>{Done}</>
                        ) : (
                          <>{Open}</>
                        )}
                      </Button>
                    </Grid>
                    <Grid>
                      <Grid className="allInfo allInfo1">
                        <Grid className="allInfoRght date-secTask">
                          <Grid>
                            <label>
                              {data?.date &&
                                getDate(data?.date, this.state.date_format)}
                            </label>
                          </Grid>
                          <p>
                            {data?.start_time} - {data?.end_time}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className="setAssignedToupper">
                    <Assigned assigned_to={data.assinged_to} />
                  </Grid>

                  {(!this.props.removeAddbutton) && <>

                    <Grid className="spcMgntRght7 presEditDot scndOptionIner">

                      <a className="openScndhrf">
                        <img
                          src={require('assets/images/three_dots_t.png')}
                          alt=""
                          title=""
                          className="openScnd specialuty-more"
                        />
                        <ul>
                          {data.status !== 'done' &&
                            <li>
                              <a
                                onClick={() => {
                                  this.props.DoneAppointment(data?._id);
                                }}
                              >
                                <img
                                  src={require('assets/virtual_images/pencil-1.svg')}
                                  alt=""
                                  title=""
                                />
                                Done appointment
                              </a>
                            </li>
                          }


                        </ul>
                      </a>

                      {data.task_type === 'sick_leave' && (
                        <Grid className="informStatus">
                          {/* <Td className="billDots">
                  <a className="academy_ul"> */}
                          {data && data.is_payment && data.is_payment === true && data.archived === true ? (
                            <Grid>
                              <InfoOutlinedIcon className="InfoOutLinees" />
                              <label className="assignHoses Paymentpending">
                                {
                                  Not_attended
                                }
                              </label>
                            </Grid>
                          ) : (
                            data.archived === true && (
                              <Grid>
                                <InfoOutlinedIcon className="InfoOutLinees" />
                                <label className="assignHoses appointmentTime">
                                  {Payment_pending}

                                </label>
                              </Grid>
                            )
                          )}
                        </Grid>)}
                    </Grid></>}
                </> : <>
                  <Grid className="attchNotePart">
                    {data.task_type !== 'sick_leave' && (
                      <Grid className="attchNoteUpr">
                        <Grid className="attchNote">
                          <img
                            src={require('assets/virtual_images/paragraph-normal.svg')}
                            alt=""
                            title=""
                          />
                          <label>{data?.comments?.length}</label>
                        </Grid>
                        <Grid className="attchNote attchImg">
                          <img
                            src={require('assets/virtual_images/attatchment.png')}
                            alt=""
                            title=""
                          />
                          <label>{data?.attachments?.length}</label>
                        </Grid>
                      </Grid>
                    )}

                    <Grid
                      // className={data.status === 'done' ? 'attchDone' : 'attchOpen'}
                      className={
                        data?.is_decline === true
                          ? 'attchDecline'
                          : data.status === 'done'
                            ? 'attchDone'
                            : 'attchOpen'
                      }
                    >
                      <Button>
                        <label></label>
                        {data?.is_decline === true ? (
                          <> {Declined}</>
                        ) : data?.status === 'open' || data?.status === 'Open' ? (
                          <>{Open}</>
                        ) : (
                          <>{Done}</>
                        )}

                      </Button>
                    </Grid>
                    <Grid>
                      <Grid className="allInfo allInfo1">
                        <Grid className="allInfoRght date-secTask">
                          <Grid>
                            <label>
                              {data?.due_on?.date &&
                                getDate(data?.due_on?.date, this.state.date_format)}
                            </label>
                          </Grid>
                          <p>
                            {data?.due_on?.time &&
                              getTime(
                                new Date(data?.due_on?.time),
                                this.state.time_foramt
                              )}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className="setAssignedToupper">
                    <Assigned assigned_to={data.assinged_to} />
                  </Grid>
                  {(!this.props.removeAddbutton) &&
                    <Grid className="spcMgntRght7 presEditDot scndOptionIner">
                      {!data?.is_decline &&
                        <a className="openScndhrf">
                          {this.props.comesFrom === 'adminstaff' ?
                            <>
                              {(roles.includes("edit_assignedservice") ||
                                roles.includes("edit_task") ||
                                roles.includes("delete_assigned_services")) ||
                                (roles.includes("delete_task")) ?
                                <img
                                  src={require('assets/images/three_dots_t.png')}
                                  alt=""
                                  title=""
                                  className="openScnd specialuty-more"
                                /> : null}
                            </>: <>          <img
                              src={require('assets/images/three_dots_t.png')}
                              alt=""
                              title=""
                              className="openScnd specialuty-more"
                            /></>}

                          <ul>
                            {data?.appointment_type && data.status !== 'done' &&
                              <li>
                                <a
                                  onClick={() => {
                                    this.props.DoneAppointment(data?._id);
                                  }}
                                >
                                  <img
                                    src={require('assets/virtual_images/pencil-1.svg')}
                                    alt=""
                                    title=""
                                  />
                                  Done appointment
                                </a>
                              </li>
                            }
                            {this.props.comesFrom === 'adminstaff' ? <>
                              {(roles.includes("edit_assignedservice") ||
                                roles.includes("edit_task")) ?
                                <li>
                                  <a
                                    onClick={() => {
                                      this.props.editTask(data);
                                    }}
                                  >
                                    <img
                                      src={require('assets/virtual_images/pencil-1.svg')}
                                      alt=""
                                      title=""
                                    />

                                    {data &&
                                      data.task_type &&
                                      data.task_type === 'picture_evaluation' &&
                                      this.props.comesFrom === 'Professional' ? (
                                      <>{edit_picture_evaluation}</>
                                    ) : data.task_type &&
                                      data.task_type === 'picture_evaluation' &&
                                      this.props.comesFrom === 'adminstaff' &&
                                      data.status === 'done' ? (
                                      <>{see_details}</>
                                    ) : data.task_type &&
                                      data.task_type === 'picture_evaluation' &&
                                      (this.props.comesFrom === 'adminstaff' ||
                                        this.props.comesFrom === 'detailTask') ? (
                                      <>{assign_to_doctor}</>
                                    ) : data.task_type &&
                                      (data.task_type === 'sick_leave' ||
                                        data.task_type === 'video_conference') &&
                                      this.props.comesFrom === 'Professional' ? (
                                      <>{view_detail}</>
                                    ) : (
                                      data.task_name ? <>{EditTask}</> : <>{edit_assigned_services}</>
                                    )}
                                  </a>
                                </li> : null}</> : <> <li>

                                      {/* {console.log('data', data)} */}
                                  {data.task_type &&
                                    data.task_type === 'picture_evaluation' &&
                                    this.props.comesFrom === 'adminstaff' &&
                                    data.status === 'done' ? (
                                    <a
                                      onClick={() => {
                                        this.props.editTask(data);
                                      }}
                                    >
                                      <img
                                        src={require('assets/virtual_images/pencil-1.svg')}
                                        alt=""
                                        title=""
                                      />{see_details}</a>
                                  ) 
                                  : data.task_type &&
                                    data.task_type === 'picture_evaluation' &&
                                    (this.props.comesFrom === 'adminstaff' ||
                                      this.props.comesFrom === 'detailTask') ? (
                                    <a
                                      onClick={() => {
                                        this.props.editTask(data);
                                      }}
                                    >
                                      <img
                                        src={require('assets/virtual_images/pencil-1.svg')}
                                        alt=""
                                        title=""
                                      />{assign_to_doctor}</a>
                                  ) : data.task_type &&
                                    (data.task_type === 'sick_leave' ||
                                      data.task_type === 'video_conference' || data.task_type === 'picture_evaluation') && (
                                      this.props.comesFrom === 'Professional' && this.checkAuthority(data.house_id, "edit_professional_activity")) ? (
                                    <a
                                      onClick={() => {
                                        this.props.editTask(data);
                                      }}
                                    >
                                      <img
                                        src={require('assets/virtual_images/pencil-1.svg')}
                                        alt=""
                                        title=""
                                      />{view_detail}</a>
                                  ) : (
                                    this.checkAuthority(data.house_id, "edit_professional_activity") && 
                                   <> {data.task_name ? 
                                        <a
                                          onClick={() => {
                                            this.props.editTask(data);
                                          }}
                                        >
                                          <img
                                            src={require('assets/virtual_images/pencil-1.svg')}
                                            alt=""
                                            title=""
                                          />
                                          {EditTask}
                                        </a>
                                     :
                                      <a
                                        onClick={() => {
                                          this.props.editTask(data);
                                        }}
                                      >
                                        <img
                                          src={require('assets/virtual_images/pencil-1.svg')}
                                          alt=""
                                          title=""
                                        />
                                        {edit_assigned_services}
                                      </a>}
                                      </>

                                  )}
                                </li></>}
                            {this.props.comesFrom === 'adminstaff' && data?.task_name && data?.task_type !=='picture_evaluation' ?
                              <>
                                {roles.includes("delete_task") ?
                                  <li>
                                    <a
                                      onClick={() => {
                                        this.props.removeTask(data._id);
                                      }}
                                    >
                                      <img
                                        src={require('assets/virtual_images/deleteNew.png')}
                                        alt=""
                                        title=""
                                      />


                                      {data &&
                                        data.task_type &&
                                        data.task_type === 'picture_evaluation' &&
                                        this.props.comesFrom === 'Professional' ? (
                                        <>{edit_picture_evaluation}</>
                                      ) : data.task_type &&
                                        data.task_type === 'picture_evaluation' &&
                                        this.props.comesFrom === 'adminstaff' &&
                                        data.status === 'done' ? (
                                        <>{see_details}</>
                                      ) : 
                                      // data.task_type &&
                                      //   data.task_type === 'picture_evaluation' &&
                                      //   (this.props.comesFrom === 'adminstaff' ||
                                      //     this.props.comesFrom === 'detailTask') ? (
                                      //   <>{assign_to_doctor}</>
                                      // ) 
                                      // : 
                                      data.task_type &&
                                        data.task_type === 'sick_leave' &&
                                        this.props.comesFrom === 'Professional' ? (
                                        <>{view_detail}</>
                                      ) : (
                                        data.task_name && data?.task_type !=='picture_evaluation' && 
                                        <>{DeleteTask}</> 
                                        // : <>{edit_assigned_services}</>
                                      )}
                                    </a>
                                  </li>
                                  : null}
                              </> :
                              <>  <li>
                                  
                                    {this.props.comesFrom === 'Professional' ?
                                      data.task_type == 'video_conference' || data.task_type == 'picture_evaluation' || data.task_type == 'sick_leave' ?
                                        " " :

                                        this.checkAuthority(data.house_id, "delete_professional_activity") && <a
                                          onClick={() => {
                                            this.props.removeTask(data._id, data.house_id);
                                          }}
                                        >
                                          <img
                                            src={require('assets/virtual_images/deleteNew.png')}
                                            alt=""
                                            title=""
                                          />
                                          {data.task_name
                                            ? DeleteTask : delete_assigned_services}
                                        </a>

                                      : " "}
                                
                              </li></>}
                            {data &&
                              data.task_type &&
                              data.task_type === 'sick_leave' &&
                              !data.approved === true &&
                              this.props.comesFrom === 'Professional' ? (
                              <li
                                onClick={() => {
                                  this.props.handleApprovedDetails(
                                    data._id,
                                    'approved',
                                    data
                                  );
                                }}
                              >
                                <a>
                                  <img
                                    src={require('assets/virtual_images/pencil-1.svg')}
                                    alt=""
                                    title=""
                                  />
                                  <>{approved}</>
                                </a>
                              </li>
                            ) : (
                              <></>
                            )}

                            {data &&
                              data.task_type &&
                              data.task_type === 'picture_evaluation'
                              ? this.props.comesFrom !== 'Professional' &&
                              data?.assinged_to?.length == 0 && (
                                <li
                                  onClick={() => {
                                    this.props.declineTask(
                                      data._id,
                                      data.patient_id
                                    );
                                  }}
                                >
                                  <a>
                                    <img
                                      src={require('assets/images/cancel-request.svg')}
                                      alt=""
                                      title=""
                                    />
                                    <>{decline_picture_evaluation}</>
                                  </a>
                                </li>
                              )
                              : data &&
                              data.task_type &&
                              data.task_type === 'sick_leave' &&
                              this.props.comesFrom === 'Professional' &&
                              !data.is_decline &&
                              !data.certificate?.most_likely &&
                              !data.approved === true && (
                                <li
                                  onClick={() => {
                                    this.props.handleApprovedDetails(
                                      data._id,
                                      'decline',
                                      data
                                    );
                                  }}
                                >
                                  <a>
                                    <img
                                      src={require('assets/images/cancel-request.svg')}
                                      alt=""
                                      title=""
                                    />
                                    <>{decline}</>
                                  </a>
                                </li>
                              )}
                            {data &&
                              data.task_type &&
                              data.task_type === 'sick_leave' &&
                              data.meetingjoined &&
                              !data.certificate?.most_likely && (
                                <li
                                  onClick={() => {
                                    this.props.cretficate(data._id, data.patient_id);
                                  }}
                                >
                                  <a>
                                    <img
                                      src={require('assets/virtual_images/menudocs.jpg')}
                                      alt=""
                                      title=""
                                    />
                                    <>{Create_Certificate}</>
                                  </a>
                                </li>
                              )}
                            {data &&
                              data.task_type &&
                              (data.task_type === 'sick_leave') &&
                              !data.meetingjoined &&
                              data.link?.doctor_link && (
                                <li
                                  onClick={() => {
                                    // this.props.cretficate()
                                  }}
                                >
                                  <a>
                                    <img
                                      src={require('assets/images/details.svg')}
                                      alt=""
                                      title=""
                                    />
                                    <a
                                      className="joinmeetingtab"
                                      href={data.link?.doctor_link}
                                      target="_blank"
                                    >
                                      {Join_Meeting}
                                    </a>
                                  </a>
                                </li>
                              )}

                            {data &&
                              data.task_type &&
                              (data.task_type === 'video_conference') && (
                                <>
                                  <li
                                    onClick={() => this.openAccessKey()}
                                  >
                                    <a>
                                      <img
                                        src={require('assets/images/details.svg')}
                                        alt=""
                                        title=""
                                      />
                                      <a
                                        className="joinmeetingtab"
                                      // href={data.link?.doctor_link}
                                      // target="_blank"
                                      >
                                        {Join_Meeting}
                                      </a>
                                    </a>
                                  </li>
                                  {(data.status !== "done" && data.meetingjoined === true) &&
                                    <li
                                      onClick={() => this.props.switchStatus()}
                                    >
                                      <a>
                                        <img
                                          src={require('assets/images/details.svg')}
                                          alt=""
                                          title=""
                                        />
                                        <a
                                          className="joinmeetingtab"
                                        // href={data.link?.doctor_link}
                                        // target="_blank"
                                        >
                                          {Markasdone}
                                        </a>
                                      </a>
                                    </li>}
                                </>
                              )}

                            {data.title && this.props.comesFrom !== 'Professional' && this.props.comesFrom === 'adminstaff' && roles.includes("delete_assigned_services") && (
                              <li
                                onClick={() => {
                                  this.props.removeTask(
                                    data._id, data.house_id);
                                }}
                              >

                                <a>
                                  <img
                                    src={require('assets/virtual_images/bin.svg')}
                                    alt=""
                                    title=""
                                  />
                                  <>{delete_assigned_services}</>
                                </a>
                              </li>
                            )}
                          </ul>
                        </a>
                      }

                      {data.task_type === 'sick_leave' && (
                        <Grid className="informStatus">
                          {/* <Td className="billDots">
                  <a className="academy_ul"> */}
                          {data && data.is_payment && data.is_payment === true && data.archived === true ? (
                            <Grid>
                              <InfoOutlinedIcon className="InfoOutLinees" />
                              <label className="assignHoses Paymentpending">
                                {
                                  Not_attended
                                }
                              </label>
                            </Grid>
                          ) : (
                            data.archived === true && (
                              <Grid>
                                <InfoOutlinedIcon className="InfoOutLinees" />
                                <label className="assignHoses appointmentTime">
                                  {Payment_pending}

                                </label>
                              </Grid>
                            )
                          )}
                          {/* </a>
                </Td> */}
                        </Grid>)}
                    </Grid>
                  }
                </>}
            </Grid>
          </Grid>
        </Grid>
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    House,
    settings,
    verifyCode,
  };
};


export default pure(
  withRouter(
    connect(mapStateToProps, {
      LanguageFetchReducer, Settings, LoginReducerAim, authy,
      houseSelect,
    })(PointPain)
  )
);

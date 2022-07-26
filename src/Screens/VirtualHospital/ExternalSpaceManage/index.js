import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/VirtualHospitalMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/VirtualHospitalMenu/mobile';
import Loader from 'Screens/Components/Loader/index';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { authy } from 'Screens/Login/authy.js';
import { connect } from 'react-redux';
import { LanguageFetchReducer } from 'Screens/actions';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { houseSelect } from '../Institutes/selecthouseaction';
import { Speciality } from 'Screens/Login/speciality.js';
import SpecialityButton from 'Screens/Components/VirtualHospitalComponents/SpecialityButton';
import { getLanguage } from 'translations/index';
import {
    handleOpenWarn,

    onEditspec,
    MoveInstitute,
    searchFilter,
    handleOpenRoom,
    selectedID,
    bednumbers,
    deleteClick,
    getSpeciality,
    SaveSpeciality,
} from '../../VirtualHospital/SpaceManagement/api'
import { S3Image } from 'Screens/Components/GetS3Images/index';
import CasesMoreButton from 'Screens/Components/VirtualHospitalComponents/CasesMoreButton/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderImage: false,
        };
    }

    componentDidMount() {
        this.setState({ action: 'loading' });
        getSpeciality(this);
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            external_space_management,
            Search,
            Institution,
        } = translate;
        const { stateLoginValueAim, House } = this.props;
        if (
            stateLoginValueAim.user === 'undefined' ||
            stateLoginValueAim.token === 450 ||
            stateLoginValueAim.token === 'undefined' ||
            stateLoginValueAim.user.type !== 'adminstaff' ||
            !this.props.verifyCode ||
            !this.props.verifyCode.code
        ) {
            return <Redirect to={'/'} />;
        }
        if (House && House?.value === null) {
            return <Redirect to={'/VirtualHospital/institutes'} />;
        }

        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === 'dark'
                        ? 'homeBg darkTheme'
                        : 'homeBg'
                }
            >
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="externalspace" />
                            <Grid container direction="row">
                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="externalspace" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        {/* <Grid className="extSetting">
                                            <a onClick={() => MoveInstitute(this)}>
                                                <img
                                                    src={require('assets/virtual_images/rightArrow.png')}
                                                    alt=""
                                                    title=""
                                                />
                                                {BacktoChangeHospital}
                                            </a>
                                        </Grid> */}
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Grid className="spcMgntH1">
                                                    <h1>{external_space_management}</h1>
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item xs={12} sm={6} md={6} className="addFlowRght">
                                                <a onClick={this.handleOpenSpecl}>{addNewSpeciality}</a>
                                            </Grid> */}
                                        </Grid>
                                        {/* Start of Bread Crumb */}
                                        <Grid className="breadCrumbUpr">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={9}>
                                                    <Grid className="roomBreadCrumb3">
                                                        <ul>
                                                            <li>
                                                                <a>
                                                                    <span>{Institution}</span>
                                                                    <label>{this.props?.House?.label}</label>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <label>{external_space_management}</label>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="settingInfo">
                                                        {this.state.showinput && (
                                                            <input
                                                                name="Search"
                                                                placeholder={Search}
                                                                value={this.state.SearchValue}
                                                                className="serchInput"
                                                                onChange={(e) => searchFilter(e, this)}
                                                            />
                                                        )}
                                                        <a>
                                                            {!this.state.showinput ? (
                                                                <img
                                                                    src={require('assets/virtual_images/search-entries.svg')}
                                                                    alt=""
                                                                    title=""
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            showinput: !this.state.showinput,
                                                                        });
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
                                                                            SearchValue: '',
                                                                            specialityData:
                                                                                this.state.specialityData2,
                                                                        });
                                                                    }}
                                                                />
                                                            )}
                                                        </a>
                                                        {/* <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a> */}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* End of Bread Crumb */}
                                        <Grid className="wardsGrupUpr wardsGrupUpr1">
                                            <Grid container direction="row" spacing={2}>
                                                {this.state.specialityData?.length > 0 &&
                                                    this.state.specialityData.map((data) => (
                                                        <Grid item xs={12} md={4}>
                                                            <Grid className="wardsGrup3">
                                                                <Grid className="flowInfoInr">
                                                                    <SpecialityButton
                                                                        // viewImage={true}
                                                                        deleteClick={() =>
                                                                            handleOpenWarn(data._id, this)
                                                                        }
                                                                        label={data.specialty_name}
                                                                        backgroundColor={data.background_color}
                                                                        color={data.color}
                                                                        onClick={() => {
                                                                            onEditspec(data, this);
                                                                        }}
                                                                        stateLanguageType={
                                                                            this.props.stateLanguageType
                                                                        }
                                                                    />

                                                                    <Grid className="flowProfil">
                                                                        <Grid>
                                                                            <Grid className="tasklistName">
                                                                                <S3Image imgUrl={this.props.quote?.patient?.image} />
                                                                            </Grid>

                                                                        </Grid>
                                                                        <Grid
                                                                            className="flowProfilRght"
                                                                        // onClick={() => {
                                                                        //     quote?.verifiedbyPatient &&
                                                                        //         this.props.moveDetial(
                                                                        //             this.props.quote.patient_id,
                                                                        //             this.props.quote._id
                                                                        //         );
                                                                        // }}
                                                                        >
                                                                            <label>
                                                                                Rupali gupta
                                                                            </label>
                                                                            <p>alies_id</p>
                                                                        </Grid>
                                                                        <Grid className="checkDotsRght">
                                                                            <CasesMoreButton
                                                                            // setDta={(item) => this.props.setDta(item)}
                                                                            // currentStep={quote?.author?.step_name}
                                                                            // currentIndex={checkTheIndex(
                                                                            //     this.props.columns[quote?.author?.step_name],
                                                                            //     'patient_id',
                                                                            //     quote.patient_id
                                                                            // )}
                                                                            // columns={this.props.columns}
                                                                            // quote={quote}
                                                                            // onDragEnd={(data) => onDragEnd(data)}
                                                                            // ordered={this.props.ordered}
                                                                            // professional_id_list={this.props.professional_id_list}
                                                                            // updateEntryState3={(e, case_id) => {
                                                                            //     this.props.updateEntryState3(e, case_id);
                                                                            // }}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="flowInfoInr2">
                                                                    <Grid className="dtlCntUpr">
                                                                        <Grid className="dtlCntLft">
                                                                            <Grid className="dtlCount dtlCountRm dtlCountRm1">
                                                                                Patient Address
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className="dtlCntUpr dtlCntUprNw">
                                                                        <Grid className="dtlCntLft">
                                                                            <Grid className="dtlCount">
                                                                                <a className="taskHover">
                                                                                    <span>Tasks</span>
                                                                                    <img
                                                                                        src={require('assets/virtual_images/rightIcon.png')}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    0/0
                                                                                </a>
                                                                                <a
                                                                                    className="addSec taskHover"
                                                                                // onClick={() => {
                                                                                //     quote?.verifiedbyPatient &&
                                                                                //         this.props.MovetoTask(
                                                                                //             quote.speciality,
                                                                                //             quote?.patient_id
                                                                                //         );
                                                                                // }}
                                                                                >
                                                                                    <span>AddTask</span>
                                                                                    <img
                                                                                        src={require('assets/virtual_images/plusIcon.png')}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                </a>
                                                                                <a className="taskHover">
                                                                                    <span>Comments</span>
                                                                                    <img
                                                                                        src={require('assets/virtual_images/note1.png')}
                                                                                        alt=""
                                                                                        title=""
                                                                                    />
                                                                                    0
                                                                                </a>
                                                                            </Grid>
                                                                        </Grid>
                                                                        {/* <Grid className="dtlCntRght">
                                                                        <Assigned assigned_to=uote.assinged_to />
                                                                    </Grid> */}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Right Section */}
                            </Grid>
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


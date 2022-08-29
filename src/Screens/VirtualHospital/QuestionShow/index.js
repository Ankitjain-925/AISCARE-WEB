import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Loader from "Screens/Components/Loader/index";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../Institutes/selecthouseaction";
import { Speciality } from "Screens/Login/speciality.js";
import { getLanguage } from "translations/index";
import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Pagination from 'Screens/Components/Pagination/index';
import { getDate } from 'Screens/Components/BasicMethod/index';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import ReactToPrint, { PrintContext } from 'react-to-print';
import ShowPrevQues from '../../Components/ShowPrevQues/index'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderImage: false,
            Allquestion: {},
            carequestions_data: {},
            openModal: false

        };
    }

    componentDidMount() {
        this.showquestionApi();

    }


    openFullQues = (data) => {
        console.log('1')
        this.setState({ openModal: true, ModalData: data });
    }
    closeFullQues = () => {
        this.setState({ openModal: false });
    }

    showquestionApi = (value) => {
        this.setState({ loaderImage: true })
        var house_id = this.props?.House?.value;
        axios
            .get(
                sitedata.data.path + '/cquestionnaire/GetCareQuestionaire/' + house_id,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                console.log('response', response)
                if (response?.data?.hassuccessed) {
                    var totalPage = Math.ceil(response.data.data.length / 10);
                    this.setState({
                        loaderImage: false, carequestions_data: response.data.data,
                        totalPage: totalPage,
                        value: value,
                        currentPage: 1,
                    });
                }
                this.setState({ loaderImage: false })
                if (totalPage > 1) {
                    var pages = [];
                    for (var i = 1; i <= this.state.totalPage; i++) {
                        pages.push(i);
                    }
                    this.setState({
                        carequestions_data: this.state.Allquestion.slice(0, 10),
                        pages: pages,
                    });
                } else {
                    this.setState({ carequestions_data: this.state.Allquestion });
                }

            }).catch((err) => {
                this.setState({ loaderImage: false })
            })
    }
    // For page change
    onChangePage = (pageNumber) => {
        this.setState({
            carequestions_data: this.state.Allquestion.slice(
                (pageNumber - 1) * 10,
                pageNumber * 10
            ),
            currentPage: pageNumber,
        });
    };


    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            Patient,
            Doctor_Nurse,
            Questionnaire,
            date,
            not_mentioned,
            Care_Questionnary_Submit,
            see_details



        } = translate;
        const { stateLoginValueAim, House } = this.props;
        const { externalData } = this.state;
        if (
            stateLoginValueAim.user === "undefined" ||
            stateLoginValueAim.token === 450 ||
            stateLoginValueAim.token === "undefined" ||
            stateLoginValueAim.user.type !== "adminstaff" ||
            !this.props.verifyCode ||
            !this.props.verifyCode.code
        ) {
            return <Redirect to={"/"} />;
        }
        if (House && House?.value === null) {
            return <Redirect to={"/VirtualHospital/institutes"} />;
        }

        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "homeBg darkTheme"
                        : "homeBg"
                }
            >
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="showquestion" />
                            <Grid container direction="row">
                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="showquestion" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Grid className="spcMgntH1 setMarginBottom">
                                                    <h1>{Care_Questionnary_Submit}</h1>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <Grid className="billInfoData">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>{Questionnaire}</Th>
                                                        <Th>{Patient}</Th>
                                                        <Th>{Doctor_Nurse}</Th>
                                                        <Th>{date}</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                </Thead>
                                                {this.state.carequestions_data.length > 0 &&
                                                    this.state.carequestions_data.map((data, index) => (
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>{data.questionnaire_type === "daily" ?
                                                                            "Daily" : data.questionnaire_type === "two_days" ?
                                                                                "Two Days" : data.questionnaire_type === "two_weeks" ?
                                                                                    "Two weeks" : data.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}</Td>
                                                                <Td className="patentPic">
                                                                  <S3Image imgUrl={data?.patient_info?.image} />
                                                                    {data?.patient_info?.first_name}{' '}
                                                                    {data?.patient_info?.last_name}
                                                                </Td>
                                                                <Td className="patentPic">

                                                                    <S3Image imgUrl={data?.nurse_info?.image} />
                                                                    {data?.nurse_info?.first_name}{' '}
                                                                    {data?.nurse_info?.last_name}
                                                                </Td>
                                                                <Td>
                                                                    {data.submitDate
                                                                        ? getDate(
                                                                            data.submitDate,
                                                                            this.props.settings.setting.date_format
                                                                        )
                                                                        : not_mentioned}
                                                                </Td>
                                                                <Td className="presEditDot scndOptionIner openJourMenu">
                                                                    <a>
                                                                        <img
                                                                            src={require("assets/images/three_dots_t.png")}
                                                                            alt=""
                                                                            title=""
                                                                            className="openScnd"
                                                                        />
                                                                        <ul>

                                                                            <li
                                                                                onClick={(e) =>
                                                                                    this.openFullQues(data)
                                                                                }
                                                                            >
                                                                                <img
                                                                                    src={require("assets/images/details.svg")}
                                                                                    alt=""
                                                                                    title=""
                                                                                />
                                                                                {see_details}
                                                                            </li>

                                                                        </ul>
                                                                    </a>
                                                                </Td>

                                                            </Tr>
                                                        </Tbody>
                                                    ))}
                                            </Table>
                                            <ShowPrevQues
                                                closeFullQues={() => this.closeFullQues()}
                                                openModal={this.state.openModal}
                                                item={this.state.ModalData}
                                            />
                                            <Grid className="tablePagNum">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <Grid className="totalOutOff">
                                                            <a>
                                                                {this.state.currentPage} of{' '}
                                                                {this.state.totalPage}
                                                            </a>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {this.state.totalPage > 1 && (
                                                            <Grid className="prevNxtpag">
                                                                <Pagination
                                                                    totalPage={this.state.totalPage}
                                                                    currentPage={this.state.currentPage}
                                                                    pages={this.state.pages}
                                                                    onChangePage={(page) => {
                                                                        this.onChangePage(page);
                                                                    }}
                                                                />
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </Grid>
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

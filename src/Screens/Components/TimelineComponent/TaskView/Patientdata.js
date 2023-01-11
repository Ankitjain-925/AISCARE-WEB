import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { pure } from "recompose";
import { Settings } from 'Screens/Login/setting';
import Modal from '@material-ui/core/Modal';
import { getDate, newdate, getTime, getImage, } from "../../BasicMethod/index";
import { S3Image } from "Screens/Components/GetS3Images/index";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item || {},
            openModal: this.props.openModal,
            settings: this.props.settings,
            comesFrom: this.props.comesFrom
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.comesFrom !== this.props.comesFrom) {
            this.setState({ comesFrom: this.props.comesFrom });
        }
        if (prevProps.item !== this.props.item) {
            this.setState({ item: this.props.item });
        }
        if (prevProps.openModal !== this.props.openModal) {
            this.setState({ openModal: this.props.openModal });
        }
        if (prevProps.settings !== this.props.settings) {
            this.setState({ settings: this.props.settings });
        }
    };


    closeFullQues = () => {
        this.props.closeFullQues();
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            Details,
            assignedservicename,
            therapy_name,
            Sequence,
            Assignedto,
            task_Description,
            taskname
        } = translate;
        var item = this.state.item;
        return (
            <Grid>

                <Modal
                    open={this.state.openModal}
                    onClose={() => this.closeFullQues()}
                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === 'dark'
                            ? 'darkTheme addSpeclModel'
                            : 'addSpeclModel'
                    }
                >
                    <Grid
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "darkTheme addSpeclContnt"
                                : "addServContnt"
                        }
                    >
                        <Grid className="addSpeclContntIner addSpeclabcIner">
                            <Grid className="addSpeclLbl">
                                <Grid container direction="row" justify="center">
                                    <Grid item xs={8} md={8} lg={8}>
                                        <label>{Details}</label>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <Grid>
                                            <Grid className="entryCloseBtn">
                                                <a onClick={() => this.closeFullQues()}>
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
                            <Grid className="enterServMain">
                                <Grid className="enterSpcl">
                                    <Grid className="allEnterSpclPart">
                                        <Grid>
                                            <label className="specbutton1">{taskname}</label>
                                            <div className="addCssTherNamDes">
                                                {item?.task_name}
                                            </div>
                                        </Grid>
                                        {item && item.therapy_id && (
                                            <Grid>
                                                <Grid>
                                                    <label className="specbutton1">{therapy_name}</label>
                                                    <div className="addCssTherNamDes">
                                                        {item.therapy_name}
                                                    </div>
                                                </Grid>
                                                <Grid >
                                                    <label className="specbutton1">{Sequence}</label>
                                                    <div className="addCssTherNamDes">
                                                        {item.sequence}
                                                    </div>
                                                </Grid>
                                            </Grid>)}
                                            {item && item.task_description&&(
                                            <Grid >
                                                    <label className="specbutton1">{task_Description}</label>
                                                    <div className="addCssTherNamDes">
                                                        {item.task_description}
                                                    </div>
                                                </Grid>)}
                                        <Grid className="AddMarginTo">
                                            <Grid className="allEnterSpclPart">
                                                <label className="specbutton1">{Assignedto}</label>
                                            </Grid>
                                            {item?.assinged_to &&
                                                item?.assinged_to?.length > 0 &&
                                                item?.assinged_to.map((data) => (
                                                    <>
                                                        {data?.first_name ? (
                                                            // <div className="presImg11">
                                                            //     {data && data?.image && <S3Image imgUrl={data?.image} />}
                                                            //     {data?.first_name} {' '} {data?.last_name}</div>

                                                            <div className="">
                                                                <Grid className="allInfo allInfo2 tasklistName tasklistName1">
                                                                    <Grid>
                                                                        {data && data?.image && (
                                                                            <S3Image imgUrl={data?.image} />
                                                                        )}
                                                                    </Grid>
                                                                    <Grid className="allInfoRght2">
                                                                        <Grid >
                                                                            <label className="margindatright">
                                                                                {data?.first_name} {data?.last_name} {"(Doctor)"}
                                                                            </label>
                                                                        </Grid>
                                                                        <p className="margindatright">{data?.profile_id}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {" "}
                                                                <div className="">
                                                                    <Grid className="allInfo allInfo2 tasklistName tasklistName1">
                                                                        <Grid>
                                                                            <img
                                                                                src={
                                                                                    this.props.settings &&
                                                                                        this.props.settings.setting &&
                                                                                        this.props.settings.setting.mode &&
                                                                                        this.props.settings.setting.mode === "dark"
                                                                                        ? require("assets/virtual_images/groupicon-black.jpg")
                                                                                        : require("assets/virtual_images/groupicon-black.jpg")
                                                                                }
                                                                            ></img>
                                                                        </Grid>
                                                                        <Grid className="allInfoRght2">
                                                                            <Grid>
                                                                                <label>
                                                                                    {data?.team_name} {"(Staff)"}
                                                                                </label>
                                                                            </Grid>
                                                                            <p>{data?.staff_id}</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ))}
                                        </Grid>
                                        <Grid className='spcaetime'>
                                        <Grid className="detailCntnt">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6} lg={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5} >
                                                                <label>Due on :</label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>
                                                                {item && item?.due_on && item?.due_on?.date &&
                                                                    <span>
                                                                        {getDate(item?.due_on?.date, this.state.date_format)}
                                                                    </span>
                                                                }
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={6} className="bloodPreBy">
                                                        <Grid container direction="row">
                                                            <Grid item xs={5} md={5} >
                                                                <label>Due on (time) :</label>
                                                            </Grid>
                                                            <Grid item xs={7} md={7}>
                                                                {item && item?.due_on && item?.due_on?.time &&
                                                                    <span>
                                                                        {getTime(new Date(item?.due_on?.time), this.state.time_foramt)}
                                                                    </span>
                                                                }
                                                            </Grid>
                                                            <Grid className="clear"></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>

                                            </Grid>
                                            </Grid>
                                        
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                </Modal>
            </Grid>
        )
    }


}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    return {
        stateLanguageType,
        settings
    };
};
export default pure(withRouter(
    connect(mapStateToProps, { Settings, LanguageFetchReducer })(Index)
));


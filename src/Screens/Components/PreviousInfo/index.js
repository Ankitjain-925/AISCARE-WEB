import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { pure } from "recompose";
import { Settings } from 'Screens/Login/setting';
import { getDate } from 'Screens/Components/BasicMethod';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import ShowPrevQues from '../ShowPrevQues/index'
import {
    closeFullQues,
    openFullQues
} from "../../../Screens/Nurse/CareQuestionary/api"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item || {},
            openQues: this.props.openQues,
            settings: this.props.settings,
            comesFrom: this.props.comesFrom,
            prevData: this.props.prevData
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.prevData !== this.props.prevData) {
            this.setState({ prevData: this.props.prevData });
        }
        if (prevProps.item !== this.props.item) {
            this.setState({ item: this.props.item });
        }
        if (prevProps.openQues !== this.props.openQues) {
            this.setState({ openQues: this.props.openQues });
        }
        if (prevProps.settings !== this.props.settings) {
            this.setState({ settings: this.props.settings });
        }
    };

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            full_information,
            Last_Filled_Information,
            date,
            type,
            Checked_by,
            Patient,
            hospital
        } = translate;
        var item = this.state.item;
        const { openQues } = this.state;
        return (
            <Grid>
                {openQues &&
                    <Grid className="allFormSection allFormSection1">
                        <h2>{Last_Filled_Information}</h2>
                        {console.log("this.state.prevData", this.state.prevData)}
                        {this.state.prevData &&
                            this.state.prevData.length > 0 &&
                            this.state.prevData.map((item) => (
                                < Grid className="nurseImagrProf" >
                                    <Grid className="nurseImagrProf1">
                                        <Grid><label>{date}: </label>
                                            <p>{getDate(
                                                item?.submitDate,
                                                this.props.settings.setting &&
                                                this.props.settings.setting.date_format
                                            )}</p>
                                        </Grid>
                                        <Grid>
                                            <label>{type}:  </label>
                                            <p>{item?.questionnaire_type === "daily" ?
                                                "Daily" : item?.questionnaire_type === "two_days" ?
                                                    "Two Days" : item?.questionnaire_type === "two_weeks" ?
                                                        "Two weeks" : item?.questionnaire_type === "quarter" ? "Quarter" : "Full Questionnaire"}</p>

                                        </Grid>
                                        <Grid>
                                            <label>{Checked_by}: </label>
                                            <div className="showAllAssignedInner">
                                                <Grid className="allInfo allInfo2 tasklistName">
                                                    <Grid>
                                                        <S3Image imgUrl={item?.nurse_info?.image} />
                                                    </Grid>
                                                    <Grid className="allInfoRght">
                                                        <Grid>
                                                            <label>
                                                                {item?.nurse_info?.first_name} {item?.nurse_info?.last_name}
                                                            </label>
                                                        </Grid>
                                                        <p>{item?.nurse_info?.alies_id}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        <Grid>
                                            <label>{Patient}: </label>
                                            <div className="showAllAssignedInner">
                                                <Grid className="allInfo allInfo2 tasklistName">
                                                    <Grid>
                                                        <S3Image imgUrl={item?.patient_info?.image} />
                                                    </Grid>
                                                    <Grid className="allInfoRght">
                                                        <Grid>
                                                            <label>
                                                                {item?.patient_info?.first_name} {item?.patient_info?.last_name}
                                                            </label>
                                                        </Grid>
                                                        <p>{item?.patient_info?.profile_id}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>

                                        </Grid>
                                        <Grid>
                                            <label>{hospital}:</label>
                                            <p> {this.props.showHouseValue(item?.house_id)}</p>
                                        </Grid>
                                        <Grid className="bp_graph FullInfoSet">

                                            <Grid>
                                                <a onClick={() => openFullQues(this, item)}>
                                                    {full_information}
                                                </a>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            ))}
                        <ShowPrevQues
                            closeFullQues={() => closeFullQues(this)}
                            openModal={this.state.openModal}
                            item={this.state.ModalData}
                        />
                    </Grid>}
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
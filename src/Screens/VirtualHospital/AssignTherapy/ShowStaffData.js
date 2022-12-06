import React from "react";
import Grid from "@material-ui/core/Grid";
import { S3Image } from 'Screens/Components/GetS3Images/index';
import Modal from "@material-ui/core/Modal";
import useAllSetting from '../../Doctor/AccessKeyLog/Hooks/Setting'
import { getLanguage } from 'translations/index';

const AssignPatient = (props) => {
    const settings = useAllSetting();

    let translate = getLanguage(props.stateLanguageType);
    let {
        staff_members
    } = translate;

    // +++++++++++++++
    // +  View       +
    // +   Staff     +
    // +     Listing +
    // +++++++++++++++
    return (
        <div>

            <Modal
                open={props.openStaff}
                onClose={() => props.closeStaffInfo()}
                className={
                    settings.setting &&
                        settings.setting.mode &&
                        settings.setting.mode === "dark"
                        ? "darkTheme addSpeclModel"
                        : "addSpeclModel"
                }
            >
                <Grid
                    className={
                        settings &&
                            settings.setting &&
                            settings.setting.mode &&
                            settings.setting.mode === "dark"
                            ? "darkTheme addSpeclContnt"
                            : "addServContnt"
                    }
                >
                    <Grid className="addSpeclContntIner addSpeclabcIner">
                        <Grid className="addSpeclLbl">
                            <Grid
                                container
                                direction="row"
                                justify="center"
                            >
                                <Grid item xs={8} md={8} lg={8}>
                                    <label>{props?.AllStaffData?.team_name} {' '} {"(Staff)"}</label>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Grid>
                                        <Grid className="entryCloseBtn">
                                            <a
                                                onClick={() =>
                                                    props.closeStaffInfo()
                                                }
                                            >
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
                            <Grid className="enterSpcl enterSpclSec">
                                <Grid className="AddMarginTo">
                                    {/* <label className="specbutton1">
                                        {staff_members}
                                    </label> */}
                                    {props?.AllStaffData &&
                                        props?.AllStaffData?.staff &&
                                        props?.AllStaffData?.staff?.length > 0 &&
                                        props?.AllStaffData?.staff.map((data) => (<>


                                            <div className="showAllAssignedInner">
                                                <Grid className="allInfo allInfo2 tasklistName tasklistName1">
                                                    <Grid>
                                                        {data && data?.image && <S3Image imgUrl={data?.image} />}
                                                    </Grid>
                                                    <Grid className="allInfoRght">
                                                        <Grid>
                                                            <label>
                                                                {data?.first_name} {' '} {data?.last_name}
                                                            </label>
                                                        </Grid>
                                                        <p>{data?.profile_id}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>

        </div >)
}

export default AssignPatient;
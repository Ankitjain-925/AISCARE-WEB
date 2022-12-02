import React from "react";
import Grid from "@material-ui/core/Grid";
import { S3Image } from 'Screens/Components/GetS3Images/index';
import Modal from "@material-ui/core/Modal";
import useAllSetting from '../../Doctor/AccessKeyLog/Hooks/Setting'

const ViewTherapy = (props) => {
    const settings = useAllSetting();

    //For closing of Modal
    const closeFullQues = () => {
        props.closeFullQues();
    }

    // +++++++++++++++
    // +  View       +
    // +   Therapy   +
    // +     Modal   +
    // +++++++++++++++
    return (
        <div>
            <Modal
                open={props?.viewTher}
                onClose={() => closeFullQues()}
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
                                    <label>View Therapy</label>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Grid>
                                        <Grid className="entryCloseBtn">
                                            <a
                                                onClick={() => closeFullQues()}
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
                            <Grid className="enterSpcl">
                                <Grid>
                                    <label className="specbutton1">
                                        Therapy Name
                                    </label>
                                    <div style={{ paddingBottom: 8 }}>{props?.item?.therapy_name}</div>
                                </Grid>
                                <Grid>
                                    <label className="specbutton1">
                                        Therapy description
                                    </label>
                                    <div style={{ paddingBottom: 8 }}>{props?.item?.therapy_description}	</div>

                                </Grid>
                                <Grid>
                                    <label className="specbutton1">
                                        Disease name
                                    </label>
                                    <div style={{ paddingBottom: 8 }}>{props?.item?.disease_name}</div>
                                </Grid>
                                <Grid className="AddMarginTo">
                                    <label className="specbutton1">
                                        Assigned To
                                    </label>
                                    {props?.item?.assinged_to &&
                                        props?.item?.assinged_to?.length > 0 &&
                                        props?.item?.assinged_to.map((data) => (
                                            <div className="presImg11">
                                                {data && data?.image && <S3Image imgUrl={data?.image} />}
                                                {data?.first_name} {' '} {data?.last_name}</div>
                                        ))}

                                </Grid>
                                <Grid className="specbutton1">
                                    <label>
                                        Sequence of Tasks/ Assigned services

                                    </label>
                                    {/* <div style={{ paddingBottom: 8 }}>-	</div> */}

                                </Grid>
                                <Grid className="srvcTable3656">
                                    <Grid className="srvcTable3 srvcTable365">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th style={{ "width": "20%", "text-align": "left" }}>No.</th>
                                                    <th style={{ "width": "30%", "text-align": "left" }}>Type</th>
                                                    <th style={{ "width": "40%", "text-align": "left" }}>Title of type </th>
                                                    <th style={{ "width": "10%", "text-align": "left" }}>Description of Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props?.item?.sequence_list &&
                                                    props?.item?.sequence_list?.length > 0 &&
                                                    props?.item?.sequence_list.map((data, index) => (
                                                        <tr>
                                                            <td key={index}>{index}</td>
                                                            <td>{data?.type === "task" ? "Task" : "Assign Service"}</td>
                                                            <td>{data?.task_name || data?.service_name}</td>
                                                            <td>{data?.task_description || data?.service_description}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}
export default ViewTherapy;
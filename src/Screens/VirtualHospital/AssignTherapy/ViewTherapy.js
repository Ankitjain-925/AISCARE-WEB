import React from "react";
import Grid from "@material-ui/core/Grid";
import { S3Image } from 'Screens/Components/GetS3Images/index';
import Modal from "@material-ui/core/Modal";
import useAllSetting from '../../Doctor/AccessKeyLog/Hooks/Setting';
import ShowStaffData from "./ShowStaffData";
import { getLanguage } from "translations/index";



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
    let translate = getLanguage(props.stateLanguageType);
    let {
        View_Therapy,
        Therapyname,
        Therapydescription,
        DiseaseName,
        Assignedto,
        Sequence_Task_Assigned_Services,
        No,
        Type,
        Name

    } = translate;
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
                                    <label>{View_Therapy}</label>
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
                                        {Therapyname}
                                    </label>
                                    <div className="addCssTherNamDes">{props?.item?.therapy_name}</div>
                                </Grid>
                                <Grid>
                                    <label className="specbutton1">
                                        {Therapydescription}
                                    </label>
                                    <div className="addCssTherNamDes">{props?.item?.therapy_description}</div>

                                </Grid>
                                <Grid>
                                    <label className="specbutton1">
                                        {DiseaseName}
                                    </label>
                                    <div className="addCssTherNamDes">{props?.item?.disease_name}</div>
                                </Grid>
                                <Grid className="AddMarginTo">
                                    <label className="specbutton1">
                                        {Assignedto}
                                    </label>
                                    {props?.item?.assinged_to &&
                                        props?.item?.assinged_to?.length > 0 &&
                                        props?.item?.assinged_to.map((data) => (<>
                                            {data?.first_name ?
                                                // <div className="presImg11">
                                                //     {data && data?.image && <S3Image imgUrl={data?.image} />}
                                                //     {data?.first_name} {' '} {data?.last_name}</div>

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
                                                :
                                                <a onClick={() => props.showData(data, data?.team_name)}>   <div className="showAllAssignedInner">
                                                    <Grid className="allInfo allInfo2 tasklistName tasklistName1">
                                                        <Grid>
                                                            <img src={settings.setting &&
                                                                settings.setting.mode &&
                                                                settings.setting.mode === "dark" ?
                                                                require("assets/virtual_images/groupicon-black.jpg")
                                                                : require("assets/virtual_images/groupicon.jpg")}></img>
                                                        </Grid>
                                                        <Grid className="allInfoRght">
                                                            <Grid>
                                                                <label>
                                                                    {data?.team_name} {' '} {"(Staff)"}
                                                                </label>
                                                            </Grid>
                                                            <p>{data?.staff_id}</p>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                </a>}
                                        </>))}
                                </Grid>
                                <Grid className="specbutton1">
                                    <label>
                                        {Sequence_Task_Assigned_Services}

                                    </label>
                                    {/* <div>-	</div> */}

                                </Grid>
                                <Grid className="srvcTable3656">
                                    <Grid className="srvcTable3 srvcTable365">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="noNameType1">{No}</th>
                                                    <th className="noNameType">{Type}</th>
                                                    <th className="noNameType">{Name}</th>
                                                    {/* <th>Description of Type</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props?.item?.sequence_list &&
                                                    props?.item?.sequence_list?.length > 0 &&
                                                    props?.item?.sequence_list.map((data, index) => (
                                                        <tr>
                                                            <td key={index}>{index + 1}</td>
                                                            <td>{data?.type === "task" ? "Task" : "Assign Service"}</td>
                                                            <td>{data?.task_name || data?.title}</td>
                                                            {/* <td>{data?.task_description || data?.service_description}</td> */}
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
            <ShowStaffData
                openStaff={props.openStaff}
                closeStaffInfo={() => props.closeStaffInfo()}
                AllStaffData={props.AllStaffData}
            />
        </div>
    );

}
export default ViewTherapy;
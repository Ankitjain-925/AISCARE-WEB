import React from "react";
import Grid from "@material-ui/core/Grid";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from "@material-ui/core/Modal";
import useAllSetting from '../../Doctor/AccessKeyLog/Hooks/Setting'
import { getLanguage } from 'translations/index';
import Button from "@material-ui/core/Button";

const AssignPatient = (props) => {
    const settings = useAllSetting();

    let translate = getLanguage(props.stateLanguageType);
    let {
        save_and_close
    } = translate;

    return (
        <div>

            <Modal
                open={props.openAssPat}
                onClose={() => props.closeFullPatient()}
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
                // className="addServContnt"
                >
                    <Grid className="addSpeclContntIner">
                        <Grid className="addSpeclLbl">
                            <Grid
                                container
                                direction="row"
                                justify="center"
                            >
                                <Grid item xs={8} md={8} lg={8}>
                                    <label>Assign to Patient</label>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Grid>
                                        <Grid className="entryCloseBtn">
                                            <a
                                                onClick={() =>
                                                    props.closeFullPatient()
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
                                <Grid>
                                    {/* <VHfield
                                        label={Servicename}
                                        name="title"
                                        placeholder={EnterServicename}
                                        onChange={(e) =>
                                            updateEntryState1(e, this)
                                        }
                                        value={this.state.updateTrack.title}
                                    /> */}
                                </Grid>

                                <Grid>
                                    {/* <VHfield
                                        label={Serviceshortdescription}
                                        name="description"
                                        placeholder={
                                            Enterserviceshortdescription
                                        }
                                        onChange={(e) =>
                                            updateEntryState1(e, this)
                                        }
                                        value={
                                            this.state.updateTrack.description
                                        }
                                    /> */}
                                </Grid>


                                <label className="specbutton1">
                                    speciality
                                </label>

                                <Grid className="sevicessection serviceallSec serviceallSec1">
                                    {/* <Select
                                        onChange={(e) =>
                                            onFieldChange(e, this)
                                        }
                                        options={this.state.AllSpeciality}
                                        name="specialty_name"
                                        isSearchable={true}
                                        className="min_section minall_sec"
                                        isMulti={true}
                                        value={selectedID(
                                            this.state.updateTrack.specialty_id,
                                            this
                                        )}
                                    /> */}
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    className="enterPricePart1"
                                >
                                    {/* <VHfield
                                        label={Price}
                                        name="price"
                                        placeholder={Enterserviceprice}
                                        onChange={(e) =>
                                            updateEntryState1(e, this)
                                        }
                                        value={
                                            this.state.updateTrack.price || 0
                                        }
                                    /> */}
                                    <p className="enterPricePart3">€</p>
                                </Grid>
                            </Grid>

                            {/* <div className="err_message">
                                {this.state.errorMsg}
                            </div> */}
                        </Grid>
                        <Grid className="servSaveBtn">
                            <a>
                                <Button
                                // onClick={() => handleSubmit(this)}
                                >
                                    {save_and_close}
                                </Button>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>

        </div >)
}

export default AssignPatient;
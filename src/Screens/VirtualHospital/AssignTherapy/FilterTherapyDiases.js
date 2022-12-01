import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import useAllSetting from '../../Doctor/AccessKeyLog/Hooks/Setting'
import { getLanguage } from 'translations/index';
import Select from "react-select";

const FilterTherapyDiases = (props) => {
    const settings = useAllSetting();

    //For closing of Modal
    const closeFullFilter = () => {
        props.closeFullFilter();
    }

    let translate = getLanguage(props.stateLanguageType);
    let { filters,
        clear_all_filters,
        applyFilters,
        Therapyname,
        DiseaseName,
        FilterbyTherapyname,
        FilterbyDisease
    } = translate;

    return (
        <div>
            <Modal
                open={props?.openFilter}
                onClose={() => closeFullFilter()}>
                <Grid
                    className={
                        settings &&
                            settings.setting &&
                            settings.setting.mode &&
                            settings.setting.mode === 'dark'
                            ? 'nwEntrCntnt fltrClear darkTheme'
                            : 'nwEntrCntnt fltrClear'
                    }
                >
                    <Grid className="fltrClearIner">
                        <Grid className="fltrLbl">
                            <Grid container direction="row" justify="center">
                                <Grid item xs={8} md={8} lg={8}>
                                    <label>{filters}</label>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Grid>
                                        <Grid className="entryCloseBtn">
                                            <a onClick={() => closeFullFilter()}>
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

                        {/* <Grid className="fltrForm">
                            <Grid className="fltrInput">
                                <label>{Therapyname}</label>
                                <Grid className="addInput">
                                    <Select
                                        name="professional"
                                        onChange={(e) => updateTherapyFilter(e)}
                                        value={this.state.FilterData}
                                        options={this.state.patientForFilter}
                                        placeholder={FilterbyTherapyname}
                                        className="addStafSelect"
                                        isMulti={true}
                                        isSearchable={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="fltrInput">
                                <label>{DiseaseName}</label>
                                <Grid className="addInput">
                                    <Select
                                        name="professional"
                                        onChange={(e) => this.updateEntryState4(e)}
                                        value={this.state.assignedTo2}
                                        options={this.state.professional_id_list}
                                        placeholder={FilterbyDisease}
                                        className="addStafSelect"
                                        isMulti={true}
                                        isSearchable={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="fltrInput">
                                <label>{speciality}</label>
                                <Grid className="addInput">
                                    <Select
                                        onChange={(e) => this.onFieldChange2(e)}
                                        options={this.state.specilaityList}
                                        name="specialty_name"
                                        value={this.state.selectSpec2}
                                        placeholder={FilterbySpeciality}
                                        isMulti={false}
                                        className="addStafSelect"
                                        isSearchable={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="fltrInput">
                                <label>{Ward}</label>
                                <Grid className="addInput">
                                    <Select
                                        onChange={(e) => this.onWardChange(e)}
                                        options={this.state.wardList}
                                        name="ward_name"
                                        value={this.state.selectWard}
                                        placeholder={FilterbyWard}
                                        isMulti={false}
                                        className="addStafSelect"
                                        isSearchable={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="fltrInput">
                                <label>{Room}</label>
                                <Grid className="addInput">
                                    <Select
                                        onChange={(e) => this.onRoomChange(e)}
                                        options={this.state.roomList}
                                        name="room_name"
                                        value={this.state.selectRoom}
                                        placeholder={FilterbyRoom}
                                        isMulti={false}
                                        className="addStafSelect"
                                        isSearchable={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid> */}
                        <Grid className="aplyFltr">
                            <Grid className="aplyLft">
                                <label className="filterCursor"
                                // onClick={this.clearFilter}
                                >
                                    {clear_all_filters}
                                </label>
                            </Grid>
                            <Grid className="aplyRght">
                                <Button
                                // onClick={this.applyFilter}
                                >
                                    {applyFilters}</Button>
                            </Grid>
                        </Grid>

                        {/* } */}
                    </Grid>
                </Grid>
            </Modal>
        </div>)
}

export default FilterTherapyDiases;
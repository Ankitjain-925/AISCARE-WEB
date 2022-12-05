import axios from "axios";
import React, { Component } from 'react';
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { getLanguage } from "translations/index";
import _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getProfessionalData } from "Screens/VirtualHospital/PatientFlow/data";


//For adding the New therapy
export const handleSubmit = (current) => {
    const { assignedTo, seqItems, assinged_to } = current.state;
    let translate = getLanguage(current.props.stateLanguageType);
    let { } = translate;
    current.setState({ errorMsg: '' })
    var data = current.state.updateTrack;
    data.house_id = current.props?.House?.value;
    data.assinged_to = assinged_to;
    data.sequence_list = seqItems;

    if (!data.therapy_name || (data && data?.therapy_name && data?.therapy_name.length < 1)) {
        current.setState({ error_section: 1, errorMsg: "Please enter therapy name" })
    }
    else if (!data.therapy_description) {
        current.setState({ error_section: 1, errorMsg: "Please enter therapy description" })
    }
    else if (!data.disease_name) {
        current.setState({ error_section: 1, errorMsg: "Please enter disease name" })
    }
    else if (!data.assinged_to || ((data && data?.assinged_to && data?.assinged_to.length < 1))) {
        current.setState({ error_section: 1, errorMsg: "Please selete Doctor/Staff" })
    }
    else if (!data.sequence_list || ((data && data?.sequence_list && data?.sequence_list?.length < 2))) {
        current.setState({ error_section: 2, errorMsg: "Atleast select two sequence from Task/Service" })
    }
    else {
        current.setState({ loaderImage: true });
        if (data?._id) {
            axios
                .put(
                    sitedata.data.path + "/vt/Updatetherapy/" + current.state.updateTrack._id,
                    data,
                    commonHeader(current.props.stateLoginValueAim?.token)
                )
                .then((responce) => {
                    getAllTherpy(current);
                    current.setState({
                        updateTrack: {},
                        loaderImage: false
                    });
                    handleCloseServ(current);
                })
                .catch(() => {
                    current.setState({ loaderImage: false });
                    handleCloseServ(current);
                })
        }
        else {
            console.log("At the time of posting data", data);
            axios
                .post(
                    sitedata.data.path + "/vt/AddTherapy",
                    data,
                    commonHeader(current.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    current.setState({ loaderImage: false });
                    getAllTherpy(current);
                    handleCloseServ(current);
                })
                .catch(() => {
                    current.setState({ loaderImage: false });
                    handleCloseServ(current);
                })
        }
    }
};

// Modal Close
export const handleCloseServ = (current) => {
    current.setState({ openServ: false, updateTrack: {}, errorMsg: false, assignedTo: {}, seqItems: [] });
};

//Modal Open
export const handleOpenServ = (current) => {
    current.setState({ openServ: true, updateTrack: {} });
};

//For getting the therapies
export const getAllTherpy = (current) => {
    current.setState({ loaderImage: true });
    axios
        .get(
            sitedata.data.path + "/vt/GettherapyHouse/" + current.props?.House?.value,
            commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((response) => {
            // if (responce.data.hassuccessed) {
            //     current.setState({ AllTherpy: responce?.data?.data, loaderImage: false });
            // } else {
            //     current.setState({ loaderImage: false });
            // }

            var totalPage = Math.ceil(response.data.data.length / 10);
            current.setState(
                {
                    AllTherpy1: response.data.data,
                    loaderImage: false,
                    totalPage: totalPage,
                    currentPage: 1,
                },
                () => {
                    current.setState({ loaderImage: false });
                    if (totalPage > 1) {
                        var pages = [];
                        for (var i = 1; i <= current.state.totalPage; i++) {
                            pages.push(i);
                        }
                        current.setState({
                            AllTherpy: current.state.AllTherpy1.slice(0, 10),
                            pages: pages,
                        });
                    } else {
                        current.setState({ AllTherpy: current.state.AllTherpy1 });
                    }
                }
            );
        });
};

// For editing the therapy
export const EditTherapy = (current, data) => {
    selectProf(current, data?.assinged_to, current.state.professional_id_list1);
    var deep = _.cloneDeep(data);
    var newArray = deep?.assinged_to?.length > 0 && deep?.assinged_to.map((item) => {
        var name = item?.first_name + item?.last_name;
        return ({ label: name, value: item._id })
    })


    current.setState({
        openServ: true,
        updateTrack: deep,
        assignedTo: newArray,
        seqItems: deep?.sequence_list,
        selectSpec: {
            label: deep?.speciality?.specialty_name,
            value: deep?.speciality?._id,
        },
        alerady_Assigned: newArray
    });
}

// For deleting the therapy
export const DeleteTherapy = (current, data) => {
    let translate = getLanguage(current.props.stateLanguageType);
    let {
        deleteTherapy,
        yes_deletetherapy,
        are_you_sure,
        cancel_keeptherapy,
    } = translate;
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Grid
                    className={
                        current.props.settings &&
                            current.props.settings.setting &&
                            current.props.settings.setting.mode === 'dark'
                            ? 'dark-confirm deleteStep'
                            : 'deleteStep'
                    }
                >
                    <Grid className="deleteStepLbl">
                        <Grid>
                            <a
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                <img
                                    src={require('assets/images/close-search.svg')}
                                    alt=""
                                    title=""
                                />
                            </a>
                        </Grid>
                        <label>{deleteTherapy}</label>
                    </Grid>
                    <Grid className="deleteStepInfo">
                        <label>{are_you_sure}</label>
                        <Grid>
                            <label></label>
                        </Grid>
                        <Grid>
                            <Button
                                onClick={() => {
                                    RemoveTherapy(current, data);
                                }}
                            >
                                {yes_deletetherapy}
                            </Button>
                            <Button
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                {cancel_keeptherapy}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        },
    });

};


export const RemoveTherapy = (current, data) => {
    let translate = getLanguage(current.props.stateLanguageType);
    let { removeTherapy, really_want_to_remove_therapy, No, Yes } = translate;
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div
                    className={
                        current.props.settings &&
                            current.props.settings.setting &&
                            current.props.settings.setting.mode &&
                            current.props.settings.setting.mode === 'dark'
                            ? 'dark-confirm react-confirm-alert-body'
                            : 'react-confirm-alert-body'
                    }
                >
                    <h1 class="alert-btn">{removeTherapy}</h1>
                    <p>{really_want_to_remove_therapy}</p>
                    <div className="react-confirm-alert-button-group">
                        <button onClick={onClose}>{No}</button>
                        <button
                            onClick={() => {
                                DeleteTherapyOk(current, data);
                                onClose();
                            }}
                        >
                            {Yes}
                        </button>
                    </div>
                </div>
            );
        },
    });
};

export const DeleteTherapyOk = (current, data) => {
    current.setState({ loaderImage: true });
    axios
        .delete(
            sitedata.data.path + "/vt/Deletetherapy/" + data?._id,
            commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((responce) => {
            if (responce.data.hassuccessed) {
                getAllTherpy(current);
                current.setState({ loaderImage: false });
            }
        })
        .catch(() => {
            current.setState({ loaderImage: false });
        })
}

// Get the Professional data
export const GetProfessionalData = async (current, fromEdit) => {
    current.setState({ loaderImage: true });
    var data = await getProfessionalData(
        current.props.comesFrom === "Professional"
            ? current.state.selectedHouse?.value
            : current.props?.House?.value,
        current.props.stateLoginValueAim.token
    );
    if (data) {
        current.setState(
            {
                loaderImage: false,
                professional_id_list1: data.professionalList,
                professionalArray1: data.professionalArray
            });
    } else {
        current.setState({ loaderImage: false });
    }
};

export const updateEntryState3 = (current, e) => {
    var res = current.state.professionalArray1.filter(el => {
        return e && e.find(element => {
            return element?.value === el?.user_id;
        });
    });
    current.setState({ assignedTo: e, assinged_to: res })
};

export const taskSelection = (current, e) => {
    current.setState({ taskName: e, allSequence: { "type": e?.value } });
}

export const updateEntry = (current, e) => {
    const state = current.state.allSequence;
    state[e.target.name] = e.target.value;
    current.setState({ allSequence: state });
}

export const handleAddData = (current) => {
    const { indexForUpdate, allSequence, taskName } = current.state;
    current.setState({ errorMsg: "" })
    if ((taskName?.value === "task" &&
        !allSequence?.task_name) ||
        (taskName?.value === "assign_service" &&
            !allSequence?.service_name)) {
        current.setState({
            error_section: 3,
            errorMsg: taskName?.value === "task" ?
                "Please enter Task name" :
                "Please enter Service name"
        });
    }
    else if ((taskName?.value === "task" &&
        !allSequence?.task_description) ||
        taskName?.value === "assign_service" &&
        !allSequence?.service_description) {
        current.setState({
            error_section: 3,
            errorMsg: taskName?.value === "task" ?
                "Please enter Task description" :
                "Please enter Service description"
        });
    }
    else {
        if (indexForUpdate > 0) {
            var index = indexForUpdate - 1;
            var array = current.state.seqItems;
            if (allSequence && allSequence.type && allSequence.type === "task") {
                array[index].task_name = allSequence?.task_name;
                array[index].task_description = allSequence?.task_description;
            } else {
                array[index].service_name = allSequence?.service_name;
                array[index].service_description = allSequence?.service_description;
                // array[index].service_price = allSequence?.service_price;
            }
            current.setState({
                seqItems: array,
                allSequence: {},
                taskName: {},
                assignTask: false,
                indexForUpdate: 0
            });
        }
        else {
            var seqItems = current.state.seqItems ?
                [...current.state.seqItems] :
                [];
            seqItems.push(current.state.allSequence)
            current.setState({
                seqItems,
                allSequence: {},
                taskName: {},
                assignTask: false,
                indexForUpdate: 0
            });
        }
    }
}

export const editTaskSer = (current, data, index) => {
    var deep = _.cloneDeep(data);
    current.setState({
        taskName: data?.type === "task" ?
            { value: "task", label: "Task" } :
            { label: 'Assign Service', value: 'assign_service' },
        allSequence: deep,
        assignTask: true,
        indexForUpdate: index + 1
    });
}

export const removeServices = (current, index, data) => {
    let translate = getLanguage(current.props.stateLanguageType);
    let { RemoveService, RemoveTask, sure_remove_task, sure_remove_service, from_therapy, No, Yes } =
        translate;
    const { seqItems } = current.state;
    current.setState({ errorMsg: "" });
    if (seqItems?.length > 2 && index > -1) {
        current.setState({ openServ: false });
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        className={
                            current.props.settings &&
                                current.props.settings.setting &&
                                current.props.settings.setting.mode &&
                                current.props.settings.setting.mode === 'dark'
                                ? 'dark-confirm react-confirm-alert-body'
                                : 'react-confirm-alert-body'
                        }
                    >
                        <h1>{data?.type === "task" ? RemoveTask : RemoveService}</h1>
                        <p>{data?.type === "task" ? `${sure_remove_task} ${from_therapy}` : `${sure_remove_service} ${from_therapy}`}</p>
                        <div className="react-confirm-alert-button-group">

                            <button onClick={() => {
                                onClose();
                                current.setState({ openServ: true });
                            }}
                            >
                                {No}
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    removeTaskSer(current, index);
                                    current.setState({ openServ: true });
                                }}
                            >
                                {Yes}
                            </button>
                        </div>
                    </div >
                );
            },
        });
    }
    else {
        current.setState({ error_section: 2, errorMsg: "Atleast select two sequence from Task/Service" })
    }
};

//Delete Listing from Array
export const removeTaskSer = (current, index) => {
    const { seqItems } = current.state;
    seqItems.splice(index, 1);
    current.setState({ seqItems });
}
// For searching data
export const searchFilter = (e, current) => {
    current.setState({ SearchValue: e.target.value });
    if (current.state.showinput && e.target.value) {
        axios
            .get(
                sitedata.data.path + "/vt/Gettherapy_search/" + current.props?.House?.value + "/" + e.target.value,
                commonHeader(current.props.stateLoginValueAim?.token)
            )
            .then((res) => {
                if (res.data.hassuccessed) {
                    current.setState({
                        AllTherpy: res?.data?.data,
                    });
                }
            })
            .catch(() => {
            })
    }
    else {
        getAllTherpy(current);
    }
}

export const onChangePage = (pageNumber, current) => {
    current.setState({
        AllTherpy: current.state.AllTherpy1.slice(
            (pageNumber - 1) * 10,
            pageNumber * 10
        ),
        currentPage: pageNumber,
    });
};

//to get the speciality list
export const specailityList = (current) => {
    var spec =
        current.props.speciality?.SPECIALITY &&
        current.props?.speciality?.SPECIALITY.length > 0 &&
        current.props?.speciality?.SPECIALITY.map((data) => {
            return { label: data.specialty_name, value: data._id };
        });
    current.setState({ specilaityList: spec });
};

export const onFieldChange = (current, e) => {
    const state = current.state.updateTrack;
    current.setState({ selectSpec: e });
    var speciality =
        current.props.speciality?.SPECIALITY &&
        current.props?.speciality?.SPECIALITY.length > 0 &&
        current.props?.speciality?.SPECIALITY.filter((data) => data._id === e.value);
    if (speciality && speciality.length > 0) {
        state["speciality"] = {
            background_color: speciality[0]?.background_color,
            color: speciality[0]?.color,
            specialty_name: speciality[0]?.specialty_name,
            _id: speciality[0]?._id,
        };
        current.setState({ updateTrack: state });
    }
};

// manage assign to list
export const selectProf = (current, listing, data) => {
    var showdata = data;
    var alredyAssigned =
        listing &&
        listing?.length > 0 &&
        listing.map((item) => {
            return item.user_id;
        });
    if (alredyAssigned && alredyAssigned.length > 0) {
        showdata =
            data?.length > 0 &&
            data.filter((item) => !alredyAssigned.includes(item.value));
        var assignedto =
            data?.length > 0 &&
            data.filter((item) => alredyAssigned.includes(item.value));
        current.setState({ assignedTo: assignedto });
    }
    current.setState({ professional_id_list1: showdata });
};
import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/DoctorLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/DoctorLeftMenu/mobile';
// import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';

import { getLanguage } from 'translations/index';
import useAllSetting from './Hooks/Setting'
import { useHistory } from "react-router-dom";

const Index = (props) => {
    const [codeValue, setcodeValue] = useState({});
    const settings = useAllSetting();
    const history = useHistory();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const state = codeValue;
        state[e.target.name] = e.target.value;
        setcodeValue(state);
    }

    const handleSubmit = () => {
        if (codeValue && codeValue?.code) {
            history.push({
                pathname: "/doctor/video-call",
                state: codeValue,
            });
            setcodeValue({ code: '' });
        }
        else {
            setError("Please enter Access Key first");
        }
    }
    let translate = getLanguage(props.stateLanguageType);
    let {
        my_profile,
        Security
    } = translate;
    return (
        <Grid
            className={
                settings &&
                    settings.setting &&
                    settings.setting.mode &&
                    settings.setting.mode === 'dark'
                    ? 'homeBg darkTheme homeBgDrk'
                    : 'homeBg'
            }
        >
            <Grid className="homeBgIner">
                <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container direction="row">
                            <LeftMenu isNotShow={true} currentPage="access_key" />
                            <LeftMenuMobile isNotShow={true} currentPage="access_key" />
                            <Grid item xs={12} md={11} lg={10}>
                                <Grid className="docsOpinion">
                                    <Grid container direction="row" className="docsOpinLbl">
                                        <Grid item xs={12} md={6} className="label_1">
                                            <label>Confirmation Access Key</label>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <Grid className="profilePkgIner2"> */}
                                    <Grid className="logForm accessForm">
                                        <Grid className="logRow">
                                            <Grid className="label_1">
                                                <div className="err_message">{error}</div>
                                                <label>Enter Access Key</label>
                                            </Grid>
                                            <Grid>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={codeValue?.code}
                                                    placeholder="Enter key"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid className="infoShwSave3 label_1 ">
                                            <input
                                                type="button"
                                                value="Join Call"
                                                onClick={() => handleSubmit()}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Index;
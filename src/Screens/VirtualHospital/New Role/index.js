import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../Institutes/selecthouseaction";
import { Speciality } from "Screens/Login/speciality.js";
import Collapsible from 'react-collapsible';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weoffer: this.props.data,
            demo: this.props.demo || [],
        };
    }

    componentDidUpdate = (prevProps, prevState)=>{
        if(prevProps.demo !== this.props.demo || prevProps.data !== this.props.data){
            this.setState({
                weoffer: this.props.data,
                demo: this.props.demo || [],
            });
        }
    }

    SelectAll = (data, type, mainsection)=>{
        var demo = this.state.demo;
        if(type === 'deselect'){
            data.map((item)=>{
                const index = demo.indexOf(item.value);
                if (index > -1) {
                    demo.splice(index, 1);
                } 
            })
            var index1 = demo.indexOf(mainsection);
            delete demo[index1]
            
        }
        else{
            data.map((item, index)=>{
                demo.push(item.value)
                demo.push(mainsection)
            })
        }
        demo = [...new Set(demo)];
        this.setState({demo: demo})
        this.props.finalArray(demo)
    }

    handleweoffer = (e, mainSection, Maindata) => {
        var state = this.state.demo
        var data = state ? state : []
        if (e.target.checked) {
            data.push(e.target.value);
            data.push(mainSection)
        }
        else {
            var index = data.indexOf(e.target.value)
            data.splice(index, 1);
            var splicethis = true;
            Maindata.map((item)=>{
                const index = data.indexOf(item.value);
                if (index > -1) {
                    splicethis = false; 
                } 
            })
            if(splicethis){
                var index1 = data.indexOf(mainSection)
                data.splice(index1, 1)
            }
        }
        data = [...new Set(data)];
        this.setState({demo: data})
        this.props.finalArray(data)
    };


    render() {
        var { weoffer } = this.state
        return (
            <Grid className="line">
                <Grid item xs={12} md={12}>
                    <Grid className="headsize2">
                        {weoffer && weoffer.map((item) => (
                           <Accordion >
                           <AccordionSummary
                             expandIcon={<ExpandMoreIcon />}
                             aria-controls="panel1bh-content"
                             id="panel1bh-header"
                             className='headsize2'
                           >
                             <b>
                             {item.label}
                             </b>
                           </AccordionSummary>
                           <div className='valuesuggest2'>
                           <div className="sel">
                            <a onClick={()=>{this.SelectAll(item?.data, 'select', item.value )}}>Select All </a>/ 
                            <a onClick={()=>{this.SelectAll(item?.data, 'deselect', item.value)}}>Deselect All</a>
                            </div>
                           {item.data.map((item1) => (
                           <AccordionDetails>
                          
                             <Typography>
                               <FormControlLabel
                                 control={
                                    <Checkbox
                                    value={item1.value}
                                    checked={this.state?.demo?.indexOf(item1.value)>-1}
                                    onChange={(e) => this.handleweoffer(e, item.value, item?.data)
                
                                    }
                                   
                
                                />
                                 }
                                 label={item1.label}
                               />
                             
                             </Typography>
                            
                           </AccordionDetails>
                            ))
                        }
                         </div>
                         </Accordion>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}


const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect;
    const { settings } = state.authy;
    const { speciality } = state.Speciality;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        // verifyCode,
        House,
        speciality
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
        houseSelect,
        Speciality
    })(Index)
);
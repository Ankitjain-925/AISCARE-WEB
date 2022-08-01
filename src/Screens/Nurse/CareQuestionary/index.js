import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import LeftMenuMobile from "Screens/Components/Menus/NurseLeftMenu/mobile";
import LeftMenu from "Screens/Components/Menus/NurseLeftMenu/index";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleDailyForm = () => {
      let { dailyForm, everyDay, everyWeek } = this.state;
      this.setState({ dailyForm : !dailyForm });
      this.setState({ everyDay : false });
      this.setState({ everyWeek : false });
    }
    handleEveryDay = () => {
        let { dailyForm, everyDay, everyWeek } = this.state;
        this.setState({ everyDay : !everyDay });
        this.setState({ dailyForm : false });
        this.setState({ everyWeek : false });
        this.setState({ everyQuarter : false });
      }
    handleEveryWeek = () => {
        let { dailyForm, everyDay, everyWeek } = this.state;
        this.setState({ everyWeek : !everyWeek });
        this.setState({ everyDay : false });
        this.setState({ dailyForm : false });
        this.setState({ everyQuarter : false });
      }  
    handleEveryQuarter = () => {
        let { dailyForm, everyDay, everyWeek, everyQuarter } = this.state;
        this.setState({ everyQuarter : !everyQuarter });
        this.setState({ everyDay : false });
        this.setState({ dailyForm : false });
        this.setState({ everyWeek : false });
      } 
    render() {
        const { dailyForm, everyDay, everyWeek, everyQuarter } = this.state;
        return (
            <Grid>
                <Grid className="homeBgIner homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                             {/* Website Menu */}
                             <LeftMenu isNotShow={true} currentPage="course" />
                               <LeftMenuMobile isNotShow={true} currentPage="course" />
                             <Notification />
                            {/* End of Website Menu */}
                              <Grid item xs={12} sm={10} md={8}>
                                <FormControl className="careQuesCheck">
                                  <FormControlLabel control={ <Checkbox onClick={()=>this.handleDailyForm()} /> } label="Daily" />
                                  <FormControlLabel control={<Checkbox onClick={()=>this.handleEveryDay()} />} label="Every 2 Day" />
                                  <FormControlLabel control={<Checkbox onClick={()=>this.handleEveryWeek()} />} label="Every 2 Weeks" />
                                  <FormControlLabel control={<Checkbox onClick={()=>this.handleEveryQuarter()} />} label="Quarter" />
                                </FormControl>
                               {dailyForm ?
                                  <Grid>
                                    <Grid className="anamneSecUpr">
                                        <Grid className="anamneSecMid">
                                            <p>Anamnesis</p>
                                            <Grid className="anamneSec">
                                                <Grid>
                                                    <label>Blood pressure</label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                                <Grid>
                                                    <label>Blood pressure</label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Decubitus Situation</p>
                                            <Grid className="anamneSec">
                                                <Grid>
                                                    <label>Picture with Scale</label>
                                                    <input type="file" />
                                                </Grid>
                                                <Grid>
                                                    <label>Amount of wounds</label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                                <FormControl>
                                                    <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                        <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Thrombose Situation</p>
                                             <Grid className="anamneSec">
                                                <Grid>
                                                    <label>Measure diameter Leg </label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                        <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                    </RadioGroup>
                                                </FormControl>
                                              </Grid>    
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Falling Risk </p>
                                            <Grid className="anamneSec">
                                                <FormControl>
                                                    <FormLabel>ask for incidents</FormLabel>
                                                    <FormControlLabel control={<Checkbox />} label="Did you fall today " />
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSec">
                                                <FormControl>
                                                    <FormLabel>Use of tools</FormLabel>
                                                    <FormControlLabel control={<Checkbox />} label="Can you use your tools" />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                        <p>Thrombose Situation</p>
                                            <Grid className="anamneSec anamneSecDbl">
                                                <label>Ask for Food </label>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Have you eaten </FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSec anamneSecDbl">
                                                <label>Water </label>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Have you been trinkung </FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSec anamneSecDbl">
                                                <label>Toilet situation </label>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Could you go to the Toilet</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>  
                                            <Grid className="anamneSecMid">
                                                <p>Pain Status</p>
                                                <Grid className="anamneSec">
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Thrombose Situation</p>
                                                <Grid className="anamneSec">
                                                    <Grid>
                                                        <label>Picture with Scale</label>
                                                        <input type="file" />
                                                    </Grid>
                                                    <Grid>
                                                        <label>Amount of wounds </label>
                                                        <input type="text" placeholder="" name="" />
                                                    </Grid>
                                                    <FormControl>
                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                            <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                            <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Depression Risk</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel id="Condition-Radio">what was good today</FormLabel>
                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                            <FormControlLabel value="Month If not acute daily" control={<Radio />} label="Month If not acute daily" />
                                                            <FormControlLabel value="Could the Patient tell somethink that was good to day " control={<Radio />} label="Could the Patient tell somethink that was good to day " />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Disorientation Level</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>ask for News of the Day </FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Can the Patient tell you a news of the Days" />
                                                    </FormControl>
                                                </Grid>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>Name of Family Members</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Does the Patient remebmer the Name of a Family Memer" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Sanitary Situation</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>ask for Incidents</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="No Incidents at the Sanitary Situation" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid> 
                                     </Grid> : null
                                   }

                                {everyDay ?
                                  <Grid>
                                    <Grid className="anamneSecUpr">
                                        <Grid className="anamneSecMid">
                                            <p>Anamnesis 22</p>
                                            <Grid className="anamneSec">
                                                <Grid>
                                                    <label>Blood pressure</label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                                <Grid>
                                                    <label>Blood pressure</label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Decubitus Situation</p>
                                            <Grid className="anamneSec">
                                                <Grid>
                                                    <label>Picture with Scale</label>
                                                    <input type="file" />
                                                </Grid>
                                                <Grid>
                                                    <label>Amount of wounds</label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                                <FormControl>
                                                    <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                        <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Thrombose Situation</p>
                                             <Grid className="anamneSec">
                                                <Grid>
                                                    <label>Measure diameter Leg </label>
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                        <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                    </RadioGroup>
                                                </FormControl>
                                              </Grid>    
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Falling Risk </p>
                                            <Grid className="anamneSec">
                                                <FormControl>
                                                    <FormLabel>ask for incidents</FormLabel>
                                                    <FormControlLabel control={<Checkbox />} label="Did you fall today " />
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSec">
                                                <FormControl>
                                                    <FormLabel>Use of tools</FormLabel>
                                                    <FormControlLabel control={<Checkbox />} label="Can you use your tools" />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                        <p>Thrombose Situation</p>
                                            <Grid className="anamneSec anamneSecDbl">
                                                <label>Ask for Food </label>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Have you eaten </FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSec anamneSecDbl">
                                                <label>Water </label>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Have you been trinkung </FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSec anamneSecDbl">
                                                <label>Toilet situation </label>
                                                <FormControl className="inrLbl">
                                                    <FormLabel id="Condition-Radio">Could you go to the Toilet</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>  
                                            <Grid className="anamneSecMid">
                                                <p>Pain Status</p>
                                                <Grid className="anamneSec">
                                                    <input type="text" placeholder="" name="" />
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Thrombose Situation</p>
                                                <Grid className="anamneSec">
                                                    <Grid>
                                                        <label>Picture with Scale</label>
                                                        <input type="file" />
                                                    </Grid>
                                                    <Grid>
                                                        <label>Amount of wounds </label>
                                                        <input type="text" placeholder="" name="" />
                                                    </Grid>
                                                    <FormControl>
                                                        <FormLabel id="Condition-Radio">Better / Worse</FormLabel>
                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                            <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                            <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Depression Risk</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel id="Condition-Radio">what was good today</FormLabel>
                                                        <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                            <FormControlLabel value="Month If not acute daily" control={<Radio />} label="Month If not acute daily" />
                                                            <FormControlLabel value="Could the Patient tell somethink that was good to day " control={<Radio />} label="Could the Patient tell somethink that was good to day " />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Disorientation Level</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>ask for News of the Day </FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Can the Patient tell you a news of the Days" />
                                                    </FormControl>
                                                </Grid>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>Name of Family Members</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Does the Patient remebmer the Name of a Family Memer" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Sanitary Situation</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>ask for Incidents</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="No Incidents at the Sanitary Situation" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Anamnesis</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>Weight</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="2 Weekly / If sick could be evers second day" />
                                                    </FormControl>
                                                </Grid>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>o2 Saturation</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Second Day" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Pneunomie Situation</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>o2 Saturation</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Second Day" />
                                                    </FormControl>
                                                </Grid>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>Sound Recording auscultation/ tech_development</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Second Day" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Nutrition Situation </p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>Fruits</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Have you eaten Fruits" />
                                                    </FormControl>
                                                </Grid>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>Protein</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Have you eaten Meat / Egg / Beans" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid> 
                                     </Grid> : null
                                   }

                                {everyWeek ?
                                  <Grid>
                                    <Grid className="anamneSecUpr">
                                       <Grid className="anamneSecMid">
                                         <p>Falling Risk </p>
                                         <Grid className="anamneSec">
                                            <Grid>
                                                <label>Weight (Every 2Weeks / If sick could be evers second day)</label>
                                                <input type="text" />
                                            </Grid>
                                            <Grid>
                                                <label>Measure diameter Leg (If Yes daily if not evry 2 Weeks)</label>
                                                <input type="text" />
                                            </Grid>
                                            <FormControl>
                                                <FormLabel id="Condition-Radio">Better / Worse (If Yes daily if not evry 2 Weeks)</FormLabel>
                                                <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                    <FormControlLabel value="Better" control={<Radio />} label="Better" />
                                                    <FormControlLabel value="Worse" control={<Radio />} label="Worse" />
                                                </RadioGroup>
                                            </FormControl>
                                         </Grid> 
                                        </Grid>
                                        <Grid className="anamneSecMid">
                                            <p>Falling Risk </p>
                                            <Grid className="anamneSec">
                                                <FormControl>
                                                    <FormLabel id="Condition-Radio">timed up and go (2 Weeks)</FormLabel>
                                                    <RadioGroup row aria-labelledby="Condition-Radio" name="row-radio-buttons-group">
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid className="anamneSecMid">
                                                <p>Depression Risk</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>what was good today (every 2 Weeks  If not acute daily)</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Can the Patient tell somethink Good this Day" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>    
                                        </Grid>
                                     </Grid> 
                                   </Grid> : null
                                 }   

                                {everyQuarter ?
                                  <Grid>
                                    <Grid className="anamneSecUpr">
                                        <Grid className="anamneSecMid">
                                            <p>Anamnesis </p>
                                            <Grid className="anamneSecMid">
                                                <p>Bartel Index</p>
                                                <Grid className="anamneSec">
                                                    <FormControl>
                                                        <FormLabel>every Quarter</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} label="Full Questionaire" />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>    
                                        </Grid>
                                     </Grid> 

                                     <Grid className="selectOptionCmn">

                                        <FormControl className="selectOption">
                                            <FormLabel id="main-topic-counted">Feeding</FormLabel>
                                            <RadioGroup aria-labelledby="main-topic-counted" name="main-topic-counted">
                                                <FormControlLabel value="0" control={<Radio />} label="Dependent in all aspects and needs to be fed." />
                                                <FormControlLabel value="2" control={<Radio />} label="Can manipulate an eating device, usually a spoon, but someone must provide active assistance during the meal." />
                                                <FormControlLabel value="5" control={<Radio />} label="Able to feed self with supervision. Assistance is required with associated tasks such as putting milk/sugar into tea, salt, pepper, spreading butter, turning a plate or other “set up” activities." />
                                                <FormControlLabel value="8" control={<Radio />} label="Independence in feeding with prepared tray, except may need meat cut, milk carton opened or jar lid etc. The presence of another person is not required." />
                                                <FormControlLabel value="10" control={<Radio />} label="The patient can feed self from a tray or table when someone puts the food within reach. The patient must put on an assistive device if needed, cut food, and if desired use salt and pepper, spread butter, etc.." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Chair-Bed-Transfers">Chair/Bed Transfers</FormLabel>
                                            <RadioGroup aria-labelledby="Chair-Bed-Transfers" name="Chair-Bed-Transfers">
                                                <FormControlLabel value="0" control={<Radio />} label="Unable to participate in a transfer. Two attendants are required to transfer the patient with or without a mechanical device." />
                                                <FormControlLabel value="3" control={<Radio />} label="Able to participate but maximum assistance of one other person is require in all aspects of the transfer." />
                                                <FormControlLabel value="8" control={<Radio />} label="The presence of another person is required either as a confidence measure, to provide supervision for safety." />
                                                <FormControlLabel value="12" control={<Radio />} label="The patient can safety approach the bed walking or in a wheelchair, look breaks, lift footrest, or position walking aid, move safely to bed, lie down, come to a sitting position on the side of the bed, chnage the position of the wheelchair, transfer back into it safely." />
                                                <FormControlLabel value="15" control={<Radio />} label="The patient must be independent in all phases of this activity." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Radio-Ambulation">Ambulation</FormLabel>
                                            <RadioGroup aria-labelledby="Radio-Ambulation" name="Radio-Ambulation">
                                                <FormControlLabel value="0" control={<Radio />} label="Dependent in ambulation." />
                                                <FormControlLabel value="3" control={<Radio />} label="Constant presence of one or more assistant is required during ambulation." />
                                                <FormControlLabel value="8" control={<Radio />} label="Assistance is required with reaching aids and/ or their manipulation. One person is required to offer assistance." />
                                                <FormControlLabel value="12" control={<Radio />} label="The patient is independent in ambulation but unable to walk 50 metres/yards without help, or supervision in needed for confidence or safety in hazardous situations. " />
                                                <FormControlLabel value="15" control={<Radio />} label="The patient must be able to wear braces if required, lock and unlock these braces assume standing position, sit down and place the necessary aids into position for use. The patient must be able to crutches, canes, or a walkarette, and walk 50 meters/yards without help or Supervision." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Radio-Wheelchair" className="wheelChr">
                                                Wheelchair Management 
                                                <span>(*Only use this item if the patient is rated “0” for ambulation, and then only if the patient has been trained in w/c management.)</span>
                                            </FormLabel>
                                            <RadioGroup aria-labelledby="Radio-Wheelchair" name="Radio-Wheelchair">
                                                <FormControlLabel value="0" control={<Radio />} label="Dependent in wheelchair ambulation." />
                                                <FormControlLabel value="1" control={<Radio />} label="Patient can propel self  short distance on flat surface, but assistance is required for all other steps of wheelchair management." />
                                                <FormControlLabel value="3" control={<Radio />} label="Presence of one person is necessary and constant assistance is required to manipulate chair to table, bed, etc." />
                                                <FormControlLabel value="4" control={<Radio />} label="The patient can propel self for a reasonable duration over regularly encountered terrain. Minimal assistance may still be required in “tight corners” or to negotiate a kerb 100mm high." />
                                                <FormControlLabel value="5" control={<Radio />} label="To propel wheelchair independently, the patient must be able to go around corners, turn around, manoeuvre the chair to a table, bed, toilet, etc. The patient must be able to push a chair at least 50 meters and negotiate a kerb." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Radio-Stairs">Stairs</FormLabel>
                                            <RadioGroup aria-labelledby="Radio-Stairs" name="Radio-Stairs">
                                                <FormControlLabel value="0" control={<Radio />} label="The patient is unable to climb stairs." />
                                                <FormControlLabel value="2" control={<Radio />} label="Assistance is required in all aspects of stairclimbing, including assistance with walking aids." />
                                                <FormControlLabel value="5" control={<Radio />} label="The patient is able to ascend/desend but is unable to carry walking aids and needs supervision and assistance." />
                                                <FormControlLabel value="8" control={<Radio />} label="Generally no assistance is required. At times supervision is required for safety due to morning stiffness, shortness of breath, etc." />
                                                <FormControlLabel value="10" control={<Radio />} label="The patient is able to go up and down a flight of stairs safety without help or supervision. The patient is able to use hand rails, cane or Crutches when needed and is able to carry these devices as he/she ascends or descends." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Radio-OnOff">On and Off the Toilet</FormLabel>
                                            <RadioGroup aria-labelledby="Radio-OnOff" name="Radio-OnOff">
                                                <FormControlLabel value="0" control={<Radio />} label="Fully dependent in toileting." />
                                                <FormControlLabel value="2" control={<Radio />} label="Assistance required in all aspects of toileting." />
                                                <FormControlLabel value="5" control={<Radio />} label="Assistance may be required with management of clothing, transferring, or washing hands." />
                                                <FormControlLabel value="8" control={<Radio />} label="Supervision may be required for safety with normal toilet. A commode may be used at night but assistance is required for emptying and cleaning." />
                                                <FormControlLabel value="10" control={<Radio />} label="The patient is able to get on/off the toilet, fasten clothing and use toilet paper without help. If necessary, the patient may use a bed pan or Commode or urinal at night, but must be able to empty it and clean it." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Radio-Ambulation">Bowels</FormLabel>
                                            <RadioGroup aria-labelledby="Radio-Ambulation" name="Radio-Ambulation">
                                                <FormControlLabel value="0" control={<Radio />} label="The patient is bowel incontient." />
                                                <FormControlLabel value="2" control={<Radio />} label="The patient needs help to assume appropriate position, and with bowel movement facilitatory techniques." />
                                                <FormControlLabel value="5" control={<Radio />} label="The patient can assume appropriate position, but can not use facilitatory techniques or clean self without assistance and has frequent accident. Assistance is required with incontinence aids such as pad, etc." />
                                                <FormControlLabel value="8" control={<Radio />} label="The patient may require supervision with the use of suppository or enema and has occasional accident." />
                                                <FormControlLabel value="10" control={<Radio />} label="The patient can control bowels and has no accidents, can use suppository, or take an enema when necessary." />
                                            </RadioGroup>
                                            </FormControl>

                                            <FormControl className="selectOption">
                                            <FormLabel id="Radio-Bladder">Bladder</FormLabel>
                                            <RadioGroup aria-labelledby="Radio-Bladde" name="Radio-Bladder">
                                                <FormControlLabel value="0" control={<Radio />} label="The patient is dependent in bladder management, is incontinent, or has indwelling catheter." />
                                                <FormControlLabel value="2" control={<Radio />} label="The patient is incontinent but is able to assist with the application of an internal or external device." />
                                                <FormControlLabel value="5" control={<Radio />} label="The patient is generally dry by day, but not at night and needs some assistance with the devices." />
                                                <FormControlLabel value="8" control={<Radio />} label="The patient is generally dry by day and night, but may have an occasional accident or need minimal assistance with internal or external devices." />
                                                <FormControlLabel value="10" control={<Radio />} label="The patient is able to control bladder day and night, and/or is independent with internal or external devices." />
                                            </RadioGroup>
                                            </FormControl>

                                        
                                        </Grid>
                                     
                                     
                                   </Grid> : null
                                 } 

                                </Grid>

                            </Grid>
                         </Grid>
                     </Grid>
                  </Grid> 
              </Grid>            
        );            
    }
}
const mapStateToProps = (state) => {
    const {
      stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
    stateLanguageType,
        stateLoginValueAim,
            loadingaIndicatoranswerdetail,
            settings,
            verifyCode,
        }; 
    };
  export default withRouter(
  connect(mapStateToProps, {
      LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
    })(Index)
  );
  




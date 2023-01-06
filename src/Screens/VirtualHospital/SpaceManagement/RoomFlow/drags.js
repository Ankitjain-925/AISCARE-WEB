import React, { Component } from "react";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { S3Image } from 'Screens/Components/GetS3Images/index';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    componentDidUpdate = (prevProps) => {
        if (prevProps.items !== this.props.items) {
            this.setState({
                items: this.props.items,
            });
        }
    };

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            //items
        }, () => {
            this.props.onDragEnd(this.state.items[result.source.index], this.state.items[result.destination.index])
        });
    }

    render() {


        const data = this.state.items?.map((item, index) => ({ ...item, id: `item-${index}` }))

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >

                            {data?.map((item, index) => (
                                <Grid className="drListMain2">
                                    <Grid
                                        className={
                                            item.cases?._id
                                                ? 'OnExistBed drListLft2'
                                                : 'drListLft2'
                                        }
                                    >
                                        <img
                                            src={require('assets/virtual_images//bed2.png')}
                                            alt=""
                                            title=""
                                        />
                                        <span>{item.bed}</span>
                                    </Grid>

                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={12}
                                                    className="pat_flow_sec"
                                                >
                                                    <Grid className="drListRght2 setinFullidrh">
                                                        {item.cases?._id ? (
                                                            <Grid className="drRghtIner2">
                                                                <Grid>
                                                                    <S3Image
                                                                        imgUrl={
                                                                            item?.cases?.patient
                                                                                ?.image
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid>
                                                                    <Grid>
                                                                        <label className="spec-bed-profile">
                                                                            {item?.cases?.patient
                                                                                ?.first_name &&
                                                                                item?.cases
                                                                                    ?.patient
                                                                                    ?.first_name}{' '}
                                                                            {item?.cases?.patient
                                                                                ?.last_name &&
                                                                                item?.cases
                                                                                    ?.patient
                                                                                    ?.last_name}
                                                                        </label>
                                                                    </Grid>
                                                                    <Grid>
                                                                        <p className="spec-bed-profile">
                                                                            {item?.cases?.patient
                                                                                ?.alies_id
                                                                                ? item?.cases
                                                                                    ?.patient
                                                                                    ?.alies_id
                                                                                : item?.cases
                                                                                    ?.patient
                                                                                    ?.profile_id}
                                                                        </p>
                                                                    </Grid>
                                                                </Grid>
                                                                {this.props?.roles?.includes("drop_down_patient") &&
                                                                    <Grid className="room-img-move">
                                                                        <img
                                                                            onClick={() =>
                                                                                this.props.handleOpenWarn(
                                                                                    item?.cases
                                                                                )
                                                                            }
                                                                            src={require('assets/images/three_dots_t.png')}
                                                                            alt=""
                                                                            title=""
                                                                        />
                                                                    </Grid>}
                                                            </Grid>
                                                        ) : (
                                                            <Button variant="contained">
                                                                {this.props.Move_patient_here}
                                                            </Button>
                                                            // <span>{item.bed}</span>

                                                        )}
                                                    </Grid>
                                                </Grid>

                                            </div>

                                        )}

                                    </Draggable>
                                </Grid>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
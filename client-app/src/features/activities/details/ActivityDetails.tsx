import React, { useEffect } from "react";
import { Grid } from 'semantic-ui-react'
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetiledInfo from "./ActivityDetailedInfo";
import ActivityDetiledChat from "./ActivityDetailedChat";
import ActivityDetiledSideBar from "./ActivityDetailedSidebar";


export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (!activity) return <LoadingComponent />;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetiledInfo activity={activity} />
                <ActivityDetiledChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetiledSideBar activity={activity} />
            </Grid.Column>
        </Grid>
    )
})


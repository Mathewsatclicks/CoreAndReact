import React, { useEffect } from "react";
import { Grid } from 'semantic-ui-react'
import ActivityList from "./ActivityList";

import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;
    useEffect(() => {
        if (activityRegistry.entries.length === 0)
            activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Activities...' />

    return (
        <Grid>
            <Grid.Column width='10' >
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
}
)
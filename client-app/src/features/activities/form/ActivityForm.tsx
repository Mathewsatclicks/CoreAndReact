import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, Segment, Button } from 'semantic-ui-react'
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';



export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { selectedActivity, createActivity, updateAtivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>({

        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);



    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
        else {
            updateAtivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }

    }

    function handleInputChnage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity....!" />
    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChnage} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChnage} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChnage} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChnage} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChnage} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChnage} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' ></Button>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' ></Button>
            </Form>
        </Segment>
    )
}
)
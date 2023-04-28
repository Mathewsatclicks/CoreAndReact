import React, { ChangeEvent, useState } from "react";
import { Form, Segment, Button } from 'semantic-ui-react'
import { Activity } from "../../../app/layout/models/activity";


interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChnage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }
    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChnage} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChnage} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChnage} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChnage} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChnage} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChnage} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' ></Button>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' ></Button>
            </Form>
        </Segment>
    )
}
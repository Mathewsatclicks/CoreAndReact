import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns'

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activities.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    loadActivities = async () => {
        this.setinitlaLoading(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = new Date(activity.date!);
                this.activities.push(activity)
                this.setinitlaLoading(false);
            });
        } catch (error) {
            console.log(error);
            this.setinitlaLoading(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.activities.find(x => x.id === id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setinitlaLoading(true);
            try {
                activity = await agent.Activities.details(id);
                activity.date = new Date(activity.date!);
                this.activities.push(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setinitlaLoading(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setinitlaLoading(false);
            }
        }
    }

    setinitlaLoading = (status: boolean) => {
        this.loadingInitial = status;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateAtivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {

            await agent.Activities.delete(id);
            this.activities = [...this.activities.filter(a => a.id !== id)];
            this.loading = false;
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}
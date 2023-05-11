import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Photo, Profile } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {

    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loaidng = false;
    loadingFollowings = false;
    followings: Profile[] = [];
    activeTab = 0;


    constructor() {
        makeAutoObservable(this);

        reaction(() => this.activeTab, activeTab => {
            if (activeTab === 3 || activeTab === 4) {
                const predicate = activeTab === 3 ? 'followers' : 'following';
                this.loadFollowing(predicate);
            } else {
                this.followings = [];
            }
        })
    }

    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {

            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    }

    uploadPhoto = async (file: Blob) => {

        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploading = false;
            })
        }

    }

    setMainPhoto = async (photo: Photo) => {
        this.loaidng = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                }
                this.loaidng = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => this.loaidng = false);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loaidng = true;

        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                }
                this.loaidng = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loaidng = false)
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loaidng = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !==
                    store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = { ...this.profile, ...profile as Profile };
                this.loaidng = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loaidng = false);
        }
    }

    updateFollowing = async (username: string, following: boolean) => {

        this.loaidng = true;
        try {

            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username != store.userStore.user?.userName && this.profile.username !== username) {
                    following ? this.profile.followingCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if (this.profile && this.profile.username === store.userStore.user?.userName) {
                    following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.username === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loaidng = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loaidng = false)
        }
    }

    loadFollowing = async (predicate: string) => {

        this.loadingFollowings = true;
        try {
            const follwoings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = follwoings;
                this.loadingFollowings = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => { this.loadingFollowings = false })
        }
    }
}
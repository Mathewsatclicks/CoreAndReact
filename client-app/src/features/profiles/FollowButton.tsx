import React, { SyntheticEvent } from "react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Button, Reveal } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


interface Props {
    profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {

    const { profileStore, userStore } = useStore();
    const { updateFollowing, loaidng } = profileStore;


    if (userStore.user?.userName === profile.username) return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        updateFollowing(username, !profile.following);
    }
    return (
        <>
            <Reveal animated="move" style={{ width: '100%' }} >
                <Reveal.Content visible style={{ width: '100%' }}>
                    <Button fluid
                        color='teal'
                        content={profile.following ? 'Following' : 'Not  following'}
                    ></Button>
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                    <Button
                        fluid
                        basic
                        color={profile.following ? 'red' : 'green'}
                        content={profile.following ? 'Unfollow' : 'Follow'}
                        loading={loaidng}
                        onClick={(e) => handleFollow(e, profile.username)}
                    ></Button>
                </Reveal.Content>
            </Reveal>
        </>
    )
})
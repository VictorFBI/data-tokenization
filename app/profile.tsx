import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Options, {OptionProps} from "@/src/components/profile/ProfileOption";
import {BackgroundView} from "@/src/components/default-elements-overridings/BackgroundView";
import {ProfileHeader} from "@/src/components/profile/ProfileHeader";


export default function ProfileScreen() {
    // Todo: change somehow
    const profileSettingsOptions: OptionProps[] = [
        {
            icon: 'notifications-none',
            label: 'Notifications',
            value: 'On',
        },
        {
            icon: 'key',
            label: 'Change account',
        },
        {
            icon: 'language',
            label: 'Language',
            value: 'English',
        },
    ];
    const sendFeedbackOption: OptionProps[] = [
        {
            icon: 'feedback',
            label: 'Send feedback',
        },
    ]

    return (
        <BackgroundView>
            <SafeAreaView style={{flex: 1, marginHorizontal: 20,}}>
                <ScrollView>
                    <ProfileHeader/>
                    <Options options={profileSettingsOptions}/>
                    <Options options={sendFeedbackOption}/>
                </ScrollView>
            </SafeAreaView>
        </BackgroundView>
    );
}

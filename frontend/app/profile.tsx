import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Options, {OptionProps} from "@/src/components/screens/profile/ProfileOption";
import {BackgroundSafeAreaView, BackgroundView} from "@/src/components/default-elements-overridings/BackgroundView";
import {ProfileHeader} from "@/src/components/screens/profile/ProfileHeader";


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
        <BackgroundSafeAreaView>
            <ScrollView>
                <ProfileHeader/>
                <View style={{gap: 16}}>
                    <Options options={profileSettingsOptions}/>
                    <Options options={sendFeedbackOption}/>
                </View>
            </ScrollView>
        </BackgroundSafeAreaView>
    );
}

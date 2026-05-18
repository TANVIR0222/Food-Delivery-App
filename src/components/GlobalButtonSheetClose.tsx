

import { IconsCloseModal } from '@/assets/Icons';
import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';

interface GlobalButtonSheetCloseProps {
    title: string;
    onClose?: (event: GestureResponderEvent) => void;
}

const GlobalButtonSheetClose: React.FC<GlobalButtonSheetCloseProps> = ({ title, onClose }) => {
    return (
        <View style={tw`pb-4 flex-row items-center justify-between`}>
            <Text style={tw`text-text14 text-headingText font-sfpro-700`}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
                <SvgXml xml={IconsCloseModal} />
            </TouchableOpacity>
        </View>
    );
};

export default GlobalButtonSheetClose;

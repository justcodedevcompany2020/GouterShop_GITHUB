import React from "react";
import { ActivityIndicator } from "react-native";
import { AppColors } from "../styles/AppColors";

export default function Loading(){
    return <ActivityIndicator color={AppColors.GREEN_COLOR} style={{marginTop: 20}} size="large"/>
}
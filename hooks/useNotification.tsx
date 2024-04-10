import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native'; // For platform-specific configuration


type Props = {}

const useNotification = (props: Props) => {
    
  return (
    <View>
      <Text>useNotification</Text>
    </View>
  )
}

export default useNotification

const styles = StyleSheet.create({})
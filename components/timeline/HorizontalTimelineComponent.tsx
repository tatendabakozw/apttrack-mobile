import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

type Props = {
    data: any
}

const HorizontalTimelineComponent = ({data}: Props) => {
  return (
    <View style={tw`flex-row`}>
      {data.map((item:any, index:any) => (
        <View key={index} style={[styles.timelineItem, index === data.length - 1 && styles.lastItem]}>
          <View style={styles.timelineDot} />
          <Text style={styles.timelineText}>{item.title}</Text>
        </View>
      ))}
    </View>
  )
}

export default HorizontalTimelineComponent

const styles = StyleSheet.create({
    timelineItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lastItem: {
      flex: 0,
    },
    timelineDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#3498db', // Adjust the color as needed
      marginRight: 8,
    },
    timelineText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
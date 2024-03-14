import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

type Props = {
    data: any
}

const VerticalTimelineComponent = ({data}: Props) => {
  return (
    <View style={tw`flex-col`}>
      {data.map((item:any, index:number) => (
        <View key={index} style={styles.timelineItem}>
          <View style={styles.timelineDot} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineDescription}>{item.description}</Text>
          </View>
        </View>
        
      ))}
    </View>
  )
}

export default VerticalTimelineComponent

const styles = StyleSheet.create({
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    timelineDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#3498db', // Adjust the color as needed
      marginRight: 8,
      marginTop: 4,
    },
    timelineContent: {
      flex: 1,
    },
    timelineTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    timelineDescription: {
      fontSize: 14,
      color: '#555',
    },
  });
  
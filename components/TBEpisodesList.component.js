import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { getEpisodeInfo } from '../api'

export const TBEpisodesList = (props) => {
    let { episodes } = props;
    const [data, setData] = useState([])
    useEffect(() => {
        if ((episodes || []).length > 0) {
            let arrOfIds = episodes.map(ep => ep.split('/episode/')[1])
            getEpisodeInfo(arrOfIds).then((res) => {
                if (res.status == 200) {
                    setData(res.data)
                }
            })
        }
    }, [episodes]);

    return (
        <>
            {data && (data || []).length > 0 ?
                data.map((ep, index) => {
                    return (
                        <View style={styles.container}>
                            <Text style={styles.epText}>{`Episode ${index + 1}`}</Text>
                            <View style={[styles.row, { marginTop: 12 }]}>
                                <Text style={styles.label}>Name : </Text>
                                <Text style={styles.details}>{ep.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Air Date : </Text>
                                <Text style={styles.details}>{ep.air_date}</Text>
                            </View>
                        </View>
                    )
                })
                : data && data.id ?
                    <View style={styles.container}>
                        <Text style={styles.epText}>{`Episode ${data.id}`}</Text>
                        <View style={[styles.row, { marginTop: 12 }]}>
                            <Text style={styles.label}>Name : </Text>
                            <Text style={styles.details}>{data.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Air Date : </Text>
                            <Text style={styles.details}>{data.air_date}</Text>
                        </View>
                    </View>
                    :
                    null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 16,
        paddingVertical: 16,
        marginTop: 24,
    },
    epText: {
        fontSize: 20,
        fontWeight: '900'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '600'
    },
    details: {
        fontSize: 14,
    }
});
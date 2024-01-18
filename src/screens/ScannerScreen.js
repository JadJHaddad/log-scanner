import { useEffect, useState } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner
} from 'react-native-vision-camera';
import { StyleSheet, View, Text, Button, useWindowDimensions } from 'react-native';
import { useDataContext } from '../context/DataContext';

function ScannerScreen() {

    const { onScan, scanSuccess, syncLocalData } = useDataContext();

    const [scanning, setScanning] = useState(true);
    const [popUp, setPopUp] = useState(false);

    const { hasPermission, requestPermission } = useCameraPermission();
    useEffect(() => {
        if (!hasPermission)
            requestPermission();
    })

    const device = useCameraDevice('back')
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (scanning) {
                setScanning(false);
                onScan(codes)
                setPopUp(true);
            }
        }
    })

    const { height, width } = useWindowDimensions();
    const style = StyleSheet.create({
        popUp: {
            position: 'absolute',
            top: height * 0.35,
            width: width * 0.8,
            height: height * 0.2,
            backgroundColor: 'white',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingHorizontal: '10%'
        },
        popUpText: {
            marginBottom: 10,
            fontSize: 30,
            fontWeight: '700',
            color: scanSuccess ? 'darkgreen' : 'darkred',
            textAlign: 'center',
        }
    })

    return (
        <View style={{
            height: height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {hasPermission ?
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    codeScanner={codeScanner}
                />
                :
                <></>
            }
            {popUp ?
                <View style={style.popUp}>
                    <Text style={style.popUpText}>
                        Scan {scanSuccess ? "Successful" : "Failure"}
                    </Text>
                    <Button title='Scan Again' onPress={() => { setPopUp(false); setScanning(true) }} />
                </View>
                :
                <></>
            }
        </View>
    )
}


export default ScannerScreen;

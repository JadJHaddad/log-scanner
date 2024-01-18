import { useState, useEffect } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner
} from 'react-native-vision-camera';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

function ScannerScreen() {
    const { hasPermission, requestPermission } = useCameraPermission();
    const checkCameraPermissions = () => {
        if (!hasPermission)
            requestPermission();
    }

    useEffect(() => {
        checkCameraPermissions();
    })

    const [scanning, setScanning] = useState(true);
    const device = useCameraDevice('back')
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (scanning) {
                if (codes[0].value == "secretphrase") {
                    const newCheck = { uid, type: lastState == 'in' ? 'out' : 'in', time: Date.now() };
                    if (online) {
                        onlineChecks.push(newCheck);
                    } else {
                        offlineChecks.push(newCheck);
                    }
                    setLastState(lastState == 'in' ? 'out' : 'in');
                }
                setScanning(false);
                console.log("onlineChecks", onlineChecks);
            }
        }
    })
    const { height } = useWindowDimensions();
    return (
        <View style={{
            height: height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />
        </View>
    )
}

export default ScannerScreen;

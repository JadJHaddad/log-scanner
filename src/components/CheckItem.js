import { View, Text } from "react-native";

const CheckItem = ({ time, type }) => {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return (
        <View>
            <Text>{formattedTime}</Text>
            <Text>{type}</Text>
        </View>
    )
};

export default CheckItem;

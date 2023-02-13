import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useCheckConnectivity = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        NetInfo.fetch()
            .then((state) => {
                setIsConnected(state.isConnected || true);
            })
            .catch();
    }, []);

    return { isConnected };
};

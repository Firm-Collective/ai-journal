import React, {createContext, PropsWithChildren, useContext} from 'react';
import {useNetInfo, NetInfoStateType} from '@react-native-community/netinfo';

type NetworkData = {
  type: NetInfoStateType;
  isConnected: boolean | null;
};

const NetworkContext = createContext<NetworkData>({
  type: NetInfoStateType.unknown,
  isConnected: null,
});

export default function NetworkProvider({children}: PropsWithChildren) {
  const {type, isConnected} = useNetInfo();
  return (
    <NetworkContext.Provider value={{type, isConnected}}>
      {children}
    </NetworkContext.Provider>
  );
}

export const useNet = () => useContext(NetworkContext);

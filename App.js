import React, { useEffect, useRef } from 'react';
import { StatusBar, SafeAreaView } from 'react-native'
import Routing from './Routing';


console.disableYellowBox = true;
StatusBar.setHidden(false);
// StatusBar.setBackgroundColor(Assets.colors.grayBg);


const App = () => {
    const navigatorRef = useRef(null);
    const popupRef = useRef(null);

 


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#242424', height:500 }}>
            <Routing ref={navigatorRef} />
        </SafeAreaView>
    )

}

export default App;

import {Dimensions, PixelRatio} from 'react-native';

let {width, height} = Dimensions.get('window');

export const widthToDp = widthNumber => {
    let mapWidth = typeof widthNumber === 'number' ? widthNumber : parseFloat(widthNumber);
    return PixelRatio.roundToNearestPixel((width * mapWidth) / 100);

};

export const heightToDp = heightNumber => {
    let mapHeight = typeof heightNumber === 'number' ? heightNumber : parseFloat(heightNumber);
    return PixelRatio.roundToNearestPixel((height * mapHeight) / 100);

};

const listenToOrientationChanges = ref => {
    Dimensions.addEventListener('change', (newDim) => {
        width = newDim.screen.width;
        height = newDim.screen.height;

        ref.setState({
            orientation: height > width ? 'portrait' : 'landscape',
        });

    });
};

const removeOrientationChanges = () => {
    Dimensions.removeEventListener('change');
};

export default {widthToDp, heightToDp, listenToOrientationChanges, removeOrientationChanges};

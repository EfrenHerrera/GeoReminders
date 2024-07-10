import { Dimensions, PixelRatio, Platform } from 'react-native';
import Constants from 'expo-constants'

const { width, height: height2 } = Dimensions.get('window')

const height =  Platform.OS === "ios" ? height2 : height2 + Constants.statusBarHeight;

const widthPercentageToDP = (widthPercent: string | number) => {
  if (typeof widthPercent === 'number') {
    widthPercent = widthPercent.toString();
  }
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(width * elemWidth / 100);
};

const heightPercentageToDP = (heightPercent: string | number) => {
  if (typeof heightPercent === 'number') {
    heightPercent = heightPercent.toString();
  }
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(height * elemHeight / 100);
};

const fontSizeResponsive = (size: number) => {
  const scale = width / 320;
  const newSize = size * scale 

  if (Platform.OS === 'ios') return Math.round(PixelRatio.roundToNearestPixel(newSize))
  else return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

const isIphoneX =
  Platform.OS === "ios" && !Platform.isPad && !Platform.isTV && 
  (height === 812 || width === 812 || height === 896 || width === 896)

const isAndroid = Platform.OS === 'android'

export {
  widthPercentageToDP,
  heightPercentageToDP,
  fontSizeResponsive,
  isIphoneX,
  width, 
  height,
  isAndroid
};

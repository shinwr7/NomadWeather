import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Vibration, Button } from 'react-native';
import MapView from 'react-native-maps';

// 초기에는 공홈에서 많은 컴포넌트 지원했지만, 유지관리가 어렵고 앱이 무거워져서 서드파티 패키지를 이용하도록 권장했다. 
// Expo 팀의  Expo-sdk 의 컴포넌트를 사용하도록 !! 
export default function App() {
  return (
    // view 는 기본값으로 Flex 성질 가짐
    // web과 다르게 기본 direction이 column 임 
    // 높이, 넓이 고정값 주는 것은 위험함. 스크린 사이즈가 다양하기때문
  
    //flex = 1 이라는건 비율이라고 생각하셈. 한 화면에서 그것이 가지는 비율을 설정하는것
    // 부모와 자식의 비율.
    
    <View style={{flex:1}}>      
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      <View style={{flex:5, backgroundColor:"teal"}}></View>
      <View style={{flex:1, backgroundColor:"orange"}}></View>           
    </View>
  );
}

// StyleSheet.create 쓰는 이유? 
// 자동완성 가능(css 종류)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:28,
    color:'black',
    
  },
  map: {
    width: '100%',
    height: '100%',
  },


});

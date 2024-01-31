import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Vibration,
  Button,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";

// 초기에는 공홈에서 많은 컴포넌트 지원했지만, 유지관리가 어렵고 앱이 무거워져서 서드파티 패키지를 이용하도록 권장했다.
// Expo 팀의  Expo-sdk 의 컴포넌트를 사용하도록 !!
// view 는 기본값으로 Flex 성질 가짐
// web과 다르게 기본 direction이 column 임
// 높이, 넓이 고정값 주는 것은 위험함. 스크린 사이즈가 다양하기때문

//flex = 1 이라는건 비율이라고 생각하셈. 한 화면에서 그것이 가지는 비율을 설정하는것
// 부모와 자식의 비율.

// Dimensions = 화면의 넓이, 높이  가져올수있음

/* ScrollView 는 스크롤 가능하도록 만들어주는 컴포넌트 horizontal
  수평스크롤 pagingEnabled 설정하면, 스크롤할때마다 한 페이지가 변경되는
  것처럼 효과 넣어줌 showHorizontalScrollIndicator false 설정하면 하단에
  뜨는 인디케이터 숨김 */

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "";
export default function App() {
  const [city, setCity] = useState("loading...");
  const [days, setDays] = useState([]);

  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=alerts&APPID=${API_KEY}&units=metric`
      // "https://openweathermap.org/current"
    );
    const { list } = await response.json();
    const filteredList = list.filter(({ dt_txt }) =>
      dt_txt.endsWith("00:00:00")
    );
    setDays(filteredList);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((day, index) => {
            return (
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Text style={styles.description}>{day.weather[0].main}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

// StyleSheet.create 쓰는 이유?
// 자동완성 가능(css 종류)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  text: {
    fontSize: 28,
    color: "black",
  },
  city: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    backgroundColor: "tomato",
  },
  day: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 158,
    color: "black",
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});

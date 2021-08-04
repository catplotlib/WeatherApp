import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";

const App = () => {
  const video = React.useRef(null);
  const [current, setCurrent] = useState([]);
  const [condition, setCondition] = useState("");
  const [bg, setBg] = useState("4");
  const [loading, setLoading] = useState(true);
  const [tom, setTom] = useState();
  const [over, setOver] = useState();
  const [loc, setLoc] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    getWeather();
  }, []);
  let time = 0;
  const getWeather = async () => {
    try {
      const response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=fe853923e27040abba493833210408&q=Kolkata&days=3&aqi=no&alerts=no"
      );
      const weather = await response.json();
      setLoc(weather.location.name);
      setCurrent(weather.current.temp_c);
      setCondition(weather.current.condition.text);
      let t = weather.location.localtime;
      setTom(weather.forecast.forecastday[0].day.avgtemp_c);
      setOver(weather.forecast.forecastday[1].day.avgtemp_c);
      time = Number(t.slice(-5, -3));
    } catch (error) {
      console.error(error);
    }
    // time = 7;
    if (time >= 18) {
      setBg({ uri: "https://i.ibb.co/j3hnrS8/3.png" });
    }
    if (time >= 0) {
      setBg({ uri: "https://i.ibb.co/j3hnrS8/3.png" });
    }
    if (time > 5 && time < 8) {
      setBg({ uri: "https://i.ibb.co/MZcgh0b/1.png" });
    }
    if (time > 9 && time < 19) {
      setBg({ uri: "https://i.ibb.co/6BpQ8Gx/2.png" });
    }
  };

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: windowWidth, height: windowHeight }}>
          {loading === false ? (
            <>
              <ImageBackground source={bg} style={styles.container}>
                <View style={styles.current}>
                  <View>
                    <View>
                      <Text style={styles.temp}>{current}°</Text>
                    </View>

                    <Text style={styles.condition}>{condition}</Text>
                    <Text style={styles.location}>{loc}</Text>
                  </View>

                  <View style={styles.forecast}>
                    <View style={[styles.tom, styles.line]}>
                      <Text style={styles.fut}>Tomorrow</Text>
                      <Text style={styles.fut}>{tom}°</Text>
                    </View>
                    <View style={styles.tom}>
                      <Text style={styles.fut}>Overmorrow</Text>
                      <Text style={styles.fut}>{over}°</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </>
          ) : (
            <ImageBackground
              source={require("./assets/4.gif")}
              style={styles.container}
            >
              <View></View>
            </ImageBackground>
          )}
        </View>
        <View></View>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  current: {
    // borderStyle: "solid",
    // borderWidth: 4,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  temp: {
    color: "white",
    marginLeft: 22,
    fontSize: 60,
    marginTop: 100,
  },
  condition: {
    color: "white",
    fontSize: 32,
    textAlign: "center",
  },
  location: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  forecast: {
    display: "flex",
    width: 400,
    // borderStyle: "solid",
    // borderWidth: 4,
    color: "white",
    fontSize: 32,
    paddingBottom: 30,
  },
  fut: {
    color: "white",
    fontSize: 24,
    padding: 20,
  },
  line: {
    borderBottomColor: "white",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  tom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

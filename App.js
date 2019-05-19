import React from "react";
import { View, Text, Animated, Dimensions, PanResponder } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const SWIPE_THRESHOLD = -180;

const WIDTH_LEFT = SCREEN_WIDTH * 0.6;
const WIDTH_RIGHT = SCREEN_WIDTH * 0.4;
const SLIDER_POSITION_TOP = SCREEN_HEIGHT * 0.75;
class App extends React.PureComponent {
  state = {
    recentWidthLeft: WIDTH_LEFT,
    recentWidthRight: WIDTH_RIGHT
  };

  constructor(props) {
    super(props);

    this._widthLeft = new Animated.Value(WIDTH_LEFT);
    this._widthRight = new Animated.Value(WIDTH_RIGHT);

    this._position = new Animated.ValueXY();

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gesture) => {
        Animated.parallel([
          Animated.timing(this._widthLeft, {
            toValue: gesture.moveX,
            duration: 100
          }),
          Animated.timing(this._widthRight, {
            toValue: SCREEN_WIDTH - gesture.moveX,
            duration: 100
          })
        ]).start();
      },
      onPanResponderRelease: (event, gesture) => {
        if (-gesture.dx < SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (-gesture.dx > -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });
  }

  resetPosition = () => {
    Animated.parallel([
      Animated.spring(this._widthLeft, {
        toValue: this.state.recentWidthLeft
      }),
      Animated.spring(this._widthRight, {
        toValue: this.state.recentWidthRight
      })
    ]).start();
  };

  forceSwipe = direction => {
    if (direction === "left") {
      Animated.parallel([
        Animated.spring(this._widthLeft, {
          toValue: WIDTH_RIGHT
          // duration: 100
        }),
        Animated.spring(this._widthRight, {
          toValue: WIDTH_LEFT
          // duration: 100
        })
      ]).start(() =>
        this.setState({
          recentWidthLeft: WIDTH_RIGHT,
          recentWidthRight: WIDTH_LEFT
        })
      );
    } else if (direction === "right") {
      Animated.parallel([
        Animated.spring(this._widthLeft, {
          toValue: WIDTH_LEFT
          // duration: 100
        }),
        Animated.spring(this._widthRight, {
          toValue: WIDTH_RIGHT
          // duration: 100
        })
      ]).start(() =>
        this.setState({
          recentWidthLeft: WIDTH_LEFT,
          recentWidthRight: WIDTH_RIGHT
        })
      );
    } else {
      this.resetPosition();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Animated.View
          style={[
            {
              flexGrow: 1,
              width: this._widthLeft
            }
          ]}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#beeef7",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Text>One</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          scrollEventThrottle={1}
          style={{
            flexGrow: 1,
            width: this._widthRight
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#D2F3E0",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                height: 50,
                width: 50,
                position: "absolute",
                left: -25,
                top: SLIDER_POSITION_TOP,
                backgroundColor: "#6c5ce7"
              }}
              {...this._panResponder.panHandlers}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                &#60;-&#62;
              </Text>
            </View>
            <View>
              <Text>two</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default App;

import React from "react";
import { View, Text, Animated, Dimensions, PanResponder } from "react-native";

import PropTypes from "prop-types";

// import { Haptic } from "expo";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const SWIPE_THRESHOLD = 180;

class SliderAnimation extends React.PureComponent {
  constructor(props) {
    super(props);
    const { leftScreenRatio, rightScreenRatio, sliderTopRatio } = this.props;

    this.WIDTH_LEFT = SCREEN_WIDTH * leftScreenRatio;
    this.WIDTH_RIGHT = SCREEN_WIDTH * rightScreenRatio;
    this.SLIDER_POSITION_TOP = SCREEN_HEIGHT * sliderTopRatio;

    this._widthLeft = new Animated.Value(this.WIDTH_LEFT);
    this._widthRight = new Animated.Value(this.WIDTH_RIGHT);

    this._position = new Animated.ValueXY();
    this.state = {
      recentWidthLeft: this.WIDTH_LEFT,
      recentWidthRight: this.WIDTH_RIGHT,
      showRightContent: false,
      showLeftContent: false
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gesture) => {
        this.setState({
          showLeftContent: false,
          showRightContent: false
        });
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
        console.log(gesture.dx);
        // if (gesture.dx < SWIPE_THRESHOLD) {
        //   this.forceSwipe("right");
        // } else if (-gesture.dx > SWIPE_THRESHOLD) {
        //   this.forceSwipe("left");
        // } else {
        //   this.resetPosition();
        // }
      }
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  resetPosition = () => {
    const { recentWidthLeft, recentWidthRight } = this.state;
    const { showLeftContent, showRightContent } = this.state;

    if (showLeftContent) {
      this.setState({ showLeftContent: true });
    }
    if (showRightContent) {
      this.setState({ showRightContent: true });
    }
    console.log("reset position");
    Animated.parallel([
      Animated.spring(this._widthLeft, {
        toValue: recentWidthLeft
      }),
      Animated.spring(this._widthRight, {
        toValue: recentWidthRight
      })
    ]).start();
  };

  forceSwipe = direction => {
    if (direction === "left") {
      this.setState({
        showLeftContent: false,
        showRightContent: false
      });
      Animated.parallel([
        Animated.spring(this._widthLeft, {
          toValue: this.WIDTH_RIGHT
          // duration: 100
        }),
        Animated.spring(this._widthRight, {
          toValue: this.WIDTH_LEFT
          // duration: 100
        })
      ]).start(() =>
        this.setState({
          recentWidthLeft: this.WIDTH_RIGHT,
          recentWidthRight: this.WIDTH_LEFT,
          showRightContent: true
        })
      );
    } else if (direction === "right") {
      this.setState({
        showLeftContent: false,
        showRightContent: false
      });
      Animated.parallel([
        Animated.spring(this._widthLeft, {
          toValue: this.WIDTH_LEFT
          // duration: 100
        }),
        Animated.spring(this._widthRight, {
          toValue: this.WIDTH_RIGHT
          // duration: 100
        })
      ]).start(() =>
        this.setState({
          recentWidthLeft: this.WIDTH_LEFT,
          recentWidthRight: this.WIDTH_RIGHT,
          showLeftContent: true
        })
      );
    } else {
      this.resetPosition();
    }
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const { comp } = this.props;
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
            <View>{this.state.showLeftContent ? comp[0] : null}</View>
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
                top: this.SLIDER_POSITION_TOP,
                backgroundColor: "#6c5ce7"
              }}
              {...this._panResponder.panHandlers}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                &#60;-&#62;
              </Text>
            </View>
            <View>{this.state.showRightContent ? comp[1] : null}</View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

SliderAnimation.propTypes = {
  leftScreenRatio: PropTypes.number,
  rightScreenRatio: PropTypes.number,
  sliderTopRatio: PropTypes.number
};
SliderAnimation.defaultProps = {
  leftScreenRatio: 0.6,
  rightScreenRatio: 0.4,
  sliderTopRatio: 0.75
};
export default SliderAnimation;

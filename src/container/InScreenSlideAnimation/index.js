import React from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity
} from "react-native";

import PropTypes from "prop-types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

class SliderAnimation extends React.PureComponent {
  constructor(props) {
    super(props);
    const { leftScreenRatio, rightScreenRatio, sliderTopRatio } = this.props;

    this.WIDTH_LEFT = SCREEN_WIDTH * leftScreenRatio;
    this.WIDTH_RIGHT = SCREEN_WIDTH * rightScreenRatio;
    this.SLIDER_POSITION_TOP = SCREEN_HEIGHT * sliderTopRatio;
    this.SWIPE_THRESHOLD = SCREEN_WIDTH / 2;
    this._widthLeft = new Animated.Value(this.WIDTH_LEFT);
    this._widthRight = new Animated.Value(this.WIDTH_RIGHT);

    this._opacityLeft = new Animated.Value(1);
    this._opacityRight = new Animated.Value(0);

    this._position = new Animated.ValueXY();
    this.state = {
      recentWidthLeft: this.WIDTH_LEFT,
      recentWidthRight: this.WIDTH_RIGHT,
      showRightContent: false,
      showLeftContent: true
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gesture) => {
        if (this.state.showLeftContent) {
          Animated.timing(this._opacityLeft, {
            toValue: 0,
            duration: 400
          }).start(() => this.setState({ showLeftContent: false }));
        }
        if (this.state.showRightContent) {
          Animated.timing(this._opacityRight, {
            toValue: 0,
            duration: 400
          }).start(() => this.setState({ showRightContent: false }));
        }
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
        if (gesture.dx > 0) {
          if (gesture.dx < this.state.recentWidthRight) {
            this.forceSwipe("right");
          } else {
            this.resetPosition();
          }
        }
        if (gesture.dx < 0) {
          if (-gesture.dx > this.state.recentWidthLeft / 2) {
            this.forceSwipe("left");
          } else {
            this.resetPosition();
            return 0;
          }
        }
      }
    });
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
      this.setState(
        {
          showRightContent: true
        },
        () => {
          Animated.timing(this._opacityRight, {
            toValue: 1,
            duration: 200
          }).start();
        }
      );
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
          recentWidthRight: this.WIDTH_LEFT
        })
      );
    } else if (direction === "right") {
      this.setState(
        {
          showLeftContent: true
        },
        () => {
          Animated.timing(this._opacityLeft, {
            toValue: 1,
            duration: 200
          }).start();
        }
      );

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
          recentWidthRight: this.WIDTH_RIGHT
        })
      );
    } else {
      this.resetPosition();
    }
  };

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
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              {this.state.showLeftContent ? (
                <Animated.View
                  style={{
                    opacity: this._opacityLeft,
                    flex: 1
                  }}
                >
                  {comp[0]}
                </Animated.View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#eee"
                  }}
                />
              )}
            </View>
          </View>
        </Animated.View>
        <Animated.View
          scrollEventThrottle={1}
          style={{
            flexGrow: 1,
            // borderLeftColor: "#007aff",
            // borderLeftWidth: 1,
            width: this._widthRight,
            backgroundColor: this.state.showRightContent ? "white" : "#eee"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                height: 25,
                width: 25,
                position: "absolute",
                left: -12.5,
                top: this.SLIDER_POSITION_TOP,
                backgroundColor: "#f34573",
                zIndex: 10
              }}
              {...this._panResponder.panHandlers}
            >
              <View
                style={{
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                  height: 10,
                  width: 10,
                  backgroundColor: "white"
                }}
              />
            </Animated.View>
            <View
              style={{
                flex: 1,
                // justifyContent: "center"
                alignItems: "center"
              }}
            >
              {this.state.showRightContent ? (
                <Animated.View
                  style={{
                    opacity: this._opacityRight,
                    // justifyContent: "center",
                    // alignItems: "center",
                    flex: 1
                  }}
                >
                  {comp[1]}
                </Animated.View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white"
                  }}
                />
              )}
            </View>
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
  leftScreenRatio: 0.8,
  rightScreenRatio: 0.2,
  sliderTopRatio: 0.77
};
export default SliderAnimation;

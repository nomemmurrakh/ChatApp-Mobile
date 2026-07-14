import React, { Component } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Custom LinearGradient component that accepts individual animated color props
class CustomLinearGradient extends Component<any> {
  // Generate colors array from individual animatedColor props
  _generateColorsArray(props: any): string[] {
    const propsKeys = Object.keys(props);
    const colorsArray: string[] = [];

    // Sort keys to ensure proper color order
    const sortedKeys = propsKeys
      .filter(key => key.indexOf('animatedColor') !== -1 && props[key])
      .sort((a, b) => {
        const indexA = parseInt(a.replace('animatedColor', ''));
        const indexB = parseInt(b.replace('animatedColor', ''));
        return indexA - indexB;
      });

    sortedKeys.forEach((key) => {
      colorsArray.push(props[key]);
    });

    return colorsArray;
  }

  render() {
    const { children, ...props } = this.props;
    const colorsArray = this._generateColorsArray(props);
    
    // Remove animatedColor props and use the generated colors array
    const cleanProps = { ...props };
    Object.keys(cleanProps).forEach(key => {
      if (key.indexOf('animatedColor') !== -1) {
        delete cleanProps[key];
      }
    });

    return (
      <LinearGradient {...cleanProps} colors={colorsArray.length > 0 ? colorsArray : props.colors || ['transparent']}>
        {children}
      </LinearGradient>
    );
  }
}

// Create animated version with better performance settings
const AnimatedLinearGradient = Animated.createAnimatedComponent(CustomLinearGradient);

export interface AnimationConfig {
  duration?: number;
  easing?: (value: number) => number;
}

export interface AnimatedGradientTransitionProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  animation?: AnimationConfig;
  onAnimationComplete?: () => void;
}

interface State {
  colors: string[];
  prevColors: string[];
  animatedColors: Animated.Value[];
  isAnimating: boolean;
}

class AnimatedGradientTransition extends Component<AnimatedGradientTransitionProps, State> {
  static defaultProps: Partial<AnimatedGradientTransitionProps> = {
    animation: {
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Material Design standard easing
    },
  };

  private animationRef: Animated.CompositeAnimation | null = null;
  private mounted = true;

  constructor(props: AnimatedGradientTransitionProps) {
    super(props);

    this.state = {
      colors: props.colors,
      prevColors: props.colors,
      animatedColors: props.colors.map(() => new Animated.Value(1)), // Start at 1 (complete)
      isAnimating: false,
    };
  }

  componentDidUpdate(prevProps: AnimatedGradientTransitionProps) {
    if (this._colorsChanged(prevProps.colors, this.props.colors)) {
      this._animateToNewColors();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.animationRef) {
      this.animationRef.stop();
    }
  }

  _colorsChanged(oldColors: string[], newColors: string[]): boolean {
    if (oldColors.length !== newColors.length) return true;
    return !newColors.every((color, index) => color === oldColors[index]);
  }

  _animateToNewColors = () => {
    if (this.state.isAnimating) {
      // If already animating, stop current animation first
      if (this.animationRef) {
        this.animationRef.stop();
      }
    }

    const { animation, onAnimationComplete } = this.props;
    
    this.setState(
      (prevState) => {
        let animatedColors = prevState.animatedColors;

        // Adjust number of animated values if needed
        if (animatedColors.length !== this.props.colors.length) {
          animatedColors = this.props.colors.map(() => new Animated.Value(0));
        } else {
          // Reset existing values and stop any ongoing animations
          animatedColors.forEach((animatedColor) => {
            animatedColor.stopAnimation();
            animatedColor.setValue(0);
          });
        }

        return {
          colors: this.props.colors,
          prevColors: prevState.colors,
          animatedColors,
          isAnimating: true,
        };
      },
      () => {
        this._startColorAnimation(onAnimationComplete);
      }
    );
  };

  _startColorAnimation = (onComplete?: () => void) => {
    const { animation } = this.props;
    const { animatedColors } = this.state;

    // Create staggered animation for smoother visual effect
    const animations = animatedColors.map((animatedColor, index) => {
      return Animated.timing(animatedColor, {
        toValue: 1,
        duration: animation?.duration ?? 500,
        delay: index, // Slight stagger for visual appeal
        easing: animation?.easing ?? Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false, // Color animations require JS driver
      });
    });

    this.animationRef = Animated.parallel(animations);

    this.animationRef.start((finished) => {
      if (!this.mounted) return;
      
      this.setState({ isAnimating: false });
      
      if (finished && onComplete) {
        onComplete();
      }
      this.animationRef = null;
    });
  };

  _getColorSafely(colors: string[], index: number): string {
    return colors[index] || colors[colors.length - 1] || 'transparent';
  }

  _getInterpolatedColors(): Animated.AnimatedInterpolation<string>[] {
    const { colors, prevColors, animatedColors } = this.state;

    return animatedColors.map((animatedColor, index) => {
      const prevColor = this._getColorSafely(prevColors, index);
      const currentColor = this._getColorSafely(colors, index);

      return animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: [prevColor, currentColor],
        extrapolate: 'clamp',
      });
    });
  }

  _generateColorsProps(interpolatedColors: Animated.AnimatedInterpolation<string>[]): Record<string, any> {
    const props: Record<string, any> = {};

    interpolatedColors.forEach((interpolateColor, index) => {
      props[`animatedColor${index}`] = interpolateColor;
    });

    return props;
  }

  render() {
    const { children, colors, animation, onAnimationComplete, ...otherProps } = this.props;
    const interpolatedColors = this._getInterpolatedColors();
    const animatedColorsProps = this._generateColorsProps(interpolatedColors);

    return (
      <AnimatedLinearGradient 
        {...otherProps} 
        {...animatedColorsProps}
        colors={colors} // Fallback for initial render
        pointerEvents="box-none"
      >
        {children}
      </AnimatedLinearGradient>
    );
  }
}

export default AnimatedGradientTransition;
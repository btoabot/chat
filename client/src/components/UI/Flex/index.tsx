import React, { CSSProperties, ForwardedRef } from 'react';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface FlexProps {
  children?: React.ReactNode;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: number | string;
  wrap?: boolean;
  inline?: boolean;
  flex?: string | number;
  style?: CSSProperties;
  className?: string;
  role?: string;
  'data-test'?: string;
}

const Flex = React.forwardRef(function Flex(props: FlexProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    children,
    direction = 'row',
    align = 'stretch',
    justify = 'flex-start',
    gap = 0,
    wrap = false,
    inline = false,
    flex,
    style,
    className,
    role,
    ...rest
  } = props;

  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;

  const styleWithGap: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: gapValue,
    flex,
    ...style,
  };

  return (
    <div ref={ref} role={role} className={className} style={styleWithGap} {...rest}>
      {children}
    </div>
  );
});

export default Flex;

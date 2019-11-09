import {
  css,
  CSSObject,
  FlattenInterpolation,
  Interpolation,
  InterpolationFunction,
  ThemedStyledProps,
} from "styled-components";

type Theme = {};
/**
 * Type of custom css interpolator.
 */
type MediaFunction = <P extends object>(
  first:
    | TemplateStringsArray
    | CSSObject
    | InterpolationFunction<ThemedStyledProps<P, Theme>>,
  ...interpolations: Array<Interpolation<ThemedStyledProps<P, Theme>>>
) => FlattenInterpolation<ThemedStyledProps<P, Theme>>;

const phoneWidth = 578;

export const phone: MediaFunction = (...args) => css`
  @media (max-width: ${phoneWidth}px) {
    ${css(...args)};
  }
`;

export const notPhone: MediaFunction = (...args) => css`
  @media (min-width: ${phoneWidth + 1}px) {
    ${css(...args)};
  }
`;

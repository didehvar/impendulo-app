import { keyframes, styled, Block, BlockProps } from 'reakit';
import { ifProp, palette } from 'styled-tools';

export interface SpinnerProps extends BlockProps {
  large?: boolean;
  small?: boolean;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const Spinner = styled(Block)<SpinnerProps>`
  animation: ${spin} infinite 1s linear;
  border: 2px solid ${palette('primary')};
  border-bottom-color: transparent;
  border-radius: 100%;
  width: ${ifProp('large', 20, ifProp('small', 12, 16))}px;
  height: ${ifProp('large', 20, ifProp('small', 12, 16))}px;
`;

export default Spinner;

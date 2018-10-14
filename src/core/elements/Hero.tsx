import { styled, Flex, FlexProps } from 'reakit';
import { ifProp } from 'styled-tools';

export interface HeroProps extends FlexProps {
  fullHeight?: boolean;
}

const Hero = styled(Flex)<HeroProps>`
  min-height: ${ifProp('fullHeight', '100vh', 'auto')};
`;

export default Hero;

import * as React from 'react';
import Slider from 'react-slick';

import Card from './card';
import { content } from './content';
import styled from '@styled-components';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};
  padding: ${({ theme }) => theme.boxes.padding.section.medium};
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Heading = styled.h2`
  text-align: center;
  padding: 1em;
`;

const Testimonial: React.FC = () => {
  const ref = React.useRef<Slider | null>(null);

  return (
    <Wrapper>
      <Heading>Member Testimonials</Heading>
      <Slider
        autoplay
        autoplaySpeed={5000}
        dots
        infinite
        arrows={false}
        vertical={false}
        slidesToScroll={3}
        slidesToShow={3}
        ref={(v) => (ref.current = v)}
        responsive={[
          {
            breakpoint: 975,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
        ]}
      >
        {content.map((v) => (
          <Card key={v.author} {...v} />
        ))}
      </Slider>
    </Wrapper>
  );
};

export default Testimonial;

import React from 'react';

import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children?: ReactNode;
  titleButton?: ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <div className="card__title">
        {props.title}

        {props.titleButton && props.titleButton}
      </div>
      <div className="card__content">{props.children}</div>
    </div>
  );
};

export default Card;

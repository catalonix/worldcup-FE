import { ReactNode } from 'react';

interface SearchBoxProps {
  title: string;
  children?: ReactNode;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <div className="search-box">
      <div className="search-box__title">{props.title}</div>
      <div className="search-box__content">{props.children}</div>
    </div>
  );
};

export default SearchBox;

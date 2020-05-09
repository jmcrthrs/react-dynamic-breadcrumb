import React, { useLayoutEffect, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import "./styles.css";

const Seperator = () => <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>;

const Crumb = ({ id, onClick, name, hideSeperator, canClick = true }) => {
  const Element = canClick ? "a" : "span"; // is this acceptable?
  return (
    <strong>
      <Element
        onClick={() => {
          onClick(id);
        }}
        href="#"
      >
        {name}
      </Element>
      {!hideSeperator && <Seperator />}
    </strong>
  );
};

/*
  renderItem({
    item: objecz,
    isFinalCrumb: bool,
    hideSeperator: bool
  })
*/
function Crumbs({ items, width, renderItem }) {
  const breadcrumbRef = useRef(null);
  const [maxNumberOfCrumbs, setMaxNumberOfCrumbs] = useState(items.length - 1);

  useLayoutEffect(() => {
    /* 
        reset whenever the length of breadcrumbs, 
        or the width of the container changes
      */
    setMaxNumberOfCrumbs(items.length - 1);
  }, [items.length, width]);

  useLayoutEffect(() => {
    /*
        if the breadcrumbs overflow their container, remove a breadcrumb and try again
      */
    if (
      breadcrumbRef.current.scrollWidth > breadcrumbRef.current.offsetWidth &&
      maxNumberOfCrumbs > 1 //ensure 1 crumb is always displayed
    ) {
      setMaxNumberOfCrumbs(maxNumberOfCrumbs - 1);
    }
  }, [maxNumberOfCrumbs, width]);

  // get the last crumbs to display
  const firstCrumb = items.slice(0, 1)[0];
  const sliceIndex = items.length - maxNumberOfCrumbs;
  const visibleCrumbs = items.slice(sliceIndex);
  const hiddenCrumbs = items.slice(1, sliceIndex);

  return (
    <div className="breadcrumb" ref={breadcrumbRef} style={{ width }}>
      <span>
        {renderItem({
          item: firstCrumb,
          isFinalCrumb: false,
          hideSeperator: hiddenCrumbs.length > 0
        })}
        {hiddenCrumbs.length > 0 && (
          <small
            style={{
              background: "green",
              padding: 5
            }}
          >
            {hiddenCrumbs.slice(0).map((item, index) =>
              renderItem({
                item: item,
                isFinalCrumb: false,
                hideSeperator: index === hiddenCrumbs.length - 1
              })
            )}
          </small>
        )}
        {visibleCrumbs.map((item, index) => {
          const isFinalCrumb = index === visibleCrumbs.length - 1;
          return renderItem({
            item: item,
            isFinalCrumb: isFinalCrumb,
            hideSeperator: isFinalCrumb
          });
        })}
      </span>
    </div>
  );
}

const items = [
  {
    Id: 1,
    Name: "first"
  },
  {
    Id: 2,
    Name: "the second crumb"
  },
  {
    Id: 3,
    Name: "the thuird crumb is longer"
  },
  {
    Id: 4,
    Name: "the fourth crumb is even longer"
  },
  {
    Id: 5,
    Name: "the fifth"
  },
  {
    Id: 6,
    Name: "the last crumb is going to be very long to see how it truncates"
  }
];

const AutoSizedBreadcrumb = props => (
  <AutoSizer disableHeight>
    {({ width }) => <Crumbs width={width} {...props} />}
  </AutoSizer>
);

export default function App() {
  return (
    <div className="App">
      <AutoSizedBreadcrumb
        items={items.slice(0, 6)}
        renderItem={({ item, hideSeperator, isFinalCrumb }) => (
          <Crumb
            key={item.Id}
            id={item.Id}
            name={item.Name}
            hideSeperator={hideSeperator}
            canClick={!isFinalCrumb}
          />
        )}
      />
    </div>
  );
}

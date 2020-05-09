import React from "react";
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

function Crumbs({
  items,
  onClick,
  spaceId,
  spaceType,
  maxNumberOfCrumbs = 300
}) {
  //const maxNumberOfCrumbs = 300;
  const numberOfLastCrumbs = maxNumberOfCrumbs;

  if (items.length <= maxNumberOfCrumbs) {
    return (
      <>
        {items.map((item, index) => (
          <Crumb
            hideSeperator={index === items.length - 1}
            key={item.Id}
            id={item.Id}
            onClick={onClick}
            name={item.Name}
            spaceId={spaceId}
            spaceType={spaceType}
            canClick={index !== items.length - 1}
          />
        ))}
      </>
    );
  }
  // get the last crumbs to display
  const firstCrumb = items.slice(0, 1)[0];
  const lastCrumb = items.slice(items.length - 1);
  const visibleCrumbs = items.slice(items.length - numberOfLastCrumbs);
  const hiddenCrumbs = items.slice(1, items.length - numberOfLastCrumbs);
  return (
    <span>
      <Crumb
        hideSeperator={hiddenCrumbs.length > 0}
        key={firstCrumb.Id}
        id={firstCrumb.Id}
        name={firstCrumb.Name}
        spaceId={spaceId}
        spaceType={spaceType}
        onClick={onClick}
      />
      {hiddenCrumbs.length > 0 && (
        <small
          style={{
            background: "green",
            padding: 5
          }}
        >
          {hiddenCrumbs.slice(0).map(item => (
            <Crumb
              hideSeperator
              key={item.Id}
              id={item.Id}
              name={item.Name}
              spaceId={spaceId}
              onClick={onClick}
            />
          ))}
        </small>
      )}
      {visibleCrumbs.map((item, index) => (
        <Crumb
          hideSeperator={index === visibleCrumbs.length - 1}
          key={item.Id}
          id={item.Id}
          onClick={onClick}
          name={item.Name}
          spaceId={spaceId}
          spaceType={spaceType}
          canClick={index !== visibleCrumbs.length - 1}
        />
      ))}
      <Crumb
        hideSeperator
        key={lastCrumb.Id}
        id={lastCrumb.Id}
        name={lastCrumb.Name}
        spaceId={spaceId}
        spaceType={spaceType}
        onClick={onClick}
      />
    </span>
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

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Crumbs items={items} maxNumberOfCrumbs={0} />
      <br />
      <br />
      <Crumbs items={items} maxNumberOfCrumbs={1} />
      <br />
      <br />
      <Crumbs items={items} maxNumberOfCrumbs={2} />
      <br />
      <br />
      <Crumbs items={items} maxNumberOfCrumbs={3} />
      <br />
      <br />
      <Crumbs items={items} maxNumberOfCrumbs={4} />
      <br />
      <br />
      <Crumbs items={items} maxNumberOfCrumbs={5} />
      <br />
      <br />
      <Crumbs items={items} maxNumberOfCrumbs={6} />
      <br />
      <br />
    </div>
  );
}

import React from "react";
import Header from "./header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

it("contains 3 nav links", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  //   console.log(numLinks.debug());
  expect(numLinks).toBe(3);
});

it("contains 3 nav links via mount", () => {
  const numLinks = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  //   console.log(numLinks.debug());
  expect(numLinks).toBe(3);
});

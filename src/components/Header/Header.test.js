/* eslint-disable no-undef */
import React from "react";
import { createRoot } from "react-dom/client";
import { shallow } from "enzyme";
import Header from ".";

describe("<Header />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Header />);
    root.unmount(div);
  });

  it("renders correctly", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  /* React 17 is not supported by Enzyme: https://github.com/enzymejs/enzyme/issues/2429 
  it("contains h1", () => {
    const wrapper = mount(<Header />);
    const value = wrapper.find("h1").text();
    expect(value).toEqual("Jammming");
  });
  */
});

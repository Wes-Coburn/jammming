/* eslint-disable no-undef */
import React from "react";
import { createRoot } from "react-dom/client";
import { shallow } from "enzyme";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<App />);
    root.unmount(div);
  });

  it("renders correctly", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  /*
  it("calls componentDidMount", () => {
    jest.spyOn(App.prototype, "componentDidMount");
    shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
  });

  
  it("contains h4", () => {
    const wrapper = mount(<Profile user={user} />);
    const value = wrapper.find("h4").text();
    expect(value).toEqual("John Doe");
  });

  it("accepts user props", () => {
    const wrapper = mount(<Profile user={user} />);
    expect(wrapper.props().user).toEqual(user);
  });
  */
});

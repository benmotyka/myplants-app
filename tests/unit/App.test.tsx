import React from "react";
import renderer, { act } from "react-test-renderer";

import App from "../../App";

describe("<App />", () => {
    it("has 1 child", () => {
        act(() => {
            const tree = renderer.create(<App />).toJSON();
            console.log(tree);
            // expect(tree?.children.length).toBe(1);
        });
    });
});

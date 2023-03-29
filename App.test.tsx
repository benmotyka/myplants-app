jest.useFakeTimers();
import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

jest.mock("@expo-google-fonts/inter", () => {
    return {
        useFonts: () => {
            return [true];
        },
    };
});

jest.mock("sentry-expo", () => {
    return {
        init: () => {},
    };
});

describe("<App />", () => {
    it("has 1 child", async () => {
        const tree = renderer.create(<App />).toJSON();
        console.log(tree);
        // @ts-ignore
        expect(tree.length).toBe(2);
    });
});

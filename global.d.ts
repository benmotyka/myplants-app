import "react";

// React 19's @types/react moved the JSX namespace out of the global scope.
// This restores bare `JSX.Element` usage across the codebase instead of
// rewriting every occurrence to `React.JSX.Element`.
declare global {
    namespace JSX {
        interface Element extends React.JSX.Element {}
    }
}

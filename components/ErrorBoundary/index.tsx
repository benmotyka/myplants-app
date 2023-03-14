import React from "react";
import Sentry from "@sentry/react-native";
import { View } from "react-native";

interface Props {
    children: React.ReactNode;
}
interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: unknown) {
        Sentry.captureException(error);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <View></View>;
        }
        return children;
    }
}

export default ErrorBoundary;

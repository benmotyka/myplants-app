import React from "react";
import Sentry from "@sentry/react-native";
import { ExplosionImage, Wrapper } from "./styles";
import { Description, SmallHeader } from "styles/shared";

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

    // componentDidCatch(error: unknown, errorInfo: unknown) {
    //     Sentry.captureException(error);
    // }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Wrapper>
                    <ExplosionImage
                        source={require("../../assets/explosion.png")}
                    />
                    <SmallHeader>Something went wrong.</SmallHeader>
                    <Description>Please try to restart the app.</Description>
                </Wrapper>
            );
        }
        return children;
    }
}

export default ErrorBoundary;

import React from "react";
import Sentry from "@sentry/react-native";
import { Description, SmallHeader } from "styles/shared";
import i18n from "config/i18n";
import { ExplosionImage, Wrapper } from "./styles";

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
        const { t } = i18n;

        if (hasError) {
            return (
                <Wrapper>
                    <ExplosionImage
                        source={require("../../assets/explosion.png")}
                    />
                    <SmallHeader>{t('components.errorBoundary.header')}</SmallHeader>
                    <Description>{t('components.errorBoundary.description')}</Description>
                </Wrapper>
            );
        }
        return children;
    }
}

export default ErrorBoundary;

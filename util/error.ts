import Sentry from "@sentry/react-native"

export const handleError = (error: unknown) => {
    Sentry.captureException(error);
}
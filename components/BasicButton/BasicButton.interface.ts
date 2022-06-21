export interface BasicButtonProps {
    text: string;
    onPress: (...args: any[]) => void;
    warning?: boolean;
    important?: boolean;
}
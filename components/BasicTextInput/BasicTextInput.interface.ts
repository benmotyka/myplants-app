export interface BasicTextInputProps {
  value?: string;
  label?: string;
  onChangeText: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  placeholder?: string;
  textarea?: boolean;
  hideInput?: boolean;
  error?: string;
  showErrorMessage?: boolean;
}
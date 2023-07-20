import React from "react";
import Checkbox from "expo-checkbox";

import { Container, CheckboxLabel } from "./styles";

interface Props {
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  label: string;
}

const BasicCheckbox = ({
  isChecked,
  setChecked,
  label,
}: Props): JSX.Element => {
  return (
    <Container>
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
      />
      <CheckboxLabel>{label}</CheckboxLabel>
    </Container>
  );
};

export default BasicCheckbox;

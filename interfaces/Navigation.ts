import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "interfaces/RootStackParamList";

export interface Navigation {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    string | undefined
  >;
}

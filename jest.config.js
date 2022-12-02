module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|@sentry/.*|native-base|react-native-svg|@miblanchard/react-native-slider|moti)",
  ],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    "^assets/(.*)": ["<rootDir>/assets/$1"],
    "^components/(.*)": ["<rootDir>/components/$1"],
    "^config/(.*)": ["<rootDir>/config/$1"],
    "^interfaces/(.*)": ["<rootDir>/interfaces/$1"],
    "^schemas/(.*)": ["<rootDir>/schemas/$1"],
    "^screens/(.*)": ["<rootDir>/screens/$1"],
    "^store/(.*)": ["<rootDir>/store/$1"],
    "^styles/(.*)": ["<rootDir>/styles/$1"],
    "^util/(.*)": ["<rootDir>/util/$1"],
    "^enums/(.*)": ["<rootDir>/enums/$1"],
    "^providers/(.*)": ["<rootDir>/providers/$1"],
    "^services/(.*)": ["<rootDir>/services/$1"],
    "^hooks/(.*)": ["<rootDir>/hooks/$1"],
  },
};

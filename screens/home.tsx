import React, { useEffect, useState } from "react";
import { FlatList, BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, UserInfo } from "interfaces";
import PlantPreview from "components/Plant";
import { numberOfColumns } from "components/Plant/styles";
import AddPlantSuggestion from "components/AddPlantSuggestion";
import HomeSettings from "components/HomeSettings";
import { ScreenContainer } from "styles/shared";
import {
  useAppConfigStore,
  useModalsStore,
  usePlantsPersistentStore,
  useUserInfoPersistentStore,
} from "store";
import { getPlants } from "services/plant";
import i18n from "config/i18n";
import { isNewUpdate, shouldShowRateAppModal } from "utils";
import NewUpdateModal from "modals/NewUpdate";
import RateAppModal from "modals/RateApp";
import HelpModal from "modals/Help";
import { registerForPushNotificationsAsync } from "hooks/useNotifications";
import { updateUserInfo } from "services/user";
import * as Localization from "expo-localization";
import * as Device from "expo-device";
import { showToast } from "utils/toast";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const { t } = i18n;
  const persistentPlantsStore = usePlantsPersistentStore((state) => state);
  const isHelpModalOpen = useModalsStore((state) => state.isHelpModalOpen);
  const ephemeralAppConfig = useAppConfigStore.ephemeral((state) => state);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showRateAppModal, setShowRateAppModal] = useState(false);
  const [dataSource, setDataSource] = useState(
    persistentPlantsStore.userPlants
  );
  const isFocused = useIsFocused();
  const { setUserInfo, data: cachedUserInfo } = useUserInfoPersistentStore(
    (state) => state
  );
  const { isRateAppModalShown } = useAppConfigStore.persistent(
    (state) => state
  );

  useEffect(() => {
    if (!isFocused) return;

    getPlants()
      .then(({ plants }) => {
        persistentPlantsStore.setUserPlants(plants);
        setDataSource(plants);
        if (!isRateAppModalShown)
          setShowRateAppModal(!!shouldShowRateAppModal(plants.length));
      })
      .catch(() => {
        showToast({
          text1: t("errors.general"),
          text2: t("errors.generalDescription"),
          type: "error",
        });
      });

    if (!ephemeralAppConfig.isClosedUpdateModal) {
      isNewUpdate().then((result) => setShowUpdateModal(!!result));
    }

    // Workaround for devices with hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    const userInfo: UserInfo = {
      deviceLanguage: Localization.locale || "UNKNOWN",
      deviceInfo: Device.modelName || "UNKNOWN",
    };

    registerForPushNotificationsAsync()
      .then((expoPushToken) => {
        userInfo.pushNotificationToken = expoPushToken;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // Check if user info has changed and if it has, update it in the database and cache
        if (JSON.stringify(cachedUserInfo) !== JSON.stringify(userInfo)) {
          updateUserInfo(userInfo)
            .then(() => setUserInfo(userInfo))
            .catch((error) => console.error(error));
        }
      });

    return () => backHandler.remove();
  }, [isFocused]);

  const onCloseUpdateModal = () => {
    ephemeralAppConfig.setIsClosedUpdateModal(true);
    setShowUpdateModal(false);
  };

  return (
    <ScreenContainer>
      {!dataSource.length ? (
        <AddPlantSuggestion />
      ) : (
        <FlatList
          data={dataSource}
          renderItem={({ item }) => {
            return (
              <PlantPreview
                id={item.id}
                name={item.name}
                imgSrc={item.imgSrc}
                navigation={navigation}
                latestWatering={item.latestWatering}
                reminderFrequency={item.wateringReminderFrequency}
              />
            );
          }}
          numColumns={numberOfColumns}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
      <HomeSettings navigation={navigation} />
      <NewUpdateModal
        showModal={showUpdateModal}
        toggleModal={setShowUpdateModal}
        onClose={onCloseUpdateModal}
      />
      <RateAppModal
        showModal={showRateAppModal}
        toggleModal={setShowRateAppModal}
      />
      {isHelpModalOpen ? <HelpModal /> : null}
    </ScreenContainer>
  );
};

export default HomeScreen;

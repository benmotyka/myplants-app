import React, { useEffect, useState } from "react";
import { FlatList, BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces";
import PlantPreview from "components/Plant";
import { numberOfColumns } from "components/Plant/styles";
import AddPlantSuggestion from "components/AddPlantSuggestion";
import HomeSettings from "components/HomeSettings";
import { Plant } from "interfaces";
import { ScreenContainer } from "styles/shared";
import {
  usePlantsStore,
  useToastStore,
  useAppConfigStore,
  useModalsStore,
  usePlantsPersistentStore,
} from "store";
import { getPlants } from "services/plant";
import i18n from "config/i18n";
import { isNewUpdate, shouldShowRateAppModal } from "utils";
import NewUpdateModal from "modals/NewUpdate";
import RateAppModal from "modals/RateApp";
import HelpModal from "modals/Help";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const { t } = i18n;
  const persistentPlantsStore = usePlantsPersistentStore((state) => state);
  const setUserPlants = usePlantsStore((store) => store.setUserPlants);
  const displayToast = useToastStore((state) => state.showToast);
  const isHelpModalOpen = useModalsStore((state) => state.isHelpModalOpen);
  const ephemeralAppConfig = useAppConfigStore.ephemeral((state) => state);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showRateAppModal, setShowRateAppModal] = useState(false);
  const [dataSource, setDataSource] = useState<Plant[]>(
    persistentPlantsStore.userPlants
  );
  const isFocused = useIsFocused();

  const { isRateAppModalShown } = useAppConfigStore.persistent(
    (state) => state
  );

  const sortPlantsByCreatedAt = (plants: Plant[]): Plant[] =>
    plants.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  useEffect(() => {
    if (!isFocused) return;

    getPlants()
      .then(({ plants }) => {
        const sortedPlants = sortPlantsByCreatedAt(plants);
        persistentPlantsStore.setUserPlants(sortedPlants);
        setUserPlants(sortedPlants);
        setDataSource(sortedPlants);
        if (!isRateAppModalShown)
          setShowRateAppModal(shouldShowRateAppModal(plants.length));
      })
      .catch(() => {
        displayToast({ text: t("errors.general"), type: "error" });
      });

    if (!ephemeralAppConfig.isClosedUpdateModal) {
      isNewUpdate().then((result) => setShowUpdateModal(!!result));
    }

    // Workaround for devices with hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

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

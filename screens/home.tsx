import React, { useEffect, useState } from "react";
import { FlatList, BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces/RootStackParamList";
import PlantPreview from "components/Plant/Plant";
import { numberOfColumns } from "components/Plant/styles";
import AddPlantSuggestion from "components/AddPlantSuggestion";
import HomeSettings from "components/HomeSettings";
import BasicModal from "components/BasicModal";
import { ModalHeader, ModalItem } from "components/BasicModal/styles";
import BasicButton from "components/BasicButton";
import { Plant } from "interfaces/Plant";
import { LoaderWrapper, ScreenContainer } from "styles/shared";
import Loader from "components/Loader";
import { usePlantsStore, useToastStore } from "store";
import { getPlants } from "services/plant";
import i18n from "config/i18n";
import { isNewUpdate, redirectToStore } from "util/app";

type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: HomeProps): JSX.Element => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataSource, setDataSource] = useState<Plant[]>();
  const [allowScrolling, setAllowScrolling] = useState(true);
  const isFocused = useIsFocused();

  const { t } = i18n;
  const setUserPlants = usePlantsStore((store) => store.setUserPlants);
  const displayToast = useToastStore((state) => state.showToast);

  const getUserPlants = async () => {
    try {
      return await getPlants();
    } catch (error) {
      displayToast({ text: t("errors.general"), type: "error" });
      return {
        plants: [],
      };
    }
  };

  const sortPlantsByCreatedAt = (plants: Plant[]): Plant[] =>
    plants.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  useEffect(() => {
    if (!isFocused) return;

    getUserPlants().then(({ plants }) => {
      const sortedPlants = sortPlantsByCreatedAt(plants);
      setUserPlants(sortedPlants);
      setDataSource(sortedPlants);
    });

    isNewUpdate().then((result) => setShowUpdateModal(result));

    // Workaround for devices with hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, [isFocused]);

  const redirectToUpdate = () => {
    redirectToStore()
    setShowUpdateModal(false);
  };

  return (
    <ScreenContainer>
      {dataSource ? (
        <>
          <FlatList
            data={dataSource}
            renderItem={({ item }) => {
              return (
                <PlantPreview
                  id={item.id}
                  name={item.name}
                  imgSrc={item.imgSrc}
                  navigation={navigation}
                  onSlidingStart={() => setAllowScrolling(false)}
                  onSlidingFinish={() => setAllowScrolling(true)}
                  latestWatering={item.latestWatering}
                  reminderFrequency={item.wateringReminderFrequency}
                />
              );
            }}
            numColumns={numberOfColumns}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            scrollEnabled={allowScrolling}
          />
          {!dataSource.length ? <AddPlantSuggestion /> : null}
        </>
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <HomeSettings navigation={navigation} />
      <BasicModal showModal={showUpdateModal} toggleModal={setShowUpdateModal}>
        <ModalItem>
          <ModalHeader>{t("pages.homepage.newUpdateHeader")}</ModalHeader>
        </ModalItem>
        <ModalItem>
          <BasicButton
            onPress={redirectToUpdate}
            text={t("common.update")}
            important
          />
        </ModalItem>
      </BasicModal>
    </ScreenContainer>
  );
};

export default HomeScreen;

import { useState } from "react";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import {
  Text,
  View,
  Alert,
  Modal,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {
  const [showQRCode, setShowQRCode] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInUrl) {
        await Share.share({
          message: badgeStore.data?.checkInUrl,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao compartilhar a credencial.");
    }
  }

  async function handleSelectAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao selecionar a imagem.");
    }
  }

  if (!badgeStore.data?.checkInUrl) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          onAvatarChange={handleSelectAvatar}
          onShowQRCode={() => setShowQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 8,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 500,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>
        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do evento{" "}
          {badgeStore.data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10 "
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowQRCode(false)}
          >
            <QRCode value="testw" size={300} />
            <Text className="text-base text-orange-500 font-bold text-center mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

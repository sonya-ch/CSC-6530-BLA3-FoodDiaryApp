
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import myStyle from "../assets/styles/myStyle";

// Change this to your computer's LAN IP when using Expo Go on a phone.
const API_URL = "http://192.168.0.98:3000/api/profiles";

export default function Profile({ onBack }) {
  const [profileId, setProfileId] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load profiles");
      }

      const profiles = await response.json();

      // Load the first profile for this initial prototype.
      if (profiles.length > 0) {
        const profile = profiles[0];

        setProfileId(profile.id);
        setUsername(profile.username || "");
        setName(profile.name || "");
        setSex(profile.sex || "");
        setWeight(
          profile.weight_kg != null
            ? String(profile.weight_kg)
            : ""
        );
        setHeight(
          profile.height_cm != null
            ? String(profile.height_cm)
            : ""
        );
      }
    } catch (error) {
      console.error("Load profile error:", error);
      Alert.alert(
        "Connection Error",
        "Could not load the profile. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!username.trim() || !name.trim()) {
      Alert.alert("Missing Information", "Username and Name are required.");
      return;
    }

    const weightValue = weight.trim() === "" ? null : Number(weight);
    const heightValue = height.trim() === "" ? null : Number(height);

    if (
      (weightValue !== null &&
        (!Number.isFinite(weightValue) || weightValue <= 0)) ||
      (heightValue !== null &&
        (!Number.isFinite(heightValue) || heightValue <= 0))
    ) {
      Alert.alert(
        "Invalid Information",
        "Weight and height must be positive numbers."
      );
      return;
    }

    const profileData = {
      username: username.trim(),
      name: name.trim(),
      sex: sex || null,
      weight_kg: weightValue,
      height_cm: heightValue,
    };

    try {
      setSaving(true);

      const response = await fetch(
        profileId
          ? `${API_URL}/${profileId}`
          : API_URL,
        {
          method: profileId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not save profile");
      }

      setProfileId(result.id);
      Alert.alert("Success", "Profile saved successfully.");
    } catch (error) {
      console.error("Save profile error:", error);
      Alert.alert("Save Failed", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6B3E4B" />
      </View>
    );
  }

  return (
    <ScrollView style={myStyle.container}>
      <View style={myStyle.profileHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={myStyle.profileBack}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={myStyle.profileTitle}>My Profile</Text>
      </View>

      <View style={myStyle.profileForm}>
        <Text style={myStyle.formLabel}>Username *</Text>
        <TextInput
          style={myStyle.formInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          autoCapitalize="none"
        />

        <Text style={myStyle.formLabel}>Name *</Text>
        <TextInput
          style={myStyle.formInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={myStyle.formLabel}>Sex</Text>
        <View style={myStyle.profileSexRow}>
          {["Female", "Male", "Other"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                myStyle.profileSexButton,
                sex.toLowerCase() === option.toLowerCase() &&
                  myStyle.profileSexSelected,
              ]}
              onPress={() =>
                setSex(
                  sex.toLowerCase() === option.toLowerCase()
                    ? ""
                    : option.toLowerCase()
                )
              }
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={myStyle.formLabel}>Weight (kg)</Text>
        <TextInput
          style={myStyle.formInput}
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g. 65"
          keyboardType="decimal-pad"
        />

        <Text style={myStyle.formLabel}>Height (cm)</Text>
        <TextInput
          style={myStyle.formInput}
          value={height}
          onChangeText={setHeight}
          placeholder="e.g. 165"
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          style={myStyle.profileSaveButton}
          onPress={saveProfile}
          disabled={saving}
        >
          <Text style={myStyle.profileSaveText}>
            {saving ? "Saving..." : "Save Profile"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


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


// ------- IP - ipconfig ---
import API_URL from "./src/config/api";
 


export default function Profile({ onBack }) {

    //----- State Variables -----
  const [profileId, setProfileId] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


const weightNumber = Number(weight);
const heightNumber = Number(height);
const ageNumber = Number(age);


// ----- Calculate BMI -----
    const hasValidBMI =
    weight.trim() !== "" &&
    height.trim() !== "" &&
    Number.isFinite(weightNumber) &&
    Number.isFinite(heightNumber) &&
    weightNumber > 0 &&
    heightNumber > 0;

    const bmi = hasValidBMI
    ? weightNumber / Math.pow(heightNumber / 100, 2)
    : null;

    const activityFactors = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
    };

    let bmr = null;

    if (
    hasValidBMI &&
    age.trim() !== "" &&
    Number.isFinite(ageNumber) &&
    ageNumber > 0
    ) {
    if (sex === "male") {
        bmr = 10 * weightNumber + 6.25 * heightNumber - 5 * ageNumber + 5;
    } else if (sex === "female") {
        bmr = 10 * weightNumber + 6.25 * heightNumber - 5 * ageNumber - 161;
    }
    }

// -- TDEE - Mifflin–St Jeor (Only M and FM, if Other = not calculated)
    const tdee =
    bmr !== null
        ? Math.round(bmr * activityFactors[activityLevel])
        : null;




  //----- Effect Hooks -----
  useEffect(() => {
    loadProfile();
  }, []);

  //----- Load Profile Function -----
  const loadProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/profiles`);

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
        setAge(
          profile.age != null
            ? String(profile.age)
            : ""
        );
        setActivityLevel(
          profile.activity_level || "sedentary"
        );
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
      age: age.trim() === "" ? null : Number(age),
      activity_level: activityLevel,
    };

    try {
      setSaving(true);

      const response = await fetch(
      profileId
        ? `${API_URL}/api/profiles/${profileId}`
        : `${API_URL}/api/profiles`,
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

        <Text style={myStyle.formLabel}>Age</Text>
        <TextInput
        style={myStyle.formInput}
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        keyboardType="numeric"
        />

       
        <Text style={myStyle.formLabel}>Activity Level</Text>
        {[
        { label: "Sedentary", value: "sedentary" },
        { label: "Lightly Active", value: "lightly_active" },
        { label: "Moderately Active", value: "moderately_active" },
        { label: "Very Active", value: "very_active" },
        { label: "Extra Active", value: "extra_active" },
        ].map((option) => (

            <TouchableOpacity
            key={option.value}
            style={[
            myStyle.profileActivityButton,
            activityLevel === option.value &&
                myStyle.profileActivitySelected,
            ]}
            onPress={() => setActivityLevel(option.value)}
            >
            <Text>{option.label}</Text>
            </TouchableOpacity>

        ))}

{/* ----------- BMI & TDEE ----------- */}
        <View style={myStyle.profileResultCard}>
            <Text style={myStyle.profileResultTitle}>
                Your Health Metrics
            </Text>

            <Text style={myStyle.profileResultLabel}>BMI</Text>
            <Text style={myStyle.profileResultValue}>
                {bmi !== null ? bmi.toFixed(1) : "--"}
            </Text>

            <Text style={myStyle.profileResultLabel}>
                Estimated Daily Calories (TDEE)
            </Text>
            <Text style={myStyle.profileResultValue}>
                {tdee !== null ? `${tdee} kcal/day` : "--"}
            </Text>

            {tdee === null && (
                <Text style={myStyle.profileResultHint}>
                Enter your age, weight, height, and sex to estimate TDEE.
                </Text>
            )}
        </View>
        
        {/* ----------- Save Button ----------- */}
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

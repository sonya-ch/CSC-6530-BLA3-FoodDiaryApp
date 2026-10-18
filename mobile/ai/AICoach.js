
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import myStyle from "../../assets/styles/myStyle";

export default function AICoach({ onBack }) {

  const [message, setMessage] = useState(""); // State for the current message input by the user

  const [messages, setMessages] = useState([ // State for the list of chat messages
    {
      id: "1",
      role: "ai",
      text: "Hi! 👋 I'm your ByteBurn Nutrition AI Coach.\n\n What would you like to know?",
    },
  ]);

  const quickQuestions = [ // Suggested quick questions for the user to ask the AI Coach
    "How many calories should I eat today?",
    "What should I eat for my next meal?",
    "How can I get more protein?",
    "Help me understand my food choices",
  ];


// ---- Function, handles sending a message to the AI Coach and updating the chat messages.
  const sendMessage = (text) => { 
    const trimmedText = text.trim();

    if (!trimmedText) return;

    setMessages((previous) => [
      ...previous,
      { // User's message
        id: Date.now().toString(),
        role: "user",
        text: trimmedText,
      },
      { // AI Coach's response message
        id: `${Date.now()}-reply`,
        role: "ai",
        text:
          "Thanks for your question! 💗 AI Coach is currently being developed. Soon, I'll be able to use your Food Diary and Profile to provide personalized nutrition guidance.",
      },
    ]);

    setMessage(""); // Clear the input field after sending the message
  };

  return (

    <KeyboardAvoidingView // keyboard appears
      style={{ flex: 1, backgroundColor: "#FFF8FB" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={myStyle.profileHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={myStyle.profileBack}> ← Back</Text>
        </TouchableOpacity>

        <Text style={myStyle.profileTitle}>🤖 AI Coach</Text>

      </View>


      {/* Chat Messages */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((item) => (
          <View
            key={item.id}
            style={{
              alignSelf:
                item.role === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                item.role === "user" ? "#E8A9C5" : "#FFFFFF",
              padding: 12,
              borderRadius: 16,
              marginBottom: 12,
              maxWidth: "85%",
              borderWidth: 1,
              borderColor: "#F0DCE5",
            }}
          >
            <Text style={{ fontSize: 14, lineHeight: 21 }}>
              {item.text}
            </Text>
          </View>
        ))}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                color: "#725564",
              }}
            >
              Try asking 💡
            </Text>

            {quickQuestions.map((question) => (
              <TouchableOpacity
                key={question}
                onPress={() => sendMessage(question)}
                style={{
                  padding: 12,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#DDA5BE",
                  backgroundColor: "#FFFFFF",
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: "#80516A" }}>
                  {question}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Message Input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          borderTopWidth: 1,
          borderTopColor: "#F0DCE5",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "#FFF3F8",
            borderRadius: 22,
            paddingHorizontal: 16,
            paddingVertical: 10,
            maxHeight: 100,
          }}
          placeholder="Ask your AI Coach..."
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          onPress={() => sendMessage(message)}
          style={{
            backgroundColor: "#D98DB0",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 22,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

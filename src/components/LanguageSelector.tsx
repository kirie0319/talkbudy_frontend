import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Dropdown from './Dropdown';
import { getDisplayLanguages } from '../utils/languageManager';
import { styles } from '../styles/AppStyles';
import { useAppStore } from '../stores/appStore';

export default function LanguageSelector() {
  const { languageA, languageB, setLanguageA, setLanguageB, swapLanguages } = useAppStore();
  return (
    <View style={styles.languageSelectorCard}>
      <View style={styles.languageRow}>
        <View style={styles.languageContainer}>
          <Dropdown
            options={getDisplayLanguages()}
            selectedValue={languageA}
            onValueChange={setLanguageA}
            placeholder="Select Language"
            enableSearch={false}
          />
        </View>

        <TouchableOpacity
          style={styles.swapButton}
          onPress={swapLanguages}
        >
          <Text style={styles.swapButtonText}>⇄</Text>
        </TouchableOpacity>

        <View style={styles.languageContainer}>
          <Dropdown
            options={getDisplayLanguages()}
            selectedValue={languageB}
            onValueChange={setLanguageB}
            placeholder="Select Language"
            enableSearch={false}
          />
        </View>
      </View>
    </View>
  );
} 
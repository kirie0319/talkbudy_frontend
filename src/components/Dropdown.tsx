import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius, shadows } from '../utils/theme';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
}

export default function Dropdown({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  enableSearch = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);
  const maxHeight = enableSearch ? 350 : 300;

  useEffect(() => {
    if (searchQuery) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options]);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      if (isOpen && enableSearch) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    });
  }, [isOpen, enableSearch]);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleSelect = (value: string) => {
    console.log('[Dropdown] Option selected:', value);
    onValueChange(value);
    setIsOpen(false);
    setSearchQuery('');
  };

  const toggleDropdown = () => {
    console.log('[Dropdown] Toggle dropdown clicked, current state:', isOpen);
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchQuery('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdownButton, isOpen && styles.dropdownButtonOpen]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Animated.Text
          style={[
            styles.dropdownIcon,
            {
              transform: [{
                rotate: animatedHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              }],
            },
          ]}
        >
          ▼
        </Animated.Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdownContent,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, maxHeight],
            }),
            opacity: animatedHeight,
          },
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        {enableSearch && isOpen && (
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {filteredOptions.length === 0 && isOpen ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No languages found</Text>
            <Text style={styles.noResultsSubtext}>
              Try searching with different keywords
            </Text>
          </View>
        ) : (
          isOpen && (
            <ScrollView
              style={styles.optionsList}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {filteredOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.option,
                    item.value === selectedValue && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === selectedValue && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 9999,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    minHeight: 48,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  dropdownButtonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: colors.borderLight,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#e9ecef',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    zIndex: 10000,
    ...shadows.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.background,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  clearButtonText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '600',
  },
  noResultsContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  noResultsSubtext: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
  optionsList: {
    maxHeight: 250,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  selectedOption: {
    backgroundColor: colors.background,
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.text,
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: colors.primary,
  },
  checkmark: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },
}); 
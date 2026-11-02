import React from 'react';
import { Tabs } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Home, Flame, BookOpen, Landmark, Globe } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useLanguage } from '@/context/LanguageContext';
import { TempleLogo } from '@/components/TempleLogo';

function HeaderLogo() {
  return (
    <View style={styles.headerLogoContainer}>
      <TempleLogo size="header" showChant={false} variant="light" />
    </View>
  );
}

function HeaderLanguageButton() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <TouchableOpacity
      style={styles.headerLangBtn}
      onPress={toggleLanguage}
      activeOpacity={0.8}
    >
      <Globe size={13} color="#D97706" />
      <Text style={styles.headerLangText}>
        {language === 'ml' ? 'English' : 'മലയാളം'}
      </Text>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const { isMalayalam } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D97706',
        tabBarInactiveTintColor: '#78716C',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F0EBE1',
          borderTopWidth: 1,
          paddingBottom: 6,
          height: 60,
          elevation: 6,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F0EBE1',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
        headerLeft: () => <HeaderLogo />,
        headerRight: () => <HeaderLanguageButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: isMalayalam ? 'ദർശനം' : 'Sanctum',
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: isMalayalam ? 'വഴിപാടുകൾ' : 'Vazhipadu',
          tabBarIcon: ({ color }) => <Flame size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: isMalayalam ? 'പ്രാർത്ഥനകൾ' : 'Prayers',
          tabBarIcon: ({ color }) => <BookOpen size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: isMalayalam ? 'ക്ഷേത്രവിവരം' : 'About',
          tabBarIcon: ({ color }) => <Landmark size={21} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLogoContainer: {
    marginLeft: 14,
  },
  headerLangBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 14,
    gap: 5,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  headerLangText: {
    color: '#B45309',
    fontSize: 11,
    fontWeight: '800',
  },
});

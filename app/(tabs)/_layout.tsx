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
      <TempleLogo size="header" showChant={false} />
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
      <Globe size={13} color="#FCD34D" />
      <Text style={styles.headerLangText}>
        {language === 'ml' ? 'English' : 'മലയാളം'}
      </Text>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isMalayalam } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#A8A29E',
        tabBarStyle: {
          backgroundColor: '#1C1917',
          borderTopColor: 'rgba(217, 119, 6, 0.25)',
          paddingBottom: 6,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#1C1917',
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
    backgroundColor: 'rgba(217, 119, 6, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 14,
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.4)',
  },
  headerLangText: {
    color: '#FCD34D',
    fontSize: 11,
    fontWeight: '800',
  },
});

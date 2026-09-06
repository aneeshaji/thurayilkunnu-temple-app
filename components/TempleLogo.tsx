import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Svg, { G, Path, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useLanguage } from '@/context/LanguageContext';

export function SacredVelEmblem({ size = 32 }: { size?: number }) {
  return (
    <Svg viewBox="0 0 100 100" width={size} height={size}>
      <Defs>
        <LinearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFE89C" />
          <Stop offset="50%" stopColor="#F2C96B" />
          <Stop offset="100%" stopColor="#D9A62E" />
        </LinearGradient>
      </Defs>

      <G
        fill="none"
        stroke="url(#goldLineGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer Crescent Moon Cradle Accent */}
        <Path
          d="M 30,32 C 26,46 36,64 50,70 C 64,64 74,46 70,32 C 66,46 58,57 50,61 C 42,57 34,46 30,32 Z"
          strokeWidth="1.5"
          opacity={0.75}
        />

        {/* Sacred Vel Blade Contour */}
        <Path
          d="M 50,8
             C 54,16 60,24 66,32
             C 71,40 73,48 70,56
             C 67,64 59,70 54,74
             L 54,82
             L 46,82
             L 46,74
             C 41,70 33,64 30,56
             C 27,48 29,40 34,32
             C 40,24 46,16 50,8 Z"
        />

        {/* Central Ridge Spine */}
        <Line x1="50" y1="12" x2="50" y2="82" strokeWidth="1.8" />

        {/* Sacred Thripundra Lines */}
        <Line x1="42" y1="36" x2="58" y2="36" strokeWidth="1.5" opacity={0.9} />
        <Line x1="40" y1="41" x2="60" y2="41" strokeWidth="1.5" opacity={0.9} />
        <Line x1="42" y1="46" x2="58" y2="46" strokeWidth="1.5" opacity={0.9} />

        {/* Sacred Kumkum Circle Accent */}
        <Circle cx="50" cy="41" r="2.2" fill="url(#goldLineGrad)" stroke="none" />

        {/* Handle Base & Knob */}
        <Line x1="50" y1="82" x2="50" y2="94" strokeWidth="2.2" />
        <Circle cx="50" cy="94" r="2.8" fill="url(#goldLineGrad)" stroke="none" />
      </G>
    </Svg>
  );
}

interface TempleLogoProps {
  size?: 'header' | 'hero' | 'card' | 'receipt';
  showChant?: boolean;
  onPress?: () => void;
  style?: any;
}

export function TempleLogo({
  size = 'hero',
  showChant = true,
  onPress,
  style,
}: TempleLogoProps) {
  const { isMalayalam } = useLanguage();

  const isHeader = size === 'header';
  const isReceipt = size === 'receipt';
  const isCard = size === 'card';

  const badgeSize = isHeader ? 36 : isReceipt ? 48 : isCard ? 42 : 48;
  const velSize = isHeader ? 26 : isReceipt ? 34 : isCard ? 30 : 34;

  const content = (
    <View style={[styles.container, style]}>
      {/* Sacred Vel Emblem Badge (matching website .logo-emblem-badge) */}
      <View
        style={[
          styles.emblemBadge,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
          },
        ]}
      >
        <SacredVelEmblem size={velSize} />
      </View>

      {/* Regal Typography Block (matching website .logo-text-block) */}
      <View style={styles.textBlock}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.titleMain,
              isHeader && styles.titleMainHeader,
              isReceipt && styles.titleMainReceipt,
            ]}
            numberOfLines={1}
          >
            {isMalayalam ? 'തുറയിൽകുന്ന്' : 'THURAYILKUNNU'}
          </Text>
          <Text
            style={[
              styles.titleSree,
              isHeader && styles.titleSreeHeader,
            ]}
          >
            {isMalayalam ? 'ശ്രീ' : 'SREE'}
          </Text>
        </View>

        <Text
          style={[
            styles.subtitle,
            isHeader && styles.subtitleHeader,
          ]}
          numberOfLines={1}
        >
          {isMalayalam
            ? 'സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം'
            : 'SUBRAMANYA SWAMI TEMPLE'}
        </Text>

        {showChant && !isHeader && (
          <Text style={styles.chantTag}>
            {isMalayalam
              ? '✦ ഹരോ ഹര • ഹര ഹര ✦'
              : '✦ HARO HARA • HARA HARA ✦'}
          </Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emblemBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1917',
    borderWidth: 1.5,
    borderColor: 'rgba(252, 211, 77, 0.8)',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  textBlock: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  titleMain: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  titleMainHeader: {
    fontSize: 14,
  },
  titleMainReceipt: {
    fontSize: 15,
  },
  titleSree: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FCD34D',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  titleSreeHeader: {
    fontSize: 10,
  },
  subtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#F59E0B',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 1,
  },
  subtitleHeader: {
    fontSize: 8,
    letterSpacing: 1,
  },
  chantTag: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FCD34D',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 2,
    opacity: 0.9,
  },
});

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
  Animated,
  Modal,
  Share,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/context/LanguageContext';
import { TEMPLE_NOTICES, TempleNotice } from '@/constants/notices';
import { SacredVelEmblem } from '@/components/TempleLogo';
import {
  Flame,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  ChevronRight,
  Calendar,
  X,
  Sun,
  Moon,
  Globe,
  Share2,
  Bell,
  MessageCircle,
} from 'lucide-react-native';

const CONTAINER_MAX_WIDTH = 580;

// Deities Data
const DEITIES = [
  {
    id: 'd1',
    nameEn: 'Sree Subramanya Swami',
    nameMl: 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി',
    badgeEn: 'Presiding Deity',
    badgeMl: 'പ്രധാന പ്രതിഷ്ഠ',
    descEn: 'The presiding lord of Thurayilkunnu, blessing devotees with courage, peace, and victory over all obstacles.',
    descMl: 'സർവ്വ വിഘ്നങ്ങളും അകറ്റി മനഃശാന്തിയും ഐശ്വര്യവും നൽകുന്ന തുറയിൽകുന്നിലെ പ്രധാന പ്രതിഷ്ഠയായ മുരുകഭഗവാൻ.',
    image: require('../../assets/images/temple/deities/subramanya.jpg'),
    mantra: 'ഓം ശരവണഭവായ നമഃ',
  },
  {
    id: 'd2',
    nameEn: 'Bala Murugan',
    nameMl: 'ബാലമുരുകൻ',
    badgeEn: 'Child Form',
    badgeMl: 'ബാലഭാവം',
    descEn: 'The benevolent divine child holding the sacred Vel, blessing children and students with memory and intellect.',
    descMl: 'വിദ്യാവിജയത്തിനും ഓർമ്മശക്തിക്കും കുട്ടികളുടെ ആരോഗ്യത്തിനും അഭയം നൽകുന്ന ബാലമുരുക സങ്കല്പം.',
    image: require('../../assets/images/temple/deities/balamurugan.jpg'),
    mantra: 'ഓം വല്ലീ ദേവസേനാ സമേത ശ്രീ സുബ്രഹ്മണ്യായ നമഃ',
  },
  {
    id: 'd3',
    nameEn: 'Maha Ganapathy',
    nameMl: 'മഹാഗണപതി',
    badgeEn: 'Upadevatha',
    badgeMl: 'ഉപദേവത',
    descEn: 'The supreme remover of hurdles and lord of auspicious beginnings, propitiated daily through dawn Homam.',
    descMl: 'സർവ്വകാര്യവിജയത്തിനും തടസ്സങ്ങൾ നീങ്ങുന്നതിനുമായി അതിരാവിലെ ഗണപതിഹോമത്തോടെ പൂജകൾ ആരംഭിക്കുന്നു.',
    image: require('../../assets/images/temple/deities/ganapathy.jpg'),
    mantra: 'ഓം ഗം ഗണപതയേ നമഃ',
  },
  {
    id: 'd4',
    nameEn: 'Durga Bhagavathy',
    nameMl: 'ദുർഗ്ഗാ ഭഗവതി',
    badgeEn: 'Mother Goddess',
    badgeMl: 'ഉപദേവത',
    descEn: 'The benevolent divine mother protecting families from illness, planetary doshas, and negative energies.',
    descMl: 'മാതൃഭാവത്തിൽ അനുഗ്രഹം ചൊരിയുന്ന ദുർഗ്ഗാദേവി. നെയ്‌വിളക്കും പായസ നിവേദ്യവും പ്രധാന വഴിപാടുകൾ.',
    image: require('../../assets/images/temple/deities/bhagavathy.jpg'),
    mantra: 'ഓം സർവ്വമംഗള മാംഗല്യേ ശിവേ സർവ്വാർത്ഥ സാധികേ',
  },
  {
    id: 'd5',
    nameEn: 'Lord Shiva',
    nameMl: 'പരമശിവൻ',
    badgeEn: 'Mahadeva',
    badgeMl: 'ഉപദേവത',
    descEn: 'The supreme ascetic father granting longevity, health, peace, and spiritual liberation to sincere devotees.',
    descMl: 'ആയുരാരോഗ്യത്തിനും രോഗശാന്തിക്കുമായി ധാരയും മൃത്യുഞ്ജയ പുഷ്പാഞ്ജലിയും സമർപ്പിക്കുന്നു.',
    image: require('../../assets/images/temple/deities/sivan.jpg'),
    mantra: 'ഓം നമഃ ശിവായ',
  },
];

// Pooja Schedule
const POOJA_SCHEDULE = [
  {
    period: 'morning',
    time: '05:00 AM',
    nameEn: 'Nirmalya Darshanam & Palliyunarthal',
    nameMl: 'നിർമ്മാല്യദർശനം & പള്ളിയുണർത്തൽ',
  },
  {
    period: 'morning',
    time: '05:30 AM',
    nameEn: 'Maha Ganapathy Homam',
    nameMl: 'മഹാ ഗണപതി ഹോമം',
  },
  {
    period: 'morning',
    time: '06:30 AM',
    nameEn: 'Usha Pooja & Palabhishekam',
    nameMl: 'ഉഷഃപൂജ & പാലഭിഷേകം',
  },
  {
    period: 'morning',
    time: '08:30 AM',
    nameEn: 'Pantheeradi Pooja',
    nameMl: 'പന്തീരടി പൂജ',
  },
  {
    period: 'morning',
    time: '10:00 AM',
    nameEn: 'Ucha Pooja & Deeparadhana (Closes 10:30)',
    nameMl: 'ഉച്ചപൂജ & ദീപാരാധന (10:30-ന് നട അടയ്ക്കുന്നു)',
  },
  {
    period: 'evening',
    time: '05:30 PM',
    nameEn: 'Evening Sanctum Opens',
    nameMl: 'വൈകിട്ട് നട തുറക്കൽ',
  },
  {
    period: 'evening',
    time: '06:30 PM',
    nameEn: 'Maha Deeparadhana & Chuttuvilakku',
    nameMl: 'സന്ധ്യാ ദീപാരാധന & ചുറ്റുവിളക്ക്',
  },
  {
    period: 'evening',
    time: '07:30 PM',
    nameEn: 'Athazha Pooja',
    nameMl: 'അത്താഴപൂജ',
  },
  {
    period: 'evening',
    time: '08:00 PM',
    nameEn: 'Thrippuka & Sanctum Closes',
    nameMl: 'തൃപ്പുക & നട അടയ്ക്കൽ',
  },
];

// Featured Offerings for 1-tap booking
const FEATURED_OFFERINGS = [
  {
    id: 'f1',
    nameEn: 'Pushpanjali & Archana',
    nameMl: 'പുഷ്പാഞ്ജലി & അർച്ചന',
    price: '₹20',
    descEn: 'Family prosperity & health',
    descMl: 'കുടുംബൈശ്വര്യത്തിനും ആയുരാരോഗ്യത്തിനും',
    image: require('../../assets/images/temple/offerings/archana_pushpanjali.jpg'),
  },
  {
    id: 'f2',
    nameEn: 'Maha Ganapathy Homam',
    nameMl: 'മഹാ ഗണപതി ഹോമം',
    price: '₹350',
    descEn: 'Obstacle removal & success',
    descMl: 'സർവ്വ വിഘ്ന നിവാരണത്തിന്',
    image: require('../../assets/images/temple/offerings/ganapathy_homam.jpg'),
  },
  {
    id: 'f3',
    nameEn: 'Palabhishekam',
    nameMl: 'പാലഭിഷേകം',
    price: '₹50',
    descEn: 'Sacred milk abhishekam',
    descMl: 'മനോശാന്തിക്കും പാപമോചനത്തിനും',
    image: require('../../assets/images/temple/offerings/palabhishekam.jpg'),
  },
  {
    id: 'f4',
    nameEn: 'Thulabharam',
    nameMl: 'തുലാഭാരം വഴിപാട്',
    price: '₹501',
    descEn: 'Vow offering with body weight',
    descMl: 'നേർച്ചയായി സമർപ്പിക്കൽ',
    image: require('../../assets/images/temple/offerings/thulabharam.jpg'),
  },
];

export default function TabHomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language, toggleLanguage, isMalayalam } = useLanguage();

  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedDeity, setSelectedDeity] = useState<any>(null);
  const [selectedNotice, setSelectedNotice] = useState<TempleNotice | null>(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Real-time Sanctum Status check
  const [sanctumStatus, setSanctumStatus] = useState({
    isOpen: true,
    statusText: 'Darshan Open',
    subText: 'Morning Darshan till 10:30 AM',
  });

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();

      const isMorning = currentMin >= 300 && currentMin <= 630; // 05:00 - 10:30 AM
      const isEvening = currentMin >= 1050 && currentMin <= 1200; // 05:30 - 08:00 PM

      if (isMorning) {
        setSanctumStatus({
          isOpen: true,
          statusText: isMalayalam ? 'നട തുറന്നിരിക്കുന്നു' : 'Darshan Open',
          subText: isMalayalam ? 'ഉച്ചപൂജ 10:30 AM വരെ' : 'Morning Darshan till 10:30 AM',
        });
      } else if (isEvening) {
        setSanctumStatus({
          isOpen: true,
          statusText: isMalayalam ? 'നട തുറന്നിരിക്കുന്നു' : 'Darshan Open',
          subText: isMalayalam ? 'തൃപ്പുക 08:00 PM വരെ' : 'Evening Darshan till 08:00 PM',
        });
      } else {
        const nextTime =
          currentMin < 300
            ? '05:00 AM'
            : currentMin < 1050
            ? '05:30 PM'
            : 'tomorrow 05:00 AM';
        setSanctumStatus({
          isOpen: false,
          statusText: isMalayalam ? 'നട അടച്ചിരിക്കുന്നു' : 'Sanctum Closed',
          subText: isMalayalam ? `അടുത്ത ദർശനം: ${nextTime}` : `Opens at ${nextTime}`,
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [isMalayalam]);

  // Subtle pulsing animation for live badge
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const openCall = () => Linking.openURL('tel:+919847123456').catch(() => {});
  const openWhatsApp = () =>
    Linking.openURL(
      'https://wa.me/919847123456?text=Swami%20Saranam!%20Enquiry%20regarding%20Thurayilkunnu%20Temple'
    ).catch(() => {});
  const openMap = () =>
    Linking.openURL('https://maps.google.com/?q=Alumkadavu+Karunagappally+Kollam').catch(() => {});

  const handleShareBlessing = async () => {
    try {
      await Share.share({
        message: isMalayalam
          ? 'ഓം ശരവണഭവായ നമഃ 🙏\nതുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്ര ദർശനവും വഴിപാടുകളും:\nhttps://thurayilkunnu.org'
          : 'Om Saravanabhavaya Namaha 🙏\nBlessings from Thurayilkunnu Sree Subramanya Swami Temple:\nhttps://thurayilkunnu.org',
      });
    } catch {}
  };

  const featuredNotice = TEMPLE_NOTICES[0];

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top + 10, 16) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= 1. CLEAN MODERN HEADER ================= */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogoBadge}>
              <SacredVelEmblem size={26} />
            </View>
            <View>
              <Text style={styles.headerChant}>
                {isMalayalam ? 'ഓം ശരവണഭവ' : 'OM SARAVANABHAVAYA'}
              </Text>
              <Text style={styles.headerTitle}>
                {isMalayalam ? 'തുറയിൽകുന്ന് ക്ഷേത്രം' : 'Thurayilkunnu Temple'}
              </Text>
            </View>
          </View>

          {/* Clean Language Switcher */}
          <TouchableOpacity
            style={styles.langPill}
            onPress={toggleLanguage}
            activeOpacity={0.8}
          >
            <Globe size={13} color="#D97706" />
            <Text style={styles.langPillText}>
              {language === 'ml' ? 'English' : 'മലയാളം'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= 2. BRIGHT HERO SANCTUARY CARD ================= */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../assets/images/temple/banners/banner1.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroGradientOverlay} />

          {/* Hero Content */}
          <View style={styles.heroContent}>
            {/* Live Darshan Status Tag */}
            <View style={styles.statusPill}>
              <Animated.View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: sanctumStatus.isOpen ? '#059669' : '#D97706',
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />
              <Text style={styles.statusText}>{sanctumStatus.statusText}</Text>
              <Text style={styles.statusSubText}>• {sanctumStatus.subText}</Text>
            </View>

            <Text style={styles.heroTitle}>
              {isMalayalam
                ? 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം'
                : 'Sree Subramanya Swami Temple'}
            </Text>
            <Text style={styles.heroLocation}>
              {isMalayalam
                ? 'ആലുംകടവ്, കൊല്ലം • കുന്നിൻമുകളിലെ പുണ്യസങ്കേതം'
                : 'Alumkadavu, Kollam • Hill Sanctum of Grace'}
            </Text>

            {/* Quick Timing Summary Button */}
            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => setScheduleModalVisible(true)}
              activeOpacity={0.85}
            >
              <View style={styles.scheduleBtnInner}>
                <Clock size={14} color="#D97706" />
                <Text style={styles.scheduleBtnText}>
                  {isMalayalam
                    ? 'പൂജാക്രമം (രാവിലെ 5:00 - 10:30 | വൈകിട്ട് 5:30 - 8:00)'
                    : 'Pooja Hours (Morning 5:00 - 10:30 | Evening 5:30 - 8:00)'}
                </Text>
              </View>
              <ChevronRight size={14} color="#B45309" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= 3. FLOATING ACTION TILES ================= */}
        <View style={styles.actionGrid}>
          {/* Vazhipadu Booking */}
          <TouchableOpacity
            style={[styles.actionTile, styles.actionTileHighlight]}
            onPress={() => router.push('/two')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Flame size={20} color="#D97706" />
            </View>
            <Text style={styles.actionTileTitle}>
              {isMalayalam ? 'വഴിപാടുകൾ' : 'Offerings'}
            </Text>
            <Text style={styles.actionTileSubtitle}>
              {isMalayalam ? 'ബുക്കിംഗ്' : 'Book Seva'}
            </Text>
          </TouchableOpacity>

          {/* Daily Schedule */}
          <TouchableOpacity
            style={styles.actionTile}
            onPress={() => setScheduleModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: '#EDE9FE' }]}>
              <Calendar size={20} color="#7C3AED" />
            </View>
            <Text style={styles.actionTileTitle}>
              {isMalayalam ? 'പൂജാക്രമം' : 'Timings'}
            </Text>
            <Text style={styles.actionTileSubtitle}>
              {isMalayalam ? 'സമയങ്ങൾ' : 'Schedule'}
            </Text>
          </TouchableOpacity>

          {/* Map Directions */}
          <TouchableOpacity
            style={styles.actionTile}
            onPress={openMap}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: '#FEE2E2' }]}>
              <MapPin size={20} color="#DC2626" />
            </View>
            <Text style={styles.actionTileTitle}>
              {isMalayalam ? 'ക്ഷേത്ര വഴി' : 'Location'}
            </Text>
            <Text style={styles.actionTileSubtitle}>
              {isMalayalam ? 'റൂട്ട് മാപ്പ്' : 'Map Route'}
            </Text>
          </TouchableOpacity>

          {/* Temple Call */}
          <TouchableOpacity
            style={styles.actionTile}
            onPress={openCall}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Phone size={20} color="#16A34A" />
            </View>
            <Text style={styles.actionTileTitle}>
              {isMalayalam ? 'വിളിക്കുക' : 'Contact'}
            </Text>
            <Text style={styles.actionTileSubtitle}>
              {isMalayalam ? 'ഓഫീസ്' : 'Call Office'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= 4. TODAY'S AUSPICIOUS BAR (PANCHANGAM) ================= */}
        <View style={styles.panchangamCard}>
          <View style={styles.panchangamItem}>
            <View style={styles.panchangamLabelRow}>
              <Sun size={12} color="#D97706" />
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'നക്ഷത്രം' : 'Nakshatra'}
              </Text>
            </View>
            <Text style={styles.panchangamValue}>
              {isMalayalam ? 'കാർത്തിക' : 'Karthika'}
            </Text>
          </View>

          <View style={styles.panchangamDivider} />

          <View style={styles.panchangamItem}>
            <View style={styles.panchangamLabelRow}>
              <Sparkles size={12} color="#D97706" />
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'തിഥി' : 'Tithi'}
              </Text>
            </View>
            <Text style={styles.panchangamValue}>
              {isMalayalam ? 'ശുക്ല ഷഷ്ഠി' : 'Shukla Sashti'}
            </Text>
          </View>

          <View style={styles.panchangamDivider} />

          <View style={styles.panchangamItem}>
            <View style={styles.panchangamLabelRow}>
              <Clock size={12} color="#DC2626" />
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'രാഹുകാലം' : 'Rahu'}
              </Text>
            </View>
            <Text style={[styles.panchangamValue, { color: '#DC2626' }]}>
              1:30 - 3:00 PM
            </Text>
          </View>
        </View>

        {/* ================= 5. POPULAR VAZHIPADU (1-TAP BOOKING) ================= */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionBadge}>
              {isMalayalam ? 'പ്രധാന വഴിപാടുകൾ' : 'POPULAR VAZHIPADU'}
            </Text>
            <Text style={styles.sectionTitle}>
              {isMalayalam ? 'വിശേഷാൽ വഴിപാടുകൾ' : 'Sacred Offerings'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.seeAllBtn}
            onPress={() => router.push('/two')}
            activeOpacity={0.8}
          >
            <Text style={styles.seeAllText}>
              {isMalayalam ? 'എല്ലാം കാണുക' : 'View All'}
            </Text>
            <ChevronRight size={14} color="#D97706" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollList}
        >
          {FEATURED_OFFERINGS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.offeringCard}
              onPress={() => router.push('/two')}
              activeOpacity={0.88}
            >
              <Image source={item.image} style={styles.offeringImage} resizeMode="cover" />
              <View style={styles.offeringContent}>
                <Text style={styles.offeringName} numberOfLines={1}>
                  {isMalayalam ? item.nameMl : item.nameEn}
                </Text>
                <Text style={styles.offeringDesc} numberOfLines={1}>
                  {isMalayalam ? item.descMl : item.descEn}
                </Text>
                <View style={styles.offeringBottom}>
                  <Text style={styles.offeringPrice}>{item.price}</Text>
                  <View style={styles.bookChip}>
                    <Text style={styles.bookChipText}>
                      {isMalayalam ? 'ബുക്ക്' : 'Book'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= 6. LATEST ANNOUNCEMENT / NOTICE ================= */}
        {featuredNotice && (
          <TouchableOpacity
            style={styles.noticeCard}
            onPress={() => setSelectedNotice(featuredNotice)}
            activeOpacity={0.88}
          >
            <View style={styles.noticeIconWrap}>
              <Bell size={18} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.noticeTopRow}>
                <Text style={styles.noticeBadge}>
                  {isMalayalam ? featuredNotice.tagMl : featuredNotice.tagEn}
                </Text>
                <Text style={styles.noticeDate}>
                  {isMalayalam ? featuredNotice.dateMl : featuredNotice.dateEn}
                </Text>
              </View>
              <Text style={styles.noticeTitle} numberOfLines={1}>
                {isMalayalam ? featuredNotice.titleMl : featuredNotice.titleEn}
              </Text>
              <Text style={styles.noticeSummary} numberOfLines={2}>
                {isMalayalam ? featuredNotice.summaryMl : featuredNotice.summaryEn}
              </Text>
            </View>
            <ChevronRight size={18} color="#A8A29E" style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        )}

        {/* ================= 7. SACRED DEITIES (PRATHISHTA) ================= */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionBadge}>
              {isMalayalam ? 'ദർശനം' : 'SANCTUM'}
            </Text>
            <Text style={styles.sectionTitle}>
              {isMalayalam ? 'ക്ഷേത്ര പ്രതിഷ്ഠകൾ' : 'Temple Deities'}
            </Text>
          </View>
          <Text style={styles.hintText}>
            {isMalayalam ? 'വിവരങ്ങൾക്ക് തൊടുക' : 'Tap for details'}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollList}
        >
          {DEITIES.map((deity) => (
            <TouchableOpacity
              key={deity.id}
              style={styles.deityCard}
              onPress={() => setSelectedDeity(deity)}
              activeOpacity={0.88}
            >
              <Image source={deity.image} style={styles.deityImage} resizeMode="cover" />
              <View style={styles.deityOverlay} />
              <View style={styles.deityBadge}>
                <Text style={styles.deityBadgeText}>
                  {isMalayalam ? deity.badgeMl : deity.badgeEn}
                </Text>
              </View>
              <View style={styles.deityInfo}>
                <Text style={styles.deityName} numberOfLines={1}>
                  {isMalayalam ? deity.nameMl : deity.nameEn}
                </Text>
                <Text style={styles.deitySubName} numberOfLines={1}>
                  {isMalayalam ? deity.nameEn : deity.nameMl}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= 8. SERENE DAILY CHANT & BLESSING ================= */}
        <View style={styles.mantraCard}>
          <View style={styles.mantraHeader}>
            <View style={styles.mantraEmblem}>
              <SacredVelEmblem size={22} />
            </View>
            <Text style={styles.mantraLabel}>
              {isMalayalam ? 'നിത്യ പ്രാർത്ഥന' : 'Daily Murugan Chant'}
            </Text>
            <TouchableOpacity
              style={styles.shareIconBtn}
              onPress={handleShareBlessing}
              activeOpacity={0.8}
            >
              <Share2 size={13} color="#D97706" />
              <Text style={styles.shareText}>
                {isMalayalam ? 'പങ്കുവെക്കാം' : 'Share'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.mantraQuote}>
            "ശ്രവണഭൂഷണം ശത്രുസംഹാരം കാർത്തികേയം ഭജേ"
          </Text>
          <Text style={styles.mantraTranslation}>
            {isMalayalam
              ? 'സർവ്വവിധ ദുരിതങ്ങളും നീങ്ങി കുടുംബത്തിൽ ഐശ്വര്യം നിറയട്ടെ 🙏'
              : 'May Lord Murugan shower courage, peace, and divine protection upon you 🙏'}
          </Text>
        </View>

        {/* ================= 9. CLEAN REFINED FOOTER ================= */}
        <View style={styles.footer}>
          <Text style={styles.footerTempleName}>
            {isMalayalam
              ? 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം'
              : 'Thurayilkunnu Sree Subramanya Swami Temple'}
          </Text>
          <Text style={styles.footerAddress}>
            {isMalayalam
              ? 'ആലുംകടവ്, കരുനാഗപ്പള്ളി, കൊല്ലം ജില്ല • കേരളം'
              : 'Alumkadavu, Karunagappally, Kollam District, Kerala'}
          </Text>

          <View style={styles.footerButtonRow}>
            <TouchableOpacity style={styles.footerBtn} onPress={openCall} activeOpacity={0.8}>
              <Phone size={14} color="#D97706" />
              <Text style={styles.footerBtnText}>
                {isMalayalam ? 'വിളിക്കുക' : 'Call'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.footerBtn, styles.footerBtnHighlight]}
              onPress={openWhatsApp}
              activeOpacity={0.8}
            >
              <MessageCircle size={14} color="#FFFFFF" />
              <Text style={[styles.footerBtnText, { color: '#FFFFFF' }]}>
                {isMalayalam ? 'വാട്സ്ആപ്പ്' : 'WhatsApp'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerBtn} onPress={openMap} activeOpacity={0.8}>
              <MapPin size={14} color="#D97706" />
              <Text style={styles.footerBtnText}>
                {isMalayalam ? 'റൂട്ട്' : 'Directions'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyright}>
            © 2026 Thurayilkunnu Temple Trust
          </Text>
        </View>
      </ScrollView>

      {/* ================= MODAL: POOJA SCHEDULE ================= */}
      <Modal
        visible={scheduleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setScheduleModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalBadge}>
                  {isMalayalam ? 'ക്ഷേത്ര സമയങ്ങൾ' : 'DAILY DARSHAN'}
                </Text>
                <Text style={styles.modalTitle}>
                  {isMalayalam ? 'നിത്യ പൂജാക്രമം' : 'Daily Pooja Schedule'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setScheduleModalVisible(false)}
              >
                <X size={20} color="#78716C" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* Morning Section */}
              <View style={styles.scheduleGroup}>
                <View style={styles.scheduleGroupHeader}>
                  <Sun size={15} color="#D97706" />
                  <Text style={styles.scheduleGroupTitle}>
                    {isMalayalam ? 'പ്രഭാത പൂജകൾ (05:00 - 10:30 AM)' : 'Morning Pooja (05:00 - 10:30 AM)'}
                  </Text>
                </View>
                {POOJA_SCHEDULE.filter((p) => p.period === 'morning').map((item, idx) => (
                  <View key={idx} style={styles.scheduleRow}>
                    <Text style={styles.scheduleTime}>{item.time}</Text>
                    <Text style={styles.scheduleName}>
                      {isMalayalam ? item.nameMl : item.nameEn}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Evening Section */}
              <View style={[styles.scheduleGroup, { marginTop: 12 }]}>
                <View style={styles.scheduleGroupHeader}>
                  <Moon size={15} color="#D97706" />
                  <Text style={styles.scheduleGroupTitle}>
                    {isMalayalam ? 'സന്ധ്യാ പൂജകൾ (05:30 - 08:00 PM)' : 'Evening Pooja (05:30 - 08:00 PM)'}
                  </Text>
                </View>
                {POOJA_SCHEDULE.filter((p) => p.period === 'evening').map((item, idx) => (
                  <View key={idx} style={styles.scheduleRow}>
                    <Text style={styles.scheduleTime}>{item.time}</Text>
                    <Text style={styles.scheduleName}>
                      {isMalayalam ? item.nameMl : item.nameEn}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalActionBtn}
              onPress={() => {
                setScheduleModalVisible(false);
                router.push('/two');
              }}
            >
              <Flame size={16} color="#FFFFFF" />
              <Text style={styles.modalActionText}>
                {isMalayalam ? 'വഴിപാട് ബുക്ക് ചെയ്യാം' : 'Book Pooja Offering'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: DEITY DETAILS ================= */}
      <Modal
        visible={!!selectedDeity}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedDeity(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedDeity && (
            <View style={styles.deityModalSheet}>
              <TouchableOpacity
                style={styles.deityCloseBtn}
                onPress={() => setSelectedDeity(null)}
              >
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={selectedDeity.image}
                style={styles.deityModalImage}
                resizeMode="cover"
              />

              <View style={styles.deityModalContent}>
                <Text style={styles.deityModalBadge}>
                  {isMalayalam ? selectedDeity.badgeMl : selectedDeity.badgeEn}
                </Text>
                <Text style={styles.deityModalTitle}>
                  {isMalayalam ? selectedDeity.nameMl : selectedDeity.nameEn}
                </Text>

                <View style={styles.deityMantraBox}>
                  <Sparkles size={14} color="#D97706" />
                  <Text style={styles.deityMantraText}>{selectedDeity.mantra}</Text>
                </View>

                <Text style={styles.deityModalDesc}>
                  {isMalayalam ? selectedDeity.descMl : selectedDeity.descEn}
                </Text>

                <TouchableOpacity
                  style={styles.modalActionBtn}
                  onPress={() => {
                    setSelectedDeity(null);
                    router.push('/two');
                  }}
                >
                  <Flame size={16} color="#FFFFFF" />
                  <Text style={styles.modalActionText}>
                    {isMalayalam ? 'ഈ മൂർത്തിക്ക് വഴിപാട് സമർപ്പിക്കുക' : 'Offer Vazhipadu to Deity'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* ================= MODAL: NOTICE DETAILS ================= */}
      <Modal
        visible={!!selectedNotice}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedNotice(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedNotice && (
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={styles.modalBadge}>
                    {isMalayalam ? selectedNotice.tagMl : selectedNotice.tagEn} • {isMalayalam ? selectedNotice.dateMl : selectedNotice.dateEn}
                  </Text>
                  <Text style={styles.modalTitle} numberOfLines={2}>
                    {isMalayalam ? selectedNotice.titleMl : selectedNotice.titleEn}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedNotice(null)}
                >
                  <X size={20} color="#78716C" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.noticeDetailBody}>
                  {isMalayalam ? selectedNotice.detailsMl : selectedNotice.detailsEn}
                </Text>
              </ScrollView>

              <TouchableOpacity
                style={styles.modalActionBtn}
                onPress={() => {
                  setSelectedNotice(null);
                  openWhatsApp();
                }}
              >
                <MessageCircle size={16} color="#FFFFFF" />
                <Text style={styles.modalActionText}>
                  {isMalayalam
                    ? selectedNotice.actionTextMl || 'വിശദ വിവരങ്ങൾ ചോദിക്കാം'
                    : selectedNotice.actionTextEn || 'Enquire on WhatsApp'}
                </Text>
                <ChevronRight size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    maxWidth: CONTAINER_MAX_WIDTH,
    alignSelf: 'center',
    width: '100%',
  },

  // 1. Header Bar
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogoBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerChant: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1917',
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },

  // 2. Hero Sanctum Card
  heroCard: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 22,
    overflow: 'hidden',
    height: 230,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0EBE1',
    justifyContent: 'flex-end',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(28, 25, 23, 0.42)',
  },
  heroContent: {
    padding: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 8,
    gap: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1C1917',
  },
  statusSubText: {
    fontSize: 11,
    color: '#57534E',
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroLocation: {
    fontSize: 12,
    color: '#FEF3C7',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 10,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scheduleBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  scheduleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1C1917',
    flex: 1,
  },

  // 3. Floating Action Tiles
  actionGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  actionTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EBE1',
    elevation: 2,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  actionTileHighlight: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFDF9',
  },
  actionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionTileTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
    textAlign: 'center',
  },
  actionTileSubtitle: {
    fontSize: 10,
    color: '#78716C',
    marginTop: 2,
    textAlign: 'center',
  },

  // 4. Panchangam Bar
  panchangamCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F0EBE1',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  panchangamItem: {
    flex: 1,
    alignItems: 'center',
  },
  panchangamLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  panchangamLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#78716C',
  },
  panchangamValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B45309',
  },
  panchangamDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#F0EBE1',
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 10,
  },
  sectionBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1C1917',
    marginTop: 1,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  hintText: {
    fontSize: 11,
    color: '#A8A29E',
  },

  // Horizontal Scroll Lists
  horizontalScrollList: {
    paddingLeft: 16,
    paddingRight: 6,
    gap: 12,
  },

  // 5. Offering Cards
  offeringCard: {
    width: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0EBE1',
    elevation: 2,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  offeringImage: {
    width: '100%',
    height: 95,
  },
  offeringContent: {
    padding: 10,
  },
  offeringName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1C1917',
  },
  offeringDesc: {
    fontSize: 10,
    color: '#78716C',
    marginTop: 2,
    marginBottom: 8,
  },
  offeringBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offeringPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#D97706',
  },
  bookChip: {
    backgroundColor: '#D97706',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bookChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // 6. Notice Card
  noticeCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    gap: 12,
    elevation: 2,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  noticeIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  noticeBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: '#D97706',
    textTransform: 'uppercase',
  },
  noticeDate: {
    fontSize: 9,
    color: '#A8A29E',
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1917',
  },
  noticeSummary: {
    fontSize: 11,
    color: '#57534E',
    marginTop: 2,
    lineHeight: 15,
  },

  // 7. Deity Cards
  deityCard: {
    width: 140,
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0EBE1',
    justifyContent: 'flex-end',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  deityImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  deityOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(28, 25, 23, 0.45)',
  },
  deityBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  deityBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
  },
  deityInfo: {
    padding: 10,
  },
  deityName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  deitySubName: {
    fontSize: 10,
    color: '#F5F5F4',
    marginTop: 2,
  },

  // 8. Mantra Card
  mantraCard: {
    marginHorizontal: 16,
    marginTop: 22,
    backgroundColor: '#FFFDF9',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    elevation: 2,
    shadowColor: '#78350F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  mantraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mantraEmblem: {
    marginRight: 8,
  },
  mantraLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
    flex: 1,
  },
  shareIconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  shareText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  mantraQuote: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  mantraTranslation: {
    fontSize: 11,
    color: '#57534E',
    marginTop: 6,
    lineHeight: 16,
  },

  // 9. Clean Footer
  footer: {
    marginTop: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  footerTempleName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1C1917',
    textAlign: 'center',
  },
  footerAddress: {
    fontSize: 11,
    color: '#78716C',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 14,
  },
  footerButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0EBE1',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  footerBtnHighlight: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  footerBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1C1917',
  },
  copyright: {
    fontSize: 10,
    color: '#A8A29E',
  },

  // Modals Styling (Bright & Clean)
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(28, 25, 23, 0.65)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  modalBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1917',
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    maxHeight: 380,
  },
  scheduleGroup: {
    backgroundColor: '#FAF8F5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0EBE1',
  },
  scheduleGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E5E4',
  },
  scheduleGroupTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE1',
  },
  scheduleTime: {
    width: 75,
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  scheduleName: {
    flex: 1,
    fontSize: 12,
    color: '#1C1917',
    fontWeight: '500',
  },
  modalActionBtn: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 14,
    marginTop: 14,
  },
  modalActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Deity Modal Sheet
  deityModalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  deityCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 20,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deityModalImage: {
    width: '100%',
    height: 190,
  },
  deityModalContent: {
    padding: 18,
  },
  deityModalBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    textTransform: 'uppercase',
  },
  deityModalTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#1C1917',
    marginTop: 2,
    marginBottom: 8,
  },
  deityMantraBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  deityMantraText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    flex: 1,
  },
  deityModalDesc: {
    fontSize: 12,
    color: '#57534E',
    lineHeight: 18,
    marginBottom: 6,
  },

  // Notice Detail Body
  noticeDetailBody: {
    fontSize: 13,
    color: '#1C1917',
    lineHeight: 20,
    marginVertical: 8,
  },
});

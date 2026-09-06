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
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/context/LanguageContext';
import { TEMPLE_NOTICES, TempleNotice } from '@/constants/notices';
import { TempleLogo } from '@/components/TempleLogo';
import {
  Flame,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  ChevronRight,
  Calendar,
  X,
  Camera,
  Sun,
  Moon,
  Compass,
  Globe,
  Share2,
  BookOpen,
  Megaphone,
  Bell,
  AlertCircle,
  FileText,
} from 'lucide-react-native';

const CONTAINER_MAX_WIDTH = 580;

const HERO_BANNERS = [
  {
    id: 'b1',
    image: require('../../assets/images/temple/banners/banner1.jpg'),
    titleEn: 'Thurayilkunnu Sree Subramanya Swami Temple',
    titleMl: 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം',
    subtitleEn: 'Hill Sanctum of Divine Grace & Peace • Alumkadavu, Kollam',
    subtitleMl: 'സർവ്വകാര്യവിജയത്തിനും കുടുംബൈശ്വര്യത്തിനും • ആലുംകടവ്, കൊല്ലം',
    tagEn: 'DIVINE SANCTUM',
    tagMl: 'പുണ്യ സങ്കേതം',
  },
  {
    id: 'b2',
    image: require('../../assets/images/temple/banners/banner2.jpg'),
    titleEn: 'Sanctum Darshan & Holy Abhishekam',
    titleMl: 'നിത്യപൂജകളും ദിവ്യ അഭിഷേകങ്ങളും',
    subtitleEn: 'Invoking strength and peace through tantric rituals',
    subtitleMl: 'ശത്രുദോഷ നിവാരണത്തിനും മനഃശാന്തിക്കുമായി നിത്യ പൂജകൾ',
    tagEn: 'AUSPICIOUS RITUALS',
    tagMl: 'നിത്യപൂജകൾ',
  },
  {
    id: 'b3',
    image: require('../../assets/images/temple/banners/banner3.jpg'),
    titleEn: 'Grand Festivals & Divine Utsavams',
    titleMl: 'തൈപ്പൂയം & സ്കന്ദഷഷ്ഠി മഹോത്സവം',
    subtitleEn: 'Spectacular Kavadiyattam, Panchavadyam & Deeparadhana',
    subtitleMl: 'വർണ്ണശബളമായ കാവടിയാട്ടവും പഞ്ചവാദ്യവും അന്നദാനവും',
    tagEn: 'FESTIVE GLORY',
    tagMl: 'മഹോത്സവം',
  },
  {
    id: 'b4',
    image: require('../../assets/images/temple/banners/banner4.jpg'),
    titleEn: 'Vazhipadu & Tantric Offerings',
    titleMl: 'നിങ്ങളുടെ നക്ഷത്രത്തിൽ വഴിപാടുകൾ',
    subtitleEn: 'Book Ganapathy Homam, Archana, and Palabhishekam',
    subtitleMl: 'ഗണപതി ഹോമം, പുഷ്പാഞ്ജലി, പാലഭിഷേകം സമർപ്പിക്കാം',
    tagEn: 'OFFERINGS',
    tagMl: 'വഴിപാടുകൾ',
  },
  {
    id: 'b5',
    image: require('../../assets/images/temple/banners/banner5.jpg'),
    titleEn: 'Peace, Prosperity & Divine Grace',
    titleMl: 'ശാന്തിയും ഐശ്വര്യവും ആയുരാരോഗ്യവും',
    subtitleEn: 'May Lord Murugan’s Divine Vel shower eternal blessings',
    subtitleMl: 'മുരുകഭഗവാന്റെ തിരുവേൽ നിങ്ങളെ സദാ കാത്തുരക്ഷിക്കട്ടെ',
    tagEn: 'BLESSINGS',
    tagMl: 'അനുഗ്രഹം',
  },
];

const DEITIES = [
  {
    id: 'd1',
    nameEn: 'Sree Subramanya Swami',
    nameMl: 'ശ്രീ സുബ്രഹ്മണ്യസ്വാമി',
    badgeEn: 'Main Deity',
    badgeMl: 'പ്രധാന പ്രതിഷ്ഠ',
    descEn: 'The presiding deity of Thurayilkunnu, blessing seekers with courage, wisdom, and victory over all obstacles.',
    descMl: 'സർവ്വ വിഘ്നങ്ങളും അകറ്റി മനഃശാന്തിയും ഐശ്വര്യവും നൽകുന്ന തുറയിൽകുന്നിലെ പ്രധാന പ്രതിഷ്ഠയായ മുരുകഭഗവാൻ.',
    image: require('../../assets/images/temple/deities/subramanya.jpg'),
    mantra: 'ഓം ശരവണഭവായ നമഃ • Om Saravanabhavaya Namaha',
  },
  {
    id: 'd2',
    nameEn: 'Bala Murugan',
    nameMl: 'ബാലമുരുകൻ',
    badgeEn: 'Divine Child Form',
    badgeMl: 'ബാലഭാവം',
    descEn: 'The charming, benevolent child form of Lord Murugan holding the sacred Vel, blessing children and students with memory and intellect.',
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
    mantra: 'ഓം ഗം ഗണപതയേ നമഃ • Om Gam Ganapataye Namaha',
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
    mantra: 'ഓം നമഃ ശിവായ • Om Namah Shivaya',
  },
  {
    id: 'd6',
    nameEn: 'Palani Murugan',
    nameMl: 'പളനി മുരുകൻ',
    badgeEn: 'Dhandayuthapani',
    badgeMl: 'ദണ്ഡായുധപാണി',
    descEn: 'Lord Murugan as the divine ascetic Dhandayuthapani, fulfilling vows and showering divine boons upon devotees.',
    descMl: 'ജ്ഞാനപ്പഴമായ ദണ്ഡായുധപാണി ഭാവത്തിൽ അനുഗ്രഹം വർഷിക്കുന്ന പളനി മുരുക സങ്കല്പം.',
    image: require('../../assets/images/temple/deities/palani_murugan.jpg'),
    mantra: 'ഓം മുരുകാ ശരണം • Om Muruga Saranam',
  },
];

const POOJA_SCHEDULE = [
  {
    time: '05:00 AM',
    nameEn: 'Nirmalyadarshanam & Palliyunarthal',
    nameMl: 'നിർമ്മാല്യദർശനം & പള്ളിയുണർത്തൽ',
    descEn: 'Sanctum doors open for the first auspicious glimpse',
    descMl: 'ശ്രീകോവിൽ നട തുറക്കലും പ്രഭാത ദർശനവും',
  },
  {
    time: '05:30 AM',
    nameEn: 'Maha Ganapathy Homam',
    nameMl: 'മഹാ ഗണപതി ഹോമം',
    descEn: 'Auspicious dawn sacrificial oblation',
    descMl: 'സർവ്വ വിഘ്ന നിവാരണത്തിനായി വിശേഷാൽ അഗ്നിഹോമം',
  },
  {
    time: '06:30 AM',
    nameEn: 'Usha Pooja & Palabhishekam',
    nameMl: 'ഉഷഃപൂജ & പാലഭിഷേകം',
    descEn: 'Morning pooja with sacred milk & panchamritham',
    descMl: 'പഞ്ചാമൃതം, പാൽ അഭിഷേകം, നിവേദ്യം',
  },
  {
    time: '08:30 AM',
    nameEn: 'Pantheeradi Pooja',
    nameMl: 'പന്തീരടി പൂജ',
    descEn: 'Mid-morning special Archana and floral offering',
    descMl: 'വിശേഷാൽ പുഷ്പാഞ്ജലി & അർച്ചനകൾ',
  },
  {
    time: '10:00 AM',
    nameEn: 'Ucha Pooja & Deeparadhana',
    nameMl: 'ഉച്ചപൂജ & ദീപാരാധന',
    descEn: 'Grand noon pooja followed by sanctum closing at 10:30 AM',
    descMl: 'മഹാ ദീപാരാധന. 10:30 AM-ന് നട അടയ്ക്കുന്നു',
  },
  {
    time: '05:30 PM',
    nameEn: 'Evening Sanctum Reopens',
    nameMl: 'വൈകിട്ട് നട തുറക്കൽ',
    descEn: 'Sanctum reopens for evening darshan',
    descMl: 'സന്ധ്യാ ദർശനത്തിനായി നട തുറക്കുന്നു',
  },
  {
    time: '06:30 PM',
    nameEn: 'Maha Deeparadhana & Chuttuvilakku',
    nameMl: 'സന്ധ്യാ ദീപാരാധന & ചുറ്റുവിളക്ക്',
    descEn: 'Illumination of sacred oil lamps and evening aarti',
    descMl: 'സന്ധ്യാ ദീപാരാധനയും തിരി തെളിയിക്കലും',
  },
  {
    time: '07:30 PM',
    nameEn: 'Athazha Pooja',
    nameMl: 'അത്താഴപൂജ',
    descEn: 'Night offering ceremony',
    descMl: 'നിശാപൂജയും പ്രസാദ വിതരണവും',
  },
  {
    time: '08:00 PM',
    nameEn: 'Thrippuka & Sanctum Closes',
    nameMl: 'തൃപ്പുക & നട അടയ്ക്കൽ',
    descEn: 'Sacred frankincense oblation and sanctum closing',
    descMl: 'സന്ധ്യാ പൂജകൾ പൂർത്തിയാക്കി നട അടയ്ക്കുന്നു',
  },
];

const FEATURED_OFFERINGS = [
  {
    id: 'f1',
    nameEn: 'Pushpanjali & Archana',
    nameMl: 'പുഷ്പാഞ്ജലി & അർച്ചന',
    price: '₹20',
    descEn: 'Peace, health, and family prosperity',
    descMl: 'കുടുംബൈശ്വര്യത്തിനും ആയുരാരോഗ്യത്തിനും',
    badge: 'Daily',
    image: require('../../assets/images/temple/offerings/archana_pushpanjali.jpg'),
  },
  {
    id: 'f2',
    nameEn: 'Maha Ganapathy Homam',
    nameMl: 'മഹാ ഗണപതി ഹോമം',
    price: '₹350',
    descEn: 'Removal of obstacles & career success',
    descMl: 'സർവ്വ വിഘ്നങ്ങളും നീങ്ങി കാര്യവിജയത്തിന്',
    badge: 'Dawn Special',
    image: require('../../assets/images/temple/offerings/ganapathy_homam.jpg'),
  },
  {
    id: 'f3',
    nameEn: 'Palabhishekam & Bhasmam',
    nameMl: 'പാലഭിഷേകം & ഭസ്മം',
    price: '₹50',
    descEn: 'Divine purification & bliss',
    descMl: 'മനോശാന്തിക്കും പാപമോചനത്തിനും',
    badge: 'Sacred',
    image: require('../../assets/images/temple/offerings/palabhishekam.jpg'),
  },
  {
    id: 'f4',
    nameEn: 'Thulabharam',
    nameMl: 'തുലാഭാരം വഴിപാട്',
    price: '₹501',
    descEn: 'Sacred vow offering with fruit / jaggery',
    descMl: 'നേർച്ചയായി ശരീരഭാരത്തിന് തുല്യമായി സമർപ്പിക്കൽ',
    badge: 'Vow Seva',
    image: require('../../assets/images/temple/offerings/thulabharam.jpg'),
  },
];

const FESTIVALS = [
  {
    id: 'fst1',
    nameEn: 'Thaipusam Mahotsavam',
    nameMl: 'തൈപ്പൂയം മഹോത്സവം',
    dateEn: 'Malayalam Month: Makaram (Jan - Feb)',
    dateMl: 'മലയാള മാസം: മകരം പൂയം നാൾ',
    descEn: 'The flagship festival featuring grand Kavadiyattam, traditional Panchavadyam, and Annadanam.',
    descMl: 'തുറയിൽകുന്നിലെ ഏറ്റവും പ്രസിദ്ധമായ ഉത്സവം. കാവടിയാട്ടം, താലപ്പൊലി, പഞ്ചവാദ്യം, അന്നദാനം.',
    image: require('../../assets/images/temple/festivals/thaipusam.jpg'),
  },
  {
    id: 'fst2',
    nameEn: 'Skanda Sashti & Soorasamharam',
    nameMl: 'സ്കന്ദഷഷ്ഠി & ശൂരസംഹാരം',
    dateEn: 'Malayalam Month: Thulam (Oct - Nov)',
    dateMl: 'മലയാള മാസം: തുലാം ഷഷ്ഠി',
    descEn: '6-day fasting observance celebrating the victory of Lord Murugan over demonic forces.',
    descMl: 'ആറ് ദിവസത്തെ ഷഷ്ഠി വ്രതാനുഷ്ഠാനവും പുഷ്പാഭിഷേകവും ശൂരസംഹാരവും.',
    image: require('../../assets/images/temple/festivals/skanda_sashti.jpg'),
  },
  {
    id: 'fst3',
    nameEn: 'Vishu Mahotsavam',
    nameMl: 'വിഷുക്കണിയും പ്രതിഷ്ഠാദിനവും',
    dateEn: 'Malayalam Month: Medam 1 (April)',
    dateMl: 'മലയാള മാസം: മേടം 1',
    descEn: 'Sacred Vishukkani darshan and annual consecration day rituals.',
    descMl: 'വിഷുക്കണി ദർശനം, കൈനീട്ടം, പ്രത്യേക അഭിഷേകങ്ങൾ.',
    image: require('../../assets/images/temple/festivals/vishu.jpg'),
  },
  {
    id: 'fst4',
    nameEn: 'Thrikarthika & Deepam',
    nameMl: 'തൃക്കാർത്തിക ദീപോത്സവം',
    dateEn: 'Malayalam Month: Vrischikam (Nov - Dec)',
    dateMl: 'മലയാള മാസം: വൃശ്ചികം കാർത്തിക',
    descEn: 'Grand illumination of earthen oil lamps around the sanctum for Karthikeya.',
    descMl: 'മുരുകഭഗവാന്റെ തിരുനാളിൽ സർവ്വത്ര ദീപങ്ങൾ തെളിയിക്കുന്ന തൃക്കാർത്തിക ഉത്സവം.',
    image: require('../../assets/images/temple/festivals/thrikarthika.jpg'),
  },
];

const GALLERY_IMAGES = [
  { id: 'g1', title: 'Subramanya Swami Sanctum', image: require('../../assets/images/temple/gallery/subramanya_sanctum.jpg') },
  { id: 'g2', title: 'Peacock Diya Illumination', image: require('../../assets/images/temple/gallery/peacock_diya_decor.jpg') },
  { id: 'g3', title: 'Balamurugan Sacred Shrine', image: require('../../assets/images/temple/gallery/balamurugan_shrine.jpg') },
  { id: 'g4', title: 'Ganapathy Temple Shrine', image: require('../../assets/images/temple/gallery/ganapathy_shrine.jpg') },
  { id: 'g5', title: 'Bhagavathy Temple Shrine', image: require('../../assets/images/temple/gallery/bhagavathy_shrine.jpg') },
  { id: 'g6', title: 'Temple Festive Illumination', image: require('../../assets/images/temple/gallery/temple_festive_decor.jpg') },
];

export default function TabHomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language, toggleLanguage, isMalayalam } = useLanguage();

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedDeity, setSelectedDeity] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [selectedNotice, setSelectedNotice] = useState<TempleNotice | null>(null);
  const [allNoticesModalVisible, setAllNoticesModalVisible] = useState(false);
  const [noticeFilter, setNoticeFilter] = useState<string>('all');

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const flamePulse = useRef(new Animated.Value(0.4)).current;
  const bannerFade = useRef(new Animated.Value(1)).current;

  const [sanctumStatus, setSanctumStatus] = useState({
    isOpen: true,
    statusTextEn: 'SANCTUM DARSHAN • OPEN NOW',
    statusTextMl: 'ദർശനം സാധ്യമാണ് • നട തുറന്നിരിക്കുന്നു',
  });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMins = hours * 60 + minutes;

      const isMorningOpen = totalMins >= 300 && totalMins <= 630;
      const isEveningOpen = totalMins >= 1050 && totalMins <= 1200;

      if (isMorningOpen || isEveningOpen) {
        setSanctumStatus({
          isOpen: true,
          statusTextEn: 'SANCTUM DARSHAN • OPEN NOW',
          statusTextMl: 'ദർശനം സാധ്യമാണ് • നട തുറന്നിരിക്കുന്നു',
        });
      } else {
        const opensNext =
          totalMins < 300
            ? 'Opens at 05:00 AM'
            : totalMins < 1050
            ? 'Opens at 05:30 PM'
            : 'Opens tomorrow at 05:00 AM';
        const opensNextMl =
          totalMins < 300
            ? 'നട തുറക്കുന്നത്: 05:00 AM'
            : totalMins < 1050
            ? 'നട തുറക്കുന്നത്: 05:30 PM'
            : 'നാളെ രാവിലെ 05:00 AM-ന് നട തുറക്കും';

        setSanctumStatus({
          isOpen: false,
          statusTextEn: 'SANCTUM CLOSED • ' + opensNext,
          statusTextMl: 'ശ്രീകോവിൽ നട അടച്ചിരിക്കുന്നു • ' + opensNextMl,
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const flameLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(flamePulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(flamePulse, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    const scaleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    flameLoop.start();
    scaleLoop.start();

    return () => {
      flameLoop.stop();
      scaleLoop.stop();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(bannerFade, {
          toValue: 0.6,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(bannerFade, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();

      setActiveBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = isMalayalam
      ? 'സ്വാമി ശരണം! തുറയിൽകുന്ന് ക്ഷേത്ര ദർശന സമയങ്ങളും വഴിപാടുകളും സംബന്ധിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Swami Saranam! I would like to inquire about temple darshan, timings and Vazhipadu offerings at Thurayilkunnu Temple.';
    Linking.openURL(
      'https://wa.me/+919400788358?text=' + encodeURIComponent(customMessage || defaultMsg)
    );
  };

  const openCall = () => {
    Linking.openURL('tel:+919400788358');
  };

  const openMap = () => {
    Linking.openURL('https://maps.app.goo.gl/nf1ogELnNM7MpmC46');
  };

  const handleShareNotice = async (notice: TempleNotice) => {
    try {
      const title = isMalayalam ? notice.titleMl : notice.titleEn;
      const summary = isMalayalam ? notice.summaryMl : notice.summaryEn;
      const shareText = `📢 *തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം അറിയിപ്പ്* 📢\n\n*${title}*\n\n${summary}\n\nകൂടുതൽ വിവരങ്ങൾക്ക്: +91 9400788358\nസ്വാമി ശരണം! ✨`;
      await Share.share({
        message: shareText,
        title: title,
      });
    } catch (err) {
      // Ignored
    }
  };

  const handleShareBlessing = async () => {
    try {
      const shareText = isMalayalam
        ? '🕉️ തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം 🕉️\n"ശ്രവണഭൂഷണം ശത്രുസംഹാരം കാർത്തികേയം ഭജേ"\n\nഇന്നത്തെ ദർശന സമയം:\nപ്രഭാതം: 05:00 AM – 10:30 AM\nസന്ധ്യ: 05:30 PM – 08:00 PM\n\nആലുംകടവ്, കരുനാഗപ്പള്ളി, കൊല്ലം ജില്ല.\nസ്വാമി ശരണം! ✨'
        : '🕉️ Thurayilkunnu Sree Subramanya Swami Temple 🕉️\n"May Lord Murugan shower his divine blessings upon you and your family!"\n\nSanctum Timings:\nMorning: 05:00 AM – 10:30 AM\nEvening: 05:30 PM – 08:00 PM\n\nAlumkadavu, Karunagappally, Kollam, Kerala.\nSwami Saranam! ✨';

      await Share.share({
        message: shareText,
        title: 'Thurayilkunnu Temple Blessings',
      });
    } catch (err) {
      // Ignored
    }
  };

  const currentBanner = HERO_BANNERS[activeBannerIndex];

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HERO CAROUSEL BANNER ================= */}
        <View style={styles.heroSection}>
          <Animated.View style={[styles.heroImageContainer, { opacity: bannerFade }]}>
            <Image
              source={currentBanner.image}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
          </Animated.View>

          {/* Top Row: Live Indicator & Language Switcher */}
          <View style={[styles.heroTopRow, { paddingTop: Math.max(insets.top + 8, 16) }]}>
            <View style={styles.livePill}>
              <Animated.View
                style={[
                  styles.liveIndicatorDot,
                  {
                    backgroundColor: sanctumStatus.isOpen ? '#10B981' : '#F59E0B',
                    transform: [{ scale: pulseAnim }],
                    opacity: flamePulse,
                  },
                ]}
              />
              <Text style={styles.livePillText}>
                {isMalayalam ? sanctumStatus.statusTextMl : sanctumStatus.statusTextEn}
              </Text>
            </View>

            {/* Language Switcher Toggle */}
            <TouchableOpacity
              style={styles.langToggleBtn}
              onPress={toggleLanguage}
              activeOpacity={0.8}
            >
              <Globe size={13} color="#FCD34D" />
              <Text style={styles.langToggleText}>
                {language === 'ml' ? 'English' : 'മലയാളം'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Hero Content Over Banner */}
          <View style={styles.heroContent}>
            <View style={{ marginBottom: 10 }}>
              <TempleLogo size="hero" showChant={true} />
            </View>
            <View style={styles.heroTagBadge}>
              <Sparkles size={12} color="#D97706" />
              <Text style={styles.heroTagText}>
                {isMalayalam ? currentBanner.tagMl : currentBanner.tagEn}
              </Text>
            </View>
            <Text style={styles.heroSubtitle}>
              {isMalayalam ? currentBanner.subtitleMl : currentBanner.subtitleEn}
            </Text>

            {/* Timing Quick Strip with Modal Trigger */}
            <TouchableOpacity
              style={styles.heroTimingsBox}
              onPress={() => setScheduleModalVisible(true)}
              activeOpacity={0.85}
            >
              <View style={styles.timingItem}>
                <Sun size={14} color="#F59E0B" />
                <Text style={styles.timingItemText}>
                  {isMalayalam ? 'രാവിലെ: 05:00 – 10:30 AM' : 'Morning: 05:00 – 10:30 AM'}
                </Text>
              </View>
              <View style={styles.timingDivider} />
              <View style={styles.timingItem}>
                <Moon size={14} color="#F59E0B" />
                <Text style={styles.timingItemText}>
                  {isMalayalam ? 'സന്ധ്യ: 05:30 – 08:00 PM' : 'Evening: 05:30 – 08:00 PM'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Pagination Indicators */}
            <View style={styles.paginationRow}>
              {HERO_BANNERS.map((banner, index) => (
                <TouchableOpacity
                  key={banner.id}
                  onPress={() => setActiveBannerIndex(index)}
                  style={[
                    styles.paginationDot,
                    index === activeBannerIndex && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* ================= QUICK SPIRITUAL ACTIONS ================= */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardPrimary]}
            onPress={() => router.push('/two')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Flame size={22} color="#D97706" />
              </Animated.View>
            </View>
            <Text style={styles.actionCardTitle}>
              {isMalayalam ? 'വഴിപാടുകൾ' : 'Book Vazhipadu'}
            </Text>
            <Text style={styles.actionCardDesc}>
              {isMalayalam ? 'സമർപ്പണം' : 'Multi-Booking'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={openCall}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Phone size={20} color="#16A34A" />
            </View>
            <Text style={styles.actionCardTitle}>
              {isMalayalam ? 'ഓഫീസ് ഫോൺ' : 'Temple Office'}
            </Text>
            <Text style={styles.actionCardDesc}>
              {isMalayalam ? 'വിളിക്കാം' : 'Direct Call'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={openMap}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <MapPin size={20} color="#DC2626" />
            </View>
            <Text style={styles.actionCardTitle}>
              {isMalayalam ? 'ക്ഷേത്ര വഴി' : 'Directions'}
            </Text>
            <Text style={styles.actionCardDesc}>Google Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setScheduleModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#E0E7FF' }]}>
              <Calendar size={20} color="#4F46E5" />
            </View>
            <Text style={styles.actionCardTitle}>
              {isMalayalam ? 'പൂജാക്രമം' : 'Pooja Times'}
            </Text>
            <Text style={styles.actionCardDesc}>
              {isMalayalam ? 'വിശദ വിവരങ്ങൾ' : 'Schedule'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= DAILY PANCHANGAM & AUSPICIOUS TIMES ================= */}
        <View style={styles.panchangamCard}>
          <View style={styles.panchangamHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Sun size={15} color="#D97706" />
              <Text style={styles.panchangamTitle}>
                {isMalayalam ? 'ഇന്നത്തെ പഞ്ചാംഗ വിശേഷം' : "Today's Panchangam & Muhurtham"}
              </Text>
            </View>
            <View style={styles.panchangamDateBadge}>
              <Text style={styles.panchangamDateText}>
                {isMalayalam ? 'കൊല്ലവർഷം 1201' : 'Kollavarsham 1201'}
              </Text>
            </View>
          </View>

          <View style={styles.panchangamGrid}>
            <View style={styles.panchangamItem}>
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'നക്ഷത്രം (Star):' : 'Nakshatra:'}
              </Text>
              <Text style={styles.panchangamVal}>
                {isMalayalam ? 'കാർത്തിക (Karthika)' : 'Karthika'}
              </Text>
            </View>
            <View style={styles.panchangamItem}>
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'തിഥി (Tithi):' : 'Tithi:'}
              </Text>
              <Text style={styles.panchangamVal}>
                {isMalayalam ? 'ശുക്ലപക്ഷ ഷഷ്ഠി' : 'Shukla Paksha Sashti'}
              </Text>
            </View>
            <View style={styles.panchangamItem}>
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'രാഹുകാലം:' : 'Rahu Kalam:'}
              </Text>
              <Text style={[styles.panchangamVal, { color: '#DC2626' }]}>
                01:30 PM – 03:00 PM
              </Text>
            </View>
            <View style={styles.panchangamItem}>
              <Text style={styles.panchangamLabel}>
                {isMalayalam ? 'ഗുളികകാലം:' : 'Gulika Kalam:'}
              </Text>
              <Text style={[styles.panchangamVal, { color: '#D97706' }]}>
                09:00 AM – 10:30 AM
              </Text>
            </View>
          </View>
        </View>

        {/* ================= NOTICES & ANNOUNCEMENTS SECTION ================= */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Megaphone size={14} color="#D97706" />
                <Text style={styles.sectionBadge}>
                  {isMalayalam ? 'അറിയിപ്പുകൾ & വാർത്തകൾ' : 'NOTICES & ANNOUNCEMENTS'}
                </Text>
              </View>
              <Text style={styles.sectionHeading}>
                {isMalayalam ? 'ക്ഷേത്ര അറിയിപ്പ് പലക' : 'Temple Notice Board'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => setAllNoticesModalVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.viewAllBtnText}>
                {isMalayalam ? 'എല്ലാം കാണുക' : 'View All'} ({TEMPLE_NOTICES.length})
              </Text>
              <ChevronRight size={13} color="#D97706" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.noticesScroll}
          >
            {TEMPLE_NOTICES.map((notice) => (
              <TouchableOpacity
                key={notice.id}
                style={styles.noticeCard}
                onPress={() => setSelectedNotice(notice)}
                activeOpacity={0.88}
              >
                <View style={styles.noticeCardTop}>
                  <View style={styles.noticeCategoryBadge}>
                    <Text style={styles.noticeCategoryText}>
                      {isMalayalam ? notice.tagMl : notice.tagEn}
                    </Text>
                  </View>
                  {notice.isUrgent && (
                    <View style={styles.urgentBadge}>
                      <Bell size={10} color="#FFFFFF" />
                      <Text style={styles.urgentBadgeText}>
                        {isMalayalam ? 'പ്രധാനം' : 'IMPORTANT'}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.noticeDateText}>
                  {isMalayalam ? notice.dateMl : notice.dateEn}
                </Text>

                <Text style={styles.noticeTitleText} numberOfLines={2}>
                  {isMalayalam ? notice.titleMl : notice.titleEn}
                </Text>

                <Text style={styles.noticeSummaryText} numberOfLines={2}>
                  {isMalayalam ? notice.summaryMl : notice.summaryEn}
                </Text>

                <View style={styles.noticeCardFooter}>
                  <Text style={styles.readMoreText}>
                    {isMalayalam ? 'വിശദ വിവരങ്ങൾ' : 'Read Notice'}
                  </Text>
                  <ChevronRight size={14} color="#D97706" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ================= SACRED MANTRA STRIP & WHATSAPP SHARE ================= */}
        <View style={styles.mantraBanner}>
          <View style={styles.mantraTopBar}>
            <View style={styles.mantraIconBadge}>
              <Sparkles size={16} color="#D97706" />
            </View>
            <TouchableOpacity
              style={styles.shareMantraBtn}
              onPress={handleShareBlessing}
              activeOpacity={0.8}
            >
              <Share2 size={13} color="#D97706" />
              <Text style={styles.shareMantraBtnText}>
                {isMalayalam ? 'ഷെയർ ചെയ്യാം' : 'Share Blessing'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.mantraSanskrit}>
            "ശ്രവണഭൂഷണം ശത്രുസംഹാരം കാർത്തികേയം ഭജേ"
          </Text>
          <Text style={styles.mantraMeaning}>
            {isMalayalam
              ? '— സർവ്വവിധ ദുരിതങ്ങളും നീങ്ങി കുടുംബത്തിൽ ഐശ്വര്യം നിറയട്ടെ'
              : '— May Lord Murugan’s Divine Vel protect & bless all devotees'}
          </Text>
        </View>

        {/* ================= SACRED DEITIES (PRATHISHTA) ================= */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionBadge}>
                {isMalayalam ? 'ദർശനം • പ്രതിഷ്ഠകൾ' : 'SANCTUM • DEITIES'}
              </Text>
              <Text style={styles.sectionHeading}>
                {isMalayalam ? 'ക്ഷേത്ര പ്രതിഷ്ഠകൾ' : 'Sacred Prathishta'}
              </Text>
            </View>
            <Text style={styles.swipeHintText}>
              {isMalayalam ? 'തുടർന്ന് കാണാൻ ➔' : 'Swipe to view ➔'}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.deitiesScroll}
          >
            {DEITIES.map((deity) => (
              <TouchableOpacity
                key={deity.id}
                style={styles.deityCard}
                onPress={() => setSelectedDeity(deity)}
                activeOpacity={0.88}
              >
                <Image
                  source={deity.image}
                  style={styles.deityImage}
                  resizeMode="cover"
                />
                <View style={styles.deityOverlay} />
                <View style={styles.deityBadge}>
                  <Text style={styles.deityBadgeText}>
                    {isMalayalam ? deity.badgeMl : deity.badgeEn}
                  </Text>
                </View>
                <View style={styles.deityTextContainer}>
                  <Text style={styles.deityName}>
                    {isMalayalam ? deity.nameMl : deity.nameEn}
                  </Text>
                  <Text style={styles.deitySubName}>
                    {isMalayalam ? deity.nameEn : deity.nameMl}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ================= FEATURED OFFERINGS QUICK GRID ================= */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionBadge}>
                {isMalayalam ? 'വിശേഷാൽ സമർപ്പണം' : 'SACRED SEVA'}
              </Text>
              <Text style={styles.sectionHeading}>
                {isMalayalam ? 'പ്രധാന വഴിപാടുകൾ' : 'Featured Offerings'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => router.push('/two')}
              activeOpacity={0.8}
            >
              <Text style={styles.viewAllBtnText}>
                {isMalayalam ? 'എല്ലാം കാണുക' : 'View All'}
              </Text>
              <ChevronRight size={13} color="#D97706" />
            </TouchableOpacity>
          </View>

          <View style={styles.offeringsGrid}>
            {FEATURED_OFFERINGS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.offeringCard}
                onPress={() => router.push('/two')}
                activeOpacity={0.85}
              >
                <Image
                  source={item.image}
                  style={styles.offeringThumb}
                  resizeMode="cover"
                />
                <View style={styles.offeringContent}>
                  <View style={styles.offeringBadge}>
                    <Text style={styles.offeringBadgeText}>{item.badge}</Text>
                  </View>
                  <Text style={styles.offeringName} numberOfLines={1}>
                    {isMalayalam ? item.nameMl : item.nameEn}
                  </Text>
                  <Text style={styles.offeringPrice}>{item.price}</Text>
                  <Text style={styles.offeringDesc} numberOfLines={2}>
                    {isMalayalam ? item.descMl : item.descEn}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= TEMPLE FESTIVALS ================= */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionBadge}>
                {isMalayalam ? 'ഉത്സവങ്ങളും തിരുനാളുകളും' : 'SACRED FESTIVALS'}
              </Text>
              <Text style={styles.sectionHeading}>
                {isMalayalam ? 'ക്ഷേത്ര മഹോത്സവങ്ങൾ' : 'Temple Utsavams'}
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.festivalsScroll}
          >
            {FESTIVALS.map((fest) => (
              <View key={fest.id} style={styles.festivalCard}>
                <Image
                  source={fest.image}
                  style={styles.festivalImage}
                  resizeMode="cover"
                />
                <View style={styles.festivalOverlay} />
                <View style={styles.festivalContent}>
                  <View style={styles.festivalDateBadge}>
                    <Calendar size={11} color="#FEF3C7" />
                    <Text style={styles.festivalDateText}>
                      {isMalayalam ? fest.dateMl : fest.dateEn}
                    </Text>
                  </View>
                  <Text style={styles.festivalTitle}>
                    {isMalayalam ? fest.nameMl : fest.nameEn}
                  </Text>
                  <Text style={styles.festivalDesc} numberOfLines={2}>
                    {isMalayalam ? fest.descMl : fest.descEn}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ================= TEMPLE STHALA PURANAM TEASER ================= */}
        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Compass size={20} color="#D97706" />
            <Text style={styles.historyTitle}>
              {isMalayalam ? 'ക്ഷേത്ര ഐതിഹ്യം (സ്ഥലപുരാണം)' : 'Temple Sthala Puranam'}
            </Text>
          </View>
          <Text style={styles.historySnippet}>
            {isMalayalam
              ? 'ആലുംകടവ് കായലോരത്തെ പ്രകൃതിരമണീയമായ കുന്നിൻമുകളിൽ കുടികൊള്ളുന്ന പുരാതനവും ദിവ്യവുമായ പുണ്യസങ്കേതമാണ് തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം. സർവ്വകാര്യവിജയത്തിനും കുടുംബൈശ്വര്യത്തിനുമായി നൂറ്റാണ്ടുകളായി ഭക്തർ ആശ്രയിക്കുന്ന പുണ്യഭൂമി.'
              : 'Perched atop the tranquil hillock of Thurayilkunnu in Alumkadavu, this ancient temple enshrines Lord Subramanya Swami as the presiding savior deity, bestowing peace, prosperity, and victory over all challenges.'}
          </Text>
          <TouchableOpacity
            style={styles.readHistoryBtn}
            onPress={() => router.push('/(tabs)/about' as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.readHistoryText}>
              {isMalayalam ? 'കൂടുതൽ ചരിത്രവിവരങ്ങൾ വായിക്കാം' : 'Read Full Temple History'}
            </Text>
            <ChevronRight size={15} color="#D97706" />
          </TouchableOpacity>
        </View>

        {/* ================= TEMPLE SACRED GALLERY ================= */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionBadge}>
                {isMalayalam ? 'ദിവ്യ ചിത്രശാല' : 'PHOTO GALLERY'}
              </Text>
              <Text style={styles.sectionHeading}>
                {isMalayalam ? 'ക്ഷേത്ര ദർശന ചിത്രങ്ങൾ' : 'Temple Darshan Gallery'}
              </Text>
            </View>
            <Camera size={18} color="#D97706" />
          </View>

          <View style={styles.galleryGrid}>
            {GALLERY_IMAGES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.galleryItem}
                onPress={() => setPreviewImage(item.image)}
                activeOpacity={0.85}
              >
                <Image source={item.image} style={styles.galleryImage} resizeMode="cover" />
                <View style={styles.galleryLabelBar}>
                  <Text style={styles.galleryLabelText} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ================= FOOTER CONTACT STRIP ================= */}
        <View style={styles.footerSection}>
          <TempleLogo size="card" showChant={true} />
          <Text style={styles.footerAddress}>
            {isMalayalam
              ? 'ആലുംകടവ്, കരുനാഗപ്പള്ളി, കൊല്ലം ജില്ല • കേരളം'
              : 'Alumkadavu, Karunagappally, Kollam District, Kerala'}
          </Text>

          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.footerBtn} onPress={openCall}>
              <Phone size={16} color="#FFFFFF" />
              <Text style={styles.footerBtnText}>
                {isMalayalam ? 'വിളിക്കുക' : 'Contact'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerBtn, styles.footerBtnPrimary]}
              onPress={() => openWhatsApp()}
            >
              <Flame size={16} color="#FFFFFF" />
              <Text style={styles.footerBtnText}>
                {isMalayalam ? 'സന്ദേശം' : 'Enquire'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerBtn} onPress={openMap}>
              <MapPin size={16} color="#FFFFFF" />
              <Text style={styles.footerBtnText}>
                {isMalayalam ? 'ദിശ' : 'Directions'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyrightText}>
            © 2026 Thurayilkunnu Temple Trust. All Rights Reserved.
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
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalBadge}>
                  {isMalayalam ? 'നിത്യ പൂജാക്രമം' : 'DAILY SANCTUM TIMINGS'}
                </Text>
                <Text style={styles.modalTitle}>
                  {isMalayalam ? 'ക്ഷേത്ര പൂജാക്രമം & സമയങ്ങൾ' : 'Daily Pooja Schedule'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setScheduleModalVisible(false)}
              >
                <X size={20} color="#1C1917" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.scheduleList}>
                {POOJA_SCHEDULE.map((item, idx) => (
                  <View key={idx} style={styles.scheduleRow}>
                    <View style={styles.scheduleTimeBox}>
                      <Clock size={12} color="#D97706" />
                      <Text style={styles.scheduleTimeText}>{item.time}</Text>
                    </View>
                    <View style={styles.scheduleDetails}>
                      <Text style={styles.scheduleName}>
                        {isMalayalam ? item.nameMl : item.nameEn}
                      </Text>
                      <Text style={styles.scheduleDesc}>
                        {isMalayalam ? item.descMl : item.descEn}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalBottomBtn}
              onPress={() => {
                setScheduleModalVisible(false);
                router.push('/two');
              }}
            >
              <Text style={styles.modalBottomBtnText}>
                {isMalayalam ? 'ഇന്നത്തെ പൂജയ്ക്ക് വഴിപാട് ബുക്ക് ചെയ്യാം' : "Book Offering for Today's Pooja"}
              </Text>
              <ChevronRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: SINGLE NOTICE DETAILS ================= */}
      <Modal
        visible={!!selectedNotice}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedNotice(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedNotice && (
            <View style={styles.noticeModalCard}>
              <View style={styles.noticeModalHeader}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <View style={styles.noticeCategoryBadge}>
                      <Text style={styles.noticeCategoryText}>
                        {isMalayalam ? selectedNotice.tagMl : selectedNotice.tagEn}
                      </Text>
                    </View>
                    {selectedNotice.isUrgent && (
                      <View style={styles.urgentBadge}>
                        <Bell size={10} color="#FFFFFF" />
                        <Text style={styles.urgentBadgeText}>
                          {isMalayalam ? 'പ്രധാനം' : 'IMPORTANT'}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.noticeModalDate}>
                    {isMalayalam ? selectedNotice.dateMl : selectedNotice.dateEn}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedNotice(null)}
                >
                  <X size={20} color="#1C1917" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.noticeModalScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.noticeModalTitle}>
                  {isMalayalam ? selectedNotice.titleMl : selectedNotice.titleEn}
                </Text>

                <View style={styles.noticeDivider} />

                <Text style={styles.noticeModalDetails}>
                  {isMalayalam ? selectedNotice.detailsMl : selectedNotice.detailsEn}
                </Text>
              </ScrollView>

              <View style={styles.noticeModalActionsRow}>
                <TouchableOpacity
                  style={styles.noticeShareBtn}
                  onPress={() => handleShareNotice(selectedNotice)}
                >
                  <Share2 size={16} color="#D97706" />
                  <Text style={styles.noticeShareBtnText}>
                    {isMalayalam ? 'ഷെയർ' : 'Share'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.noticeActionBtn}
                  onPress={() => {
                    const msg = isMalayalam
                      ? selectedNotice.whatsappMessageMl
                      : selectedNotice.whatsappMessageEn;
                    setSelectedNotice(null);
                    openWhatsApp(msg);
                  }}
                >
                  <Flame size={16} color="#FFFFFF" />
                  <Text style={styles.noticeActionBtnText}>
                    {isMalayalam
                      ? (selectedNotice.actionTextMl || 'വിവരങ്ങൾക്ക് ബന്ധപ്പെടാം')
                      : (selectedNotice.actionTextEn || 'Enquire on WhatsApp')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* ================= MODAL: ALL NOTICES BOARD ================= */}
      <Modal
        visible={allNoticesModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAllNoticesModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.allNoticesModalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalBadge}>
                  {isMalayalam ? 'ക്ഷേത്ര വാർത്തകൾ' : 'TEMPLE CIRCULARS & NOTICES'}
                </Text>
                <Text style={styles.modalTitle}>
                  {isMalayalam ? 'എല്ലാ അറിയിപ്പുകളും' : 'Official Notice Board'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setAllNoticesModalVisible(false)}
              >
                <X size={20} color="#1C1917" />
              </TouchableOpacity>
            </View>

            {/* Filter pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.noticeFilterScroll}
            >
              {[
                { id: 'all', ml: 'എല്ലാം', en: 'All' },
                { id: 'festival', ml: 'ഉത്സവം', en: 'Festivals' },
                { id: 'annadanam', ml: 'അന്നദാനം', en: 'Annadanam' },
                { id: 'pooja', ml: 'പൂജകൾ', en: 'Poojas' },
                { id: 'development', ml: 'വികസനം', en: 'Renovation' },
                { id: 'general', ml: 'നിയമങ്ങൾ', en: 'Guidelines' },
              ].map((f) => {
                const isActive = noticeFilter === f.id;
                return (
                  <TouchableOpacity
                    key={f.id}
                    style={[styles.filterPill, isActive && styles.filterPillActive]}
                    onPress={() => setNoticeFilter(f.id)}
                  >
                    <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                      {isMalayalam ? f.ml : f.en}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.allNoticesList}>
                {TEMPLE_NOTICES.filter(
                  (n) => noticeFilter === 'all' || n.category === noticeFilter
                ).map((notice) => (
                  <TouchableOpacity
                    key={notice.id}
                    style={styles.allNoticeItem}
                    onPress={() => {
                      setAllNoticesModalVisible(false);
                      setSelectedNotice(notice);
                    }}
                    activeOpacity={0.85}
                  >
                    <View style={styles.allNoticeItemTop}>
                      <View style={styles.noticeCategoryBadge}>
                        <Text style={styles.noticeCategoryText}>
                          {isMalayalam ? notice.tagMl : notice.tagEn}
                        </Text>
                      </View>
                      <Text style={styles.allNoticeDate}>
                        {isMalayalam ? notice.dateMl : notice.dateEn}
                      </Text>
                    </View>
                    <Text style={styles.allNoticeTitle}>
                      {isMalayalam ? notice.titleMl : notice.titleEn}
                    </Text>
                    <Text style={styles.allNoticeSummary} numberOfLines={2}>
                      {isMalayalam ? notice.summaryMl : notice.summaryEn}
                    </Text>
                    <View style={styles.allNoticeItemBottom}>
                      <Text style={styles.readMoreText}>
                        {isMalayalam ? 'പൂർണ്ണ വിവരങ്ങൾ കാണുക ➔' : 'View Circular ➔'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: DEITY BLESSING & DETAILS ================= */}
      <Modal
        visible={!!selectedDeity}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedDeity(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedDeity && (
            <View style={styles.deityModalCard}>
              <TouchableOpacity
                style={styles.deityModalClose}
                onPress={() => setSelectedDeity(null)}
              >
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={selectedDeity.image}
                style={styles.deityModalImage}
                resizeMode="cover"
              />

              <View style={styles.deityModalBody}>
                <View style={styles.deityModalBadge}>
                  <Text style={styles.deityModalBadgeText}>
                    {isMalayalam ? selectedDeity.badgeMl : selectedDeity.badgeEn}
                  </Text>
                </View>
                <Text style={styles.deityModalTitle}>
                  {isMalayalam ? selectedDeity.nameMl : selectedDeity.nameEn}
                </Text>
                <Text style={styles.deityModalMalayalam}>
                  {isMalayalam ? selectedDeity.nameEn : selectedDeity.nameMl}
                </Text>

                <View style={styles.mantraHighlightBox}>
                  <Sparkles size={14} color="#D97706" />
                  <Text style={styles.mantraHighlightText}>{selectedDeity.mantra}</Text>
                </View>

                <Text style={styles.deityModalDesc}>
                  {isMalayalam ? selectedDeity.descMl : selectedDeity.descEn}
                </Text>

                <TouchableOpacity
                  style={styles.deityModalAction}
                  onPress={() => {
                    const d = selectedDeity;
                    setSelectedDeity(null);
                    openWhatsApp(
                      isMalayalam
                        ? 'സ്വാമി ശരണം! ' + d.nameMl + ' സന്നിധിയിൽ വഴിപാട് സമർപ്പിക്കാൻ ആഗ്രഹിക്കുന്നു.'
                        : 'Swami Saranam! I would like to offer prayers and book a Vazhipadu for *' + d.nameEn + '*.'
                    );
                  }}
                >
                  <Flame size={16} color="#FFFFFF" />
                  <Text style={styles.deityModalActionText}>
                    {isMalayalam ? 'പ്രാർത്ഥന & വഴിപാട് സമർപ്പിക്കുക' : 'Offer Prayers & Vazhipadu'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* ================= MODAL: IMAGE PREVIEW ================= */}
      <Modal
        visible={!!previewImage}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setPreviewImage(null)}
      >
        <TouchableOpacity
          style={styles.imagePreviewBackdrop}
          activeOpacity={1}
          onPress={() => setPreviewImage(null)}
        >
          <TouchableOpacity
            style={styles.previewCloseBtn}
            onPress={() => setPreviewImage(null)}
          >
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {previewImage && (
            <Image
              source={previewImage}
              style={styles.fullPreviewImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    backgroundColor: '#0C0A09',
  },
  container: {
    flex: 1,
    maxWidth: CONTAINER_MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#0F0E0D',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    width: '100%',
    height: 380,
    position: 'relative',
    backgroundColor: '#1C1917',
    justifyContent: 'space-between',
  },
  heroImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(12, 10, 9, 0.6)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    gap: 6,
    maxWidth: '75%',
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  livePillText: {
    color: '#FCD34D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  langToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 119, 6, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.5)',
    gap: 5,
  },
  langToggleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  heroEmblem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.6)',
  },
  heroTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 5,
    marginBottom: 8,
  },
  heroTagText: {
    color: '#B45309',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#FDE68A',
    fontWeight: '600',
    marginTop: 4,
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroTimingsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(28, 25, 23, 0.85)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  timingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timingItemText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  timingDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(245, 158, 11, 0.3)',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: '#F59E0B',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#1C1917',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.15)',
  },
  actionCardPrimary: {
    borderColor: 'rgba(245, 158, 11, 0.45)',
    backgroundColor: '#261F18',
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionCardTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  actionCardDesc: {
    color: '#A8A29E',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  panchangamCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  panchangamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  panchangamTitle: {
    color: '#FCD34D',
    fontSize: 13,
    fontWeight: '800',
  },
  panchangamDateBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  panchangamDateText: {
    color: '#FDE68A',
    fontSize: 10,
    fontWeight: '700',
  },
  panchangamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  panchangamItem: {
    width: '48%',
    backgroundColor: '#26221F',
    borderRadius: 10,
    padding: 8,
  },
  panchangamLabel: {
    color: '#A8A29E',
    fontSize: 10,
    fontWeight: '600',
  },
  panchangamVal: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionBadge: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllBtnText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '700',
  },
  swipeHintText: {
    color: '#78716C',
    fontSize: 11,
    fontWeight: '600',
  },
  noticesScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
  },
  noticeCard: {
    width: 250,
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    justifyContent: 'space-between',
  },
  noticeCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  noticeCategoryBadge: {
    backgroundColor: 'rgba(217, 119, 6, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  noticeCategoryText: {
    color: '#FCD34D',
    fontSize: 9,
    fontWeight: '800',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  urgentBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  noticeDateText: {
    color: '#A8A29E',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  noticeTitleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
    marginBottom: 6,
  },
  noticeSummaryText: {
    color: '#D6D3D1',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 10,
  },
  noticeCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 8,
  },
  readMoreText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  mantraBanner: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  mantraTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mantraIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareMantraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  shareMantraBtnText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '800',
  },
  mantraSanskrit: {
    color: '#FCD34D',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  mantraMeaning: {
    color: '#E7E5E4',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
  },
  deitiesScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
  },
  deityCard: {
    width: 145,
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1C1917',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  deityImage: {
    width: '100%',
    height: '100%',
  },
  deityOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  deityBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  deityBadgeText: {
    color: '#B45309',
    fontSize: 8,
    fontWeight: '800',
  },
  deityTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  deityName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  deitySubName: {
    color: '#FCD34D',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  offeringsGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  offeringCard: {
    width: '48%',
    backgroundColor: '#1C1917',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  offeringThumb: {
    width: '100%',
    height: 100,
  },
  offeringContent: {
    padding: 10,
  },
  offeringBadge: {
    backgroundColor: 'rgba(217, 119, 6, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  offeringBadgeText: {
    color: '#FCD34D',
    fontSize: 9,
    fontWeight: '700',
  },
  offeringName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  offeringPrice: {
    color: '#D97706',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  offeringDesc: {
    color: '#A8A29E',
    fontSize: 10,
    marginTop: 4,
    lineHeight: 14,
  },
  festivalsScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
  },
  festivalCard: {
    width: 240,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1C1917',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  festivalImage: {
    width: '100%',
    height: '100%',
  },
  festivalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  festivalContent: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  festivalDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(217, 119, 6, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  festivalDateText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  festivalTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  festivalDesc: {
    color: '#E7E5E4',
    fontSize: 10,
    marginTop: 3,
    lineHeight: 14,
  },
  historyCard: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  historyTitle: {
    color: '#FCD34D',
    fontSize: 14,
    fontWeight: '800',
  },
  historySnippet: {
    color: '#D6D3D1',
    fontSize: 12,
    lineHeight: 18,
  },
  readHistoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  readHistoryText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '700',
  },
  galleryGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryItem: {
    width: '31%',
    height: 95,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1C1917',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  galleryLabelBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  galleryLabelText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerSection: {
    marginHorizontal: 16,
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(245, 158, 11, 0.2)',
    alignItems: 'center',
  },
  footerEmblem: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.5)',
    marginBottom: 12,
  },
  footerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  footerAddress: {
    color: '#A8A29E',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  footerActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#292524',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  footerBtnPrimary: {
    backgroundColor: '#D97706',
  },
  footerBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  copyrightText: {
    color: '#78716C',
    fontSize: 10,
    marginTop: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#1C1917',
    borderRadius: 20,
    padding: 18,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalBadge: {
    color: '#D97706',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    marginVertical: 10,
  },
  scheduleList: {
    gap: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    backgroundColor: '#26221F',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  scheduleTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(217, 119, 6, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  scheduleTimeText: {
    color: '#FCD34D',
    fontSize: 10,
    fontWeight: '800',
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  scheduleDesc: {
    color: '#A8A29E',
    fontSize: 10,
    marginTop: 2,
  },
  modalBottomBtn: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    marginTop: 6,
  },
  modalBottomBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  noticeModalCard: {
    backgroundColor: '#1C1917',
    borderRadius: 20,
    padding: 18,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  noticeModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noticeModalDate: {
    color: '#A8A29E',
    fontSize: 11,
    fontWeight: '600',
  },
  noticeModalScroll: {
    marginVertical: 10,
  },
  noticeModalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  noticeDivider: {
    height: 1,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    marginVertical: 12,
  },
  noticeModalDetails: {
    color: '#D6D3D1',
    fontSize: 13,
    lineHeight: 20,
  },
  noticeModalActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  noticeShareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(217, 119, 6, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  noticeShareBtnText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '800',
  },
  noticeActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#D97706',
    paddingVertical: 12,
    borderRadius: 12,
  },
  noticeActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  allNoticesModalCard: {
    backgroundColor: '#1C1917',
    borderRadius: 20,
    padding: 18,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  noticeFilterScroll: {
    paddingVertical: 6,
    gap: 8,
  },
  filterPill: {
    backgroundColor: '#26221F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterPillActive: {
    backgroundColor: 'rgba(217, 119, 6, 0.35)',
    borderColor: '#F59E0B',
  },
  filterPillText: {
    color: '#A8A29E',
    fontSize: 11,
    fontWeight: '700',
  },
  filterPillTextActive: {
    color: '#FCD34D',
    fontWeight: '800',
  },
  allNoticesList: {
    gap: 12,
    paddingVertical: 6,
  },
  allNoticeItem: {
    backgroundColor: '#26221F',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  allNoticeItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  allNoticeDate: {
    color: '#A8A29E',
    fontSize: 10,
    fontWeight: '600',
  },
  allNoticeTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  allNoticeSummary: {
    color: '#D6D3D1',
    fontSize: 11,
    lineHeight: 16,
  },
  allNoticeItemBottom: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  deityModalCard: {
    backgroundColor: '#1C1917',
    borderRadius: 20,
    overflow: 'hidden',
    maxHeight: '85%',
    alignSelf: 'center',
    width: '90%',
    marginBottom: 'auto',
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  deityModalClose: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deityModalImage: {
    width: '100%',
    height: 220,
  },
  deityModalBody: {
    padding: 20,
  },
  deityModalBadge: {
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 8,
  },
  deityModalBadgeText: {
    color: '#B45309',
    fontSize: 10,
    fontWeight: '800',
  },
  deityModalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  deityModalMalayalam: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FCD34D',
    marginTop: 2,
  },
  mantraHighlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 243, 199, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  mantraHighlightText: {
    color: '#FDE68A',
    fontSize: 12,
    fontWeight: '700',
  },
  deityModalDesc: {
    fontSize: 13,
    color: '#D6D3D1',
    lineHeight: 20,
    marginBottom: 18,
  },
  deityModalAction: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  deityModalActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  imagePreviewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCloseBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 30,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullPreviewImage: {
    width: '92%',
    height: '75%',
  },
});

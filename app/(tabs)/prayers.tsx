import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  BookOpen,
  Music,
} from 'lucide-react-native';

const CONTAINER_MAX_WIDTH = 580;

interface Stotra {
  id: string;
  titleEn: string;
  titleMl: string;
  composerEn: string;
  composerMl: string;
  duration: string;
  verses: {
    ml: string;
    en: string;
    meaningMl: string;
    meaningEn: string;
  }[];
}

const STOTRAS: Stotra[] = [
  {
    id: 's1',
    titleEn: 'Skanda Sashti Kavacham',
    titleMl: 'സ്കന്ദ ഷഷ്ഠി കവചം',
    composerEn: 'Devaraya Swamigal',
    composerMl: 'ദേവരായ സ്വാമികൾ',
    duration: '14:20',
    verses: [
      {
        ml: 'തുതിപ്പോർക്കു വൽവിനൈപോം തുൻപംപോം നെഞ്ചിൽ\nപതിപ്പോർക്കു സെൽവം പലിത്തു പെങ്കിടും\nനിഷ്ടൈയും കൈകൂടും നിമലരരുൾ കന്തർ\nഷഷ്ടി കവചം തനൈ...',
        en: 'Thuthipporkku valvinaipom thunpampom nenjil\nPathipporkku selvam palithu pengidum\nNishtaiyum kaikoodum nimalararul kanthar\nSashti kavacham thanai...',
        meaningMl: 'ഭക്തിയോടെ സ്കന്ദഷഷ്ഠി കവചം ജപിക്കുന്ന ഭക്തരുടെ സർവ്വ ദുരിതങ്ങളും നീങ്ങി സർവ്വൈശ്വര്യങ്ങളും കൈവരും.',
        meaningEn: 'Whoever recites this sacred armor of Lord Skanda with devotion shall find their obstacles destroyed and prosperity multiplied.',
      },
      {
        ml: 'ശരവണഭവനേ ശരണം ശരണം\nഷണ്മുഖ നാഥാ ശരണം ശരണം\nമുരുകാ മുരുകാ ശരണം ശരണം\nമുക്തിയരുളും മുരുകാ ശരണം...',
        en: 'Saravanabhavane saranam saranam\nShanmukha natha saranam saranam\nMuruga Muruga saranam saranam\nMukthiyarulum Muruga saranam...',
        meaningMl: 'ആറുമുഖനായ മുരുകഭഗവാനെ ശരണം പ്രാപിക്കുന്നു. ഞങ്ങൾക്ക് മോക്ഷവും ആയുരാരോഗ്യവും പ്രദാനം ചെയ്യേണമേ.',
        meaningEn: 'Salutations to the six-faced Lord Saravanabhava. We surrender to your divine lotus feet for peace and protection.',
      },
    ],
  },
  {
    id: 's2',
    titleEn: 'Subramanya Bhujangam',
    titleMl: 'സുബ്രഹ്മണ്യ ഭുജംഗം',
    composerEn: 'Adi Shankaracharya',
    composerMl: 'ശ്രീ ആദിശങ്കരാചാര്യർ',
    duration: '09:45',
    verses: [
      {
        ml: 'സദാ ബാലരൂപോഽപി വിഘ്നാദ്രിഹന്ത്രീ\nമഹാദന്തിവക്ത്രാഽപി പഞ്ചാസ്യമാന്യാ\nവിധീന്ദ്രാദിമൃഗ്യ ഗണേശാഭിധാ മേ\nവിധത്താം ശ്രിയം കാപി കല്യാണഭൂതിഃ',
        en: 'Sada baalarupo-pi vighnadri-hantree\nMaha-danti-vaktra-pi panchaasya-maanyaa\nVidheendraadi-mrigya ganeshabhidhaa me\nVadhatthaam shriyam kaapi kalyanabhoothih',
        meaningMl: 'ആദിശങ്കര വിരചിതമായ സുബ്രഹ്മണ്യ ഭുജംഗ സ്തോത്രം രോഗമുക്തിക്കും ആയുരാരോഗ്യത്തിനും അതീവ വിശേഷപ്പെട്ടതാണ്.',
        meaningEn: 'Composed by Adi Shankaracharya at Tiruchendur, this hymn invokes healing, inner strength, and victory over all fears.',
      },
    ],
  },
  {
    id: 's3',
    titleEn: 'Om Saravanabhava Chanting',
    titleMl: 'ഓം ശരവണഭവ ധ്യാന മന്ത്രം',
    composerEn: 'Sacred Moola Mantra',
    composerMl: 'ഷഡക്ഷര മൂലമന്ത്രം',
    duration: '21:00',
    verses: [
      {
        ml: 'ഓം ശരവണഭവ\nഓം ശരവണഭവ\nഓം ശരവണഭവ നമോ നമഃ',
        en: 'Om Saravanabhava\nOm Saravanabhava\nOm Saravanabhava Namo Namaha',
        meaningMl: 'ഷഡക്ഷര മന്ത്രത്തിന്റെ നിത്യജപം മനസ്സിന് ഏകാഗ്രതയും ശത്രുദോഷ നിവാരണവും പ്രദാനം ചെയ്യുന്നു.',
        meaningEn: 'The six-syllable sacred mantra aligns the vital chakras, purifies karma, and brings boundless peace.',
      },
    ],
  },
];

export default function TabPrayersScreen() {
  const { isMalayalam } = useLanguage();
  const [activeStotra, setActiveStotra] = useState<Stotra>(STOTRAS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Sparkles size={14} color="#D97706" />
            <Text style={styles.badgeText}>
              {isMalayalam ? 'ഭക്തി മന്ത്രങ്ങൾ' : 'DEVOTIONAL CHANTS'}
            </Text>
          </View>
          <Text style={styles.headerTitle}>
            {isMalayalam ? 'പ്രാർത്ഥനകളും സ്തോത്രങ്ങളും' : 'Prayers & Stotras'}
          </Text>
          <Text style={styles.headerSub}>
            {isMalayalam
              ? 'തുറയിൽകുന്ന് മുരുകഭഗവാന്റെ ദിവ്യ സ്തോത്രങ്ങൾ നിത്യവും ജപിക്കാം'
              : 'Listen & recite the sacred hymns of Lord Subramanya Swami'}
          </Text>
        </View>

        {/* Mini Audio Player Card */}
        <View style={styles.playerCard}>
          <View style={styles.playerTop}>
            <View style={styles.audioIconBox}>
              <Music size={22} color="#FCD34D" />
            </View>
            <View style={styles.playerMeta}>
              <Text style={styles.playerNowPlaying}>
                {isMalayalam ? 'ഇപ്പോൾ പ്ലേ ചെയ്യുന്നത്' : 'NOW PLAYING'}
              </Text>
              <Text style={styles.playerTitle} numberOfLines={1}>
                {isMalayalam ? activeStotra.titleMl : activeStotra.titleEn}
              </Text>
              <Text style={styles.playerArtist}>
                {isMalayalam ? activeStotra.composerMl : activeStotra.composerEn}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>02:45</Text>
              <Text style={styles.timeText}>{activeStotra.duration}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.secondaryControl}
              onPress={() => setProgress(0)}
            >
              <RotateCcw size={18} color="#D6D3D1" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playBtn}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={24} color="#1C1917" />
              ) : (
                <Play size={24} color="#1C1917" style={{ marginLeft: 2 }} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryControl}>
              <Volume2 size={18} color="#D6D3D1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stotra Selector Pills */}
        <View style={styles.stotraPillsRow}>
          {STOTRAS.map((stotra) => {
            const isSelected = stotra.id === activeStotra.id;
            return (
              <TouchableOpacity
                key={stotra.id}
                style={[styles.stotraPill, isSelected && styles.stotraPillActive]}
                onPress={() => {
                  setActiveStotra(stotra);
                  setProgress(0);
                }}
              >
                <Text
                  style={[
                    styles.stotraPillText,
                    isSelected && styles.stotraPillTextActive,
                  ]}
                >
                  {isMalayalam ? stotra.titleMl : stotra.titleEn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Verses and Lyrics */}
        <View style={styles.lyricsCard}>
          <View style={styles.lyricsHeader}>
            <BookOpen size={18} color="#D97706" />
            <Text style={styles.lyricsTitle}>
              {isMalayalam ? 'സ്തോത്ര വരികളും അർത്ഥവും' : 'Sacred Verses & Meaning'}
            </Text>
          </View>

          {activeStotra.verses.map((verse, index) => (
            <View key={index} style={styles.verseBox}>
              <Text style={styles.verseNumber}>— {index + 1} —</Text>
              <Text style={styles.verseText}>
                {isMalayalam ? verse.ml : verse.en}
              </Text>
              <View style={styles.meaningBox}>
                <Text style={styles.meaningLabel}>
                  {isMalayalam ? 'അർത്ഥം:' : 'Meaning:'}
                </Text>
                <Text style={styles.meaningText}>
                  {isMalayalam ? verse.meaningMl : verse.meaningEn}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Daily Chanting Routine Card */}
        <View style={styles.routineCard}>
          <Text style={styles.routineTitle}>
            {isMalayalam ? 'നിത്യ ജപവിധി' : 'Daily Japa Guidance'}
          </Text>
          <Text style={styles.routineDesc}>
            {isMalayalam
              ? 'രാവിലെയും സന്ധ്യാസമയത്തും നിലവിളക്ക് കൊളുത്തി തുറയിൽകുന്ന് ഭഗവാനെ ധ്യാനിച്ച് 108 തവണ "ഓം ശരവണഭവ" ജപിക്കുന്നത് കുടുംബത്തിൽ ശാന്തിയും ആയുരാരോഗ്യവും പ്രധാനം ചെയ്യുന്നു.'
              : 'Lighting a ghee lamp at dawn and dusk while reciting the sacred "Om Saravanabhava" 108 times brings profound peace and protective divine grace.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    backgroundColor: '#0F0E0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
    width: '100%',
    maxWidth: CONTAINER_MAX_WIDTH,
    alignSelf: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    marginTop: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1C1917',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: '#78716C',
    lineHeight: 18,
  },
  playerCard: {
    backgroundColor: '#1C1917',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  playerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  audioIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  playerMeta: {
    flex: 1,
  },
  playerNowPlaying: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FCD34D',
    letterSpacing: 1,
  },
  playerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  playerArtist: {
    fontSize: 12,
    color: '#A8A29E',
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: 14,
  },
  progressTrack: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    fontSize: 10,
    color: '#A8A29E',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
  },
  secondaryControl: {
    padding: 8,
  },
  playBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stotraPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  stotraPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.08)',
  },
  stotraPillActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  stotraPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#57534E',
  },
  stotraPillTextActive: {
    color: '#B45309',
    fontWeight: '800',
  },
  lyricsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.08)',
    marginBottom: 18,
  },
  lyricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  lyricsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1917',
  },
  verseBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  verseNumber: {
    fontSize: 11,
    color: '#A8A29E',
    fontWeight: '700',
    marginBottom: 6,
  },
  verseText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
  },
  meaningBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  meaningLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    marginBottom: 2,
  },
  meaningText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 18,
  },
  routineCard: {
    backgroundColor: '#F5F5F4',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  routineTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
    marginBottom: 6,
  },
  routineDesc: {
    fontSize: 12,
    color: '#57534E',
    lineHeight: 18,
  },
});

import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  Share,
} from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { TEMPLE_NOTICES, TempleNotice } from '@/constants/notices';
import { TempleLogo } from '@/components/TempleLogo';
import {
  Landmark,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  Navigation,
  Compass,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Megaphone,
  Bell,
  X,
  Share2,
  Flame,
} from 'lucide-react-native';

const CONTAINER_MAX_WIDTH = 580;

export default function TabAboutScreen() {
  const { isMalayalam } = useLanguage();
  const [selectedNotice, setSelectedNotice] = useState<TempleNotice | null>(null);

  const openCall = () => {
    Linking.openURL('tel:+919400788358');
  };

  const openWhatsApp = (msg?: string) => {
    const defaultMsg = isMalayalam
      ? 'സ്വാമി ശരണം, തുറയിൽകുന്ന് ക്ഷേത്ര ഭരണസമിതിയുമായി ബന്ധപ്പെടാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Swami Saranam, I would like to contact the Thurayilkunnu Temple Committee.';
    Linking.openURL(
      `https://wa.me/+919400788358?text=${encodeURIComponent(msg || defaultMsg)}`
    );
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

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Landmark size={14} color="#D97706" />
            <Text style={styles.badgeText}>
              {isMalayalam ? 'ക്ഷേത്ര ഐതിഹ്യവും ചരിത്രവും' : 'TEMPLE HERITAGE & HISTORY'}
            </Text>
          </View>
          <View style={{ marginTop: 6 }}>
            <TempleLogo size="hero" showChant={true} />
          </View>
          <Text style={styles.headerSub}>
            {isMalayalam
              ? 'ആലുംകടവ്, കരുനാഗപ്പള്ളി, കൊല്ലം ജില്ല • കേരളം'
              : 'Alumkadavu, Karunagappally, Kollam District, Kerala'}
          </Text>
        </View>

        {/* Sthala Puranam (History Card) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Sparkles size={18} color="#D97706" />
            <Text style={styles.cardTitle}>
              {isMalayalam ? 'സ്ഥലപുരാണം (ഐതിഹ്യം)' : 'Sthala Puranam & Legend'}
            </Text>
          </View>

          <Text style={styles.storyText}>
            {isMalayalam
              ? `കൊല്ലം ജില്ലയിലെ ആലുംകടവ് തീരദേശത്തിന് സമീപം സ്ഥിതിചെയ്യുന്ന പ്രസിദ്ധമായ മലമുകളിലെ ദിവ്യ സങ്കേതമാണ് തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം.\n\nശത്രുസംഹാര മൂർത്തിയും ജ്ഞാനസ്വരൂപനുമായ ശ്രീ മുരുകഭഗവാനാണ് പ്രധാന പ്രതിഷ്ഠ. വേൽ ഏന്തി നിൽക്കുന്ന ബാലമുരുക സങ്കൽപ്പവും, സർവ്വ ഐശ്വര്യപ്രദായിനിയായ ദുർഗ്ഗാ ഭഗവതിയും, വിഘ്നഹർത്താവായ മഹാഗണപതിയും, ഭഗവാൻ പരമശിവനും ഉപദേവതകളായി കുടികൊള്ളുന്നു.\n\nനൂറ്റാണ്ടുകളുടെ പഴക്കമുള്ള ഈ പുണ്യഭൂമിയിൽ ഭക്തിയോടെ എത്തുന്ന ഭക്തർക്ക് സർവ്വകാര്യവിജയവും രോഗശാന്തിയും കുടുംബൈശ്വര്യവും ഭഗവാൻ വർഷിക്കുന്നു എന്നാണ് വിശ്വാസം.`
              : `Perched majestically atop the serene hillock of Thurayilkunnu near Alumkadavu in Kollam, this temple is one of the most sacred abodes of Lord Subramanya Swami (Murugan).\n\nThe presiding deity represents Lord Murugan holding the sacred Vel, vanquishing negative forces and blessing seekers with wisdom and inner peace.\n\nThe sanctum also enshrines Bala Murugan, Maha Ganapathy, Goddess Durga Bhagavathy, and Lord Shiva as revered Upadevathas, following traditional Kerala Tantric traditions.\n\nDevotees flock here especially during Thaipusam and Skanda Sashti to fulfill vows, offer Palabhishekam, and partake in the grand Annadanam.`}
          </Text>
        </View>

        {/* ================= TEMPLE NOTICE BOARD ================= */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Megaphone size={18} color="#D97706" />
            <Text style={styles.cardTitle}>
              {isMalayalam ? 'ക്ഷേത്ര അറിയിപ്പ് പലക' : 'Official Notice Board'}
            </Text>
          </View>

          <Text style={styles.noticeSubText}>
            {isMalayalam
              ? 'ക്ഷേത്രത്തിലെ വരാനിരിക്കുന്ന പ്രധാന ഉത്സവങ്ങളും പൂജകളും പൊതു അറിയിപ്പുകളും'
              : 'Latest official circulars, festival schedules, and pooja announcements'}
          </Text>

          <View style={styles.noticeList}>
            {TEMPLE_NOTICES.map((notice) => (
              <TouchableOpacity
                key={notice.id}
                style={styles.noticeRow}
                onPress={() => setSelectedNotice(notice)}
                activeOpacity={0.8}
              >
                <View style={styles.noticeRowHeader}>
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
                  <Text style={styles.noticeDateText}>
                    {isMalayalam ? notice.dateMl : notice.dateEn}
                  </Text>
                </View>

                <Text style={styles.noticeTitle}>
                  {isMalayalam ? notice.titleMl : notice.titleEn}
                </Text>

                <Text style={styles.noticeSummary} numberOfLines={2}>
                  {isMalayalam ? notice.summaryMl : notice.summaryEn}
                </Text>

                <View style={styles.noticeActionRow}>
                  <Text style={styles.readNoticeText}>
                    {isMalayalam ? 'വിശദ വിവരങ്ങൾ കാണുക ➔' : 'Read Notice ➔'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Annadanam & Temple Development Seva Card */}
        <View style={styles.donationCard}>
          <View style={styles.donationHeader}>
            <HeartHandshake size={22} color="#FCD34D" />
            <View style={{ flex: 1 }}>
              <Text style={styles.donationTitle}>
                {isMalayalam ? 'അന്നദാനം & ക്ഷേത്ര വികസനം' : 'Annadanam & Temple Seva'}
              </Text>
              <Text style={styles.donationSub}>
                {isMalayalam
                  ? 'ക്ഷേത്ര അന്നദാനത്തിലും വികസന പ്രവർത്തനങ്ങളിലും പങ്കാളികളാകൂ'
                  : 'Contribute to daily feeding of devotees & sanctum upkeep'}
              </Text>
            </View>
          </View>

          <View style={styles.bankDetailsBox}>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>
                {isMalayalam ? 'ബാങ്ക്:' : 'Bank:'}
              </Text>
              <Text style={styles.bankVal}>State Bank of India (SBI)</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>
                {isMalayalam ? 'ശാഖ:' : 'Branch:'}
              </Text>
              <Text style={styles.bankVal}>Karunagappally / Alumkadavu</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>
                {isMalayalam ? 'അക്കൗണ്ട് പേര്:' : 'Account Name:'}
              </Text>
              <Text style={styles.bankVal}>Thurayilkunnu Temple Trust</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>UPI ID:</Text>
              <Text style={[styles.bankVal, { color: '#D97706', fontWeight: '800' }]}>
                thurayilkunnu@sbi
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.donationBtn}
            onPress={() =>
              openWhatsApp(
                isMalayalam
                  ? 'സ്വാമി ശരണം, തുറയിൽകുന്ന് ക്ഷേത്ര അന്നദാനത്തിലേക്ക് സംഭാവന നൽകാൻ ആഗ്രഹിക്കുന്നു.'
                  : 'Swami Saranam, I would like to contribute towards the temple Annadanam fund.'
              )
            }
          >
            <HeartHandshake size={16} color="#FFFFFF" />
            <Text style={styles.donationBtnText}>
              {isMalayalam ? 'അന്നദാന രസീത് വാങ്ങുക' : 'Contribute via WhatsApp'}
            </Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Administration & Temple Office */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ShieldCheck size={18} color="#D97706" />
            <Text style={styles.cardTitle}>
              {isMalayalam ? 'ക്ഷേത്ര ഭരണസമിതി' : 'Temple Administration'}
            </Text>
          </View>

          <View style={styles.contactList}>
            <TouchableOpacity style={styles.contactItem} onPress={openCall}>
              <View style={[styles.contactIconCircle, { backgroundColor: '#DCFCE7' }]}>
                <Phone size={18} color="#16A34A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactItemTitle}>
                  {isMalayalam ? 'ക്ഷേത്ര ഓഫീസ് ഫോൺ' : 'Temple Office Direct'}
                </Text>
                <Text style={styles.contactItemVal}>+91 94007 88358</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => openWhatsApp()}
            >
              <View style={[styles.contactIconCircle, { backgroundColor: '#FEF3C7' }]}>
                <Mail size={18} color="#D97706" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactItemTitle}>
                  {isMalayalam ? 'വാട്സ്ആപ്പ് ഹെൽപ്പ്‌ലൈൻ' : 'WhatsApp Helpline'}
                </Text>
                <Text style={styles.contactItemVal}>+91 94007 88358</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* How to Reach & Route Details */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Compass size={18} color="#D97706" />
            <Text style={styles.cardTitle}>
              {isMalayalam ? 'ക്ഷേത്രത്തിലേക്കുള്ള വഴി' : 'How to Reach the Temple'}
            </Text>
          </View>

          <View style={styles.routeItem}>
            <Text style={styles.routeMode}>
              🚆 {isMalayalam ? 'റെയിൽവേ സ്റ്റേഷൻ:' : 'By Train:'}
            </Text>
            <Text style={styles.routeDesc}>
              {isMalayalam
                ? 'കരുനാഗപ്പള്ളി (8 കി.മീ) അല്ലെങ്കിൽ കായംകുളം ജംഗ്ഷൻ (14 കി.മീ).'
                : 'Karunagappally Railway Station (8 km) or Kayamkulam Junction (14 km).'}
            </Text>
          </View>

          <View style={styles.routeItem}>
            <Text style={styles.routeMode}>
              ✈️ {isMalayalam ? 'വിമാനത്താവളം:' : 'By Air:'}
            </Text>
            <Text style={styles.routeDesc}>
              {isMalayalam
                ? 'തിരുവനന്തപുരം അന്താരാഷ്ട്ര വിമാനത്താവളം (TRV - 95 കി.മീ).'
                : 'Trivandrum International Airport (TRV - 95 km) or Cochin (COK - 135 km).'}
            </Text>
          </View>

          <View style={styles.routeItem}>
            <Text style={styles.routeMode}>
              🚗 {isMalayalam ? 'റോഡ് മാർഗ്ഗം:' : 'By Road:'}
            </Text>
            <Text style={styles.routeDesc}>
              {isMalayalam
                ? 'ദേശീയപാത 66 (NH 66) കരുനാഗപ്പള്ളിയിൽ നിന്ന് ആലുംകടവ് തുറയിൽകുന്ന് റോഡ് വഴി നേരിട്ടെത്താം.'
                : 'Accessible directly via NH 66 through Karunagappally - Alumkadavu route with parking facility.'}
            </Text>
          </View>

          <TouchableOpacity style={styles.navBtn} onPress={openMap}>
            <Navigation size={16} color="#FFFFFF" />
            <Text style={styles.navBtnText}>
              {isMalayalam ? 'ഗൂഗിൾ മാപ്പിൽ വഴി കാണുക' : 'Navigate on Google Maps'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= MODAL: NOTICE DETAILS ================= */}
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
    maxWidth: CONTAINER_MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#0F0E0D',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  badgeText: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  aboutHeaderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aboutLogo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.5)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  headerSub: {
    fontSize: 12,
    color: '#A8A29E',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  storyText: {
    fontSize: 13,
    color: '#D6D3D1',
    lineHeight: 22,
  },
  noticeSubText: {
    fontSize: 12,
    color: '#A8A29E',
    marginBottom: 14,
    lineHeight: 16,
  },
  noticeList: {
    gap: 12,
  },
  noticeRow: {
    backgroundColor: '#26221F',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  noticeRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
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
    marginLeft: 'auto',
  },
  noticeTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
    marginBottom: 4,
  },
  noticeSummary: {
    color: '#D6D3D1',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  noticeActionRow: {
    alignSelf: 'flex-end',
  },
  readNoticeText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  donationCard: {
    backgroundColor: '#261F18',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  donationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  donationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FCD34D',
  },
  donationSub: {
    fontSize: 11,
    color: '#D6D3D1',
    marginTop: 2,
  },
  bankDetailsBox: {
    backgroundColor: '#1C1917',
    borderRadius: 12,
    padding: 12,
    gap: 6,
    marginBottom: 14,
  },
  bankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bankLabel: {
    fontSize: 11,
    color: '#A8A29E',
  },
  bankVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  donationBtn: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  donationBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  contactList: {
    gap: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#26221F',
    padding: 12,
    borderRadius: 12,
  },
  contactIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactItemTitle: {
    color: '#A8A29E',
    fontSize: 11,
  },
  contactItemVal: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  routeItem: {
    marginBottom: 10,
  },
  routeMode: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700',
  },
  routeDesc: {
    color: '#D6D3D1',
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18,
  },
  navBtn: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 10,
  },
  navBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 16,
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
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
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
});

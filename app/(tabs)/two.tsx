import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { TempleLogo } from '@/components/TempleLogo';
import {
  Flame,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Calendar,
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  MessageCircle,
  Check,
} from 'lucide-react-native';

const CONTAINER_MAX_WIDTH = 580;

const NAKSHATRAS = [
  { id: '1', ml: 'അശ്വതി', en: 'Ashwathi' },
  { id: '2', ml: 'ഭരണി', en: 'Bharani' },
  { id: '3', ml: 'കാർത്തിക', en: 'Karthika' },
  { id: '4', ml: 'രോഹിണി', en: 'Rohini' },
  { id: '5', ml: 'മകയിരം', en: 'Makayiram' },
  { id: '6', ml: 'തിരുവാതിര', en: 'Thiruvathira' },
  { id: '7', ml: 'പുണർതം', en: 'Punartham' },
  { id: '8', ml: 'പൂയം', en: 'Pooyam' },
  { id: '9', ml: 'ആയില്യം', en: 'Ayilyam' },
  { id: '10', ml: 'മകം', en: 'Makam' },
  { id: '11', ml: 'പൂരം', en: 'Pooram' },
  { id: '12', ml: 'ഉത്രം', en: 'Uthram' },
  { id: '13', ml: 'അത്തം', en: 'Atham' },
  { id: '14', ml: 'ചിത്തിര', en: 'Chithira' },
  { id: '15', ml: 'ചോതി', en: 'Chothi' },
  { id: '16', ml: 'വിശാഖം', en: 'Vishakham' },
  { id: '17', ml: 'അനിഴം', en: 'Anizham' },
  { id: '18', ml: 'തൃക്കേട്ട', en: 'Thrikketta' },
  { id: '19', ml: 'മൂലം', en: 'Moolam' },
  { id: '20', ml: 'പൂരാടം', en: 'Pooradam' },
  { id: '21', ml: 'ഉത്രാടം', en: 'Uthradam' },
  { id: '22', ml: 'തിരുവോണം', en: 'Thiruvonam' },
  { id: '23', ml: 'അവിട്ടം', en: 'Avittam' },
  { id: '24', ml: 'ചതയം', en: 'Chathayam' },
  { id: '25', ml: 'പൂരുരുട്ടാതി', en: 'Pooruruttathi' },
  { id: '26', ml: 'ഉത്രട്ടാതി', en: 'Uthrattathi' },
  { id: '27', ml: 'രേവതി', en: 'Revathi' },
];

interface OfferingItem {
  id: string;
  category: string;
  nameEn: string;
  nameMl: string;
  price: string;
  priceNum: number;
  descEn: string;
  descMl: string;
  image: any;
}

const OFFERINGS_CATALOG: OfferingItem[] = [
  {
    id: '1',
    category: 'daily',
    nameEn: 'Pushpanjali & Archana',
    nameMl: 'പുഷ്പാഞ്ജലി & അർച്ചന',
    price: '₹20',
    priceNum: 20,
    descEn: 'Daily peace, health, and family prosperity at the lotus feet of the deity.',
    descMl: 'കുടുംബൈശ്വര്യത്തിനും ആയുരാരോഗ്യത്തിനും ഭഗവാന്റെ പാദങ്ങളിൽ സമർപ്പിക്കുന്ന നിത്യ വഴിപാട്.',
    image: require('../../assets/images/temple/offerings/archana_pushpanjali.jpg'),
  },
  {
    id: '2',
    category: 'daily',
    nameEn: 'Muttarukkal Pooja',
    nameMl: 'മുട്ടറുക്കൽ പൂജ',
    price: '₹30',
    priceNum: 30,
    descEn: 'Removal of obstacles, negative energies, and evil eye.',
    descMl: 'കർമ്മതടസ്സങ്ങളും ഗ്രഹദോഷങ്ങളും ദൃഷ്ടിദോഷങ്ങളും നീങ്ങുന്നതിനായുള്ള നാളികേരം മുട്ടറുക്കൽ.',
    image: require('../../assets/images/temple/offerings/archana_pushpanjali.jpg'),
  },
  {
    id: '3',
    category: 'homam',
    nameEn: 'Maha Ganapathy Homam',
    nameMl: 'മഹാ ഗണപതി ഹോമം',
    price: '₹350',
    priceNum: 350,
    descEn: 'Auspicious dawn fire oblation invoking Lord Ganesha for career & life growth.',
    descMl: 'സർവ്വ വിഘ്നങ്ങളും നീങ്ങി കാര്യവിജയത്തിനായി അതിരാവിലെ നടത്തുന്ന വിശേഷാൽ അഗ്നിഹോമം.',
    image: require('../../assets/images/temple/offerings/ganapathy_homam.jpg'),
  },
  {
    id: '4',
    category: 'abhishekam',
    nameEn: 'Palabhishekam & Bhasmam',
    nameMl: 'പാലഭിഷേകം & ഭസ്മം',
    price: '₹50',
    priceNum: 50,
    descEn: 'Sacred cow milk bath and holy vibhuti shower purifying the soul.',
    descMl: 'മനോശാന്തിക്കും പാപമോചനത്തിനുമായി ഭഗവാന് പശുവിൻപാലും ഭസ്മവും കൊണ്ടുള്ള അഭിഷേകം.',
    image: require('../../assets/images/temple/offerings/palabhishekam.jpg'),
  },
  {
    id: '5',
    category: 'special',
    nameEn: 'Chuttuvilakku Deepam',
    nameMl: 'ചുറ്റുവിളക്ക് ദീപം',
    price: '₹500',
    priceNum: 500,
    descEn: 'Illuminating hundreds of sacred oil lamps around the sanctum walls.',
    descMl: 'സന്ധ്യാസമയത്ത് ക്ഷേത്ര മതിൽക്കെട്ടിൽ നൂറുകണക്കിന് ചിരാതുകളിൽ തിരി തെളിയിക്കുന്ന ദീപാരാധന.',
    image: require('../../assets/images/temple/gallery/peacock_diya_decor.jpg'),
  },
  {
    id: '6',
    category: 'special',
    nameEn: 'Thulabharam Vazhipadu',
    nameMl: 'തുലാഭാരം വഴിപാട്',
    price: '₹501',
    priceNum: 501,
    descEn: 'Weighing ritual with plantains, jaggery, or coconuts for fulfilled vows.',
    descMl: 'നേർച്ചയായി ഭക്തരുടെ ശരീരഭാരത്തിന് തുല്യമായി കദളിപ്പഴം, ശർക്കര എന്നിവ സമർപ്പിക്കൽ.',
    image: require('../../assets/images/temple/offerings/thulabharam.jpg'),
  },
  {
    id: '7',
    category: 'annadanam',
    nameEn: 'Annadanam Contribution',
    nameMl: 'അന്നദാന സമർപ്പണം',
    price: '₹1000',
    priceNum: 1000,
    descEn: 'Feeding devotees on auspicious pooja and festival days.',
    descMl: 'ക്ഷേത്രത്തിലെത്തുന്ന ഭക്തജനങ്ങൾക്ക് അന്നം നൽകുന്ന മഹാപുണ്യത്തിൽ പങ്കാളിയാകൂ.',
    image: require('../../assets/images/temple/festivals/thaipusam.jpg'),
  },
];

export default function TabOfferingsScreen() {
  const { isMalayalam } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Selected Offerings Cart: map of offeringId -> quantity
  const [cart, setCart] = useState<{ [key: string]: number }>({
    '1': 1, // Default 1 Pushpanjali
  });

  const [devoteeName, setDevoteeName] = useState('');
  const [selectedStar, setSelectedStar] = useState(NAKSHATRAS[0]);
  const [showStarPicker, setShowStarPicker] = useState(false);
  const [poojaDate, setPoojaDate] = useState('Today / ഇന്ന്');

  // Digital Receipt Modal
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const filteredOfferings =
    selectedCategory === 'all'
      ? OFFERINGS_CATALOG
      : OFFERINGS_CATALOG.filter((o) => o.category === selectedCategory);

  // Cart operations
  const toggleOffering = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const nextQty = current + delta;
      const next = { ...prev };
      if (nextQty <= 0) {
        delete next[id];
      } else {
        next[id] = nextQty;
      }
      return next;
    });
  };

  const selectedItemsList = Object.entries(cart)
    .map(([id, qty]) => {
      const item = OFFERINGS_CATALOG.find((o) => o.id === id);
      return item ? { ...item, quantity: qty } : null;
    })
    .filter(Boolean) as (OfferingItem & { quantity: number })[];

  const totalAmount = selectedItemsList.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );

  const totalItemsCount = selectedItemsList.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleGenerateReceipt = () => {
    if (selectedItemsList.length === 0) {
      alert(
        isMalayalam
          ? 'ദയവായി കുറഞ്ഞത് ഒരു വഴിപാടെങ്കിലും തിരഞ്ഞെടുക്കുക.'
          : 'Please select at least one Vazhipadu offering.'
      );
      return;
    }
    const ref = `TK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setReceiptVisible(true);
  };

  const handleSendWhatsApp = () => {
    const starTitle = `${selectedStar.ml} (${selectedStar.en})`;

    const itemsSummary = selectedItemsList
      .map(
        (item, idx) =>
          `${idx + 1}. ${isMalayalam ? item.nameMl : item.nameEn} x ${item.quantity} = ₹${item.priceNum * item.quantity}`
      )
      .join('\n');

    const message = `*തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം*
*VAZHIPADU MULTI-BOOKING REQUEST*
----------------------------------------
*Booking Ref ID:* ${bookingRef || 'TK-NEW'}
*Devotee Name / പേര്:* ${devoteeName.trim() || 'ഭക്തൻ / Devotee'}
*Birth Star / നാൾ:* ${starTitle}
*Preferred Date / തീയതി:* ${poojaDate}

*SELECTED OFFERINGS / വഴിപാടുകൾ:*
${itemsSummary}
----------------------------------------
*TOTAL AMOUNT / ആകെ തുക:* ₹${totalAmount}
----------------------------------------
Swami Saranam! Please verify slot availability & share UPI confirmation details.`;

    Linking.openURL(`https://wa.me/+919400788358?text=${encodeURIComponent(message)}`);
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
            <Flame size={14} color="#D97706" />
            <Text style={styles.badgeText}>
              {isMalayalam ? 'വഴിപാട് സമർപ്പണം' : 'VAZHIPADU SEVA'}
            </Text>
          </View>
          <Text style={styles.headerTitle}>
            {isMalayalam ? 'വഴിപാടുകൾ തിരഞ്ഞെടുക്കുക' : 'Select Multiple Offerings'}
          </Text>
          <Text style={styles.headerSub}>
            {isMalayalam
              ? 'ഒന്നിലധികം വഴിപാടുകൾ ഒന്നിച്ച് തിരഞ്ഞെടുത്തു ബുക്ക് ചെയ്യാം'
              : 'Select multiple offerings simultaneously for you & your family'}
          </Text>
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {[
            { id: 'all', ml: 'എല്ലാം', en: 'All' },
            { id: 'daily', ml: 'നിത്യപൂജകൾ', en: 'Daily' },
            { id: 'homam', ml: 'ഹോമങ്ങൾ', en: 'Homams' },
            { id: 'abhishekam', ml: 'അഭിഷേകം', en: 'Abhishekam' },
            { id: 'special', ml: 'പ്രത്യേകം', en: 'Special' },
            { id: 'annadanam', ml: 'അന്നദാനം', en: 'Annadanam' },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catPill, isSelected && styles.catPillActive]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={[styles.catText, isSelected && styles.catTextActive]}>
                  {isMalayalam ? cat.ml : cat.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Multi-Select Offering Catalog */}
        <View style={styles.offeringsList}>
          {filteredOfferings.map((offering) => {
            const isSelected = !!cart[offering.id];
            const qty = cart[offering.id] || 0;

            return (
              <View
                key={offering.id}
                style={[styles.offeringCard, isSelected && styles.offeringCardSelected]}
              >
                <TouchableOpacity
                  style={styles.offeringTouchArea}
                  onPress={() => toggleOffering(offering.id)}
                  activeOpacity={0.85}
                >
                  <Image source={offering.image} style={styles.offeringThumb} />
                  <View style={styles.offeringInfo}>
                    <View style={styles.offeringHeaderRow}>
                      <Text style={styles.offeringTitle} numberOfLines={1}>
                        {isMalayalam ? offering.nameMl : offering.nameEn}
                      </Text>
                      <Text style={styles.offeringPrice}>{offering.price}</Text>
                    </View>
                    <Text style={styles.offeringSub} numberOfLines={2}>
                      {isMalayalam ? offering.descMl : offering.descEn}
                    </Text>
                  </View>
                  <View
                    style={[styles.checkCircle, isSelected && styles.checkCircleActive]}
                  >
                    {isSelected ? (
                      <Check size={14} color="#FFFFFF" />
                    ) : (
                      <Plus size={14} color="#A8A29E" />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Quantity adjust row when selected */}
                {isSelected && (
                  <View style={styles.qtyRow}>
                    <Text style={styles.qtyLabel}>
                      {isMalayalam ? 'എണ്ണം (Quantity):' : 'Quantity:'}
                    </Text>
                    <View style={styles.qtyControls}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(offering.id, -1)}
                      >
                        {qty === 1 ? (
                          <Trash2 size={13} color="#DC2626" />
                        ) : (
                          <Minus size={13} color="#1C1917" />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(offering.id, 1)}
                      >
                        <Plus size={13} color="#1C1917" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Selected Offerings Cart Breakdown */}
        {selectedItemsList.length > 0 && (
          <View style={styles.cartSummaryCard}>
            <View style={styles.cartSummaryHeader}>
              <ShoppingCart size={18} color="#D97706" />
              <Text style={styles.cartSummaryTitle}>
                {isMalayalam ? 'തിരഞ്ഞെടുത്ത വഴിപാടുകൾ' : 'Selected Offerings Summary'} (
                {totalItemsCount})
              </Text>
            </View>

            {selectedItemsList.map((item) => (
              <View key={item.id} style={styles.cartItemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cartItemName}>
                    {isMalayalam ? item.nameMl : item.nameEn}
                  </Text>
                  <Text style={styles.cartItemSub}>
                    {item.price} × {item.quantity}
                  </Text>
                </View>
                <Text style={styles.cartItemTotal}>
                  ₹{item.priceNum * item.quantity}
                </Text>
              </View>
            ))}

            <View style={styles.cartTotalRow}>
              <Text style={styles.cartTotalLabel}>
                {isMalayalam ? 'ആകെ തുക (Total):' : 'Total Amount:'}
              </Text>
              <Text style={styles.cartTotalAmount}>₹{totalAmount}</Text>
            </View>
          </View>
        )}

        {/* Devotee Information Card */}
        <View style={styles.formCard}>
          <Text style={styles.formCardTitle}>
            {isMalayalam ? 'ഭക്തന്റെ വിവരങ്ങൾ' : 'Devotee Information'}
          </Text>

          {/* Devotee Name */}
          <Text style={styles.inputLabel}>
            {isMalayalam ? 'ഭക്തന്റെ പേര് / കുടുംബാംഗങ്ങൾ' : 'Devotee / Family Names'}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={
              isMalayalam
                ? 'ഉദാ: അനീഷ് അജിത്കുമാർ & കുടുംബം'
                : 'e.g. Aneesh & Family'
            }
            placeholderTextColor="#A8A29E"
            value={devoteeName}
            onChangeText={setDevoteeName}
          />

          {/* Nakshatra Picker */}
          <Text style={styles.inputLabel}>
            {isMalayalam ? 'പ്രധാന ജന്മനക്ഷത്രം (നാൾ)' : 'Primary Birth Star (Nakshatra)'}
          </Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowStarPicker(true)}
          >
            <Text style={styles.pickerButtonText}>
              {isMalayalam
                ? `${selectedStar.ml} (${selectedStar.en})`
                : `${selectedStar.en} (${selectedStar.ml})`}
            </Text>
            <ChevronDown size={18} color="#78716C" />
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleGenerateReceipt}
            activeOpacity={0.85}
          >
            <Sparkles size={18} color="#FFFFFF" />
            <Text style={styles.submitBtnText}>
              {isMalayalam
                ? `വഴിപാട് സ്ലിപ്പ് തയ്യാറാക്കുക (₹${totalAmount})`
                : `Generate Multi-Vazhipadu Slip (₹${totalAmount})`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= MODAL: 27 NAKSHATRAS PICKER ================= */}
      <Modal
        visible={showStarPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStarPicker(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isMalayalam ? 'ജന്മനക്ഷത്രം തിരഞ്ഞെടുക്കുക' : 'Select Birth Star'}
              </Text>
              <TouchableOpacity onPress={() => setShowStarPicker(false)}>
                <X size={20} color="#1C1917" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <View style={styles.starsGrid}>
                {NAKSHATRAS.map((star) => {
                  const isCur = star.id === selectedStar.id;
                  return (
                    <TouchableOpacity
                      key={star.id}
                      style={[styles.starItem, isCur && styles.starItemActive]}
                      onPress={() => {
                        setSelectedStar(star);
                        setShowStarPicker(false);
                      }}
                    >
                      <Text style={[styles.starMalayalam, isCur && styles.starTextActive]}>
                        {star.ml}
                      </Text>
                      <Text style={[styles.starEnglish, isCur && styles.starTextActive]}>
                        {star.en}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: MULTI-VAZHIPADU DIGITAL RECEIPT ================= */}
      <Modal
        visible={receiptVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setReceiptVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.receiptCard}>
            <TouchableOpacity
              style={styles.receiptCloseBtn}
              onPress={() => setReceiptVisible(false)}
            >
              <X size={20} color="#1C1917" />
            </TouchableOpacity>

            <View style={{ alignSelf: 'center', marginBottom: 12 }}>
              <TempleLogo size="receipt" showChant={false} />
            </View>
            <View style={styles.receiptBadge}>
              <CheckCircle size={14} color="#16A34A" />
              <Text style={styles.receiptBadgeText}>
                {isMalayalam ? 'ഡിജിറ്റൽ വഴിപാട് രസീത്' : 'DIGITAL VAZHIPADU RECEIPT'}
              </Text>
            </View>
            <Text style={styles.receiptRefText}>Ref ID: {bookingRef}</Text>

            <View style={styles.receiptDivider} />

            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>
                {isMalayalam ? 'ഭക്തന്റെ പേര്:' : 'Devotee:'}
              </Text>
              <Text style={styles.receiptValue}>
                {devoteeName.trim() || (isMalayalam ? 'ഭക്തൻ' : 'Devotee')}
              </Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>
                {isMalayalam ? 'നക്ഷത്രം:' : 'Birth Star:'}
              </Text>
              <Text style={styles.receiptValue}>
                {selectedStar.ml} ({selectedStar.en})
              </Text>
            </View>

            {/* List of items */}
            <Text style={[styles.receiptLabel, { marginTop: 10, marginBottom: 4, fontWeight: '700' }]}>
              {isMalayalam ? 'വഴിപാടുകൾ:' : 'Offerings List:'}
            </Text>
            {selectedItemsList.map((item, idx) => (
              <View key={item.id} style={styles.receiptItemRow}>
                <Text style={styles.receiptItemName}>
                  {idx + 1}. {isMalayalam ? item.nameMl : item.nameEn} (×{item.quantity})
                </Text>
                <Text style={styles.receiptItemPrice}>
                  ₹{item.priceNum * item.quantity}
                </Text>
              </View>
            ))}

            <View style={[styles.receiptDivider, { marginVertical: 8 }]} />

            <View style={styles.receiptRow}>
              <Text style={[styles.receiptLabel, { fontWeight: '900', color: '#1C1917' }]}>
                {isMalayalam ? 'ആകെ തുക:' : 'Total Amount:'}
              </Text>
              <Text style={[styles.receiptValue, { color: '#B45309', fontWeight: '900', fontSize: 16 }]}>
                ₹{totalAmount}
              </Text>
            </View>

            <View style={styles.receiptNoticeBox}>
              <Text style={styles.receiptNoticeText}>
                {isMalayalam
                  ? 'ക്ഷേത്ര കൗണ്ടർ സ്ഥിരീകരണത്തിനും പ്രസാദ വിതരണത്തിനുമായി വാട്സ്ആപ്പിലേക്ക് ഈ സ്ലിപ്പ് അയക്കുക.'
                  : 'Submit this slip to temple WhatsApp office for counter booking confirmation.'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.receiptWhatsAppBtn}
              onPress={handleSendWhatsApp}
            >
              <MessageCircle size={18} color="#FFFFFF" />
              <Text style={styles.receiptWhatsAppBtnText}>
                {isMalayalam ? 'വാട്സ്ആപ്പിൽ ബുക്ക് ചെയ്യാം' : 'Confirm on WhatsApp'}
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 16,
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
  },
  categoryScroll: {
    gap: 8,
    marginBottom: 18,
  },
  catPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.08)',
  },
  catPillActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  catText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#57534E',
  },
  catTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  offeringsList: {
    gap: 10,
    marginBottom: 20,
  },
  offeringCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.08)',
    overflow: 'hidden',
  },
  offeringCardSelected: {
    borderColor: '#D97706',
    backgroundColor: '#FFFDF9',
  },
  offeringTouchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  offeringThumb: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  offeringInfo: {
    flex: 1,
  },
  offeringHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  offeringTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
    flex: 1,
  },
  offeringPrice: {
    fontSize: 13,
    fontWeight: '900',
    color: '#B45309',
    marginLeft: 6,
  },
  offeringSub: {
    fontSize: 11,
    color: '#78716C',
    lineHeight: 15,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#D6D3D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FEF3C7',
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
  },
  qtyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78350F',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  qtyValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#78350F',
    minWidth: 20,
    textAlign: 'center',
  },
  cartSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)',
    marginBottom: 18,
  },
  cartSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  cartSummaryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  cartItemName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
  },
  cartItemSub: {
    fontSize: 11,
    color: '#78716C',
  },
  cartItemTotal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
  },
  cartTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F4',
  },
  cartTotalLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1C1917',
  },
  cartTotalAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#B45309',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.08)',
    marginBottom: 10,
  },
  formCardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1C1917',
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#44403C',
    marginBottom: 6,
    marginTop: 8,
  },
  textInput: {
    backgroundColor: '#FAFAF9',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1C1917',
  },
  pickerButton: {
    backgroundColor: '#FAFAF9',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#1C1917',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 18,
    gap: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    width: '90%',
    maxWidth: 440,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1917',
  },
  starsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  starItem: {
    width: '48%',
    backgroundColor: '#FAFAF9',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  starItemActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  starMalayalam: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1917',
  },
  starEnglish: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 2,
  },
  starTextActive: {
    color: '#FFFFFF',
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    width: '90%',
    maxWidth: 440,
  },
  receiptCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 77, 0.5)',
  },
  receiptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
    marginBottom: 8,
  },
  receiptBadgeText: {
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '800',
  },
  receiptTempleTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1C1917',
  },
  receiptRefText: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 2,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#E7E5E4',
    marginVertical: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  receiptLabel: {
    fontSize: 12,
    color: '#78716C',
  },
  receiptValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
  },
  receiptItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingLeft: 4,
  },
  receiptItemName: {
    fontSize: 12,
    color: '#1C1917',
  },
  receiptItemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  receiptNoticeBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  receiptNoticeText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 16,
  },
  receiptWhatsAppBtn: {
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 14,
    gap: 8,
  },
  receiptWhatsAppBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});

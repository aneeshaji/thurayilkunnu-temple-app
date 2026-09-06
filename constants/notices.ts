export interface TempleNotice {
  id: string;
  category: 'festival' | 'pooja' | 'annadanam' | 'development' | 'general';
  tagEn: string;
  tagMl: string;
  isUrgent?: boolean;
  isNew?: boolean;
  dateEn: string;
  dateMl: string;
  titleEn: string;
  titleMl: string;
  summaryEn: string;
  summaryMl: string;
  detailsEn: string;
  detailsMl: string;
  actionTextEn?: string;
  actionTextMl?: string;
  whatsappMessageEn?: string;
  whatsappMessageMl?: string;
}

export const TEMPLE_NOTICES: TempleNotice[] = [
  {
    id: 'n1',
    category: 'festival',
    tagEn: 'FESTIVAL CIRCULAR',
    tagMl: 'ഉത്സവ വിജ്ഞാപനം',
    isUrgent: true,
    isNew: true,
    dateEn: 'Upcoming Festival • Makaram',
    dateMl: 'വരാനിരിക്കുന്ന ഉത്സവം • മകരം',
    titleEn: 'Thaipusam Mahotsavam 2026 & Kavadi Registration Open',
    titleMl: 'തൈപ്പൂയം മഹോത്സവം 2026 & കാവടി രജിസ്ട്രേഷൻ ആരംഭിച്ചു',
    summaryEn: 'Annual Thaipusam festival with grand Kavadiyattam, Panchavadyam, and Maha Annadanam. Register your Kavadi offering at the temple office.',
    summaryMl: 'തുറയിൽകുന്ന് ക്ഷേത്രത്തിലെ ചരിത്രപ്രസിദ്ധമായ തൈപ്പൂയം മഹോത്സവത്തോടനുബന്ധിച്ച് കാവടിയാട്ടം, പഞ്ചവാദ്യം, മഹാ അന്നദാനം എന്നിവ നടക്കുന്നു. കാവടി രജിസ്ട്രേഷൻ ആരംഭിച്ചു.',
    detailsEn: 'The annual Thaipusam Mahotsavam will be celebrated with traditional fervor. Devotees taking Pookavadi, Agnikavadi, and Pal Kavadi are requested to register their names at the temple counter in advance. Special Darshan timings and Maha Annadanam will be arranged throughout the festive days.',
    detailsMl: 'തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രത്തിലെ തൈപ്പൂയം മഹോത്സവം ഭക്തിസാന്ദ്രമായി ആഘോഷിക്കുന്നു. പൂക്കാവടി, അഗ്നിക്കാവടി, പാൽകാവടി എന്നിവ സമർപ്പിക്കുന്ന ഭക്തജനങ്ങൾ ക്ഷേത്ര ഓഫീസിൽ മുൻകൂട്ടി പേര് രജിസ്റ്റർ ചെയ്യേണ്ടതാണ്. ഉത്സവദിവസങ്ങളിൽ പ്രത്യേക ദർശനവും മഹാ അന്നദാനവും ഒരുക്കുന്നതാണ്.',
    actionTextEn: 'Register Kavadi via WhatsApp',
    actionTextMl: 'കാവടി രജിസ്ട്രേഷൻ നടത്തുക',
    whatsappMessageEn: 'Swami Saranam! I would like to inquire about Kavadi registration and offering for Thaipusam Mahotsavam at Thurayilkunnu.',
    whatsappMessageMl: 'സ്വാമി ശരണം! തൈപ്പൂയം മഹോത്സവത്തോടനുബന്ധിച്ച് കാവടി രജിസ്ട്രേഷൻ സംബന്ധിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.',
  },
  {
    id: 'n2',
    category: 'annadanam',
    tagEn: 'ANNADANAM TRUST',
    tagMl: 'നിത്യ അന്നദാനം',
    isUrgent: false,
    isNew: true,
    dateEn: 'Daily Endowment Scheme',
    dateMl: 'നിത്യ അന്നദാന പദ്ധതി',
    titleEn: 'Sponsor One Day Annadanam on Your Birthday / Anniversary',
    titleMl: 'ജന്മദിനത്തിലും വിവാഹവാർഷികത്തിലും അന്നദാനം സമർപ്പിക്കാം',
    summaryEn: 'Earn divine blessings by feeding hundreds of devotees. One-day Annadanam sponsorship is available for ₹1,000 or ₹2,500.',
    summaryMl: 'ക്ഷേത്രത്തിൽ എത്തുന്ന ഭക്തർക്ക് അന്നം നൽകി മുരുകഭഗവാന്റെ അനുഗ്രഹം നേടൂ. ജന്മദിനത്തിലും മറ്റ് വിശേഷദിവസങ്ങളിലും അന്നദാനം സമർപ്പിക്കാം.',
    detailsEn: 'Annadanam is the highest form of seva. Devotees can sponsor full-day or special festival Annadanam on their auspicious dates. The pooja will be conducted in your birth star (Nakshatra) and Prasad will be blessed in your name.',
    detailsMl: 'അന്നദാനം മഹാപുണ്യമാണ്. നിങ്ങളുടെയും കുടുംബാംഗങ്ങളുടെയും ജന്മനാൾ, വിവാഹവാർഷികം എന്നിവയിൽ ക്ഷേത്രത്തിൽ അന്നദാനം നടത്താം. നിങ്ങളുടെ പേരിൽ പ്രത്യേക അർച്ചനയും പ്രസാദ ഊട്ടും ഒരുക്കുന്നതാണ്.',
    actionTextEn: 'Sponsor Annadanam',
    actionTextMl: 'അന്നദാനം സംഭാവന ചെയ്യുക',
    whatsappMessageEn: 'Swami Saranam! I wish to contribute and sponsor Annadanam on my auspicious family day.',
    whatsappMessageMl: 'സ്വാമി ശരണം! വിശേഷദിവസത്തിൽ ക്ഷേത്രത്തിൽ അന്നദാനം സ്പോൺസർ ചെയ്യാൻ ആഗ്രഹിക്കുന്നു.',
  },
  {
    id: 'n3',
    category: 'pooja',
    tagEn: 'SPECIAL POOJA',
    tagMl: 'വിശേഷാൽ പൂജ',
    isUrgent: false,
    isNew: false,
    dateEn: 'Every Ayilyam Nakshatra',
    dateMl: 'എല്ലാ മാസവും ആയില്യം നാളിൽ',
    titleEn: 'Monthly Ayilyam Pooja, Sarpabali & Noorum Palum',
    titleMl: 'പ്രതിമാസ ആയില്യം പൂജ, സർപ്പബലി & നൂറും പാലും',
    summaryEn: 'Special Nagaswara poojas and Noorum Palum for Rahu/Ketu dosha nivaranam, health, and family prosperity.',
    summaryMl: 'സന്താനസൗഭാഗ്യത്തിനും രാഹു-കേതു ദോഷപരിഹാരത്തിനുമായി എല്ലാ മലയാള മാസത്തിലെയും ആയില്യം നാളിൽ വിശേഷാൽ പൂജകൾ നടക്കുന്നു.',
    detailsEn: 'Conducted at the holy Nagaraja sanctum on every monthly Ayilyam star. Devotees can offer Noorum Palum, Manjal Abhishekam, and Sarpa Bali. Advance booking is recommended to ensure individual sankalpam.',
    detailsMl: 'സർപ്പദോഷ പരിഹാരത്തിനും കുടുംബൈശ്വര്യത്തിനുമായി സർപ്പക്കാവിൽ നടക്കുന്ന വിശേഷാൽ പൂജ. നൂറും പാലും, മഞ്ഞൾ അഭിഷേകം, സർപ്പബലി എന്നിവ ഭക്തർക്ക് മുൻകൂട്ടി ബുക്ക് ചെയ്യാം.',
    actionTextEn: 'Book Ayilyam Pooja',
    actionTextMl: 'ആയില്യം പൂജ ബുക്ക് ചെയ്യാം',
    whatsappMessageEn: 'Swami Saranam! Please book Noorum Palum and Ayilyam Pooja in my star.',
    whatsappMessageMl: 'സ്വാമി ശരണം! ആയില്യം പൂജയും നൂറും പാലും വഴിപാടും ബുക്ക് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു.',
  },
  {
    id: 'n4',
    category: 'development',
    tagEn: 'RENOVATION APPEAL',
    tagMl: 'വികസന അഭ്യർത്ഥന',
    isUrgent: true,
    isNew: true,
    dateEn: 'Temple Development 2026',
    dateMl: 'ക്ഷേത്ര വികസനം 2026',
    titleEn: 'Sreekovil Brass Roofing & Chuttambalam Renovation Appeal',
    titleMl: 'ശ്രീകോവിൽ മേൽക്കൂര ചെമ്പ് പൊതിയലും ചുറ്റമ്പല വികസനവും',
    summaryEn: 'The Temple Committee appeals to all devotees to generously contribute towards the sanctum preservation and holy mast.',
    summaryMl: 'തുറയിൽകുന്ന് ക്ഷേത്രത്തിന്റെ ശ്രീകോവിൽ നവീകരണത്തിനും വികസന പ്രവർത്തനങ്ങൾക്കും ഭക്തജനങ്ങളുടെ ഉദാരമായ സഹായസഹകരണങ്ങൾ അഭ്യർത്ഥിക്കുന്നു.',
    detailsEn: 'To protect the ancient stone structures and enhance pilgrim amenities, the renovation work is underway. Devotees can sponsor copper roofing plates, teak timber pillars, or contribute directly via UPI to thurayilkunnu@sbi.',
    detailsMl: 'ക്ഷേത്ര പൈതൃകം സംരക്ഷിക്കുന്നതിനും ഭക്തജനങ്ങൾക്ക് കൂടുതൽ സൗകര്യങ്ങൾ ഒരുക്കുന്നതിനുമായി നിർമ്മാണ പ്രവർത്തനങ്ങൾ നടക്കുന്നു. ചെമ്പ് തകിടുകൾ, തടിത്തൂണുകൾ എന്നിവ സ്പോൺസർ ചെയ്യുകയോ UPI വഴി സംഭാവന നൽകുകയോ ചെയ്യാം.',
    actionTextEn: 'Contribute to Fund',
    actionTextMl: 'വികസന ഫണ്ടിലേക്ക് സംഭാവന',
    whatsappMessageEn: 'Swami Saranam! I would like to contribute to the Temple Renovation and Chuttambalam fund.',
    whatsappMessageMl: 'സ്വാമി ശരണം! ക്ഷേത്ര പുനരുദ്ധാരണ വികസന ഫണ്ടിലേക്ക് സംഭാവന നൽകാൻ ആഗ്രഹിക്കുന്നു.',
  },
  {
    id: 'n5',
    category: 'general',
    tagEn: 'DEVOTEE GUIDELINES',
    tagMl: 'ഭക്തജന ശ്രദ്ധയ്ക്ക്',
    isUrgent: false,
    isNew: false,
    dateEn: 'Sanctum Rules & Etiquette',
    dateMl: 'ക്ഷേത്ര നിയമങ്ങളും ആചാരങ്ങളും',
    titleEn: 'Traditional Temple Dress Code & Sanctum Etiquette',
    titleMl: 'ക്ഷേത്ര ദർശന വസ്ത്രധാരണവും പെരുമാറ്റച്ചട്ടങ്ങളും',
    summaryEn: 'Devotees are requested to wear traditional Kerala attire and maintain sanctity inside the Nalambalam.',
    summaryMl: 'ക്ഷേത്രത്തിന്റെ പരിശുദ്ധി നിലനിർത്താൻ പരമ്പരാഗത വസ്ത്രങ്ങൾ ധരിക്കുകയും ക്ഷേത്ര നിബന്ധനകൾ പാലിക്കുകയും ചെയ്യുക.',
    detailsEn: 'Men are requested to wear Dhoti/Mundu and remove upper garment before entering Nalambalam. Women are requested to wear Sarees, Set-mundu, or Salwar. Photography and videography inside the inner sanctum are strictly prohibited.',
    detailsMl: 'പുരുഷന്മാർ മുണ്ട് ധരിക്കേണ്ടതും നാലമ്പലത്തിനകത്ത് മേൽവസ്ത്രം ഒഴിവാക്കേണ്ടതുമാണ്. സ്ത്രീകൾ സാരി, സെറ്റ്മുണ്ട് അല്ലെങ്കിൽ സൽവാർ ധരിക്കുക. ശ്രീകോവിലിനുള്ളിൽ ഫോട്ടോ എടുക്കുന്നത് കർശനമായി നിരോധിച്ചിരിക്കുന്നു.',
    actionTextEn: 'View Full Guidelines',
    actionTextMl: 'പൂർണ്ണ വിവരങ്ങൾ കാണുക',
    whatsappMessageEn: 'Swami Saranam! Could you please share the visitor guidelines and accommodation details?',
    whatsappMessageMl: 'സ്വാമി ശരണം! ക്ഷേത്ര സന്ദർശന നിയമങ്ങളും മറ്റ് വിവരങ്ങളും അറിയാൻ ആഗ്രഹിക്കുന്നു.',
  },
];

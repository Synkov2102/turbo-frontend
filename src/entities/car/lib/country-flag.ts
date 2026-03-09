/**
 * Маппинг названий стран на их флаги
 * Поддерживаются названия на русском и английском языках
 */
const COUNTRY_FLAGS: Readonly<Record<string, string>> = {
    // Страны СНГ и Восточная Европа
    россия: "🇷🇺",
    russia: "🇷🇺",
    украина: "🇺🇦",
    ukraine: "🇺🇦",
    беларусь: "🇧🇾",
    belarus: "🇧🇾",
    казахстан: "🇰🇿",
    kazakhstan: "🇰🇿",
    армения: "🇦🇲",
    armenia: "🇦🇲",
    азербайджан: "🇦🇿",
    azerbaijan: "🇦🇿",
    грузия: "🇬🇪",
    georgia: "🇬🇪",
    молдова: "🇲🇩",
    moldova: "🇲🇩",
    киргизия: "🇰🇬",
    kyrgyzstan: "🇰🇬",
    таджикистан: "🇹🇯",
    tajikistan: "🇹🇯",
    туркменистан: "🇹🇲",
    turkmenistan: "🇹🇲",
    узбекистан: "🇺🇿",
    uzbekistan: "🇺🇿",
    эстония: "🇪🇪",
    estonia: "🇪🇪",
    латвия: "🇱🇻",
    latvia: "🇱🇻",
    литва: "🇱🇹",
    lithuania: "🇱🇹",

    // Европа
    германия: "🇩🇪",
    germany: "🇩🇪",
    франция: "🇫🇷",
    france: "🇫🇷",
    италия: "🇮🇹",
    italy: "🇮🇹",
    испания: "🇪🇸",
    spain: "🇪🇸",
    великобритания: "🇬🇧",
    "великобритания (uk)": "🇬🇧",
    "united kingdom": "🇬🇧",
    "uk": "🇬🇧",
    польша: "🇵🇱",
    poland: "🇵🇱",
    нидерланды: "🇳🇱",
    netherlands: "🇳🇱",
    бельгия: "🇧🇪",
    belgium: "🇧🇪",
    австрия: "🇦🇹",
    austria: "🇦🇹",
    швейцария: "🇨🇭",
    switzerland: "🇨🇭",
    швеция: "🇸🇪",
    sweden: "🇸🇪",
    норвегия: "🇳🇴",
    norway: "🇳🇴",
    дания: "🇩🇰",
    denmark: "🇩🇰",
    финляндия: "🇫🇮",
    finland: "🇫🇮",
    чехия: "🇨🇿",
    czechia: "🇨🇿",
    "czech republic": "🇨🇿",
    португалия: "🇵🇹",
    portugal: "🇵🇹",
    греция: "🇬🇷",
    greece: "🇬🇷",
    румыния: "🇷🇴",
    romania: "🇷🇴",
    венгрия: "🇭🇺",
    hungary: "🇭🇺",
    словакия: "🇸🇰",
    slovakia: "🇸🇰",
    болгария: "🇧🇬",
    bulgaria: "🇧🇬",
    хорватия: "🇭🇷",
    croatia: "🇭🇷",
    сербия: "🇷🇸",
    serbia: "🇷🇸",
    словения: "🇸🇮",
    slovenia: "🇸🇮",
    монако: "🇲🇨",
    monaco: "🇲🇨",

    // Азия
    китай: "🇨🇳",
    china: "🇨🇳",
    япония: "🇯🇵",
    japan: "🇯🇵",
    "южная корея": "🇰🇷",
    "south korea": "🇰🇷",
    индия: "🇮🇳",
    india: "🇮🇳",
    таиланд: "🇹🇭",
    thailand: "🇹🇭",
    сингапур: "🇸🇬",
    singapore: "🇸🇬",
    малайзия: "🇲🇾",
    malaysia: "🇲🇾",
    индонезия: "🇮🇩",
    indonesia: "🇮🇩",
    филиппины: "🇵🇭",
    philippines: "🇵🇭",
    вьетнам: "🇻🇳",
    vietnam: "🇻🇳",
    оаэ: "🇦🇪",
    "united arab emirates": "🇦🇪",
    "uae": "🇦🇪",
    "саудовская аравия": "🇸🇦",
    "saudi arabia": "🇸🇦",
    турция: "🇹🇷",
    turkey: "🇹🇷",
    израиль: "🇮🇱",
    israel: "🇮🇱",

    // Америка
    сша: "🇺🇸",
    "united states": "🇺🇸",
    "usa": "🇺🇸",
    канада: "🇨🇦",
    canada: "🇨🇦",
    мексика: "🇲🇽",
    mexico: "🇲🇽",
    бразилия: "🇧🇷",
    brazil: "🇧🇷",
    аргентина: "🇦🇷",
    argentina: "🇦🇷",
    чили: "🇨🇱",
    chile: "🇨🇱",

    // Океания
    австралия: "🇦🇺",
    australia: "🇦🇺",
    "новая зеландия": "🇳🇿",
    "new zealand": "🇳🇿",

    // Африка
    юар: "🇿🇦",
    "south africa": "🇿🇦",
    египет: "🇪🇬",
    egypt: "🇪🇬",
} as const;

/**
 * Преобразует название страны в эмоджи флаг
 * @param countryName - название страны на русском или английском языке
 * @returns эмоджи флаг страны или пустая строка, если страна не найдена
 */
export function getCountryFlag(countryName?: string): string {
  if (!countryName) {
    return "";
  }

  // Нормализуем название страны (приводим к нижнему регистру и убираем пробелы)
  const normalized = countryName.trim().toLowerCase();

  // Ищем точное совпадение
  const exactMatch = COUNTRY_FLAGS[normalized];
  if (exactMatch) {
    return exactMatch;
  }

  // Пытаемся найти частичное совпадение
  for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return flag;
    }
  }

  // Если не нашли, возвращаем пустую строку
  return "";
}

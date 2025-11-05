export interface AptItem {
  googleMapsUrl: string
  yandexMapsUrl: string
  name: string
  code: string
}

export const APT_DATA: Record<string, AptItem> = {
    '46': {
      googleMapsUrl: 'https://maps.google.com/maps?cid=17999972830897093671',
      yandexMapsUrl: 'https://yandex.by/maps/org/104217020340',
      name: 'Аптека №46',
      code: '46'
    }
}
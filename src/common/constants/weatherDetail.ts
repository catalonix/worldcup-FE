export const weatherSearchOptions = [{ value: 'weatherStation', label: '기상센서' }];

/* TODO: 전체 하나 쓰고 disabled 처리할 지 아니면 각각으로 쓸 지 미정*/
export const grassDataSearchOptions = [
  { value: 'soilRobot', label: '토양로봇' },
  { value: 'camera', label: '카메라' },
  { value: 'weatherStation', label: '기상센서' }
];

export const directionOptions = [
  { label: '동남', value: 'EN' },
  { label: '서북', value: 'WS' },
  { label: '서남', value: 'SE' },
  { label: '동북', value: 'WN' }
];

export const valuesOptions = [
  { label: '온도', value: 'temp' },
  { label: '습도', value: 'humi' },
  { label: '풍속', value: 'ws' },
  { label: 'CO2', value: 'co2' },
  { label: 'PM10', value: 'pm10' },
  { label: 'PM25', value: 'pm25' },
  { label: '광량', value: 'light' }
];

export const chartColor = [
  '#FFE3E3',
  '#FFC9C9',
  '#FFA8A8',
  '#FF8787', // 기존 핑크 계열
  '#FFD6A5',
  '#FFAB76',
  '#FF8E72',
  '#FF6F61', // 주황 계열
  '#FFEBA1',
  '#FFDC76',
  '#FFD333',
  '#FFC300', // 노랑 계열
  '#D4E157',
  '#AED581',
  '#81C784',
  '#4CAF50', // 연두/초록 계열
  '#64B5F6',
  '#42A5F5',
  '#2196F3',
  '#1E88E5', // 파랑 계열
  '#BA68C8',
  '#9C27B0',
  '#7B1FA2',
  '#6A1B9A', // 보라 계열
  '#FF80AB',
  '#FF4081',
  '#F50057',
  '#C51162' // 핫핑크/강렬한 계열
];

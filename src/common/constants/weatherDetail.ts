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

export const chartColor = ['#FFE3E3', '#FFC9C9', '#FFA8A8', '#FF8787'];

import axios from 'axios'

export const getMenu = (input, cb) => {
  axios.get('/api/getMenu').then((res) => {
    cb(res.data.data)
  })
}

export const getProjectName = (projectId, cb) => {
  axios.get('/api/getProjectName').then((res) => {
    cb(res.data.data.name)
  })
}

export const getDevName = (projectId, cb) => {
  axios.get('/api/getDevName').then((res) => {
    cb(res.data.data.name)
  })
}

export const getUserName = (userId, cb) => {
  axios.get('/api/getUserName').then((res) => {
    cb(res.data.data.name)
  })
}

export const getWindOverviewInfo = () => {
  return {
    averageWind: '202',
    noErrorTime: '202',
    errorTimes: '11',
    installCapacity: '11',
    activePower: '11',
    reactivePower: '11',
    totalActivePower: '11',
    energyAvailability: '11',
    timeAvailability: '11',
    totalElectricity: '11',
    dayElect: '11',
    monthElect: '11',
    yearElect: '11'
  }
}

export const getEnergyInfo = () => {
  return {
    curActivePower1: '123',
    curActivePower2: '223',
    curActivePercent: '100',
    curReactivePower1: '123',
    curReactivePower2: '223',
    curReactivePercent: '100'
  }
}

export const getSportsInfo = () => {
  return [{
    value: '0',
    unit: 'A',
    description: '220kV特普线A相电流'
  }, {
    value: '0',
    unit: 'A',
    description: '220kV特普线B相电流'
  }, {
    value: '0',
    unit: 'A',
    description: '220kV特普线C相电流'
  }, {
    value: '0',
    unit: 'kV',
    description: '220kV特普线A相电压'
  }, {
    value: '0',
    unit: 'kW',
    description: '220kV特普线有功'
  }, {
    value: '0',
    unit: 'kVar',
    description: '220kV特普线无功'
  }, {
    value: '0',
    unit: 'A',
    description: '110kV特普线A相电流'
  }, {
    value: '0',
    unit: 'A',
    description: '110kV特普线B相电流'
  }, {
    value: '0',
    unit: 'A',
    description: '110kV特普线C相电流'
  }, {
    value: '0',
    unit: 'kV',
    description: '110kV特普线A相电压'
  }]
}

export const getWindStatus = (projectId, start, end, cb) => {
  axios.get('/api/getWindStatus').then((res) => {
    cb(res.data.data)
  })
}

export const getBatteryInfo = () => {
  return {
    net: '0',
    vol: '0',
    pow: '0',
    cur: '0'
  }
}

export const getAlarmInfo = (projectId, cb) => {
  axios.get('/api/getAlarmInfo').then((res) => {
    cb(res.data.data)
  })
}

export const getSigWindOverviewInfo = () => {
  return [{
    label: 'speed',
    value: '1919.111',
    unit: '°',
    des: '发动机转速'
  }, {
    label: 'torque',
    value: '1919.11',
    unit: '',
    des: '发电机扭矩'
  }, {
    label: 'temp',
    value: '19.00',
    unit: '°',
    des: '机舱温度'
  }, {
    label: 'dayelec',
    value: '1.28',
    unit: '万kWh',
    des: '当日发电量'
  }, {
    label: 'monthelec',
    value: '1.28',
    unit: '万kWh',
    des: '当月发电量'
  }, {
    label: 'yearelec',
    value: '1.28',
    unit: '万kWh',
    des: '当年发电量'
  }, {
    label: 'totalelec',
    value: '1.28',
    unit: '万kWh',
    des: '累计发电量'
  }]
}

export const getPitchInfo = () => {
  return {
    angle1: '3.11°',
    angle2: '3.11°',
    angle3: '3.11°',
    speed1: '-3.11°/s',
    speed2: '-3.11°/s',
    speed3: '-3.11°/s',
    pangle1: '3.101°',
    pangle2: '3.101°',
    pangle3: '3.101°'
  }
}

export const getBoxInfo = () => {
  return [{
    value: '0kW',
    description: '有功功率'
  }, {
    value: '0kW',
    description: '无功功率'
  }, {
    value: '0kW',
    description: '总视在功率'
  }, {
    value: '0',
    description: '功率因数'
  }, {
    value: '0Hz',
    description: '电网频率'
  }, {
    value: '0v',
    description: '正向有功电能'
  }, {
    value: '0',
    description: '反向有功电能'
  }, {
    value: '0',
    description: '感性有功电能'
  }, {
    value: '0',
    description: '容性无功电能'
  }]
}

export const getFanInfo = () => {
  return {
    speed: '2.70',
    acpower: '0.00',
    reacpower: '0.00',
    angle: '24.1',
    align: '0.011',
    vertical: '0.011'
  }
}

export const getFanDataWatchInfo = () => {
  return {
    speed1: '8.88',
    speed30: '8.88',
    speed10: '8.88',
    direct1: '333',
    direct10: '333',
    direct30: '333',
    temp1: '23.222',
    temp2: '0',
    temp3: '0'
  }
}

export const getRealTimeData = () => {
  return [{
    type: '天气原因停机',
    errcode: 'B50_2',
    errname: '风速低',
    time: '2024-1-1 12:12:12'
  }, {
    type: '天气原因停机',
    errcode: 'B50_2',
    errname: '风速低',
    time: '2024-1-1 12:12:12'
  }, {
    type: '天气原因停机',
    errcode: 'B50_2',
    errname: '风速低',
    time: '2024-1-1 12:12:12'
  }]
}

export const getElectricityData = () => {
  return [{
    value: '333.33V',
    description: '电网A相电压'
  }, {
    value: '333.33V',
    description: '电网B相电压'
  }, {
    value: '333.33V',
    description: '电网C相电压'
  }, {
    value: '333.33A',
    description: '电网A相电流'
  }, {
    value: '333.33A',
    description: '电网B相电流'
  }, {
    value: '0.999',
    description: '功率因数'
  }, {
    value: '110.11',
    description: 'AB相电压相位角'
  }, {
    value: '110.22',
    description: 'BC相电压相位角'
  }, {
    value: '110.11',
    description: 'CA相电压相位角'
  }]
}
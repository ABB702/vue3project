export default [{
    url: "/api/getUsers",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            data: {
                'rows|10': [{
                    id: '@guid',
                    name: '@cname',
                    'age|20-30': 23,
                    'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
                }]
            },
        }
    }
}, {
    url: "/api/getMenu",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            data: [{
                icon: '../components/icons/IconTooling.vue',
                active: './components/icons/IconSupport.vue',
                path: "/",
                name: "系统首页"
            },
            {
                icon: '../components/icons/IconTooling.vue',
                active: './components/icons/IconSupport.vue',
                path: "/monitor",
                name: "风场监视"
            },
            {
                icon: '../components/icons/IconTooling.vue',
                active: './components/icons/IconSupport.vue',
                path: "/about",
                name: "风机监视"
            }],
        }
    }
}, {
    url: "/api/getProjectName",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            data: {
                'name|1': ['某电站项目1', '某电站项目2', '某电站项目3', '某电站项目4']
            },
        }
    }
}, {
    url: "/api/getDevName",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            data: {
                'name|1': ['某电站设备1', '某电站设备2', '某电站设备3', '某电站设备4']
            },
        }
    }
}, {
    url: "/api/getUserName",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            data: {
                name: '@cname'
            },
        }
    }
}, {
    url: "/api/getWindStatus",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            'data|20': [{
                devId: '@increment',
                name: '@ctitle',
                'status|0-1': 0,
                'speed|1': ['2.48m/s', '3.44m/s', '0.88m/s'],
                'activePower|1': ['-5.47kW', '-9.33kW', '-3.42kW'],
                'reactivePower|1': ['-4.44kVar', '-2.22kVar', '-9.99kVar'],
                type: 'DEW-G1000-195'
            }],
        }
    }
}, {
    url: "/api/getAlarmInfo",
    method: "get",
    response: () => {
        return {
            code: 0,
            message: "ok",
            'data|20': [{
                'source|1': ['xxx风电场', 'yyy风电场', 'zzz风电场'],
                name: '#1101F',
                time: '@datetime',
                type: '天气原因',
                content: '@csentence'
            }],
        }
    }
}]
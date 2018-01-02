export default function (Vue) {
    const Api = 'http://192.168.1.100:8000'

    Vue.configs = {
        appName: 'My App',
        appCompany: 'Tecnibilds',
        appLogo: '',
        ApiUrl: Api,
    }

    Object.defineProperties(Vue.prototype, {
        $configs: {
            get() {
                return Vue.configs
            }
        }
    })
}

let baseUrl = "";   //这里是一个默认的url，可以没有

switch (process.env.NODE_ENV) {
    case 'dev':

        baseUrl = "http://192.168.1.100"  //这里是本地的请求url

        break

    case 'test':   // 注意这里的名字要和步骤二中设置的环境名字对应起来

        baseUrl = "https://blog.csdn.net/aGreetSmile/article/details/101676108"  //这里是测试环境中的url

        break

    case 'prod':

        baseUrl = "https://blog.csdn.net/aGreetSmile/article/details/90216639"   //生产环境url

        break

    default:

        baseUrl = 'http://192.168.1.100'

}

export default baseUrl;

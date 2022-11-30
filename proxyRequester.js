const axios = require('axios').default
const spawn = require("child_process").spawn


// Run a command synchronously
const { spawnSync } = require( 'child_process' )

getProxyDetails = () => {

    const proxyDetails = { 'enabled': 0 }
    
    const childProcess = spawnSync("powershell.exe",["-Command","(Get-ItemProperty -Path 'Registry::HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings').ProxyEnable"])
    
    // console.log(childProcess)

    proxyEnabled = childProcess.stdout.toString()

    console.log("[Powershell] ProxyEnabled: " + +proxyEnabled)

    
    if( +proxyEnabled ){
        
        console.log("Proxy Enabled! Get proxy Details...")

        const serverDetails = spawnSync("powershell.exe",["-Command","(Get-ItemProperty -Path 'Registry::HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings').ProxyServer"])

        const proxyDetails = serverDetails.stdout.toString().replace('\n','')
        const [proxyServer, proxyPort = 80 ] = `${proxyDetails}`.split(':')
        console.log("\tProxyDetails : ", proxyDetails)
        
        proxyDetails['enabled'] = 1
        proxyDetails['server'] = proxyServer
        proxyDetails['port'] = proxyPort

    }

    return proxyDetails

}



const getRequest = async (url)=>{

    proxyDetails = await getProxyDetails()
    
    const config = { headers: { "Accept": "text/plain","User-Agent": "axios 0.21.1", 'Accept-Encoding': 'identity' }  }
    
    if ( proxyDetails['enabled'] == 1){

        config.proxy = {
            host: proxyDetails['server'],
            port: proxyDetails['port']
        }

    }

    try {
        const response = await axios.get(`${url}`, config )
        
        return response.data
    
    }
    catch(err){
        console.log("received error: ", err.toJSON());
    }


}

getRequest('https://icanhazdadjoke.com/')
.then( j => console.log(j))


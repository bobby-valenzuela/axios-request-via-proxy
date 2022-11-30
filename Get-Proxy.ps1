

function Get-Proxy
{ 
   <# 
           .SYNOPSIS 
               Returns proxy info if available
           .DESCRIPTION
               This function checks the registry to see if a proxy is enabled and if so will return the proxy details.
           .EXAMPLE 
               Get-Proxy
           .Notes 
               Author : Bobby Valenzuela 
   #> 

   
   $proxy_details = (Get-ItemProperty -Path 'Registry::HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings')
   
   $proxy_obj = @{ 'enabled' = $false  }
   
   
   if ( $proxy_details.ProxyEnable -eq 1){
       
        $server_info = $proxy_details.ProxyServer -split ':' 
        $proxy_obj['server'] =  $server_info[0]   
        $proxy_obj['port'] =  $server_info[1]    
        $proxy_obj['enabled'] =  $true   
        
    }

    return $proxy_obj

}


$proxy_details = Get-Proxy


if ($proxy_details.enabled){

    Write-Host "Proxy Enabled! Server:"$proxy_details.server "Port: "$proxy_details.port
}



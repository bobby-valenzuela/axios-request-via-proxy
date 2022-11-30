# axios-request-via-proxy
This snippet will allow you to use axios to make http(s) requests but has the added benefit of using Powershell to detect if a public proxy is enabled and if so, will route the request through the proxy. Otherwise it will proceed as usual.

As usual, ```npm install``` to add in the packages needed (axios and child-process).

Also included a powershell function to get proxy details if using PS directly is the preferred method.

# temperaturesensor
A sample Azure IoT Edge module that periodically sends simulated deviceID, temperature, humidity readings and timestamp to Azure IoT Hub.

Install required packages.

    npm install azure-iot-device azure-iot-device-mqtt@latest --save
    npm install node-datetime --save
    npm install minimist --save
    
Replace your device id and connection string in config.json file.

    {
        "deviceId" : "D0001",
        "connectionString" : "HostName=yourhost.azure-devices.net;DeviceId=D0001;SharedAccessKey=yourshareaccesskey"
    }

Now start to program to send the messages to Azure IoT Hub.

    node index.js
You will see the logs as below.

    Connection String:HostName=yourhost.azure-devices.net;DeviceId=D0001;SharedAccessKey=yourshareaccesskey
    Device ID:D0001
    Client connected
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":21.011077401769334,"humidity":63.01060065320101,"timestamp":"2018-02-02 00:18:55"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":21.558023689857766,"humidity":71.25210191255364,"timestamp":"2018-02-02 00:19:05"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":31.55104675909102,"humidity":65.89270102865878,"timestamp":"2018-02-02 00:19:15"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":26.151438362060983,"humidity":68.67313010140693,"timestamp":"2018-02-02 00:19:25"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":26.57706721555007,"humidity":72.73840272635516,"timestamp":"2018-02-02 00:19:35"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":34.0385536418289,"humidity":60.44099962793479,"timestamp":"2018-02-02 00:19:45"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":21.95853458208017,"humidity":71.55056360507257,"timestamp":"2018-02-02 00:19:55"}
    send status: MessageEnqueued
    Sending message: {"deviceId":"D0001","category":"temperature","temperature":28.448602933210132,"humidity":76.36605479004187,"timestamp":"2018-02-02 00:20:05"}
    send status: MessageEnqueued

Check your Azure dashboard. You should be able to see the MESSAGES counter keep on increasing.

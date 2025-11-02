const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);


app.get('/', (req, res) => {
    res.send('Hello World Nodejs Hello..')// phai node .\index.js lai moi hien cai moi
})
//Device ID to emit and on from and to sensor-server-user
io.on('connection', client => {
    console.log(`New client connected`);//khi knoi tu esp vao server nay thi se in ra dong chu nay

    client.on('sensor2Server', data => {
        console.log(data);             /// nghe su kien esp thi se in cai data
        io.emit("server2user", data); //sau khi lang nghe su kien tren esp thi in no ra
        /// gui su kien server2user tu cai server len app và app lang nghe su kien và in data ra
        //// cai index.js này là server và cái main.dart là cái app
        // let dht = eval(data);
        // console.log(dht.dht.tempC);
        //      io.emit("server2user", data)
    })

    client.on("from-user", data =>{
        console.log(data);
    } )

    client.on('disconnect', () => console.log(`Client disconnected`))//khi ngat ket noi esp thi in ra

})


const PORT = 3484;
server.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})



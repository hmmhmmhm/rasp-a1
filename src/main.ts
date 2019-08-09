import * as Raspi from 'raspi'
import * as GPIO from 'raspi-gpio'
import FolderLogger from 'folder-logger'
import { PWM } from 'raspi-pwm'

const Logger = new FolderLogger(`./logs`)

Logger.debug(`Raspberry Pi Controller has been started.`)

Logger.debug(``)
Logger.debug(`Controller Intailizing...`)

Raspi.init(async () => {
    Logger.debug(`Controller Intailized.`)

    Logger.debug(``)
    Logger.debug(`User Code has been start...`)

    Logger.debug(``)
    await LogicBase()

    Logger.debug(``)
    Logger.debug(`User Code has been ended...`)
})

const LogicBase = () => {

    return new Promise(async (resolve)=>{
        // await LogicScanning()
        // await LogicLEDOnOff()
        // await LogicSensorDetect()
        await LogicPWMWork()
        resolve()
    })
}
const LogicScanning = () => {
    return new Promise((resolve)=>{

        let loopCount = 1
        let intervalHandle = setInterval(()=>{
            try{
                const output = new GPIO.DigitalOutput(40-loopCount)
                output.write(GPIO.HIGH)
                setTimeout(()=>{
                    output.write(GPIO.LOW)
                }, 3000)
                Logger.debug(`SCANNING: PIN:${40-loopCount}`)
                
                if(++loopCount > 40){
                    clearInterval(intervalHandle)
                    resolve()
                }
            }catch(e){
                Logger.debug(`NO PIN EXIST: ${40-loopCount}`)
                loopCount++
            }
        }, 1000)
    })
}

const LogicSensorDetect = () => {
    return new Promise((resolve)=>{
        const input = new GPIO.DigitalInput('GPIO25')
        const output = new GPIO.DigitalOutput('GPIO16')

        let intervalHandle = setInterval(()=>{
            console.log(input.read())
            if(input.read() == 1){
                output.write(GPIO.HIGH)
            }else{
                output.write(GPIO.LOW)
            }
        }, 250)
    })
}

const LogicPWMWork = () => {
    return new Promise((resolve)=>{
        let powerOf = 100
        const led = new PWM(27)
        let intervalHandle = setInterval(()=>{
            console.log(powerOf)
            led.write(powerOf*0.01)
            if(--powerOf < 0){
                clearInterval(intervalHandle)
            }
        }, 10)
    })
}

const LogicLEDOnOff = () => {
    return new Promise((resolve)=>{
        const output = new GPIO.DigitalOutput('GPIO16')

        let loopCount = 1
        let intervalHandle = setInterval(()=>{
            if(loopCount %2 == 1){
                output.write(GPIO.HIGH)
                Logger.debug(`[SIGNAL] HIGH (IDX: ${loopCount})`)
            }else{
                output.write(GPIO.LOW)
                Logger.debug(`[SIGNAL] LOW (IDX: ${loopCount})`)
            }
            if(++loopCount > 20){
                clearInterval(intervalHandle)
                resolve()
            }
        }, 1000)
    })
}

const shutdown = () => {
    setTimeout(() => {
        Logger.debug(`Trying Process Shutdown...`)
        process.exit(0)
    }, 3000)
}

process.on('SIGHUP', shutdown)
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process.on('SIGCONT', shutdown)
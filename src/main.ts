import * as Raspi from 'raspi'
import * as GPIO from 'raspi-gpio'
import FolderLogger from 'folder-logger'

const Logger = new FolderLogger(`./logs`)

Logger.debug(`Raspberry Pi Controller has been started.`)

Logger.debug(``)
Logger.debug(`Controller Intailizing...`)

Raspi.init(async () => {
    Logger.debug(`Controller Intailized.`)

    Logger.debug(``)
    Logger.debug(`User Code has been started...`)
    await LogicBase()
})

const LogicBase = async () => {
    const output = new GPIO.DigitalOutput(16)

    let loopCount = 1
    let intervalHandle = setInterval(()=>{
        if(loopCount %2 == 1){
            output.write(GPIO.LOW)
            Logger.debug(`[SIGNAL] LOW (IDX: ${loopCount})`)
        }else{
            output.write(GPIO.HIGH)
            Logger.debug(`[SIGNAL] HIGH (IDX: ${loopCount})`)
        }
        if(++loopCount == 20) clearInterval(intervalHandle)
    }, 1000)
}
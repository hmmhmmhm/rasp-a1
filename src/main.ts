import { init } from 'raspi'
import { DigitalInput, DigitalOutput } from 'raspi-gpio'
import FolderLogger from 'folder-logger'

const Logger = new FolderLogger(`${process.cwd}/logs`)

Logger.debug(`🚧  Raspberry Pi Controller has been started.`)
Logger.debug(`🚧  Controller Intailizing...`)
init(() => {
    Logger.debug(`🚧  Controller Intailized.`)
    Logger.debug(``)

    Logger.debug(`🚧  User Code Calling...`)
    const input = new DigitalInput('P1-3')
    const output = new DigitalOutput('P1-5')
    output.write(input.read())
    Logger.debug(`🚧  User Code Called...`)
})
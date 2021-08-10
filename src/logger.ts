import chalk from 'chalk'

module Logger {
    export const info = (msg) => {
        console.log(`[info]: ${chalk.blueBright(msg)}`)
    }

    export const warn = (msg) => {
        console.log(`[warning]: ${chalk.yellowBright(msg)}`)
    }

    export const error = (msg) => {
        console.log(`[error]: ${chalk.redBright(msg)}`)
    }
}

export default Logger

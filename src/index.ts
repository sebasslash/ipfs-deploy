#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import fs from 'fs'
import Logger from './logger'
import { spawn } from 'child_process'

const { create, globSource }  = require('ipfs-http-client')

const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 -p [path]')
    .command('p', 'the path to your build folder')
    .example('$0 -p ~/examples/example-site', 'adds example-site to ipfs')
    .demandOption(['p'])
    .help('h')
    .argv


async function publishToIPNS(args: string[]) {
    return new Promise((resolve, reject) => {
        const publish_proc = spawn('ipfs', args, { shell: true })

        let installationKey = ''

        publish_proc.stdout.on('data', data => {
            installationKey = data.toString().split(' ')[2].slice(0, -1)
            Logger.info(data)
        })

        publish_proc.stderr.on('data', data => {
            Logger.error(data)
            reject(data)
        })

        publish_proc.on('error', (error) => {
            Logger.error(error)
            reject(error)
        })

        publish_proc.on('close', (code) => {
            Logger.info('Done. Successfully added to ipfs');
            Logger.info(`Available at: https://gateway.ipfs.io/ipns/${installationKey}`)
            Logger.info(`Program exited with code ${code}`);
            resolve(code)
        })
    })

}

async function ensurePathExists(path: string): Promise<boolean> {
    return new Promise((resolve, _) => {
        fs.access(path, (err) => {
            if (err) {
                resolve(false)
            }
            resolve(true)
        })
    })
}


async function main() {
    try {
        if (!argv['p'] || argv['p'] == '') throw new Error('Path specified cannot by an empty string')

        if (!(await ensurePathExists(argv['p']))) throw new Error(`Path specified: ${argv['p']}, does not exist`)

        Logger.info(`Adding ${argv['p']} to ipfs...\n`)


        const ipfsClient = create();
        const build  = await ipfsClient.add(globSource(argv['p'], { recursive: true }))
        const cid = build.cid.toString()

        const args = ['name', 'publish', cid]
        await publishToIPNS(args)

    } catch (err) {
        Logger.error(err)
    }
}

main()

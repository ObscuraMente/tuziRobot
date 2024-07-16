// src/main/helper.js

import { join } from 'path'
import fs from 'fs'
import { app } from 'electron'
const dataPath = join(app.getPath('userData'), 'data.json')

export function getLocalData(key?: any) {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({}), { encoding: 'utf-8' })
    }
    let data = fs.readFileSync(dataPath, { encoding: 'utf-8' })
    let json = JSON.parse(data)
    return key ? json[key] : json
}

export function setLocalData(key: any, value?: any) {
    let args = [...arguments]
    let data = fs.readFileSync(dataPath, { encoding: 'utf-8' })
    let json = JSON.parse(data)
    if (args.length === 0 || args[0] === null) {
        json = {}
    } else if (args.length === 1 && typeof key === 'object' && key) {
        json = {
            ...json,
            ...args[0],
        }
    } else {
        json[key] = value
    }
    fs.writeFileSync(dataPath, JSON.stringify(json), { encoding: 'utf-8' })
}

export async function sleep(ms: number) {
    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            resolve(true)
            clearTimeout(timer)
        }, ms)
    })
}


import { readFileSync } from 'fs'
import { join } from 'path'

export const getMockResponse = path => readFileSync(join(__dirname, path), 'utf8')

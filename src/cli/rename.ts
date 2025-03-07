// Description: Rename Script

import { refreshScriptsDb } from "../core/db.js"
import {
  exists,
  extensionRegex,
  trashScriptBin,
} from "../core/utils.js"

import { Script } from "../types/core.js"

let script: Script = await selectScript(
  `Which script do you want to rename?`
)

let { filePath } = script

let scriptExtension = path.extname(filePath)

let newCommand = await arg({
  placeholder: `Enter the new script name:`,
  selected: filePath,
  validate: exists,
})

let lenientCommand = newCommand.replace(extensionRegex, "")

let newFilePath = path.resolve(
  path.dirname(filePath),
  lenientCommand + scriptExtension
)

try {
  await trashScriptBin(script)
} catch (error) {
  warn(error)
}

mv(filePath, newFilePath)
await cli("create-bin", "scripts", newFilePath)
await refreshScriptsDb()

edit(newFilePath, kenvPath())

export {}

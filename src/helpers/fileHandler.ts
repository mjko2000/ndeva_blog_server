import { existsSync, mkdirSync, writeFileSync, unlink, copyFile } from 'fs';
import { genSaltSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
const keyExternal = process.env.EXTERNAL_KEY || 'jyshhsXAIIPP212'

const acceptedFile = ['jpg', 'jpeg', 'png']
function getFileExtension(filename: string) {
  return filename.split('.').pop();
}
interface OutPutType {
  path: string;
  error: boolean;
  fileName: string;
}
const fileHandler = (file: any, path: string): OutPutType => {
  try {
    if (!file && !path) return {
      path: null,
      error: true,
      fileName: null
    }
    const fileName = file.path.replace(/^.*[\\\/]/, '')
    const fileTarget = `/files/${path}/` + fileName;
    const fileExtension = getFileExtension(fileName)
    if (!existsSync("files")) mkdirSync("files")
    if (!existsSync("files/"+path)) mkdirSync("files/"+path)
    if (acceptedFile.indexOf(fileExtension) === -1)
      return {
        path: null,
        error: true,
        fileName: null
      }
    copyFile(file.path, '.' + fileTarget, () => {
      unlink(file.path, err => console.log(err))
    })
    return {
      path: path+'/'+fileName,
      error: false,
      fileName: fileName
    }
  } catch (err) {
    console.log(err)
    return {
      path: null,
      error: true,
      fileName: null
    }
  }
}
export const deleteFile = (fullPath: string): boolean => {
  try {
    unlink('./files/'+fullPath, () => {})
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
export const createHtmlByString = (content: string): OutPutType => {
  try {
    if (!content) return {
      path: null,
      error: true,
      fileName: null
    }
    const fileName = uuidv4()+'.html'
    if (!existsSync("files")) mkdirSync("files")
    if (!existsSync("files/html")) mkdirSync("files/html")
    writeFileSync('./files/html/'+fileName, content);
    return {
      path: "html/"+fileName,
      error: false,
      fileName
    }
  } catch (err) {
    console.log(err)
    return {
      path: null,
      error: true,
      fileName: null
    }
  }
}
export default fileHandler
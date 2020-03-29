const path = require('path')
const utils = require('./utils')
const fs = require('fs')
const slash = require('slash')

class SidebarGen {
  constructor () {}

  getSidebarList (isCollapsable = true, workingDir = './docs', sidebarDepth = 0) {

    // Build sidebar options from params
    const sidebarOptions = {
      isCollapsable: isCollapsable,
      sidebarDepth: sidebarDepth
    }


    // Collect files except Readme.md on given root level.
    let rootFiles = utils.getFiles(workingDir).map((file) => {
      return path.join(file)
    })

    let rootDirectories = utils.getDirectories(workingDir)

    console.log(rootFiles, rootDirectories)

    let directoryGroups = rootDirectories.map((currentDir) => {
      return Object.assign({}, utils.getDirectoryObject(workingDir, currentDir), sidebarOptions)
    })

    // Return the final structure as expected by vuepress
    return [''].concat(rootFiles, directoryGroups)
  }
}
module.exports = new SidebarGen();

const fs = require('fs')
const path = require('path')
const slash = require('slash')
const fm = require('front-matter')

class SidebarUtils {

  toTitle (title, targetpath) {
    if (title === '') {
      return targetpath.replace('/', '')
    }
    return title
  }

  getFilepaths (files, targetdir) {
    return files.map((file) => {
      if (file === 'README.md') {
        return path.join(targetdir);
      }
      return path.join(targetdir, file)
    })
  }

  getFiles (workingdir, targetpath) {
    return fs.readdirSync(path.join(workingdir, targetpath)).filter((file) => {
      return this.isMarkdownFile(path.join(workingdir, targetpath, file))
    })
  }

  getFileitems(workingdir, targetdir) {
    return fs.readdirSync(path.join(workingdir, targetdir))
      .filter(file => file !== 'README.md')
      .map((file) => '/' + slash(path.join(workingdir, targetdir, file)) + '/')
  }

  getDirectories (targetdir) {
    return fs.readdirSync(targetdir).filter((item) => {
      return item === '.vuepress' ? false : this.isDirectory(path.join(targetdir, item))
    })
  }

  getFiles (targetdir) {
    return fs.readdirSync(targetdir).filter((file) => {
      return file === 'README.md' ? false : this.isMarkdownFile(path.join(targetdir, file))
    })
  }

  isMarkdownFile (targetpath) {
    return fs.existsSync(targetpath) && fs.statSync(targetpath).isFile() && path.extname(targetpath) === '.md'
  }

  isDirectory (targetpath) {
    return fs.existsSync(targetpath) && fs.statSync(targetpath).isDirectory()
  }

  getDirectoryObject (workingDir, currentDir) {

    let directoryObject = {
      children: utils.getFileitems(workingdir, currentDir)
    }

    // If the directory in question has a README.md file in it, make it a link
    const readmeFile = path.join(workingdir, currentDir, 'README.md')
    if (isMarkdownFile(readmeFile)) {
      directoryObject.title = getFrontMatterTitleFromFile(readmeFile)
      directoryObject.path = '/' + slash(path.join(workingdir, directory)) + '/'
    }

    return structure


  }

  getFrontMatterTitleFromFile (readmeFile) {
    fs.readFile(readmeFile, 'utf8', function(err, data) {
      if (err) throw err

      let content = fm(data)

      console.log(content)
    })
  }
}
module.exports = new SidebarUtils();

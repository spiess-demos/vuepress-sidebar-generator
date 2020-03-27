const path = require('path')
const utils = require('./utils')
const fs = require('fs')
const slash = require('slash')

class SidebarGen {

  constructor () {}

  getSidebarGroup (targetdir = '/', title = '', isCollapsable = true) {
    let workingdir = './docs';

    let files = utils.getFiles(workingdir, targetdir);

    let grouptitle = utils.toTitle(title, targetdir);

    //サイドバーアイテムの作成
    let directoryGroup =  {
      // グループリストタイトル
      title: grouptitle,
      // グループリスト展開有無
      collapsable: isCollapsable,
      // ディレクトリ配下のファイルリスト作成
      children: utils.getFilepaths(files, targetdir)
    };
    return directoryGroup;
  };

  getSidebarList (isCollapsable = true, workingdir = './docs') {

    // Collect files except Readme.md on given root level
    let rootItems = utils.getRootFileItems(workingdir).map((file) => {
      return path.join(file)
    })

    let directores = utils.getDirectores(workingdir);

    let directoryGroups = directores.map((directory) => {
      let structure = {
        title: directory,
        collapsable: isCollapsable,
        children: utils.getFileitems(workingdir, directory)
      }

      // If the directory in question has a README.md file in it, make it a link
      if (fs.existsSync(path.join(workingdir, directory, 'README.md'))) {
        structure.path = '/' + slash(path.join(workingdir, directory)) + '/'
      }

      return structure
    })

    // Return the final structure as expected by vuepress
    return [''].concat(rootItems, directoryGroups)
  };
}
module.exports = new SidebarGen();

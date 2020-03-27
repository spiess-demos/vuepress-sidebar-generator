const fs = require('fs')
const path = require('path')
const slash = require('slash')

class SidebarUtils {
  //ユーティリティ

  //グループタイトル変換
  toTitle(title, targetpath) {
    if (title === '') {
      return targetpath.replace('/', '');
    }
    return title;
  };

  // 対象ディレクトリ配下のファイルを取得
  getFilepaths(files, targetdir) {
    return files.map((file) => {
      // 子ディレクトリ配下にREADME.mdが存在する場合は子ディレクトリのパスとする。
      if (file === 'README.md') {
        // README.mdの場合は子ディレクトリ直下のパスとする。
        //return targetdir;
        return path.join(targetdir);
      }
      // README.md以外の場合は子ディレクトリ+ファイル名を返す。
      //return targetdir + file;
      return path.join(targetdir, file);
    });
  };

  getFiles (workingdir, targetpath) {
    //return fs.readdirSync(workingdir + targetpath).filter((file) => {
    return fs.readdirSync(path.join(workingdir, targetpath)).filter((file) => {
      //return isFile(workingdir + targetpath + file);
      return this.isFile(path.join(workingdir, targetpath, file));
    });
  };

  getFileitems(workingdir, targetdir) {
    return fs.readdirSync(path.join(workingdir, targetdir))
      .filter(file => file !== 'README.md')
      .map((file) => '/' + slash(path.join(workingdir, targetdir, file)) + '/')
  }

  // ディレクトリ一覧の取得
  getDirectores (workingdir) {
    // root配下のファイル＆ディレクトリ一覧取得
    return fs.readdirSync(workingdir).filter((childdir) => {
      // .vuepressのみ除外
      if (childdir === '.vuepress') {
        //対象ディレクトリが.vuepressの場合、false
        return false;
      }
      // ディレクトリの場合：true 対象がファイルであった場合はfalse
      //return isDirectory(workingdir + '/' + childdir);
      return this.isDirectory(path.join(workingdir, childdir));
    });
  };

  getRootFileItems (workingdir) {
    return fs.readdirSync(workingdir).filter((file) => {
      return file === 'README.md' ? false : this.isFile(path.join(workingdir, file))
    })
  }

  // ファイル存在確認（マークダウンファイル判定）
  isFile(targetpath) {
    return fs.existsSync(targetpath) && fs.statSync(targetpath).isFile() && path.extname(targetpath) === '.md';
  };

  // ディレクトリ存在確認
  isDirectory(targetpath) {
    // existsSyncは非推奨だから使わないほうが良い？
    // 参考；fs.statSyncでファイルの存在判定 - Qiita https://qiita.com/tokimari/items/82222e1f99b2b9eb1fb8
    // やっぱりこのままでいいっぽい
    // 参考：Node.js でディレクトリかどうかを判定する方法 | phiary http://phiary.me/nodejs-check-is-directory/
    // ディレクトリが存在する かつ 対象パスはディレクトリか否か
    return fs.existsSync(targetpath) && fs.statSync(targetpath).isDirectory();
  };
}
module.exports = new SidebarUtils();

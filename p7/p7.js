const fs = require('fs');
const { cursorTo } = require('readline');

const FILENAME = 'p7/p7_input.txt';

const getData = (fn) => fs.readFileSync(fn).toString().split('\n');

const initDir = { files: [] };
m = new Object({
  '/': new Object(initDir)
});

function accessM(l) {
  let localm = m;
  l.forEach((i) => {
    localm = localm[i];
  });
  return localm;
}

function formatFile(f) {
  const [filesize, filename] = f.split(' ');
  return [filename, filesize];
}

const makeFiletree = (arr) => {
  current_d = [];
  while (arr.length) {
    const com = arr.shift(0);
    if (com.slice(0, 1) === '$') {
      if (com.slice(2, 4) === 'cd') {
        if (com.slice(5) === '/') {
          current_d = ['/'];
          continue;
        }
        if (com.slice(5) === '..') {
          current_d = current_d.splice(0, current_d.length - 1);
        } else {
          current_d.push(com.slice(5));
        }
      }
    }
    if (com.slice(2, 4) === 'ls') {
      while (true) {
        if (!arr.length) {
          break;
        }
        if (arr[0][0] === '$') {
          break;
        } else {
          const outp = arr.shift();
          const targetDir = accessM(current_d);
          if (outp.slice(0, 3) === 'dir') {
            const listedDir = outp.slice(4);
            if (!(listedDir in targetDir)) {
              targetDir[listedDir] = { files: [] };
            }
          } else {
            const fileList = formatFile(outp);
            targetDir['files'].push(fileList);
          }
        }
      }
    }
  }
  return m;
};

function calculate_dir_size(name, m) {
  const sizeFiles = m['files'].reduce((x, y) => x + parseInt(y[1]), 0);
  const dirs = Object.keys(m)
    .filter((k) => k !== 'files')
    .map((k) => {
      return calculate_dir_size(k, m[k]);
    });
  const sizeDirs = dirs.reduce((x, y) => x + y[0], 0);
  const smallDirs = dirs.map((d) => d[1]);
  const size = sizeFiles + sizeDirs;
  if (size <= 100000) {
    smallDirs.push([name, size]);
  }
  return [size, smallDirs];
}

function gather_dir_sizes(name, m) {
  const sizeFiles = m['files'].reduce((x, y) => x + parseInt(y[1]), 0);
  const dirs = Object.keys(m)
    .filter((k) => k !== 'files')
    .map((k) => {
      return gather_dir_sizes(k, m[k]);
    });
  const sizeDirs = dirs.reduce((x, y) => x + y[0], 0);
  const dirNames = dirs.map((d) => d[1]);
  const size = sizeFiles + sizeDirs;
  dirNames.push([name, size]);
  return [size, dirNames];
}

function get_sum_small_dir_sizes(d) {
  if (!d.length) {
    return 0;
  }
  if (!Array.isArray(d[0])) {
    return d[1];
  }
  if (Array.isArray(d[0])) {
    return Object.keys(d).reduce(
      (x, k) => x + get_sum_small_dir_sizes(d[k]),
      0
    );
  } else {
  }
}

const process = (arr) => {
  const filetree = makeFiletree(arr);
  const [dirsize, smallFiles] = calculate_dir_size('/', filetree['/']);
  const output = get_sum_small_dir_sizes(smallFiles);
  return output;
};

const processP2 = (arr) => {
  const filetree = makeFiletree(arr);
  const [used_diskspace, size_by_dir] = gather_dir_sizes('/', filetree['/']);
  const total_diskspace = 70000000;
  const needed_free_diskspace = 30000000;
  const free_diskspace = total_diskspace - used_diskspace;
  const dirs_by_size = size_by_dir.flat(Infinity);
  const pairs = [];
  for (let i = 0; i < dirs_by_size.length; i += 2) {
    pairs.push(dirs_by_size.slice(i, i + 2));
  }
  elig_dir = pairs.filter((x) => free_diskspace + x[1] > needed_free_diskspace);
  const minDir = elig_dir.sort((x, y) => x[1] - y[1])[0];
  return minDir;
};

function main() {
  const data = getData(FILENAME);
  console.log(data);
  //const total = process(data);
  const totalP2 = processP2(data);
  console.log(totalP2);
}

main();

/**
 * @fileoverview Utility to translate test files to ES6 imports.
 */

var lineReader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function tryStripPrefix(str, prefix) {
  if (str.lastIndexOf(prefix) !== 0) {
    throw "String: " + str + " didn't start with: " + prefix;
  }
  return str.substr(prefix.length);
}

function camelCase(str) {
  var ret = '';
  var ucaseNext = false;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == '-') {
      ucaseNext = true;
    } else if (ucaseNext) {
      ret += str[i].toUpperCase();
      ucaseNext = false;
    } else {
      ret += str[i];
    }
  }
  return ret;
}

var module = null;
var pkg = null;

// Header
console.log("import googleProtobuf from 'google-protobuf';");
console.log("import testdeps from 'testdeps_commonjs';");
console.log("globalThis.COMPILED = testdeps.COMPILED;");
console.log("globalThis.goog = testdeps.goog;");
console.log("globalThis.googleProtobuf = googleProtobuf;");
console.log("");

lineReader.on('line', function (line) {
  const isModuleGet = line.match(/(.*)goog\.module\.get\('([^']*)'\)([^;]*);/);
  if (isModuleGet) {
    const fullSym = isModuleGet[2];
    console.log(isModuleGet[1] + "testdeps." + fullSym + isModuleGet[3]);
    return;
  }
  var isRequire = line.match(/goog\.require\('([^']*)'\)/);
  var isLoadFromFile = line.match(/CommonJS-LoadFromFile: (\S*) (.*)/);
  var isSetTestOnly = line.match(/goog.setTestOnly()/);
  if (isRequire) {
    if (module) {
      var fullSym = isRequire[1];
      if (fullSym.match(/^jspb\./)) return;
      var sym = tryStripPrefix(fullSym, pkg);
      console.log("googleProtobuf.exportSymbol('" + fullSym + "', " + module + sym + ', globalThis);');
    }
  } else if (isLoadFromFile) {
    var module_path = isLoadFromFile[1].split('/');
    module = camelCase(module_path[module_path.length - 1]);
    pkg = isLoadFromFile[2];

    if (module != "googleProtobuf") {
      console.log("import * as " + module + " from './" + isLoadFromFile[1] + ".mjs';");
    }
  } else if (!isSetTestOnly) {
    console.log(line);
  }
});

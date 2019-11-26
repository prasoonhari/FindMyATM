/*
@providesModule native-blocks
* */

const Blocks = {
  get Button() { return require('./button'); },
  get Text() { return require('./text'); },
  get View() { return require('./view'); },
  get TextInput() { return require('./textInput'); },
  get Icon() { return require('./icon'); },
  get ListView() { return require('./listView'); },
  get Loader() { return require('./loader'); },

};

module.exports = Blocks;

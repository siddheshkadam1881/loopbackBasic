'use strict';

module.exports = function(Note) {

      Note.disableRemoteMethodByName('count', true);
      Note.disableRemoteMethodByName('upsertWithWhere', true);
      Note.disableRemoteMethodByName('replaceOrCreate', true);
      Note.disableRemoteMethodByName('createChangeStream', true);
      Note.disableRemoteMethodByName('patchOrCreate', true);
      Note.disableRemoteMethodByName('replaceById', true);
      // Note.disableRemoteMethodByName('count', true);
      // Note.disableRemoteMethodByName('count', true);
      // Note.disableRemoteMethodByName('count', true);
      // Note.disableRemoteMethodByName('count', true);
      // Note.disableRemoteMethodByName('count', true);

};

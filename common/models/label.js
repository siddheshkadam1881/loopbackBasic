'use strict';

module.exports = function(Label) {
  Label.disableRemoteMethodByName('count', true);
  Label.disableRemoteMethodByName('upsertWithWhere', true);
  Label.disableRemoteMethodByName('replaceOrCreate', true);
  Label.disableRemoteMethodByName('createChangeStream', true);
  Label.disableRemoteMethodByName('patchOrCreate', true);
  Label.disableRemoteMethodByName('replaceById', true);

};

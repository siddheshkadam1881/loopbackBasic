var app=require('../server');
var dataSource=app.dataSources.db;
dataSource.automigrate('account',function(err)
{
 if(err) throw err;
  dataSource.disconnect();
});
dataSource.automigrate('label',function(err)
{
 if(err) throw err;
  dataSource.disconnect();
});
dataSource.automigrate('Note',function(err)
{
 if(err) throw err;
  dataSource.disconnect();
});

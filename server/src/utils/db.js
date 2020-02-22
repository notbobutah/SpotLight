const { Pool } = require('pg');
var fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'spotlight',
  port: 5432,
})

  pool.on('connect', () => {
    console.log('connected to the spotlight db');
  });
  
selectNodes = function() {
    return new Promise(async function(resolve, reject) {
        console.log('inside get all nodes db')
        let rtnArray = [];
        await pool.query('SELECT * FROM nodes',  (error, results) => {
                if (error) {
                    throw error
                }
               Object.keys(results.rows).forEach(function(key) {
                let customnode = results.rows[key]['nodebody'];
                customnode['addInfo'] = results.rows[key]['id'];
                rtnArray.push(results.rows[key]['nodebody']);
                })
                // console.log(JSON.stringify(results.rows))
                resolve(JSON.stringify(rtnArray))
        })
    })
}

selectConnectors  = function() {
    return new Promise(async function(resolve, reject) {
    console.log('inside get all connectorss db')
    let rtnArray = [];
        await pool.query('SELECT * FROM connectors', (error, results) => {
            if (error) {
                throw error
            }
            Object.keys(results.rows).forEach(function(key) {
                let customnode = results.rows[key]['connectorbody'];
                customnode['addInfo'] = results.rows[key]['id'];
                rtnArray.push(customnode);
                })
            resolve(JSON.stringify(rtnArray))
        })
  })
}

const updateNode = (id, jsonBody) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
            }
      pool.query('UPDATE public.nodes	SET id=?, nodebody=?, "offsetX"=?, "offsetY"=?    WHERE <condition>', (error, results) => {
          release()
            if (error) {
                throw error
            }
        return json(results.rows)
      })
  })
}
  
const updateConnector = (id, jsonBody) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
            }
        pool.query('UPDATE public.connectors SET id=?, connetorbody=?, sourcenode=?, targetnode=? WHERE <condition>;', (error, results) => {
            release()
            if (error) {
                throw error
            }
            return json(results.rows)
        })
  }
    )
}
createDDL = function () {
    var sql = fs.readFileSync('spotlight.ddl.sql').toString();

        client.query(sql, function(err, result){
            done();
            if(err){
                console.log('error: ', err);
                process.exit(1);
            }
        });
}
loadData = function () {
    var sql = fs.readFileSync('spotlight.data.sql').toString();

        client.query(sql, function(err, result){
            done();
            if(err){
                console.log('error: ', err);
                process.exit(1);
            }
        });
}

module.exports = {
    selectConnectors,
    selectNodes,
    updateConnector,
    updateNode
}
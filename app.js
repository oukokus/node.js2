const path = require('path');
const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'rootroot',
  database: 'node2_db'
});

// mysqlからデータを持ってくる
app.get('/', (req, res) => {
  // cssファイルの取得
app.use(express.static('assets'));
  const sql = "select * from personas";
  // 参考例
  const num = 10000;




  // ==========ここまでの範囲で書くようにしましょう。==========
  app.post('/', (req, res) => {
    const sql = "INSERT INTO personas SET ?"
    con.query(sql, req.body, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect('/');
    });
  });
  
  app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.ejs'))
  });
  
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('index', {
      
      users: result,

      // ⓵ こちらはapp.jsで宣言した変数をindex.ejsのscriptタグ内で使用するために登録する場所になっています。
      /*
        指定の仕方はオブジェクトの考え方と同じで、プロパティ名: 値の形になります。値の部分は変数名を入れるようにして下さい。
        プロパティ名はindex.ejsで使用しますので、何の値が入ってるかわかるような名前にしましょう。
      */


    });
  });
});

app.get('/edit/:id', (req, res) => {
  const sql = "SELECT * FROM personas WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render('edit', {
      user: result
    });
  });
});

app.post('/update/:id', (req, res) => {
  const sql = "UPDATE personas SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(
    sql, [req.params.id],
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect('/');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

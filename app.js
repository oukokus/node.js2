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
  // 基礎課題
  /* ==========従来通りJavaScript要領で書いてください。==========
    ここで記載する内容はブラウザに出力するための情報のみになります。上記参考例のconst num = 10000;のように
    各基礎課題で指定された情報を一つの変数に格納していきましょう。各情報を変数に格納したら今度は下にある
    コメントアウト⓵の部分を確認してみて下さい。

    基礎課題01:文字列を画面に出力しましょう。*/
  const str = "あいうえお";
  /*基礎課題02:リストを画面表示
  app.jsのここで配列を用意し、viewsフォルダのindex.ejsのscriptタグ内で画面に出力出来るように機能を作成して下さい。*/
  const ulList = ['キノコ', 'ふきのとう', 'タケノコ', 'さつまいも', 'ししとう', 'さやえんどう', 'とうみょう'];
  /*基礎課題03:マップを画面表示
  マップというのは配列の中にオブジェクトを設定するものになります。よく分からない方は
  オブジェクトを以下のように設定  */
  const obj = [
  {name:"s.chiba", email:"s.chiba@gmail.com"},
  {name:"t.kosuge", email:"t.kosuge@gmail.com"},
  {name:"m.chiba", email:"m.chiba@gmail.com"},
  {name:"t.suzuki", email:"t.suzuki@gmail.com"},
  {name:"t.hasegawa", email:"t.hasegawa@gmail.com"}
  ]



  // ==========ここまでの範囲で書くようにしましょう。==========
  app.post('/', (req, res) => {
    const sql = "INSERT INTO users SET ?"
    con.query(sql, req.body, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect('/');
    });
  });
  
  app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/form.html'))
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
      number: num,
      number1: str,
      number2: ulList,
      number3: obj,
    

    });
  });
});

app.get('/edit/:id', (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render('edit', {
      user: result
    });
  });
});

app.post('/update/:id', (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
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
